import {
  fetchSafeUser,
  fetchUserConvos,
  fetchExistingUsers,
  fetchAllUsersWithId,
  fetchCardDataById,
  fetchMultCardDataById,
} from '@/app/lib/data';
import { AllUsersWithId, ConvoData, MessageData } from '@/app/lib/definitions';
import ConversationsTogetherDesktop from '@/app/ui/inbox/conversation-together-desktop';
import ConversationsTogetherMobile from '@/app/ui/inbox/conversation-together-mobile';

import NewMessageDialog from '@/app/ui/inbox/new-message-dialog-mobile';
import { ConvoSkeleton } from '@/app/ui/new-skeletons';
import Search from '@/app/ui/search';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    display_convo?: string;
    new_message?: string;
  };
}) {
  // check if any search parms determine how to filter conversation display
  const query = searchParams?.query || '';
  const display_convo = searchParams?.display_convo || '';
  let display_convo_id = '';
  let flaggedConvoNewMessage = '';
  let newMessage = searchParams?.new_message || '';
  if (newMessage) {
    flaggedConvoNewMessage = newMessage;
  }
  if (display_convo) {
    // console.log('display_convo:', display_convo);
    display_convo_id = display_convo;
  }

  let searchFlag = false;
  let searchFlagNone = false;
  if (query) {
    searchFlag = true;
  }
  // fetch current user data
  const userData = await fetchSafeUser();
  if (!userData)
    throw new Error('unable to access user session data to fetch card');
  // fetch all users data for populating new message autocomplete and search functionality
  const allUsersData = await fetchAllUsersWithId();
  if (!allUsersData) {
    throw new Error(
      'unable to access database to fetch info about other users for fetching convo data',
    );
  }
  const allUsers = allUsersData.filter((user) => user.id !== userData.id);
  // fetch all converstaion and message data for current user.
  const { convos, messages } = await fetchUserConvos(userData, 1);
  // if none available, display new user inbox welcome page
  if (convos.length === 0) {
    return (
      <div className="flex h-full w-full max-w-2xl flex-col overflow-hidden px-4">
        <div className=" mb-4 mt-2 flex items-center justify-between">
          <h1 className=" text-lg font-bold text-gray-800 md:text-2xl">
            Inbox
          </h1>
          <div className="relative ml-2 p-2 ">
            <PencilSquareIcon className="h-6 w-6 text-blue-600" />
            <NewMessageDialog
              userData={userData}
              convos={convos}
              messages={messages}
              allUsers={allUsers}
            />
          </div>
        </div>
        <div className="my-4 flex w-full justify-center">
          <ConvoSkeleton />
        </div>
        <div className="relative mt-4 flex justify-center">
          <span className="bg-green-logo hover:text-highlight-green mb-4 whitespace-nowrap rounded-lg px-16 py-2 text-sm font-medium  text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Draft new message
            <NewMessageDialog
              userData={userData}
              convos={convos}
              messages={messages}
              allUsers={allUsers}
            />
          </span>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <p className="pl-2 text-left ">
            It looks like you don&apos;t have any messages yet. You can draft a
            new message to connect with other players here or while browsing the{' '}
            <Link className="text-blue-600 underline" href="/dashboard">
              player directory
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }
  // else display inbox with messages, fetch card data for any users that are in conversations with current user
  const otherUserIds = convos.map((convo) =>
    convo.user1_id === userData.id ? convo.user2_id : convo.user1_id,
  );
  const otherUserCards = await fetchMultCardDataById(otherUserIds);
  if (otherUserCards === undefined) {
    throw new Error('Card data for conversation display not found');
  }

  // if there are search params in the url, filter the conversation data to only show the relevant conversations
  let searchedConvos = convos;
  if (searchFlag) {
    searchedConvos = convos.filter(
      (convo) =>
        convo.user2_username.toLowerCase().includes(query.toLowerCase()) ||
        convo.user1_username.toLowerCase().includes(query.toLowerCase()),
    );
    if (searchedConvos.length === 0) {
      searchFlagNone = true;
    }
  }

  // console.log(convos);
  // console.log(messages);
  return (
    <main className="flex w-full max-w-[1100px] flex-col justify-start gap-4 p-4  md:overflow-y-hidden ">
      <div className=" my-4 flex items-center justify-end  xl:w-full xl:max-w-none">
        <div className="flex w-full justify-between">
          <div className="flex-shrink-1 flex w-[375px]">
            <Search placeholder="Search by username" />
          </div>
          <div className="relative ml-2 p-2 ">
            <PencilSquareIcon className="h-6 w-6 text-blue-600" />
            <NewMessageDialog
              userData={userData}
              convos={convos}
              messages={messages}
              allUsers={allUsers}
            />
          </div>
        </div>
      </div>
      <div
        id="conversations-desktop"
        className=" hidden w-full flex-col gap-4 overflow-y-hidden xl:flex xl:h-auto"
      >
        {!searchFlagNone && (
          <ConversationsTogetherDesktop
            convos={searchedConvos}
            messages={messages}
            userData={userData}
            otherUserCards={otherUserCards}
            chatOpenById={display_convo_id}
          />
        )}
        {searchFlagNone && (
          <div className="relative flex flex-col items-center rounded-md p-4">
            <span className="absolute top-10">No conversations found</span>
          </div>
        )}
      </div>
      <div
        id=" conversations-mobile"
        className="flex w-full flex-col gap-4  xl:hidden"
      >
        {!searchFlagNone && (
          <ConversationsTogetherMobile
            convos={searchedConvos}
            messages={messages}
            userData={userData}
            otherUserCards={otherUserCards}
            modalOpenById={display_convo_id}
          />
        )}
        {searchFlagNone && (
          <div className="relative flex flex-col items-center rounded-md p-4">
            <span className="absolute top-10 text-blue-600">
              No conversations found
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
