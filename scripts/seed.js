const { db } = require('@vercel/postgres');
const { cards, users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        complete_card BOOLEAN NOT NULL DEFAULT FALSE,
        image_url TEXT DEFAULT 'https://5cbe6vbaicwhoi1d.public.blob.vercel-storage.com/testuser1-cUgSi7mVAHKKJ3w3s4sm0tGlpBo816.jpg',        
        signup_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (name, username, email, password, complete_card)
        VALUES (${user.name}, ${user.username}, ${
          user.email
        }, ${hashedPassword}, ${user.complete_card ?? 'false'})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCards(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "cards" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS cards (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    image_url TEXT NOT NULL DEFAULT 'https://5cbe6vbaicwhoi1d.public.blob.vercel-storage.com/testuser1-cUgSi7mVAHKKJ3w3s4sm0tGlpBo816.jpg',
    about_player TEXT,
    self_level VARCHAR(50),
    years_xp NUMERIC,
    singles_play BOOLEAN DEFAULT FALSE,
    doubles_play BOOLEAN DEFAULT FALSE,
    open_play BOOLEAN DEFAULT FALSE,
    light_hitting BOOLEAN DEFAULT FALSE,
    training_drills BOOLEAN DEFAULT FALSE,
    tourn_level NUMERIC(3, 1),
    home_court VARCHAR(50),
    will_travel BOOLEAN DEFAULT FALSE,
    weather_cold BOOLEAN DEFAULT FALSE,
    weather_windy BOOLEAN DEFAULT FALSE,
    weekday_early_am BOOLEAN DEFAULT FALSE,
    weekday_late_am BOOLEAN DEFAULT FALSE,
    weekday_early_pm BOOLEAN DEFAULT FALSE,
    weekday_late_pm BOOLEAN DEFAULT FALSE,
    weekday_evening BOOLEAN DEFAULT FALSE,
    weekend_early_am BOOLEAN DEFAULT FALSE,
    weekend_late_am BOOLEAN DEFAULT FALSE,
    weekend_early_pm BOOLEAN DEFAULT FALSE,
    weekend_late_pm BOOLEAN DEFAULT FALSE,
    weekend_evening BOOLEAN DEFAULT FALSE,
    update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users (username)
  );
`;

    console.log(`Created "cards" table`);

    // Insert data into the "cards" table
    const insertedCards = await Promise.all(
      cards.map(
        (card) => client.sql`
        INSERT INTO cards (username, about_player, self_level, years_xp, singles_play, doubles_play, open_play, light_hitting, training_drills, tourn_level, home_court, will_travel, weather_cold, weather_windy, weekday_early_am, weekday_late_am, weekday_early_pm, weekday_late_pm, weekday_evening, weekend_early_am, weekend_late_am, weekend_early_pm, weekend_late_pm, weekend_evening)
        VALUES (${card.username}, ${card.about_player}, ${card.self_level}, ${card.years_xp}, ${card.singles_play}, ${card.doubles_play}, ${card.open_play}, ${card.light_hitting}, ${card.training_drills},  ${card.tourn_level}, ${card.home_court}, ${card.will_travel}, ${card.weather_cold}, ${card.weather_windy}, ${card.weekday_early_am}, ${card.weekday_late_am}, ${card.weekday_early_pm}, ${card.weekday_late_pm}, ${card.weekday_evening}, ${card.weekend_early_am}, ${card.weekend_late_am}, ${card.weekend_early_pm}, ${card.weekend_late_pm}, ${card.weekend_evening})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCards.length} cards`);

    return {
      createTable,
      cards: insertedCards,
    };
  } catch (error) {
    console.error('Error seeding cards:', error);
    throw error;
  }
}

async function seedConvoTest(client) {
  try {
    // Create one conversation in the conversation table
    const createConvo = await client.sql`
    INSERT INTO conversations (user1_id, user2_id)
    VALUES ('1763559b-ef3d-4134-87fd-269fea1b98ff', 'b85efd81-34ea-4aae-9f1a-119d50d9f4f8')
    ON CONFLICT (user1_id, user2_id) DO NOTHING;`;

    console.log(`Created "conversation"`);
  } catch (error) {
    console.error('Error seeding chat test:', error);
    throw error;
  }
}
async function seedMessagesTest(client) {
  try {
    const getConvoId = await client.sql`
    SELECT id FROM conversations
    WHERE user1_id = '1763559b-ef3d-4134-87fd-269fea1b98ff'
    AND user2_id = 'b85efd81-34ea-4aae-9f1a-119d50d9f4f8';`;

    const convoId = getConvoId.rows[0].id;
    const createMessage1 = await client.sql`
    INSERT INTO messages (conversation_id, user_id, text)
    VALUES (${convoId}, '1763559b-ef3d-4134-87fd-269fea1b98ff', 'Hello this is a big ol test. I hope it works')
    ON CONFLICT (id) DO NOTHING;`;

    const createMessage2 = await client.sql`
    INSERT INTO messages (conversation_id, user_id, text)
    VALUES (${convoId}, 'b85efd81-34ea-4aae-9f1a-119d50d9f4f8', 'Yeah same, hopefully it does work. I would be very happy if it did.')
    ON CONFLICT (id) DO NOTHING;`;

    console.log('Created two messages in the messages table');
  } catch (error) {
    console.error('Error seeding messages test:', error);
    throw error;
  }
}

// Create two messages in the messages table

async function seedConversations(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "conversations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user1_id UUID NOT NULL REFERENCES users(id),
        user2_id UUID NOT NULL REFERENCES users(id),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_message_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user1_id, user2_id)

      );
    `;

    console.log(`Created "conversations" table`);

    // Placeholder code to insert data (update as needed)
    // const insertedConversations = await Promise.all([
    //   client.sql`INSERT INTO conversations (user1_id, user2_id) VALUES ('uuid1', 'uuid2')`
    // ]);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding conversations:', error);
    throw error;
  }
}
async function seedMessages(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "messages" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        conversation_id UUID NOT NULL REFERENCES conversations(id),
        user_id UUID NOT NULL REFERENCES users(id),
        text TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "messages" table`);

    // Placeholder code to insert data (update as needed)
    // const insertedMessages = await Promise.all([
    //   client.sql`INSERT INTO messages (conversation_id, user_id, text) VALUES ('uuid', 'uuid', 'Message text')`
    // ]);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding messages:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedUsers(client);
  // await seedCards(client);
  // await seedConversations(client);
  // await seedMessages(client);
  // await seedConvoTest(client);
  await seedMessagesTest(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
