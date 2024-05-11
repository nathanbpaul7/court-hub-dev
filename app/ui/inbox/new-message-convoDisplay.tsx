import { format } from 'date-fns';
import { useState, useRef } from 'react';
import { ConvoData, MessageData, SafeUser } from '@/app/lib/definitions';
import NewMessageForm from './new-message-form';
import { useEffect } from 'react';

export default function NewMessageConvoDisplay({
  convo,
  messages,
  userData,
  closeModal,
}: {
  convo: ConvoData;
  messages: MessageData[];
  userData: SafeUser;
  closeModal: () => void;
}) {
  const otherUserId =
    userData.id === convo.user1_id ? convo.user2_id : convo.user1_id;
  const otherUserImageUrl =
    userData.id === convo.user1_id
      ? convo.user2_image_url
      : convo.user1_image_url;
  const otherUsername =
    userData.id === convo.user1_id
      ? convo.user2_username
      : convo.user1_username;
  let sortedMessages = messages.slice().reverse();
  let mostRecentMessageDate = new Date(messages[0].send_time).getDate();
  let [currentPage, setCurrentPage] = useState(1);
  let [moreMessages, setMoreMessages] = useState<MessageData[]>([]);
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
        setMoreMessages([...data, ...moreMessages]);
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

  return (
    <>
      <div
        ref={messagesEndRef}
        id="messages-display"
        className=" flex h-full w-full flex-grow flex-col justify-items-end space-y-2 overflow-y-scroll border-b-0.5 p-4"
      >
        {moreMessages.length > 0 && (
          <div
            className="mx-10 flex cursor-pointer items-center justify-center border text-gray-400 shadow-sm"
            onClick={handleViewMore}
          >
            <span className="p-2 text-xs">view older messages</span>
          </div>
        )}
        {moreMessages.map((message: MessageData) => {
          if (moreMessages.length === 0) {
            return undefined;
          }
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
            <div key={message.message_id}>
              {newDateFlag && (
                <div id="date-display" className="flex items-center">
                  <div className="h-px flex-1 bg-gray-300"></div>
                  <span className="px-4 text-xs text-gray-400">
                    {format(messageTime, 'MMMM d, yyyy')}
                  </span>
                  <div className="h-px flex-1 bg-gray-300"></div>
                </div>
              )}
              <div className="my-1 flex min-h-[100px]" key={message.message_id}>
                <img
                  src={otherUserFlag ? otherUserImageUrl : userData.image_url}
                  alt="sender-avatar"
                  className="mr-4 h-[35px] w-[35px] rounded-full"
                />
                <div className="flex flex-col space-y-2 ">
                  <h2 className="font-bold">
                    {otherUserFlag ? otherUsername : userData.username}
                  </h2>
                  <p className="">{message.text}</p>
                  <span className="text-sm text-gray-400">
                    {format(messageTime, 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {sortedMessages.length > 5 && (
          <div
            className="mx-10 flex cursor-pointer items-center justify-center border text-gray-400 shadow-sm"
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
            <div key={message.message_id}>
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
                <img
                  src={otherUserFlag ? otherUserImageUrl : userData.image_url}
                  alt="sender-avatar"
                  className="mr-4 h-[35px] w-[35px] rounded-full"
                />
                <div className="flex flex-col space-y-2 ">
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

      <div className="mb-4 mt-4 w-full">
        <NewMessageForm
          convo_id={convo.id}
          user_id={userData.id}
          other_user_id={otherUserId}
          scrollBottom={scrollToBottom}
          closeModal={closeModal}
        />
      </div>
    </>
  );
}
