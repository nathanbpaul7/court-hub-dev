// src/lib/pusherClient.ts
import PusherClient from 'pusher-js';

// Allows you to use Pusher inside Next.js "use client" components.
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'us2', // Change with your cluster region.
  },
);
