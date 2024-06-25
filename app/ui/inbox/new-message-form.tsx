'use client';

import { PaperAirplaneIcon as Paperoutline } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';

import React, { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { NewMessageWithConvoId } from '@/app/lib/actions';

function NewMessageForm({
  convo_id,
  user_id,
  other_user_id,
  scrollBottom,
  closeModal,
}: {
  convo_id: string;
  user_id: string;
  other_user_id: string;
  scrollBottom?: () => void;
  closeModal: () => void;
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(NewMessageWithConvoId, initialState);
  const [messageText, setMessageText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = () => {
    setMessageText('');
    closeModal();
  };
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.focus();
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, 0);
  }, [textAreaRef.current?.value]);

  return (
    <div className="flex flex-col">
      <form action={dispatch} onSubmit={handleSubmit} className="">
        <div className="flex flex-grow items-center justify-between overflow-y-hidden ">
          <input type="hidden" name="convo_id" id="convo_id" value={convo_id} />
          <input
            type="hidden"
            name="sender_id"
            id="sender_id"
            value={user_id}
          />
          <input
            type="hidden"
            name="recipient_id"
            id="recipient_id"
            value={other_user_id}
          />
          <input
            type="hidden"
            name="message"
            id="message"
            value={messageText}
          />
          <textarea
            ref={textAreaRef}
            placeholder="Type a message..."
            name="message-content"
            id="message-content"
            onKeyDown={handleKeyDown}
            rows={2}
            maxLength={500}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
              }
            }}
            value={messageText}
            className=" ml-8 h-full  w-[80%]  border-none p-2  focus:outline-white focus:ring-white"
          />

          <SubmitButton />
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="mr-8 rounded-md py-2 text-white focus:outline-none active:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      aria-disabled={pending}
      id="submit-button"
    >
      <div className="bg-green-logo flex rounded-full p-2">
        <Paperoutline className="h-5 w-5 -rotate-45 " />
      </div>
    </button>
  );
}

export default NewMessageForm;
