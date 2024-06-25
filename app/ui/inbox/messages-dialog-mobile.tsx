'use client';
import { Dialog, Transition } from '@headlessui/react';
import { format, formatInTimeZone } from 'date-fns-tz';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import {
  ConvoData,
  DisplayCard,
  MessageData,
  SafeUser,
} from '@/app/lib/definitions';
import CardModal from '../user-card/message-card-modal';
import MessageForm from './message-form';
import { useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { set } from 'zod';
import Image from 'next/image';

export default function MessagesDialogModal({
  convo,
  messages,
  userData,
  otherUsername,
  otherUserId,
  otherUserImageUrl,
  otherUserCard,
  modalOpen,
  setModalState,
}: {
  convo: ConvoData;
  messages: MessageData[];
  userData: SafeUser;
  otherUsername: string;
  otherUserId: string;
  otherUserImageUrl: string;
  otherUserCard: DisplayCard;
  modalOpen: boolean;
  setModalState: (modalState: { [key: string]: boolean }) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // let [isOpen, setIsOpen] = useState(false);

  let mostRecentMessageDate = new Date(messages[0].send_time).getDate();
  const [sortedMessages, setSortedMessages] = useState<MessageData[]>(
    messages.slice().reverse(),
  );
  let [currentPage, setCurrentPage] = useState(1);
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
    scrollToBottom();
  }, [messages]);

  function closeModal() {
    const params = new URLSearchParams(searchParams);
    searchParams.forEach((value, key) => {
      if (key === 'display_convo') {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`);
    setModalState({ [convo.id]: false });
  }

  function openModal() {
    setModalState({ [convo.id]: true });
    const params = new URLSearchParams();
    params.set('display_convo', convo.id);
    replace(`${pathname}?${params.toString()}`);
    scrollToBottom();
  }

  return (
    <>
      <div className="absolute flex h-full w-full items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="z-20 flex h-full w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        ></button>
      </div>

      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10  xl:hidden "
          onClose={closeModal}
        >
          <div className=" fixed inset-0 h-full w-full bg-black/25 ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="fixed  flex h-full w-full flex-grow transform flex-col bg-white text-left align-middle  shadow-xl transition-all  md:right-4 md:top-16 md:h-[80vh] md:w-1/2 md:rounded-lg md:border-black xl:hidden">
                  <div
                    className="bg-highlight-green flex h-[88px] items-center border-b-0.5 px-4 py-8 md:rounded-t-lg"
                    key="test"
                  >
                    <button className="" onClick={closeModal}>
                      <ArrowLeftIcon className="mr-3 h-6 w-5 text-gray-800" />
                    </button>
                    <Image
                      src={otherUserImageUrl}
                      alt="profile"
                      height={40}
                      width={40}
                      className="mr-2 h-[40px] w-[40px] rounded-full "
                    />
                    <div className="flex h-full flex-col justify-center">
                      <Dialog.Title
                        as="h2"
                        className="text-sm font-bold antialiased tiny:text-base"
                      >
                        {otherUsername}
                      </Dialog.Title>
                      <p className="text-xs text-gray-500">
                        {otherUserCard.self_level.charAt(0).toUpperCase() +
                          otherUserCard.self_level.slice(1)}
                        {otherUserCard.tourn_level
                          ? ' | ' + otherUserCard.tourn_level
                          : ''}
                      </p>
                    </div>{' '}
                    <CardModal userCard={otherUserCard} />
                  </div>
                  <div
                    ref={messagesEndRef}
                    id="messages-display"
                    className=" flex h-[70%] w-full flex-grow flex-col justify-items-end space-y-2 overflow-x-hidden overflow-y-scroll border-b-0.5 p-4"
                  >
                    {sortedMessages.length > 5 && (
                      <div
                        className="mx-10 flex cursor-pointer  items-center justify-center border text-gray-400 shadow-sm"
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
                        <div className="w-full" key={message.message_id}>
                          {newDateFlag && (
                            <div
                              id="date-display"
                              className="flex items-center"
                            >
                              <div className="h-px flex-1 bg-gray-300"></div>
                              <span className="px-4 text-xs text-gray-400">
                                {format(messageTime, 'MMMM d, yyyy')}
                              </span>
                              <div className="h-px flex-1 bg-gray-300"></div>
                            </div>
                          )}
                          <div
                            className="my-2 flex min-h-[100px]"
                            key={message.message_id}
                          >
                            <Image
                              src={
                                otherUserFlag
                                  ? otherUserImageUrl
                                  : userData.image_url
                              }
                              alt="sender-avatar"
                              height={35}
                              width={35}
                              className="mr-4 h-[35px] w-[35px] rounded-full"
                            />
                            <div className="flex w-full flex-col space-y-2">
                              <h2 className="font-bold">
                                {otherUserFlag
                                  ? otherUsername
                                  : userData.username}
                              </h2>
                              <p className="w-[80%] break-words">
                                {message.text}
                              </p>
                              <span className="text-sm text-gray-400">
                                {format(messageTime, 'h:mm a')}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className=" bg-green-badge my-4 ">
                    <MessageForm
                      convo_id={convo.id}
                      user_id={userData.id}
                      other_user_id={otherUserId}
                      scrollBottom={scrollToBottom}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
