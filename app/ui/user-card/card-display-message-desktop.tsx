import { useState, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DisplayCard } from '@/app/lib/definitions';
import CardOpen from './card-open';

export default function CardModalDesktop({
  userCard,
}: {
  userCard: DisplayCard;
}) {
  return (
    <div className="ml-auto">
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? 'bg-green-logo text-white' : 'text-white/90'}
                bg-green-logo  hover:text-highlight-green group inline-flex items-center rounded-lg p-1 px-3 pt-1.5 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 `}
            >
              <span className="text-xs">View player card</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel className="absolute z-40  mt-2 -translate-x-[230px] transform rounded-lg border border-gray-200 bg-white  shadow-lg">
                {({ close }) => (
                  <div>
                    <XMarkIcon
                      className="absolute right-1 top-1 h-5 w-5"
                      onClick={() => {
                        close();
                      }} // You can implement the close functionality here
                    />
                    <CardOpen userCard={userCard} />
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
