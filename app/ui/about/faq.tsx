'use client';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Faq() {
  return (
    <div className="max-2xl border-green-logo flex w-full flex-col">
      <Disclosure as="div" className="" defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className="border-green-logo group flex w-full justify-between border-b py-2 text-left">
              <span className="  font-medium text-blue-600">
                How is Court Hub different from other tennis community apps?
              </span>
              <ChevronDownIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } fill-green-logo ui-open:transform  ui-open:rotate-180   h-6 w-6`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 flex flex-col space-y-4">
              <span className="mt-2 font-bold">Free Membership</span> Court Hub
              is free for all users, with no membership fees.
              <span className="font-bold">Community Focus</span> We&apos;re
              focused on connecting players at local courts and fostering a
              friendly tennis community, rather than solely on competitive
              league or tournament play-- though we have nothing against
              competing if that&apos;s what you&apos;re interested in!
              <span className="font-bold">Invite Only</span> Our platform
              creates a trustworthy community of tennis players because it
              relies on peer recommendations and is currently operating under an
              invite-only exposure model.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-4 ">
        <Disclosure.Button className="border-green-logo group flex w-full justify-between border-b py-2 text-left">
          <span className="  font-medium text-blue-600">
            Can I trust other users on Court Hub?
          </span>
          <ChevronDownIcon className=" h-5 w-5" />
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2  text-blue-600">
          Good question. It is always important to be careful about who
          you&apos;re interacting with and what kind of information you&apos;re
          sharing online. Court Hub is a platform that relies on peer
          recommendations and is currently operating under an invite-only
          exposure model. This means that you can only see and interact with
          other users who have been invited to the platform by someone who knows
          someone already on Court Hub. We believe that this system creates a
          trustworthy community of tennis players who are more likely to be
          respectful and responsible in their interactions with others. However,
          it&apos;s always a good idea to exercise caution when meeting new
          people online, and to be mindful of the information you share about
          yourself.
        </Disclosure.Panel>
      </Disclosure>
      <Disclosure as="div" className="mt-4 ">
        <Disclosure.Button className="border-green-logo group flex w-full justify-between border-b py-2 text-left">
          <span className="  font-medium text-blue-600">
            Does Court Hub offer any technical support?
          </span>
          <ChevronDownIcon className=" h-5 w-5" />
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2  text-blue-600">
          No, at the moment this is just a hobby project by Nathan Paul and is
          not supported by any kind of developer team. Please reach out with any
          questions.
        </Disclosure.Panel>
      </Disclosure>
      <Disclosure as="div" className="mt-4 ">
        <Disclosure.Button className="border-green-logo group flex w-full justify-between border-b py-2 text-left">
          <span className="  font-medium text-blue-600">
            Can I see Court Hub's README or Github?
          </span>
          <ChevronDownIcon className=" h-5 w-5" />
        </Disclosure.Button>
        <Disclosure.Panel className="mt-2  text-blue-600">
          Of course! Court Hub is a portfolio student project for Nathan Paul, a
          recently trained full-stack software engineer. You can visit the
          <Link href={'https://github.com/nathanbpaul7/court-hub-dev'}>
            GitHub repository for this project
          </Link>{' '}
          and view the README there.
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
