import { OneIcon, ThreeIcon, TwoIcon } from '@/app/ui/components';

export default function Page() {
  return (
    <div className="flex max-h-[90vh] max-w-[1100px] flex-col overflow-scroll px-8 py-8 text-blue-600">
      <div className="flex space-x-8 ">
        <div className="bg-highlight-green mb-8 rounded-xl p-8">
          <h2 className="mb-4 text-3xl font-bold">About</h2>
          <p className=" mb-8 text-lg text-gray-700">
            Welcome to Court Hub, on online platform for connecting with other
            tennis players at public courts across Philadelphia. Whether
            you&apos;re a seasoned player, burgeoning addict, or just starting
            out, Court Hub makes it easy to find and connect with other players
            in your &quot;home&quot; court community (and beyond).
          </p>
          <div className="bg-green-badge  p-8">
            <h3 className="mb-2 text-2xl font-bold ">Our Mission</h3>
            <p className="text-lg text-gray-600">
              At Court Hub, our mission is to help tennis players meet other
              tennis players. It is a tool at the service of Philly&apos;s
              growing tennis community. We believe that tennis should be a
              social and enjoyable experience for everyone. Our platform is
              designed to help players of all levels and experience meet other
              players who share their preferences and availability.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 ">
        <h3 className="mb-4 text-2xl font-bold">How It Works</h3>
        <div className="flex flex-col space-y-8 p-2 newcard:flex-row newcard:space-x-8 newcard:space-y-0">
          <div className="border-green-logo flex flex-col rounded-2xl border p-4">
            <OneIcon className="mb-4 mr-auto rounded-full text-2xl " />
            <span className="mb-4 text-lg font-bold">
              Create Your Player Card
            </span>
            <p className="max-w-md text-gray-700">
              Register and create your account. Fill out your player card with
              your skill level, availability, and preferred court locations to
              gain access to the Court Hub player directory.
            </p>
          </div>
          <div className="border-green-logo flex flex-col rounded-2xl border p-4">
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
          <div className="border-green-logo flex flex-col rounded-2xl border p-4">
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

      <div className="mb-8 flex flex-col space-y-4">
        <h3 className="mb-2 text-2xl font-bold">How We're Different</h3>
        <p className="text-lg text-gray-700">
          Unlike other platforms, Court Hub offers:
        </p>
        <span className="font-bold">Free Membership</span> Court Hub is free for
        all users, with no membership fees.
        <span className="font-bold">Community Focus</span> We&apos;re focused on
        connecting players at local courts and fostering a friendly tennis
        community, rather than solely on competitive league or tournament play--
        though we have nothing against competing if that&apos;s what you&apos;re
        interested in!
        <span className="font-bold">Invite Only</span> Our platform creates a
        trustworthy community of tennis players because it relies on peer
        recommendations and is currently operating under an invite-only exposure
        model.
      </div>
    </div>
  );
}
