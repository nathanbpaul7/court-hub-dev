import { fetchSafeUser, fetchUserCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import CardSkeletonBig, { CardSkeletonSmall } from '@/app/ui/new-skeletons';
import Card from '@/app/ui/user-card/card';
import NewCardFormModal from '@/app/ui/user-card/new-card-form-modal';

import { EmptyCardSkel } from '@/app/ui/old-skeletons';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import EditPage from '@/app/ui/user-card/edit-page';

export default async function Page() {
  const userData = await fetchSafeUser();
  if (!userData)
    throw new Error('unable to access user session data to fetch card');
  const username = userData?.username;

  if (userData?.complete_card === false) {
    return (
      <main>
        <div className="mb-2 grid max-w-2xl grid-cols-1 items-center justify-center px-1 newcard:px-10">
          <div className="mb-2 mt-8 md:mt-16">
            <EmptyCardSkel />
          </div>
          <div className="mx-1 mt-2 grid items-center justify-center text-center">
            <h2 className="px-2 py-4 text-xl font-bold tiny:text-2xl ">
              Create Your Player Card
            </h2>
            <p
              id="create-blurb"
              className=" p-2 text-sm leading-relaxed antialiased md:text-base md:leading-snug"
            >
              In order to make connections with other players, you'll first need
              to create your <span className="font-semibold">player card</span>.
              Share info about your availability, play preferences, and more!
            </p>
            <div className="flex justify-center">
              <div className="mx-3 mb-4 mt-4 flex bg-gray-200 p-4">
                <InformationCircleIcon className="mr-3 h-5 w-5 flex-none fill-gray-600" />
                <p className=" text-left text-sm">
                  Other players will be able to view the information you put on
                  this card
                </p>
              </div>
            </div>
            <NewCardFormModal username={username} />
          </div>
        </div>
      </main>
    );
  } else {
    const card = await fetchUserCardData();

    return (
      <>
        <EditPage card={card} />
      </>
    );
  }
}
