'use client';
import { Dialog, Transition } from '@headlessui/react';
import { toZonedTime, format, formatInTimeZone } from 'date-fns-tz';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';
import {
  UserIdGrab,
  ConvoData,
  MessageData,
  SafeUser,
} from '@/app/lib/definitions';

import UserSearch from './new-message-user-search';
import NewMessageConvoDisplay from './new-message-convoDisplay';
import NewMessageForm from './new-message-form';

export default function NewMessageDialog({
  convos,
  messages,
  userData,
  allUsers,
}: {
  convos: ConvoData[];
  messages: MessageData[];
  userData: SafeUser;
  allUsers: UserIdGrab[];
}) {
  let [isOpen, setIsOpen] = useState(false);
  let [selectedUser, setSelectedUser] = useState('');
  let [foundConvo, setFoundConvo] = useState<ConvoData | null>(null);
  let [foundMessages, setFoundMessages] = useState<MessageData[]>([]);
  function handleSelectedUser(user: { id: number; name: string }) {
    setSelectedUser(user.name);
    console.log('selected user: ', user);
    const foundConvo = convos.find((convo) => {
      // Specify the condition for finding a conversation that matches the criteria
      return (
        (convo.user1_username === userData.username &&
          convo.user2_username === user.name) ||
        (convo.user2_username === userData.username &&
          convo.user1_username === user.name)
      );
    });
    if (foundConvo) {
      console.log(foundConvo, 'convo exists~!');
      // display convo and messageform
      let relatedMessages = messages.filter(
        (message) => message.conversation_id === foundConvo.id,
      );
      setFoundConvo(foundConvo);
      setFoundMessages(relatedMessages);
    } else {
      console.log(foundConvo, 'convo does not exist~!');
      setFoundConvo(null);
      setFoundMessages([]);
    }
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedUser('');
    setFoundConvo(null);
    setFoundMessages([]);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [other_user_id, setOtherUserId] = useState('');
  useEffect(() => {
    if (selectedUser) {
      const otherUserId = allUsers.find(
        (user) => user.username === selectedUser,
      ) || { id: '' };
      setOtherUserId(otherUserId.id);
    }
  }, [selectedUser]);

  let displayNewMessageConvo =
    foundConvo && foundMessages.length > 0 ? true : false;
  return (
    <>
      <div className="absolute top-0 flex h-full w-full items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="z-20 flex h-full w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        ></button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 h-full w-full bg-black/25">
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
                <Dialog.Panel className=" fixed h-full w-full transform rounded-2xl  bg-white text-left align-middle shadow-xl transition-all md:right-4 md:top-24 md:h-[70%] md:w-[calc(100vw-20rem)] md:max-w-[500px]  ">
                  <div className="flex h-full w-full flex-col">
                    <div className="mt-4 flex h-[100px] flex-col  border-b-0.5 px-4">
                      <div className="flex w-full items-center justify-between">
                        <button
                          className="flex w-1/3 items-center"
                          onClick={closeModal}
                        >
                          <span className="text-gray-500">Cancel</span>
                        </button>
                        <h1 className="text-md font-bold text-gray-800 md:text-lg">
                          New message
                        </h1>
                        <div className="w-1/3"></div>
                      </div>
                      <div className="justify-left mb-4 mt-4 flex w-full items-center">
                        <span className=" mr-2 text-gray-500">To:</span>
                        <UserSearch
                          allUsers={allUsers}
                          handleSelectedUser={handleSelectedUser}
                        />
                      </div>
                    </div>

                    {displayNewMessageConvo && (
                      <NewMessageConvoDisplay
                        convo={foundConvo}
                        messages={foundMessages}
                        userData={userData}
                        closeModal={closeModal}
                      />
                    )}
                    {!displayNewMessageConvo && (
                      <div className="flex h-full w-full flex-col items-center justify-between py-2">
                        <div className="flex h-full w-full flex-col items-center justify-center border-b">
                          <span className="text-gray-500">
                            Start a new conversation
                          </span>
                        </div>
                        <div className="relative mb-4 mt-4 w-full flex-auto">
                          <NewMessageForm
                            convo_id="make-new"
                            user_id={userData.id}
                            other_user_id={other_user_id}
                            closeModal={closeModal}
                          />
                        </div>
                      </div>
                    )}
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
