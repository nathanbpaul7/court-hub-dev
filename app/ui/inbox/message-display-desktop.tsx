'use client';
import { format, formatInTimeZone } from 'date-fns-tz';

import { Fragment, useEffect, useState } from 'react';
import {
  ConvoData,
  DisplayCard,
  MessageData,
  SafeUser,
} from '@/app/lib/definitions';

import MessageForm from './message-form';
import { useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import CardModalDesktop from '../user-card/card-display-message-desktop';
import { set } from 'zod';
import Image from 'next/image';
import MessageFormDesktop from './message-form-desktop';

export default function MessagesDisplayDesktop({
  convo,
  messages,
  userData,
  otherUsername,
  otherUserId,
  otherUserImageUrl,
  otherUserCard,
}: {
  convo: ConvoData;
  messages: MessageData[];
  userData: SafeUser;
  otherUsername: string;
  otherUserId: string;
  otherUserImageUrl: string;
  otherUserCard: DisplayCard;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let mostRecentMessageDate = new Date(messages[0].send_time).getDate();
  let [currentPage, setCurrentPage] = useState(1);
  let [sortedMessages, setSortedMessages] = useState<MessageData[]>(
    messages.slice().reverse(),
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (currentPage === 1) {
      return;
    }
    const fetchData = async () => {
      const response = await fetch('/api/convos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ convo_id: convo.id, page: currentPage }),
      });
      if (response.ok) {
        const data = (await response.json()) as MessageData[];
        const reverseData = data.reverse();
        setSortedMessages([...reverseData, ...sortedMessages]);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleViewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  };

  useEffect(() => {
    setSortedMessages(messages.slice().reverse());
    setTimeout(scrollToBottom, 100);
  }, [messages]);

  return (
    <div className="relative ml-4 flex h-full w-full flex-col bg-white">
      <div
        className=" mb-2 flex h-[88px] items-center border-b-2 border-gray-300  px-4 py-8"
        key="header"
      >
        <Image
          src={otherUserImageUrl}
          height={40}
          width={40}
          alt="profile"
          className="mr-2 h-[40px] w-[40px] rounded-full "
        />
        <div className="flex h-full flex-col justify-center">
          <h2 className="text-md font-bold antialiased">{otherUsername}</h2>
          <p className="text-xs text-gray-500">
            {otherUserCard.self_level.charAt(0).toUpperCase() +
              otherUserCard.self_level.slice(1)}
            {otherUserCard.tourn_level ? ' | ' + otherUserCard.tourn_level : ''}
          </p>
        </div>{' '}
        <CardModalDesktop userCard={otherUserCard} />
      </div>
      <div
        ref={messagesEndRef}
        id="messages-display"
        className=" flex h-[100vh] w-full flex-col justify-items-end space-y-2 overflow-x-hidden overflow-y-scroll border-b-2 border-gray-300 "
      >
        {sortedMessages.length > 5 && (
          <div
            className="mx-10 mt-4 flex cursor-pointer  items-center justify-center border text-gray-400 shadow-sm"
            onClick={handleViewMore}
          >
            <span className="p-2 text-xs">view older messages</span>
          </div>
        )}
        {sortedMessages.map((message: MessageData) => {
          let newDateFlag = false;
          let otherUserFlag = false;

          const messageTime = new Date(message.send_time);

          if (messageTime.getDate() !== mostRecentMessageDate) {
            mostRecentMessageDate = messageTime.getDate();
            newDateFlag = true;
          } else {
            newDateFlag = false;
          }
          if (message.user_id !== userData.id) {
            otherUserFlag = true;
          } else {
            otherUserFlag = false;
          }

          return (
            <div className="" key={message.message_id}>
              {newDateFlag && (
                <div id="date-display" className="flex items-center">
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <span className="px-4 text-xs text-gray-400">
                    {format(messageTime, 'MMMM d, yyyy')}
                  </span>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
              )}
              <div className="my-2 flex min-h-[100px]" key={message.message_id}>
                <Image
                  src={otherUserFlag ? otherUserImageUrl : userData.image_url}
                  alt="sender-avatar"
                  height={35}
                  width={35}
                  className="mr-4 h-[35px] w-[35px] rounded-full"
                />
                <div className="flex w-full flex-col space-y-2">
                  <h2 className="font-bold">
                    {otherUserFlag ? otherUsername : userData.username}
                  </h2>
                  <p className="w-[80%] break-words">{message.text}</p>
                  <span className="text-sm text-gray-400">
                    {format(messageTime, 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" mt-4 h-full w-full">
        <MessageFormDesktop
          convo_id={convo.id}
          user_id={userData.id}
          other_user_id={otherUserId}
          scrollBottom={scrollToBottom}
        />
      </div>
    </div>
  );
}
