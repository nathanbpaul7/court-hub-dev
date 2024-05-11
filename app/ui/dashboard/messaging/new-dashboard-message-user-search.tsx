import { Fragment, use, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useRef } from 'react';
import { UserIdGrab } from '@/app/lib/definitions';

export default function DashboardMessageUserSearch({
  allUsers,
  otherUsername,
  handleSelectedUser,
}: {
  allUsers: UserIdGrab[];
  otherUsername: string;
  handleSelectedUser: (user: { id: number; name: string }) => void;
}) {
  const people = allUsers.map((user, index) => ({
    id: index,
    name: user.username,
  }));
  const [selected, setSelected] = useState(
    people.find((person) => person.name === otherUsername),
  );
  const [query, setQuery] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus();
    if (selected) handleSelectedUser(selected);
  }, [selected]);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className="flex">
      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          handleSelectedUser(value);
        }}
      >
        <div className="relative mr-2 flex flex-grow">
          <Combobox.Label className="sr-only">To:</Combobox.Label>
          <div className="relative w-full flex-grow cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="mr-64 w-full border-none py-2 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: { id: string; name: string }) =>
                person.name
              }
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users..."
              ref={inputRef}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
