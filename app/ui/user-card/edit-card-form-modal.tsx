'use client';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import EditCardForm from './edit-card-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DisplayCard } from '@/app/lib/definitions';

export default function EditCardFormModal({
  username,
  userCard,
  modalOpen,
  setModalOpen,
}: {
  username: string;
  userCard: DisplayCard;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}) {
  function closeModal() {
    setModalOpen(false);
  }

  function openModal() {
    setModalOpen(true);
  }

  return (
    <>
      <div className="  absolute right-[24px] top-5 newcard:top-5 ">
        {/* <button
          type="button"
          onClick={openModal}
          className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white  hover:text-green-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          <PencilSquareIcon className="inline h-5 w-5" />
          <span className="ml-2 hidden newcard:inline">Edit Card</span>
        </button> */}
      </div>

      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={modalOpen}
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center newcard:p-3">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="newcard:w-xlg transform overflow-hidden bg-white p-3 text-left  align-middle shadow-xl transition-all newcard:rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  ></Dialog.Title>
                  <XMarkIcon
                    className="ml-auto h-5 w-5"
                    onClick={() => {
                      closeModal();
                    }}
                  />
                  <EditCardForm
                    username={username}
                    userCard={userCard}
                    closeModal={closeModal}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
