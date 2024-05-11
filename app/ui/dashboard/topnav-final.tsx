'use client';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import ChubLogo from '@/app/ui/chub-logo';
import { signOut } from '@/auth';

import Hamburger from './hamburger';
import { DisplayCard, SafeUser } from '@/app/lib/definitions';

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import UserDropdown from './user-dropdown';
import { use, useEffect, useState } from 'react';
import clsx from 'clsx';
import EditCardFormModal from '../user-card/edit-card-form-modal';
import SelfCardModal from '../user-card/self-card-modal';
import { pusherClient } from '@/app/lib/pusher-client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { BellAlertIcon } from '@heroicons/react/24/solid';

export default function SideNav({
  userData,
  card,
}: {
  userData: SafeUser;
  card: DisplayCard | null;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { refresh } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  useEffect(() => {
    if (modalOpen) {
      setIsOpen(false);
    }
    if (cardIsOpen) {
      setIsOpen(false);
    }
  }, [modalOpen, cardIsOpen]);

  useEffect(() => {
    pusherClient.subscribe(userData.id);
    pusherClient.bind('new-message', function (data: any) {
      setNewMessage(true);
      const params = new URLSearchParams(searchParams);
      params.set('new_message', JSON.stringify(data.message));
      refresh();
      // replace(`/dashboard/inbox?${params.toString()}`);
    });

    return () => {
      pusherClient.unsubscribe(userData.id);
    };
  }, []);

  return (
    <div className="bg-green-logo fixed relative top-0 mb-1 flex h-20 w-full items-center justify-center ">
      <div
        id="navbar-content"
        className="md:justify-between-none flex h-full  w-full max-w-[1150px] items-center justify-between"
      >
        <div className="relative mx-6 flex h-full w-[150px] items-center">
          <ChubLogo />
          <Link
            className="absolute top-0 z-10 h-full w-full"
            href="/dashboard"
          />
        </div>

        <div className=" ml-4  hidden h-full gap-2 md:flex ">
          <NavLinks newMessage={newMessage} />
        </div>

        <div className="relative ml-auto mr-6 hidden items-center rounded-full p-2 md:flex ">
          <img
            src={userData.image_url}
            alt="profile"
            className="h-10 w-10 rounded-full ring-2 ring-white  "
          />
          <span className=" text ml-3   mr-2 font-semibold text-white ">
            {userData.username.split(' ')[0]}
          </span>
          <ChevronDownIcon
            className={clsx(
              'h-6 w-6 transform text-white transition-transform duration-200',
              {
                'rotate-180 transform transition-transform duration-200':
                  isOpen,
              },
            )}
          />
          <UserDropdown
            card={card}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setCardIsOpen={setCardIsOpen}
            cardIsOpen={cardIsOpen}
          />
        </div>
        <Hamburger
          setModalOpen={setModalOpen}
          setCardIsOpen={setCardIsOpen}
          modalOpen={modalOpen}
          cardIsOpen={cardIsOpen}
          userData={userData}
        />
      </div>
      {card && (
        <>
          <EditCardFormModal
            userCard={card}
            username={card.username}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
          <SelfCardModal
            userCard={card}
            cardIsOpen={cardIsOpen}
            setCardIsOpen={setCardIsOpen}
          />
        </>
      )}
    </div>
  );
}

{
  /* <form
action={async () => {
  'use server';
  await signOut();
}}
>
<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
  <PowerIcon className="w-6" />
  <div className="hidden md:block">Sign Out</div>
</button>
</form> */
}
