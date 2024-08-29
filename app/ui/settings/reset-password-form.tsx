'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { resetPassword } from '@/app/lib/actions';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-10 items-center rounded-lg bg-green-logo px-4 text-sm font-medium text-white shadow-md transition-colors hover:bg-gray-400"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Resetting Password' : 'Reset Password'}
    </button>
  );
}

export default function ResetPasswordForm({
  email,
  closeModal,
}: {
  email: string;
  closeModal: () => void;
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(resetPassword, initialState);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (password !== passwordConfirm) {
      setError('Current passwords do not match.');
    } else if (password.length < 8) {
      setError('Password must be at least 8 characters.');
    } else {
      setError('');
    }
  }, [password, passwordConfirm]);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value.length < 8) {
      const passwordLabel = document.getElementById('password-label');
      passwordLabel!.innerHTML = 'must be at least 8 characters';
    }
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <form action={dispatch}>
      <div className=" flex flex-col space-y-6 overflow-y-scroll">
        <div className="">
          <p className="text-sm leading-6 text-gray-600">
            Please pick a strong password that uses a mix of letters, numbers,
            and symbols.
          </p>
        </div>

        <div className="6 mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
          <div className="">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
              <p
                className="ml-2 inline text-xs text-gray-500"
                id="password-label"
              >
                must be at least 8 characters
              </p>
            </label>

            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
            <label
              htmlFor="password-confirm"
              className="mt-2 block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm your password
              <p
                className="ml-2 inline text-xs text-gray-500"
                id="password-confirmation-label"
              ></p>
            </label>
            <div className="relative mt-2">
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                required
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                autoComplete="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div
              id="password-error"
              className="my-2 ml-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {error && <p className="  text-xs text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 flex items-center justify-center gap-x-6">
        <button
          onClick={closeModal}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 shadow-md transition-colors hover:bg-gray-200"
        >
          Cancel
        </button>

        {error ? (
          <button
            className="flex h-10 items-center rounded-lg bg-gray-300 px-4 text-sm font-medium text-white shadow-md transition-colors"
            aria-disabled={true}
            disabled
          >
            Reset Password
          </button>
        ) : (
          <SubmitButton />
        )}
      </div>
    </form>
  );
}
