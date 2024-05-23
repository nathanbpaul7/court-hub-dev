'use client';
import {
  UserGroupIcon,
  InformationCircleIcon,
  EnvelopeOpenIcon,
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline';
import { CourtIcon, CourtTestIcon, TennisBallIcon } from '../components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu } from '@headlessui/react';
import { BellAlertIcon } from '@heroicons/react/24/solid';

// Map of links to display in the side or navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Players', href: '/dashboard', icon: UserGroupIcon },

  { name: 'Courts', href: '/dashboard/court', icon: CourtTestIcon },

  { name: 'Inbox', href: '/dashboard/inbox', icon: ChatBubbleLeftIcon },

  {
    name: 'About',
    href: '/dashboard/about',
    icon: QuestionMarkCircleIcon,
  },
];
const linksExpand = [];

export default function NavLinks({
  close,
  newMessage,
}: {
  close?: () => void;
  newMessage?: boolean;
}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        let LinkIcon = link.icon;
        if (newMessage && link.name === 'Inbox') {
          LinkIcon = ChatBubbleLeftEllipsisIcon;
        }

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={close ? close : undefined}
            className={clsx(
              ' md:hover:border-highlight-green hover:text-green-logo md:hover:text-highlight-green justify-left relative flex h-[77px]  items-center gap-1 px-3 text-base  font-medium  text-blue-600 md:flex-none md:justify-start md:justify-center md:text-white ',
              {
                'border-green-logo bg-green-badge md:bg-green-logo md:text-highlight-green md:border-highlight-green border-l-4 text-blue-600 md:border-b-4 md:border-l-0':
                  pathname === link.href,
              },
            )}
          >
            {link.name === 'Inbox' && newMessage && (
              <span>
                <BellAlertIcon className="h-4 w-4 animate-ping text-red-600" />
              </span>
            )}
            <LinkIcon
              className={clsx('mr-2 h-6 w-6', {
                'h-5 rotate-90 transform fill-blue-600 md:fill-white':
                  link.name === 'Courts',
                // 'text-yellow-logo': link.name === 'Inbox' && newMessage,
              })}
            />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
