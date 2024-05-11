'use client';
import {
  ConvoData,
  MessageData,
  SafeUser,
  DisplayCard,
} from '@/app/lib/definitions';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import MessagesDialogModal from './messages-dialog-mobile';
import { useState, useEffect } from 'react';

interface ModalStateTracking {
  [key: string]: boolean;
}

export default function ConversationsTogetherMobile({
  convos,
  messages,
  userData,
  modalOpenById,
  otherUserCards,
}: {
  convos: ConvoData[];
  messages: MessageData[];
  userData: SafeUser;
  modalOpenById?: string;
  otherUserCards: DisplayCard[];
}) {
  const [modalState, setModalState] = useState<ModalStateTracking>({}); // track which modals are open

  // set modal state based on props from page in case of new message flow or breakpoint transition
  useEffect(() => {
    const newModalState = { ...modalState };
    convos.forEach((convo) => {
      newModalState[convo.id] =
        modalOpenById === convo.id || modalState[convo.id];
    });
    setModalState(newModalState);
  }, [modalOpenById, convos, messages]);

  return (
    <>
      {convos.map((convo) => {
        const relatedMessages = messages.filter(
          // look through messages data and find any that match this specific convo's id
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
        const otherUserMessages = relatedMessages.filter(
          (message) => message.user_id !== userData.id,
        );
        otherUserMessages.sort(
          (a, b) =>
            new Date(b.send_time).getTime() - new Date(a.send_time).getTime(),
        );
        const mostRecentMessage = relatedMessages[0]?.text;
        const firstSentence = mostRecentMessage
          ?.split('. ')[0]
          .substring(0, 30);
        const otherUserCard = otherUserCards.find(
          (card) => card.username === otherUsername,
        );
        if (otherUserCard === undefined) {
          throw Error('Card data for conversation display not found');
        }

        return (
          <div
            key={convo.id}
            id="popover parent"
            className="relative flex max-w-[500px] items-center rounded-md border-blue-600 text-lg"
          >
            <MessagesDialogModal
              key={convo.id}
              convo={convo}
              userData={userData}
              messages={relatedMessages}
              otherUsername={otherUsername}
              otherUserId={otherUserId}
              otherUserImageUrl={otherUserImageUrl}
              otherUserCard={otherUserCard}
              modalOpen={modalState[convo.id] || false}
              setModalState={setModalState}
            />
            <img
              src={otherUserImageUrl}
              alt="profile"
              className="h-[60px] w-[60px] rounded-full "
            />
            <div className="ml-4 flex w-full flex-col justify-center gap-0.5">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold antialiased">
                  {otherUsername}
                </span>

                <span className="text-xs">
                  {new Date(messages[0].send_time).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <span className="text-sm text-gray-800">{firstSentence}...</span>
            </div>
            <div className="ml-4">
              <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        );
      })}
    </>
  );
}
