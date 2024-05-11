'use client';
import {
  ConvoData,
  MessageData,
  SafeUser,
  DisplayCard,
} from '@/app/lib/definitions';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import { useState, useEffect } from 'react';
import { set } from 'zod';
import MessagesDisplayDesktop from './message-display-desktop';
import clsx from 'clsx';

interface CurrentChatData {
  convo?: ConvoData;
  messages?: MessageData[];
  userData?: SafeUser;
  otherUserId?: string;
  otherUsername?: string;
  otherUserImageUrl?: string;
  otherUserCard?: DisplayCard;
  convo_loaded?: boolean;
}

interface AllChatData {
  [key: string]: CurrentChatData;
}

export default function ConversationsTogetherDesktop({
  convos,
  messages,
  userData,
  chatOpenById,
  otherUserCards,
}: {
  convos: ConvoData[];
  messages: MessageData[];
  userData: SafeUser;
  chatOpenById?: string;
  otherUserCards: DisplayCard[];
}) {
  // console.log('openChat', chatOpenById);
  const [allMessageDisplayData, setAllMessageDisplayData] =
    useState<AllChatData>({}); // track data for currently displayed convo
  const [selectedConvo, setSelectedConvo] = useState<string>(convos[0].id); // track which convo is selected
  const [convosLoaded, setConvosLoaded] = useState<boolean>(false); // track if all convos have been loaded
  useEffect(() => {
    if (chatOpenById) setSelectedConvo(chatOpenById);
    convos.forEach((convo) => {
      const relatedMessages = messages.filter(
        (message) => message.conversation_id === convo.id,
      );
      const filterSenderData = () => {
        if (convo.user1_id === userData.id) {
          return {
            otherUserId: convo.user2_id,
            otherUsername: convo.user2_username,
            otherUserImageUrl: convo.user2_image_url,
          };
        } else {
          return {
            otherUserId: convo.user1_id,
            otherUsername: convo.user1_username,
            otherUserImageUrl: convo.user1_image_url,
          };
        }
      };
      const { otherUserId, otherUsername, otherUserImageUrl } =
        filterSenderData();
      const otherUserCard = otherUserCards.find(
        (card) => card.username === otherUsername,
      );

      setAllMessageDisplayData((prev) => ({
        ...prev,
        [convo.id]: {
          convo: convo,
          messages: relatedMessages,
          userData: userData,
          otherUserId: otherUserId,
          otherUsername: otherUsername,
          otherUserImageUrl: otherUserImageUrl,
          otherUserCard: otherUserCard,
          convo_loaded: true,
        },
      }));
    });
    setConvosLoaded(true);
  }, [chatOpenById, convos, messages]);

  return (
    <>
      {convosLoaded && (
        <div className="flex w-full justify-between  ">
          <div className="flex w-1/3 flex-col pr-4">
            {convos.map((convo) => {
              if (allMessageDisplayData[convo.id]?.convo_loaded) {
                const relatedMessages =
                  allMessageDisplayData[convo.id]?.messages;
                if (!relatedMessages) return null;

                const { otherUsername, otherUserImageUrl } =
                  allMessageDisplayData[convo.id];
                const otherUserMessages = relatedMessages?.filter(
                  (message) => message.user_id !== userData.id,
                );
                otherUserMessages?.sort(
                  (a, b) =>
                    new Date(b.send_time).getTime() -
                    new Date(a.send_time).getTime(),
                );
                const mostRecentMessage = relatedMessages[0]?.text;
                const firstSentence = mostRecentMessage
                  ?.split('. ')[0]
                  .substring(0, 30);
                return (
                  <div
                    key={convo.id}
                    id={convo.id}
                    className={clsx(
                      'relative flex items-center rounded-md  border-blue-600 px-4 py-4 text-lg',
                      {
                        'border-l-4 bg-green-100': convo.id === selectedConvo,
                      },
                    )}
                  >
                    <button
                      className="absolute left-0 top-0 h-full w-full rounded-md "
                      onClick={() => setSelectedConvo(convo.id)}
                    />
                    <img
                      src={otherUserImageUrl}
                      alt="profile"
                      className="h-[60px] w-[60px]  flex-shrink rounded-full "
                    />
                    <div className="ml-4 flex w-full flex-grow flex-col justify-center gap-0.5">
                      <div className="flex items-center justify-between">
                        <span className="mr-2 text-base font-semibold antialiased">
                          {otherUsername}
                        </span>

                        <span className="whitespace-nowrap text-xs">
                          {new Date(
                            relatedMessages[0].send_time,
                          ).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <span className="text-sm text-gray-800">
                        {firstSentence}...
                      </span>
                    </div>
                    <div className="ml-4">
                      <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            id="message-display"
            className=" ml-4 flex w-2/3 overflow-y-hidden border-l-2 border-gray-200 border-gray-300  bg-white pl-4"
          >
            {convos.map((convo) => {
              if (
                selectedConvo === convo.id &&
                allMessageDisplayData[convo.id].convo_loaded
              ) {
                return (
                  <MessagesDisplayDesktop
                    key={convo.id}
                    convo={convo}
                    messages={allMessageDisplayData[convo.id].messages!}
                    userData={allMessageDisplayData[convo.id].userData!}
                    otherUsername={
                      allMessageDisplayData[convo.id].otherUsername!
                    }
                    otherUserId={allMessageDisplayData[convo.id].otherUserId!}
                    otherUserImageUrl={
                      allMessageDisplayData[convo.id].otherUserImageUrl!
                    }
                    otherUserCard={
                      allMessageDisplayData[convo.id].otherUserCard!
                    }
                  />
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}
