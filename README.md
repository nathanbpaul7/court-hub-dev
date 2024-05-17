# Court Hub

#### [Video Demo](https://youtu.be/L8z1IkTxs5w)

## Description:

Court Hub is a web app designed to foster relationships between tennis players at public tennis courts across Philadelphia.

Currently, there are multiple web apps that purport to plug players into Philadelphia tennis communities, but these options require users to pay a monthly fee to access their network. Additionally, these apps tend to create competitive atmospheres centered around tournament and league play, rather than more casual, social tennis activity. 

Court Hub helps players browse for other individuals who share availability, proximity to a given court, or level / preferred style of play. The app addresses the challenge many tennis enthusiasts face in finding compatible hitting partners whose schedules match their own by making it easy to specify user preferences, and then search or filter by them. Court Hub essentially provides a locally cached social network or directory for each court location, and simplifies the process of discovering and connecting with other players.

## Features:

**Registration**: New users can fill out a registration form to create an account on Court Hub using either email and password credentials, or Google OAuth. The data is validated server-side using ZOD and form state object and status are passed back to the client/browser. There is also some client-side real-time feedback to prevent submitting emails that already are associated with users.

- I used credentials during local development simply for ease of testing/use. With an eye towards actually deploying the app, I investigated how to wire up OAuth using Next-Auth to simplify the process and create a more secure, trustworthy experience where users can register and log in through a separate provider like Google (others like Apple were behind a paywall, so I didn’t implement them in this project).

**Player Card Directory / Dashboard**: The core feature of Court Hub, the dashboard player card directory is where users can browse and filter through other players at their court or nearby courts. The player card data object enables users to create personalized profiles detailing their tennis experience, playing preferences, availability, and willingness to travel. These cards serve as a comprehensive snapshot of each user, facilitating effective matchmaking based on various criteria. Card data is stored in a PostgreSQL database hosted by Vercel.

- I chose this SQL relational database for its ability to handle more complex sorting while fetching card data, and perhaps more importantly, because this database offered built-in integration to Vercel project management. I explored using MongoDB for its less complicated querying, object-based storage, but decided to stick with SQL for now because of the ease of use with Vercel.

**Messaging**: Court Hub offers a real-time chat feature that allows users to initiate one-on-one conversations with potential playing partners. Users can seamlessly communicate, coordinate, and schedule matches directly within the platform as they see fit.

- This feature felt like the biggest challenge in my project because it presented a number of user flows to account for (new message, searching for pre-existing convos, real-time data validation across user sessions) that needed separate data fetching/seeding to accommodate. I achieved real-time chat updates by leveraging a WebSocket library/app called Pusher.js. Message data and conversation data are stored in my PostgreSQL database. Because some of the chat features are ‘client-side only’ (a Next.js app router requirement for Headless UI modals and the like), I needed to use an API route to fetch more data from the client-component.

**Court Information**: Beyond player profiles, Court Hub provides essential information about local tennis courts, including location, amenities, availability, and seasonal availability notes. This comprehensive overview helps users make informed decisions about where and when to play, maximizing their court experience.

- This feature includes some fun client–side javascript to create a dynamic clickable map for selecting which court to view info about.

**Search and Filtering**: The Player Directory in Court Hub is searchable and filterable, allowing users to discover potential playing partners based on specific criteria such as skill level, availability, and preferred playing style. Advanced filtering options and URL search parameters enable users to revisit search results and track their browsing history effectively.

- This feature was initially challenging because I wanted the filter to exist inside a focus ‘portal’ or dropdown menu provided by Headless UI. This component, when using React and Next JS for DOM management, was forced to be ‘client-only’. In order to pass relevant filter data to a server-side action, I needed to familiarize myself with using URL search parameters to pass data around.

**Edit Player Card**: Users have the flexibility to edit their player card at any time, enabling them to update the information they share with other Court Hub users. Whether it's adjusting availability, updating playing preferences, or refining their bio, users can easily manage their profile to ensure accurate and up-to-date representation within the community.

## Tech Stack:

Court Hub is built using a range of technologies and frameworks, to which this developer is eternally grateful for the thorough documentation and learning resources! These include:

- **Next.js**: Leveraged for building responsive React components and providing server-side rendering capabilities, enabling a responsive and performant web application. Big shout out to the Next.js Dashboard App Tutorial, which was a huge learning resource for me as I began this project. Much of the data fetching and validation logic was based on their implementation in the tutorial.
- **Tailwind CSS**: Used for styling components with utility classes, facilitating rapid development and customization of UI elements.
- **NextAuth.js**: Implemented for authentication and authorization purposes, providing secure login/logout functionality and protecting routes from unauthorized access.
- **Pusher.js**: Utilized for real-time chat features, enabling instant messaging between users and ensuring seamless communication.
- **PostgreSQL**: Employed for data storage and management, storing user profiles, messages, and other application data securely.
- **Vercel**: Chosen as the hosting platform for deploying the application, providing PostgreSQL database and Blob storage integration for seamless deployment and scalability.
- **Other Libraries and Frameworks**: Headless UI for modal and dropdown components, Hero-Icons for SVG assets, Cropper.js for avatar uploads, CLSX for conditional CSS styling, ZOD for data validation, Date-Fns for date object formatting, and BCrypt for encryption of sensitive data.

## Getting Started (user flow on app):

To explore Court Hub and start connecting with fellow tennis enthusiasts, follow these steps:

1. Visit the Court Hub website and register for an account using either email and password credentials or Google OAuth authentication.
2. Upon registration, complete your player card by providing information about your tennis experience, preferences, and availability.
3. Browse the Player Directory to discover potential playing partners based on your criteria. Utilize the search and filtering options to narrow down your choices effectively.
4. Initiate conversations with other users via the messaging feature to coordinate matches and schedule playing sessions.
5. Stay updated on local court information and availability to plan your matches efficiently and make the most of your court time.

## Future Implementations:

In future versions of Court Hub, the following features are under consideration for implementation:

- **Group Chat Functionality**: Introduce group chat capabilities to facilitate broader discussions and coordination among multiple users, enhancing community engagement and interaction.
- **User Feedback**: Incorporate more user feedback in which courts are included in the app, what info is shared about each court, updates to that info, and perhaps more info about activity at court locations between Court Hub members.
- **Nudge/Poke Feature**: Implement a feature for users to send friendly nudges or pokes to potential playing partners, signaling interest in connecting or playing together. This feature aims to streamline communication and encourage spontaneous match arrangements.
- **Suggested Action Features**: Provide suggested action prompts within the Player Directory, such as "Play Singles Tonight" or "Play Doubles on Weekend Morning," to guide users towards relevant match opportunities based on their preferences and availability.
- **AI Integration**: Explore integrating AI capabilities into Court Hub to enhance user experience and streamline feature navigation. AI-powered assistance could include natural language processing for voice commands and personalized match recommendations based on user preferences.
- **Enhanced API integration**: If there is a way to create some way to create financial viability, it would be awesome to bring in some weather API’s to share current court conditions.

## Contributors:

Court Hub is developed and maintained by Nathan Paul. Major thanks are in order to two key collaborators:

- **Mina Shakarshy** - UX/UI Design - Mina offered her incredible product design skills to this project, helping me create more accessible and stylish data displays/user flows. Her wisdom around how to create a responsive mobile/desktop user experience was invaluable throughout the process. [Mina's Portfolio](https://www.mshakdesign.com/resume)
- **Ryan Gray** - Graphic Design - Ryan graciously offered up his logo designing super powers to create the Court Hub logo and various svg/png assets to display it across the site. [Ryan's Portfolio](https://ryancgray.com/about)
