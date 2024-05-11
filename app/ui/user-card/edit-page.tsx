'use client';
import { DisplayCard } from '@/app/lib/definitions';
import { useState } from 'react';
import EditCardFormModal from '@/app/ui/user-card/edit-card-form-modal';
import EditCard from '@/app/ui/user-card/user-edit-card';

export default function EditPage({ card }: { card: DisplayCard }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex w-full max-w-[1100px] flex-col p-4">
      <div className=" flex items-center">
        <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
          Player Card
        </h1>
      </div>
      <div className=" justify-left mx-2 my-2 flex">
        <span className="  rounded-md border-blue-600 px-2 py-2 text-base">
          This is what the other players on this app will see. You can{' '}
          <button
            className="text-yellow-100 underline hover:text-green-500 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75"
            onClick={() => setModalOpen(true)}
          >
            edit
          </button>{' '}
          your card at any time.
        </span>
      </div>
      <div className=" flex min-w-[343px]  flex-col  gap-y-2   sm:overflow-x-auto  ">
        <div
          className="relative mb-4 min-w-[343px] max-w-[350px] rounded-lg border border-gray-200 pb-3 newcard:min-w-[450px] newcard:max-w-[500px]"
          key={card.username}
        >
          <EditCard userCard={card} />
          <EditCardFormModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            username={card.username}
            userCard={card}
          />
        </div>
      </div>
    </div>
  );
}
