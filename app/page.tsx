import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { ChubLogoGraphic } from './ui/components';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" bg-green-logo flex h-24 items-center rounded-lg p-4">
        <div className="ml-2 py-8 ">
          <ChubLogoGraphic className="h-3/4 w-3/4" />
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={` text-xl text-gray-800 md:text-xl md:leading-normal`}>
            <strong>Welcome to Court Hub.</strong> This is a web app developed
            by Nathan Paul for the Harvard/edX 2024 CS50 Final Project.
            <br /> <br />
            Court Hub is a platform that allows users to connect with tennis
            players in their local court community. Currently this project is in
            development and is not yet available for public use. Please check
            back in weeks to come for new feature roll-outs!
          </p>
          <Link
            href="/login"
            className="bg-green-logo hover:text-highlight-green flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          {/* <Link
            href="/register"
            className="bg-green-logo hover:text-highlight-green flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Register</span> <UserPlusIcon className="w-5 md:w-6" />
          </Link> */}
        </div>
        <div className="flex items-center justify-center p-6 ">
          <Image
            src="/hero-desktop-poplar.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-desktop-poplar.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
