'use client';

import { PaperAirplaneIcon as Paperoutline } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { NewMessageWithConvoId } from '@/app/lib/actions';

function MessageForm({
  convo_id,
  user_id,
  other_user_id,
  scrollBottom,
}: {
  convo_id: string;
  user_id: string;
  other_user_id: string;
  scrollBottom: () => void;
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(NewMessageWithConvoId, initialState);
  const [messageText, setMessageText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    setMessageText('');
    scrollBottom();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, [messageText]);

  useEffect(() => {
    scrollBottom();
  }, []);

  // Function to han
  return (
    <div className="bg-highlight-green relative  w-full">
      <form
        action={dispatch}
        onSubmit={handleSubmit}
        className="flex items-center justify-start"
      >
        <input type="hidden" name="convo_id" value={convo_id} />
        <input type="hidden" name="sender_id" value={user_id} />
        <input type="hidden" name="recipient_id" value={other_user_id} />
        <input type="hidden" name="message" value={messageText} />
        <textarea
          ref={textAreaRef}
          placeholder=" Type a message..."
          rows={1}
          required
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          value={messageText}
          className=" mr-4 h-full  w-[80%] resize-none rounded-xl border-none p-2  focus:ring-white"
        />
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="absolute right-2 ml-2 mr-2 rounded-md py-2 text-white focus:outline-none active:outline-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      // aria-disabled={pending}
    >
      <div className="flex rounded-full bg-blue-600 p-2">
        <Paperoutline className="h-5 w-5 -rotate-45 " />
      </div>
    </button>
  );
}

export default MessageForm;
