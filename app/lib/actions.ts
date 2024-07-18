'use server';

import { string, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, auth } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { pusher } from './pusher-server';
import { unstable_noStore as noStore, unstable_cache } from 'next/cache';

const registerFormOauth = z.object({
  first: z
    .string()
    .min(1, { message: 'Please input your name.' })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Username must only contain letters.',
    })
    .max(20, {
      message:
        'First name can only be 20 characters long, sorry if that sucks!',
    }),

  last: z
    .string()
    .min(1, { message: 'Please input your name.' })
    .regex(/^[a-zA-Z-]+$/, {
      message: 'Username must only contain letters or hyphens.',
    })
    .max(30, {
      message: 'Last name can only be 30 characters long, sorry if that sucks!',
    }),
  email: z.string().email({ message: 'Please input a valid email address.' }),
});
const registerForm = z.object({
  first: z
    .string()
    .min(1, { message: 'Please input your name.' })
    .regex(/^[a-zA-Z]+$/, {
      message: 'Username must only contain letters.',
    })
    .max(20, {
      message:
        'First name can only be 20 characters long, sorry if that sucks!',
    }),

  last: z
    .string()
    .min(1, { message: 'Please input your name.' })
    .regex(/^[a-zA-Z-]+$/, {
      message: 'Username must only contain letters.',
    })
    .max(30, {
      message: 'Last name can only be 30 characters long, sorry if that sucks!',
    }),
  email: z.string().email({ message: 'Please input a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .nullable(),
});

export type State = {
  errors?: {
    first?: string[];
    last?: string[];
    email?: string[];
    password?: string[];
    image_url?: string[];
    about_player?: string[];
    self_level?: string[];
    years_xp?: string[];
    singles_play?: string[];
    doubles_play?: string[];
    open_play?: string[];
    light_hitting?: string[];
    training_drills?: string[];
    tourn_level?: string[];
    home_court?: string[];
    will_travel?: string[];
    weather_cold?: string[];
    weather_windy?: string[];
    weekday_early_am?: string[];
    weekday_late_am?: string[];
    weekday_early_pm?: string[];
    weekday_late_pm?: string[];
    weekday_evening?: string[];
    weekend_early_am?: string[];
    weekend_late_am?: string[];
    weekend_early_pm?: string[];
    weekend_late_pm?: string[];
    weekend_evening?: string[];
  };
  message?: string | null;
};

const cardDataForm = z.object({
  username: z.string(),
  image_url: z.string().url({ message: 'Please upload an avatar image.' }),
  about_player: z.string({
    invalid_type_error: 'Please input a description of yourself.',
  }),
  self_level: z.string({
    invalid_type_error: 'Please select your self-rated level.',
  }),
  years_xp: z.enum(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
  singles_play: z.enum(['true', 'false']),
  doubles_play: z.enum(['true', 'false']),
  open_play: z.enum(['true', 'false']),
  light_hitting: z.enum(['true', 'false']),
  training_drills: z.enum(['true', 'false']),
  tourn_level: z.string(),
  home_court: z.enum(['poplar', 'fdr', 'fairmount']),
  will_travel: z.enum(['true', 'false']),
  weather_cold: z.enum(['true', 'false']),
  weather_windy: z.enum(['true', 'false']),
  weekday_early_am: z.enum(['true', 'false']),
  weekday_late_am: z.enum(['true', 'false']),
  weekday_early_pm: z.enum(['true', 'false']),
  weekday_late_pm: z.enum(['true', 'false']),
  weekday_evening: z.enum(['true', 'false']),
  weekend_early_am: z.enum(['true', 'false']),
  weekend_late_am: z.enum(['true', 'false']),
  weekend_early_pm: z.enum(['true', 'false']),
  weekend_late_pm: z.enum(['true', 'false']),
  weekend_evening: z.enum(['true', 'false']),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function seedCard(prevState: State, formData: FormData) {
  // let data = formData.get('weather_cold');
  // console.log(data);
  // console.log('hi hthere');
  const validatedFields = cardDataForm.safeParse({
    username: formData.get('username'),
    image_url: formData.get('image_url'),
    about_player: formData.get('about_player'),
    self_level: formData.get('self_level'),
    years_xp: formData.get('years_xp'),
    singles_play: formData.get('singles_play'),
    doubles_play: formData.get('doubles_play'),
    open_play: formData.get('open_play'),
    light_hitting: formData.get('light_hitting'),
    training_drills: formData.get('training_drills'),
    tourn_level: formData.get('tourn_level'),
    home_court: formData.get('home_court'),
    will_travel: formData.get('will_travel'),
    weather_cold: formData.get('weather_cold'),
    weather_windy: formData.get('weather_windy'),
    weekday_early_am: formData.get('weekday_early_am'),
    weekday_late_am: formData.get('weekday_late_am'),
    weekday_early_pm: formData.get('weekday_early_pm'),
    weekday_late_pm: formData.get('weekday_late_pm'),
    weekday_evening: formData.get('weekday_evening'),
    weekend_early_am: formData.get('weekend_early_am'),
    weekend_late_am: formData.get('weekend_late_am'),
    weekend_early_pm: formData.get('weekend_early_pm'),
    weekend_late_pm: formData.get('weekend_late_pm'),
    weekend_evening: formData.get('weekend_evening'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Update Card.',
    };
  }
  console.log(validatedFields.data);

  const {
    username,
    image_url,
    about_player,
    self_level,
    years_xp,
    singles_play,
    doubles_play,
    open_play,
    light_hitting,
    training_drills,
    tourn_level,
    home_court,
    will_travel,
    weather_cold,
    weather_windy,
    weekday_early_am,
    weekday_late_am,
    weekday_early_pm,
    weekday_late_pm,
    weekday_evening,
    weekend_early_am,
    weekend_late_am,
    weekend_early_pm,
    weekend_late_pm,
    weekend_evening,
  } = validatedFields.data;
  const years_xp_Number = parseInt(years_xp);
  try {
    await sql`
    INSERT INTO cards (username, image_url, about_player, self_level, years_xp, singles_play, doubles_play, open_play, light_hitting, training_drills, tourn_level, home_court, will_travel, weather_cold, weather_windy, weekday_early_am, weekday_late_am, weekday_early_pm, weekday_late_pm, weekday_evening, weekend_early_am, weekend_late_am, weekend_early_pm, weekend_late_pm, weekend_evening)
    VALUES (${username}, ${image_url}, ${about_player}, ${self_level}, ${years_xp_Number}, ${singles_play}, ${doubles_play}, ${open_play}, ${light_hitting}, ${training_drills}, ${tourn_level}, ${home_court}, ${will_travel}, ${weather_cold}, ${weather_windy}, ${weekday_early_am}, ${weekday_late_am}, ${weekday_early_pm}, ${weekday_late_pm}, ${weekday_evening}, ${weekend_early_am}, ${weekend_late_am}, ${weekend_early_pm}, ${weekend_late_pm}, ${weekend_evening})
    ON CONFLICT (id) DO NOTHING;`;

    console.log(`Seeded new card for user: ${username}`);

    await sql`
    UPDATE users SET image_url = ${image_url}, complete_card = 'true' WHERE username = ${username};`;
    console.log(
      `Updated ${username} user profile to reflect completed card status.`,
    );
  } catch (error) {
    return {
      message:
        'Database Error: Failed to seed new card into database or update user card-status.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateCard(prevState: State, formData: FormData) {
  // let data = formData.get('weather_cold');
  // console.log(data);
  // console.log('hi hthere');
  const validatedFields = cardDataForm.safeParse({
    username: formData.get('username'),
    image_url: formData.get('image_url'),
    about_player: formData.get('about_player'),
    self_level: formData.get('self_level'),
    years_xp: formData.get('years_xp'),
    singles_play: formData.get('singles_play'),
    doubles_play: formData.get('doubles_play'),
    open_play: formData.get('open_play'),
    light_hitting: formData.get('light_hitting'),
    training_drills: formData.get('training_drills'),
    tourn_level: formData.get('tourn_level'),
    home_court: formData.get('home_court'),
    will_travel: formData.get('will_travel'),
    weather_cold: formData.get('weather_cold'),
    weather_windy: formData.get('weather_windy'),
    weekday_early_am: formData.get('weekday_early_am'),
    weekday_late_am: formData.get('weekday_late_am'),
    weekday_early_pm: formData.get('weekday_early_pm'),
    weekday_late_pm: formData.get('weekday_late_pm'),
    weekday_evening: formData.get('weekday_evening'),
    weekend_early_am: formData.get('weekend_early_am'),
    weekend_late_am: formData.get('weekend_late_am'),
    weekend_early_pm: formData.get('weekend_early_pm'),
    weekend_late_pm: formData.get('weekend_late_pm'),
    weekend_evening: formData.get('weekend_evening'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Update Card.',
    };
  }
  console.log(validatedFields.data);

  const {
    username,
    image_url,
    about_player,
    self_level,
    years_xp,
    singles_play,
    doubles_play,
    open_play,
    light_hitting,
    training_drills,
    tourn_level,
    home_court,
    will_travel,
    weather_cold,
    weather_windy,
    weekday_early_am,
    weekday_late_am,
    weekday_early_pm,
    weekday_late_pm,
    weekday_evening,
    weekend_early_am,
    weekend_late_am,
    weekend_early_pm,
    weekend_late_pm,
    weekend_evening,
  } = validatedFields.data;
  const years_xp_Number = parseInt(years_xp);
  try {
    await sql`UPDATE cards 
    SET image_url = ${image_url}, 
        about_player = ${about_player}, 
        self_level = ${self_level},
        years_xp = ${years_xp_Number}, 
        singles_play = ${singles_play}, 
        doubles_play = ${doubles_play}, 
        open_play = ${open_play}, 
        light_hitting = ${light_hitting}, 
        training_drills = ${training_drills}, 
        tourn_level = ${tourn_level}, 
        home_court = ${home_court},
        will_travel = ${will_travel},
        weather_cold = ${weather_cold}, 
        weather_windy = ${weather_windy}, 
        weekday_early_am = ${weekday_early_am}, 
        weekday_late_am = ${weekday_late_am}, 
        weekday_early_pm = ${weekday_early_pm}, 
        weekday_late_pm = ${weekday_late_pm}, 
        weekday_evening = ${weekday_evening}, 
        weekend_early_am = ${weekend_early_am}, 
        weekend_late_am = ${weekend_late_am}, 
        weekend_early_pm = ${weekend_early_pm}, 
        weekend_late_pm = ${weekend_late_pm}, 
        weekend_evening = ${weekend_evening},
        update_time = NOW()
    WHERE username = ${username};`;
    console.log(`Updated card for user: ${username}`);

    await sql`
    UPDATE users SET image_url = ${image_url} WHERE username = ${username};`;
    console.log(
      `Updated ${username} user profile to reflect new image url status.`,
    );
  } catch (error) {
    return {
      message:
        'Database Error: Failed to seed new card into database or update user card-status.',
    };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = z
    .object({
      password: z
        .string()
        .min(8, {
          message:
            'Password must be at least 8 characters long. Please try again.',
        })
        .nullable(),
    })
    .safeParse({
      password: formData.get('password'),
    });
  if (!validatedFields.success) {
    console.log(validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Error resetting your password invalid password input, try again please.',
    };
  }
  const { password } = validatedFields.data;
  try {
    const session = await auth();
    if (!session?.user)
      throw new Error(
        'unable to access user session data to update password, you are not logged in',
      );
    const hashedPassword = await bcrypt.hash(password!, 10);
    await sql`
    UPDATE users
    SET password = ${hashedPassword}
    WHERE email = ${session.user.email};
  `;
    cookies().set('reset', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
  } catch (error) {
    cookies().set('reset_failed', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
    return {
      message:
        'Database Error: Failed to update password due to issue accessing the database, email admin.',
    };
  }
  revalidatePath('/dashboard/settings');
  redirect('/dashboard/settings');
}

export async function register(prevState: any, formData: FormData) {
  const validatedFields = registerForm.safeParse({
    first: formData.get('first-name'),
    last: formData.get('last-name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Register.',
    };
  }
  const { first, last, email, password } = validatedFields.data;
  const name = `${first} ${last}`;
  const hashedPassword = await bcrypt.hash(password!, 10);
  try {
    await sql`
      INSERT INTO users (name, email, username, password, complete_card)
      VALUES (${name}, ${email}, ${name}, ${hashedPassword}, 'false')
      ON CONFLICT (id) DO NOTHING;`;

    console.log(`Seeded new user: ${name}`);

    cookies().set('registered', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
  } catch (error) {
    cookies().set('register_failed', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
    return {
      message: 'Database Error: Failed to Create New User.',
    };
  }

  revalidatePath('/login');
  redirect('/login');
}

export async function registerOauth(prevState: any, formData: FormData) {
  const validatedFields = registerFormOauth.safeParse({
    first: formData.get('first-name'),
    last: formData.get('last-name'),
    email: formData.get('email'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Register.',
    };
  }
  const { first, last, email } = validatedFields.data;
  const name = `${first} ${last}`;
  try {
    await sql`
      INSERT INTO users (name, email, username, complete_card)
      VALUES (${name}, ${email}, ${name}, 'false')
      ON CONFLICT (id) DO NOTHING;`;

    console.log(`Seeded new user: ${name}`);
  } catch (error) {
    cookies().set('register_failed', 'true', {
      expires: new Date(Date.now() + 10000),
      path: '/',
    });
    return {
      message: 'Database Error: Failed to Create New User.',
    };
  }
  return true;
}
const NewMessageForm = z.object({
  message: z.string(),
  sender_id: z.string(),
  recipient_id: z.string(),
  convo_id: z.string(),
});

async function checkConversationExists(
  sender_username: string,
  recipient_username: string,
) {
  const convo = await sql`
      SELECT id FROM conversations
      WHERE (user1_username = ${sender_username} AND user2_username = ${recipient_username})
      OR (user1_username = ${recipient_username} AND user2_username = ${sender_username});
  `;
  return convo.rows.length > 0 ? convo.rows[0].id : null;
}

async function createNewConversation(sender_id: string, recipient_id: string) {
  try {
    await sql`
    INSERT INTO conversations (user1_id, user2_id)
    VALUES (${sender_id}, ${recipient_id})
    ON CONFLICT (id) DO NOTHING;
`;
  } catch (error) {
    return {
      message: 'Failed to create new conversation due to a database error.',
    };
  }

  // Retrieve the new conversation ID
  const convo = await sql`
      SELECT id FROM conversations
      WHERE (user1_id = ${sender_id} AND user2_id = ${recipient_id})
      OR (user1_id = ${recipient_id} AND user2_id = ${sender_id});
  `;
  if (convo.rows.length === 0) {
    return {
      message: 'No conversation found with the specified participants.',
    };
  }
  return convo.rows[0].id;
}

export async function NewMessageWithConvoId(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = NewMessageForm.safeParse({
    message: formData.get('message'),
    sender_id: formData.get('sender_id'),
    recipient_id: formData.get('recipient_id'),
    convo_id: formData.get('convo_id'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Send Message.',
    };
  }
  const { message, sender_id, recipient_id, convo_id } = validatedFields.data;
  let new_convo_id = '';
  if (convo_id === 'make-new') {
    try {
      const freshconvoid = await createNewConversation(sender_id, recipient_id);
      new_convo_id = freshconvoid.toString();
    } catch (error) {
      return {
        message: 'Failed to create new conversation due to a database error.',
      };
    }

    console.log(new_convo_id);
    try {
      // Insert the message into the messages table
      await sql`
          INSERT INTO messages (conversation_id, user_id, text)
          VALUES (${new_convo_id}, ${sender_id}, ${message})
          ON CONFLICT (id) DO NOTHING;
      `;

      await sql`
        UPDATE conversations
        SET last_message_time = NOW()
        WHERE id = ${new_convo_id};
      `;

      console.log(
        `Seeded new message for convo: ${sender_id} and ${recipient_id}`,
      );
      // create search params to pass convo id to inbox page
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message:
          'Failed to either insert new message or update conversation last_message_time due to a database error.',
      };
    }
  } else {
    try {
      // Insert the message into the messages table
      await sql`
          INSERT INTO messages (conversation_id, user_id, text)
          VALUES (${convo_id}, ${sender_id}, ${message})
          ON CONFLICT (id) DO NOTHING;
      `;

      await sql`
        UPDATE conversations
        SET last_message_time = NOW()
        WHERE id = ${convo_id};
      `;

      console.log(
        `Seeded new message for convo: ${sender_id} and ${recipient_id}`,
      );

      // Revalidate the path and redirect
      // create search params to pass convo id to inbox page

      // Revalidate the path and redirect
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Failed to process new message due to a database error.',
      };
    }
  }
  const searchParams = new URLSearchParams();
  const convoPusher = pusher;

  if (new_convo_id) {
    searchParams.set('display_convo', new_convo_id);
    convoPusher.trigger(recipient_id, 'new-message', {
      message: new_convo_id,
    });
    revalidatePath('/dashboard/inbox');
    redirect(`/dashboard/inbox?${searchParams.toString()}`);
  } else {
    searchParams.set('display_convo', convo_id);
    convoPusher.trigger(recipient_id, 'new-message', {
      message: convo_id,
    });
    revalidatePath('/dashboard/inbox');
    redirect(`/dashboard/inbox?${searchParams.toString()}`);
    // redirect(`/dashboard/inbox?${searchParams.toString()}`);
  }
}

export async function DashboardNewMessageWithConvoId(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = NewMessageForm.safeParse({
    message: formData.get('message'),
    sender_id: formData.get('sender_id'),
    recipient_id: formData.get('recipient_id'),
    convo_id: formData.get('convo_id'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields or Invalid Input. Failed to Send Message.',
    };
  }
  const { message, sender_id, recipient_id, convo_id } = validatedFields.data;
  let new_convo_id = '';
  if (convo_id === 'make-new') {
    try {
      const freshconvoid = await createNewConversation(sender_id, recipient_id);
      new_convo_id = freshconvoid.toString();
    } catch (error) {
      return {
        message: 'Failed to create new conversation due to a database error.',
      };
    }

    console.log(new_convo_id);
    try {
      // Insert the message into the messages table
      await sql`
          INSERT INTO messages (conversation_id, user_id, text)
          VALUES (${new_convo_id}, ${sender_id}, ${message})
          ON CONFLICT (id) DO NOTHING;
      `;

      await sql`
        UPDATE conversations
        SET last_message_time = NOW()
        WHERE id = ${new_convo_id};
      `;

      console.log(
        `Seeded new message for convo: ${sender_id} and ${recipient_id}`,
      );
      // create search params to pass convo id to inbox page
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message:
          'Failed to either insert new message or update conversation last_message_time due to a database error.',
      };
    }
  } else {
    try {
      // Insert the message into the messages table
      await sql`
          INSERT INTO messages (conversation_id, user_id, text)
          VALUES (${convo_id}, ${sender_id}, ${message})
          ON CONFLICT (id) DO NOTHING;
      `;

      await sql`
        UPDATE conversations
        SET last_message_time = NOW()
        WHERE id = ${convo_id};
      `;

      console.log(
        `Seeded new message for convo: ${sender_id} and ${recipient_id}`,
      );

      // Revalidate the path and redirect
      // create search params to pass convo id to inbox page

      // Revalidate the path and redirect
    } catch (error) {
      console.error('Database Error:', error);
      return {
        message: 'Failed to process new message due to a database error.',
      };
    }
  }
  const searchParams = new URLSearchParams();
  if (new_convo_id) {
    searchParams.set('display_convo', new_convo_id);
    revalidatePath('/dashboard/inbox', 'page');
    redirect(`/dashboard/inbox?${searchParams.toString()}`);
  } else {
    searchParams.set('display_convo', convo_id);
    revalidatePath('/dashboard/inbox', 'page');
    redirect(`/dashboard/inbox?${searchParams.toString()}`);
    // redirect(`/dashboard/inbox?${searchParams.toString()}`);
  }
}

export async function updateEmailPrefs(prevState: any, formData: FormData) {
  noStore();
  const validatedFields = z
    .object({
      email: z.string().email(),
      marketing_enabled: z.enum(['true', 'false']),
      inbox_enabled: z.enum(['true', 'false']),
      courtupdates_enabled: z.enum(['true', 'false']),
    })
    .safeParse({
      email: formData.get('email'),
      marketing_enabled: formData.get('marketing_enabled'),
      inbox_enabled: formData.get('inbox_enabled'),
      courtupdates_enabled: formData.get('courtupdates_enabled'),
    });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Error submiting form due to invalid input type. Failed to Update Email Prefs.',
    };
  }
  const { email, marketing_enabled, inbox_enabled, courtupdates_enabled } =
    validatedFields.data;

  try {
    const session = await auth();
    if (!session?.user || session.user.email !== email)
      throw new Error(
        'unable to access user session data to update email prefs, you are not logged in',
      );
    await sql`
    UPDATE notifications
    SET marketing = ${marketing_enabled}, inbox = ${inbox_enabled}, court_updates = ${courtupdates_enabled}
    WHERE email = ${session.user.email};
  `;
  } catch (error) {
    return {
      message:
        'Database Error: Failed to update user email notification settings due to database error.',
    };
  }
  revalidatePath('/dashboard/settings');
  redirect('/dashboard/settings');
}
