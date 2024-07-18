'use client';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ResetPasswordForm from './reset-password-form';
import { SafeUser } from '@/app/lib/definitions';

export default function ResetPasswordModal({
  userData,
  resetFormOpen,
}: {
  userData: SafeUser;
  resetFormOpen: boolean;
}) {
  let [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (resetFormOpen) {
      closeModal();
    }
  }, [resetFormOpen]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="mt-2 flex ">
        <button
          type="button"
          onClick={openModal}
          className=" whitespace-nowrap text-xs text-blue-600 underline  hover:text-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Reset my password
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 sm:bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full w-full items-center justify-center p-3 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="fixed flex h-full w-full flex-col bg-white px-4 py-1  text-left align-middle  ">
                  <div className="mb-2 mt-4 flex items-center ">
                    <h1 className="text-lg font-bold  text-gray-900">
                      Reset Your Password
                    </h1>
                    <XMarkIcon
                      className="ml-auto  h-5 w-5"
                      onClick={closeModal}
                    />
                  </div>
                  <ResetPasswordForm
                    email={userData.email}
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
