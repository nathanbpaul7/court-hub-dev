import Faq from '@/app/ui/about/faq';
import { OneIcon, ThreeIcon, TwoIcon } from '@/app/ui/components';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative flex max-h-[90vh] max-w-[1100px] flex-col overflow-scroll p-4 text-blue-600 sm:p-8">
      <div className="z-10 flex space-x-8 ">
        <div className="mb-8 rounded-xl bg-highlight-green p-8">
          <p className=" mb-8 text-lg text-gray-700">
            Welcome to Court Hub, on online platform for connecting with other
            tennis players at public courts across Philadelphia. Whether
            you&apos;re a seasoned player, burgeoning addict, or just starting
            out, Court Hub makes it easy to find and connect with other players
            near you.
          </p>
          <div className="rounded-xl bg-green-badge  p-8">
            <h3 className="mb-2 text-2xl font-bold ">Our Mission</h3>
            <p className="text-lg text-gray-600">
              Court Hub is a tool at the service of Philly&apos;s growing tennis
              community. We believe that tennis should be a social and enjoyable
              experience for everyone. Our platform is designed to help players
              of all levels and experience meet new partners with similar play
              preferences and availability.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 ">
        <h3 className="z-2 mb-4 text-2xl font-bold">How It Works</h3>
        <div className="z-2 flex flex-col space-y-8 bg-white/75 p-2 newcard:flex-row newcard:space-x-8 newcard:space-y-0">
          <div className="z-2 flex  flex-col rounded-2xl border border-gray-400 p-4">
            <OneIcon className="mb-4 mr-auto rounded-full text-2xl " />
            <span className="mb-4 text-lg font-bold">
              Create Your Player Card
            </span>
            <p className="max-w-md text-gray-700">
              Register and create your account. Fill out your player card with
              your skill level, availability, and "home court" location to gain
              access to the Court Hub player directory.
            </p>
          </div>
          <div className="z-2 flex  flex-col rounded-2xl border border-gray-400 p-4">
            <TwoIcon className="mb-4 mr-auto rounded-full text-2xl " />
            <span className="mb-4 text-lg font-bold">
              Find Playing Partners
            </span>
            <p className="max-w-md text-gray-700">
              Browse, search, and filter through our player directory to connect
              with players of similar skill levels and schedules at your home
              court or in the area.
            </p>
          </div>
          <div className="flex  flex-col rounded-2xl border border-gray-400 p-4">
            <ThreeIcon className="mb-4 mr-auto rounded-full text-2xl " />
            <span className="mb-4 text-lg font-bold">Hit the courts!</span>
            <p className="max-w-md text-gray-700">
              Reach out and chat with players you think you might be a good fit
              with. Watch your tennis community grow and spend more time on the
              courts doing what you love.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">FAQ&apos;s</h3>
        <Faq />
      </div>
    </div>
  );
}
