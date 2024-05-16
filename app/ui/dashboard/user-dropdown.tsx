'use client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { DisplayCard } from '@/app/lib/definitions';

import {
  ArrowRightOnRectangleIcon,
  IdentificationIcon,
  PencilIcon,
  PencilSquareIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

export default function UserDropdown({
  card,
  setIsOpen,
  isOpen,
  setModalOpen,
  modalOpen,
  setCardIsOpen,
  cardIsOpen,
}: {
  card: DisplayCard | null;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  modalOpen: boolean;
  setCardIsOpen: (cardIsOpen: boolean) => void;
  cardIsOpen: boolean;
}) {
  return (
    <Menu as="div" className="z-40 flex">
      <div>
        <Menu.Button
          className="absolute inset-0 h-full  w-full justify-center rounded-md   text-sm font-medium text-white  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          onClick={(e) => {
            setIsOpen(!isOpen);
          }}
        ></Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-20 z-40 w-56 origin-top-right divide-y divide-gray-100 rounded-md rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-2 py-2 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-green-logo text-white' : 'text-blue-600'
                  } group flex w-full items-center rounded-md px-2 py-4 text-sm`}
                  onClick={() => {
                    setCardIsOpen(!cardIsOpen);
                  }}
                >
                  {active ? (
                    <IdentificationIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <IdentificationIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  View Player Card
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div>
                  <button
                    className={`${
                      active ? 'bg-green-logo text-white' : 'text-blue-600'
                    } group flex w-full items-center rounded-md px-2 py-4 text-sm`}
                    onClick={() => {
                      setModalOpen(!modalOpen);
                    }}
                  >
                    {active ? (
                      <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    )}
                    Edit Player Card
                  </button>
                </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className={`${
                    active ? 'bg-green-logo text-white' : 'text-blue-600'
                  } group flex w-full items-center rounded-md px-2 py-4 text-sm`}
                >
                  {active ? (
                    <ArrowRightOnRectangleIcon
                      className="mr-2 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRightOnRectangleIcon
                      className="text-green-logo mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#DBF2EE"
        stroke="#37756C"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#37756C"
        stroke="#DBF2EE"
        strokeWidth="2"
      />
    </svg>
  );
}
