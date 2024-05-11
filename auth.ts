import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
async function registerOauth({
  email,
  firstName,
  lastName,
  imageURL,
}: {
  email: string;
  firstName: string;
  lastName: string;
  imageURL: string;
}): Promise<boolean> {
  const name = `${firstName} ${lastName}`;
  try {
    await sql`
      INSERT INTO users (name, email, username, complete_card, image_url)
      VALUES (${name}, ${email}, ${name}, 'false', ${imageURL})
      ON CONFLICT (id) DO NOTHING;`;

    console.log(`Seeded new user: ${name}`);
    return true;
  } catch (error) {
    cookies().set('register_failed', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
    return false;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          const bcrypt = require('bcrypt');
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }), // Add Google OAuth provider
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile) {
        // Handle logic specific to OAuth users here
        const user = await getUser(profile.email!);
        if (!user) {
          const firstName = profile.given_name;
          const lastName = profile.family_name;
          const email = profile.email;
          const imageURL = profile.picture;
          if (!firstName || !lastName || !email || !imageURL) {
            throw new Error(
              'Failed to fetch complete user profile from OAuth provider, registration failed',
            );
          }
          const registerSuccess = await registerOauth({
            email: email,
            firstName: firstName,
            lastName: lastName,
            imageURL: imageURL,
          });
          if (!registerSuccess) {
            throw new Error(
              'Failed to register user using Oauth provider credentials',
            );
          } else {
            console.log('Registered new user');
            return true;
          }
        }
        return true; // Continue the sign-in process for OAuth users
      }
      // For non-OAuth sign-ins, do nothing special
      return true; // Continue the sign-in process
    },
  },
});
