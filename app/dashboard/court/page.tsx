import { TennisTravel } from '@/app/ui/components';
import CourtInfoTotal from '@/app/ui/courts/court-map-info-display';
import MapComponent from '@/app/ui/courts/court-tab-display';
import { fetchAllCards, fetchUserCardData } from '@/app/lib/data';
import Link from 'next/link';

export default async function Page() {
  const userCard = await fetchUserCardData();
  if (!userCard) {
    throw new Error('unable to access user card data to find home court');
  }
  const homecourt = userCard.homecourt as string;
  const playerCardsData = await fetchAllCards();
  if (!playerCardsData) {
    throw new Error('unable to access player card data');
  }
  function countPlayersByCourt(court: string) {
    return playerCardsData.filter((card) => card.home_court === court).length;
  }

  const poplarPlayers = countPlayersByCourt('poplar');
  const fairmountPlayers = countPlayersByCourt('fairmount');
  const fdrPlayers = countPlayersByCourt('fdr');

  const playerCounts = {
    poplar: poplarPlayers,
    fairmount: fairmountPlayers,
    fdr: fdrPlayers,
  };

  return (
    <main className="mt-6 flex h-full w-full max-w-[1100px] flex-col justify-start  px-4 md:py-2 ">
      <div className="flex h-full flex-col items-center">
        <CourtInfoTotal homecourt={homecourt} playerCounts={playerCounts} />
      </div>
    </main>
  );
}
