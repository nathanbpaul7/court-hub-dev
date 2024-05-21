'use client';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import EditCardForm from './edit-card-form';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { DisplayCard } from '@/app/lib/definitions';
import Card from './card';
import EditCard from './user-edit-card';
import CardOpen from './card-open';

export default function CardModal({ userCard }: { userCard: DisplayCard }) {
  const [isOpen, setModalOpen] = useState(false);
  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  return (
    <>
      <div className="ml-auto whitespace-nowrap">
        <button
          type="button"
          onClick={openModal}
          className="bg-green-logo whitespace-nowrap rounded-lg px-3 pb-0.5 font-medium text-white  hover:text-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <span className="text-xs">View player card</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=" translate-x-full"
            enterTo="opacity-100 scale-100 translate-x-0"
            leave="ease-in duration-300"
            leaveFrom="translate-x-0 scale-100"
            leaveTo=" translate-x-full"
          >
            <Dialog.Panel className="fixed relative  top-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden rounded-xl bg-white  md:left-[48vw] md:top-16 md:h-[80vh] md:w-1/2">
              <XMarkIcon
                className="absolute right-3 top-2 h-5 w-5"
                onClick={closeModal}
              />
              <CardOpen userCard={userCard} />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
