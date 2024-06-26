'use client';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { signOut } from 'next-auth/react';

import {
  Bars3Icon,
  UserGroupIcon,
  EnvelopeOpenIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  PowerIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

import { CourtIcon } from '../components';

import NavLinks from './nav-links';

import Image from 'next/image';

export default function Hamburger({
  setModalOpen,
  setCardIsOpen,
  cardIsOpen,
  modalOpen,
  userData,
}: {
  setModalOpen: (modalOpen: boolean) => void;
  modalOpen: boolean;
  setCardIsOpen: (cardIsOpen: boolean) => void;
  cardIsOpen: boolean;
  userData: any;
}) {
  return (
    <Menu>
      {({ open, close }) => (
        <>
          <div className="relative mr-2 inline-block overflow-hidden text-left md:hidden">
            <Menu.Button
              className="
            bg-green-logo inline-flex items-center rounded-md p-2 focus:outline-none focus-visible:ring-white"
            >
              {!open && (
                <Bars3Icon
                  className="
                   group h-7 w-7 text-white transition duration-150 ease-in-out hover:text-green-300/80"
                  aria-hidden="true"
                />
              )}
              {open && (
                <XMarkIcon
                  className="
                   group h-7 w-7 text-white transition duration-150 ease-in-out hover:text-green-300/80"
                  aria-hidden="true"
                />
              )}
            </Menu.Button>
          </div>
          {open && (
            <div className="fixed inset-0  z-30 h-screen w-screen overflow-hidden bg-black/25 opacity-100 transition-opacity duration-200  md:hidden" />
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-500"
            enterFrom="transform  translate-x-full"
            enterTo="transform  -translate-x-0"
            leave="transition ease-in duration-500"
            leaveFrom="transform  -translate-x-0"
            leaveTo="transform  translate-x-full"
          >
            <Menu.Items
              onClick={close}
              className="absolute right-0 top-0 z-40  h-screen  w-[85%]  overflow-hidden bg-white   shadow-lg  focus:outline-none md:hidden"
            >
              {' '}
              <div className="relative flex h-full flex-col">
                <div className="absolute right-2 top-2 z-40">
                  <button
                    className=""
                    onClick={() => {
                      close();
                    }}
                  >
                    <XMarkIcon className="text-green-logo  h-6 w-6" />
                  </button>
                </div>

                <div className="border-green-border flex h-[120px] w-full items-center border-b">
                  <div className="ml-6">
                    <Image
                      height={72}
                      width={72}
                      src={userData.image_url}
                      alt="profile"
                      className="h-[72px] w-[72px] rounded-full"
                    />
                  </div>
                  <div className="ml-4 flex flex-col">
                    <span className=" font-semibold text-blue-600 ">
                      {userData.username}
                    </span>
                    <div>
                      <button
                        className=" text-sm text-blue-600 underline"
                        onClick={() => {
                          setCardIsOpen(!cardIsOpen);
                          close();
                        }}
                      >
                        View card
                      </button>
                      <span className="text-xs text-gray-400"> | </span>
                      <button
                        className=" text-sm text-blue-600 underline"
                        onClick={() => {
                          setModalOpen(!modalOpen);
                          close();
                        }}
                      >
                        Edit card
                      </button>
                    </div>
                  </div>
                </div>

                <NavLinks close={close} />
                <div id="white-space" className="flex-grow" />
                <div className="border-green-border flex flex-col border-t bg-gray-100">
                  <div className="flex h-20 w-full items-center justify-center">
                    <button
                      className="hover:text-green-logo flex h-full w-full items-center rounded-md rounded-md bg-gray-50 p-3 text-sm font-medium"
                      onClick={() => {
                        close();
                      }}
                    >
                      <Cog6ToothIcon className="mr-2 h-6 w-6 " />
                      <div>Account Settings</div>
                    </button>
                  </div>
                  <div className="flex h-20 w-full items-center justify-center">
                    <button
                      className="flex h-full w-full items-center rounded-md rounded-md bg-gray-50 p-3 text-sm font-medium hover:text-red-500"
                      onClick={() => {
                        close();
                        signOut();
                      }}
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-6 w-6 " />
                      <div>Sign Out</div>
                    </button>
                  </div>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

const links = [
  { name: 'Player Directory', href: '/dashboard', icon: UserGroupIcon },
  {
    name: 'Edit Player Card',
    href: '/dashboard/player-card',
    icon: PencilSquareIcon,
  },
  { name: 'Inbox', href: '/dashboard/inbox', icon: EnvelopeOpenIcon },

  { name: 'Court Info', href: '/dashboard/court', icon: CourtIcon },
  {
    name: 'About CourtHUB',
    href: '/dashboard/about',
    icon: QuestionMarkCircleIcon,
  },
];

{
  /* <form action={trigSignOut} className="col-span-1  grid">
                <Menu.Item
                  as="button"
                  type="submit"
                  className="mx-3 mb-2 flex h-[80px] grow items-center gap-2 rounded-md rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-200 hover:text-red-500"
                >
                  <PowerIcon className="w-6" />
                  <div className=" md:hidden">Sign Out</div>
                </Menu.Item>
              </form> */
}
