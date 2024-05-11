import { sql } from '@vercel/postgres';
import { cookies } from 'next/headers';
import {
  User,
  DisplayCard,
  SafeUser,
  UserCheck,
  ConvoData,
  MessageData,
  UserIdGrab,
  AllUsersWithId,
} from './definitions';
import { unstable_noStore as noStore, unstable_cache } from 'next/cache';
import { auth } from '@/auth';

export async function fetchCardsByKeyword(keyword: string) {
  noStore();
  try {
    const cards = await sql<DisplayCard>`
      SELECT 
        cards.username,
        cards.image_url,
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
        weekend_evening
      FROM cards JOIN users ON cards.username = users.username 
      WHERE 
      about_player ILIKE ${`%${keyword}%`} OR 
      users.username ILIKE ${`%${keyword}%`} or 
      users.email ILIKE ${`%${keyword}%`} or 
      users.name ILIKE ${`%${keyword}%`}`;
    console.log(cards.rows);
    return cards.rows as DisplayCard[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch player card search results.');
  }
}

export async function fetchAllCards() {
  noStore();
  try {
    const cards = await sql<DisplayCard>`
      SELECT 
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
        weekend_evening
      FROM cards`;
    return cards.rows as DisplayCard[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all cards.');
  }
}

export async function fetchSafeUser() {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be logged in to fetch card');
    const user =
      await sql<SafeUser>`SELECT name, username, email, complete_card, image_url, id FROM users WHERE email=${session.user.email}`;
    const userData = user.rows[0];
    return userData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchExistingUsers() {
  noStore();
  try {
    const user = await sql<UserCheck>`
      SELECT username, email FROM users`;
    const usernames = user.rows.map((row) => row.username);
    const emails = user.rows.map((row) => row.email);
    return { usernames, emails };
  } catch (error) {
    console.error('Database Error:', error);
    return { usernames: [], emails: [] };
  }
}
export async function fetchAllUsersWithId() {
  noStore();
  try {
    const user = await sql<UserIdGrab>`
      SELECT username, id FROM users`;
    if (!user) throw new Error('No users found');

    return user.rows as UserIdGrab[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all users with ID.');
  }
}

export async function fetchUserCardData() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delayed a response for demo purposes.
    // DELETE this in production :)

    // console.log('Fetching card data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const session = await auth();
    if (!session?.user)
      throw new Error('unable to access user session data to fetch card');
    // console.log(session);
    const card = await sql<DisplayCard>`
      SELECT 
      cards.username,
      cards.image_url, 
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
      weekend_evening
      FROM cards JOIN users ON cards.username = users.username WHERE email = ${session.user.email}`;

    // console.log('Data fetch completed');
    // console.log(card.rows[0]);
    return card.rows[0] as DisplayCard;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user card data.');
  }
}

export async function fetchCardDataById(id: string) {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delayed a response for demo purposes.
    // DELETE this in production :)

    // console.log('Fetching card data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const card = await sql<DisplayCard>`
      SELECT 
      cards.username,
      cards.image_url, 
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
      weekend_evening
      FROM cards JOIN users ON cards.username = users.username WHERE users.id = ${id}`;

    // console.log('Data fetch completed');
    // console.log(card.rows[0]);
    return card.rows[0] as DisplayCard;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user card data by ID.');
  }
}
export async function fetchMultCardDataById(ids: string[]) {
  try {
    const query = `
      SELECT 
      cards.username,
      cards.image_url, 
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
      weekend_evening
      FROM cards JOIN users ON cards.username = users.username WHERE users.id = ANY($1);`;
    const cards = await sql.query(query, [ids]);

    // console.log('Data fetch completed');
    // console.log(card.rows[0]);
    return cards.rows as DisplayCard[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch multiple user cards by ID.');
  }
}
const ITEMS_PER_PAGE = 10;

export async function fetchUserConvos(userData: SafeUser, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const convos = await sql`
    SELECT
    conv.id,
    conv.user1_id,
    user1.username AS user1_username,
    user1.image_url AS user1_image_url,
    conv.user2_id,
    user2.username AS user2_username,
    user2.image_url AS user2_image_url,
    conv.last_message_time AT TIME ZONE 'UTC' AS last_message_time
    FROM
    conversations conv
    JOIN
    users user1 ON conv.user1_id = user1.id
    JOIN
    users user2 ON conv.user2_id = user2.id
    WHERE
    conv.user1_id = ${userData.id} OR conv.user2_id = ${userData.id}
    ORDER BY last_message_time DESC;
`;
    const convoIds = convos.rows.map((convo) => convo.id);
    const query = `WITH ranked_messages AS (
      SELECT
        id AS message_id,
        conversation_id,
        user_id,
        text,
        created_at,
        ROW_NUMBER() OVER (PARTITION BY conversation_id ORDER BY created_at DESC) AS row_number
      FROM
        messages
      WHERE
        conversation_id = ANY($1)
    )
    SELECT
      message_id,
      conversation_id,
      user_id,
      text,
      created_at AT TIME ZONE 'UTC' AS send_time
    FROM
      ranked_messages
    WHERE
      row_number <= 10
    ORDER BY conversation_id, send_time DESC;
    `;

    const messages = await sql.query(query, [convoIds]);
    return {
      convos: convos.rows as ConvoData[],
      messages: messages.rows as MessageData[],
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user conversations.');
  }
}

export async function fetchConvoByIdandPage(
  convoId: string,
  currentPage: number,
) {
  noStore();
  try {
    const session = await auth();
    if (!session?.user)
      throw new Error('unable to access user session data to fetch card');
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const messages = await sql<MessageData>`SELECT
    id AS message_id,
    conversation_id,
    user_id,
    text,
    created_at AT TIME ZONE 'UTC' AS send_time
  FROM
    messages
  WHERE
    conversation_id = ${convoId}
  ORDER BY send_time DESC
  LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}

  ;`;

    return messages.rows as MessageData[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch conversation.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
