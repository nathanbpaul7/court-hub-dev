'use client';

import { PaperAirplaneIcon as Paperoutline } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';

import React, { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import {
  DashboardNewMessageWithConvoId,
  NewMessageWithConvoId,
} from '@/app/lib/actions';

function DashboardNewMessageForm({
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
  const [state, dispatch] = useFormState(
    DashboardNewMessageWithConvoId,
    initialState,
  );
  const [messageText, setMessageText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    setMessageText('');
    closeModal();
  };
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef.current?.value]);

  useEffect(() => {
    if (scrollBottom) scrollBottom();
  }, [scrollBottom]);

  // Function to han
  return (
    <div className="flex flex-col">
      <form action={dispatch} onSubmit={handleSubmit} className="">
        <div className="flex flex-grow items-center justify-between overflow-y-hidden ">
          <input type="hidden" name="convo_id" value={convo_id} />
          <input type="hidden" name="sender_id" value={user_id} />
          <input
            type="hidden"
            name="recipient_username"
            value={other_user_id}
          />
          <input type="hidden" name="recipient_id" value={other_user_id} />
          <input type="hidden" name="message" value={messageText} />
          <textarea
            ref={textAreaRef}
            placeholder="Type a message..."
            rows={2}
            maxLength={500}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            value={messageText}
            className=" ml-8 h-full  w-[80%]  border-none p-2 text-sm focus:outline-white focus:ring-white"
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
    >
      <div className="flex rounded-full bg-blue-600 p-2">
        <Paperoutline className="h-5 w-5 -rotate-45 " />
      </div>
    </button>
  );
}

export default DashboardNewMessageForm;
