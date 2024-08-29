'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { register } from '@/app/lib/actions';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Terms from './terms';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-10 items-center rounded-lg bg-green-logo px-4 text-sm font-medium text-white shadow-md transition-colors hover:bg-green-600"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Registering' : 'Register'}
    </button>
  );
}

export default function RegisterForm({
  userNames,
  emails,
}: {
  userNames: string[];
  emails: string[];
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(register, initialState);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [userExistsFlag, setUserExistsFlag] = useState(false);
  const [emailExistsFlag, setEmailExistsFlag] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userNames.includes(event.target.value)) {
      console.log('User exists');
      setUserExistsFlag(true);
    } else {
      setUserExistsFlag(false);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emails.includes(event.target.value)) {
      setEmailExistsFlag(true);
      console.log('Email exists');
    } else {
      setEmailExistsFlag(false);
    }
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 8) {
      const passwordLabel = document.getElementById('password-label');
      passwordLabel!.innerHTML = 'must be at least 8 characters';
    }
  };

  return (
    <form action={dispatch}>
      <div className="space-y-6 overflow-y-scroll border border-gray-100 pb-6 pl-6 pr-6 pt-4 shadow-md">
        <div className="border-b border-gray-900/10 pb-4">
          <h1 className="text-lg font-bold leading-7 text-gray-900">
            Personal Information
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            We&apos;ll only share your username with other players, never your
            personal information. Email will only be used for login
            authenticaiton
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid md:grid-cols-6">
          <div className="md:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
              {emailExistsFlag && (
                <div id="email-exists-icon" className="ml-5 inline">
                  <FaceFrownIcon className="inline h-5 w-5 text-red-500" />{' '}
                  <p className="inline text-xs text-red-500">
                    email already associated with account
                  </p>
                </div>
              )}
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                onChange={handleEmailChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="md:col-span-3">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div
              id="password-error"
              className="ml-2 mt-2"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p className=" inline text-xs text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="ml-2 mr-auto mt-auto flex items-center justify-center md:col-span-4 ">
            <label className="text-sm sm:text-base">
              <input
                className="mr-3 h-5 w-5"
                name="terms"
                value="true"
                required
                type="checkbox"
              />
              I agree to the
            </label>
            <Terms />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 shadow-md transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>

        {userExistsFlag || emailExistsFlag ? (
          <button
            className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-white shadow-md transition-colors"
            aria-disabled={true}
          >
            Register
          </button>
        ) : (
          <SubmitButton />
        )}
      </div>
    </form>
  );
}
