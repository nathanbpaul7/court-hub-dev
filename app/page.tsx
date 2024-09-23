import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from './ui/fonts';
import Image from 'next/image';
import { ChubLogoGraphic } from './ui/components';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" flex h-24 items-center rounded-lg bg-green-logo p-4">
        <div className="ml-2 py-8 ">
          <ChubLogoGraphic className="h-3/4 w-3/4" />
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={` text-lg text-gray-800 md:leading-normal`}>
            
            <strong>Welcome to Court Hub!</strong><br />Philadelphia&apos;s free,
            open-source, tennis meet-up app.
            <br />
            </p>
           <ul className="list-disc ml-4">
  <li>Having trouble finding a hitting partner at your level who shares your schedule?</li>
  <li>Newly hooked on tennis and want to play more than your friends do?</li>
  <li>Just moved to Philly and looking for fellow tennis players?</li>
</ul>
<p>
  Court Hub is here for you! Register below to gain access to our rapidly growing directory of local tennis players at public courts across Philadelphia. Find and message players who match your availability, level, and playing preferences so you can get off this screen and back on the courts!
</p>

          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-green-logo px-6 py-3 text-sm font-medium text-white transition-colors hover:text-highlight-green md:text-base"
          >
            <span>Continue</span> <ArrowRightIcon className="w-5 md:w-6" />
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
