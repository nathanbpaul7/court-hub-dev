'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { DisplayCard } from '@/app/lib/definitions';
import CardOpen from './card-open';

export default function SelfCardModal({
  userCard,
  cardIsOpen,
  setCardIsOpen,
}: {
  userCard: DisplayCard;
  cardIsOpen: boolean;
  setCardIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setCardIsOpen(false);
  }

  function openModal() {
    setCardIsOpen(true);
  }

  return (
    <>
      <div></div>
      <Transition appear show={cardIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 bg-black/25 "
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=" opacity-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-400"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="fixed relative left-0 z-50  h-[100vh] min-w-[363px] overflow-y-auto overflow-x-hidden bg-white  newcard:inset-x-4 newcard:top-24 newcard:h-auto newcard:w-[500px] newcard:rounded-xl sm:left-24 md:left-1/3 ">
              <XMarkIcon
                className="absolute right-3 top-2 h-5 w-5"
                onClick={() => {
                  closeModal();
                  setCardIsOpen(false);
                }}
              />
              <CardOpen userCard={userCard} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
