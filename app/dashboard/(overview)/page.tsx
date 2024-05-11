import { Suspense } from 'react';
import { fetchSafeUser, fetchUserCardData } from '@/app/lib/data';
import { notFound, redirect } from 'next/navigation';
import { fetchAllCards, fetchCardsByKeyword } from '@/app/lib/data';
import CardSkeletonBig from '@/app/ui/new-skeletons';
import Image from 'next/image';
import FilterBar from '@/app/ui/dashboard/filter-bar/filter-bar';
import CardsGrid from '@/app/ui/dashboard/cards-grid';
import { DisplayCard } from '@/app/lib/definitions';
import { fetchUserConvos, fetchAllUsersWithId } from '@/app/lib/data';

function filterCardsFunction(
  filterObject: any,
  cards: DisplayCard[],
  username: string,
): DisplayCard[] {
  // Filter cards based on filterObject and return the filtered cards that match all key value pairs in filterObject

  // Check if any courts are selected in the filter object, because court selection data is stored differently than other filter data eg. {poplar: true, fdr: false, fairmount: false vs. home_court: 'poplar'}
  console.log('filterObject:', filterObject);
  const anyCourtsSelected = Object.keys(filterObject).some(
    (key) => key === 'fdr' || key === 'fairmount' || key === 'poplar',
  );
  let filteredCards = null;
  let filterObjectFixed = null;
  if (anyCourtsSelected) {
    filteredCards = cards.filter(
      (card) => {
        if (card.home_court === 'poplar' && filterObject.poplar) {
          return true;
        } else if (card.home_court === 'fdr' && filterObject.fdr) {
          return true;
        } else if (card.home_court === 'fairmount' && filterObject.fairmount) {
          return true;
        } else if (card.will_travel === filterObject.will_travel) {
          return true;
        } else {
          // } else if (key === 'will_travel' && card.will_travel) {
          //   return true;
          // }
          return false;
        }
      },
      // console.log('filteredCards:', filteredCards
    );

    // remove courts key-value pair from filter object
    filterObjectFixed = { ...filterObject };
    delete filterObjectFixed.poplar;
    delete filterObjectFixed.fdr;
    delete filterObjectFixed.fairmount;
  }

  if (filteredCards === null || filteredCards.length === 0) {
    return cards.filter((card) => {
      // Check if each key-value pair in the filter object exists in the card object EXCEPT for will_travel
      for (const key in filterObject) {
        if (key === 'will_travel' && !filterObject[key]) {
          continue;
        } else if (
          card[key] !== filterObject[key] ||
          card.username === username
        ) {
          return false;
        }
      }
      return true; // If all key-value pairs match, return true
    });
  } else {
    console.log('filteredCards:', filteredCards);
    return filteredCards.filter((card) => {
      // Check if each key-value pair in the filter object exists in the card object
      for (const key in filterObjectFixed) {
        if (key === 'will_travel') {
          continue;
        } else if (
          card[key] !== filterObjectFixed[key] ||
          card.username === username
        ) {
          return false;
        }
      }
      return true; // If all key-value pairs match, return true
    });
  }
}

function filterByLevelFunction(
  filterObject: any,
  cards: DisplayCard[],
  username: string,
): DisplayCard[] {
  return cards.filter((card) => {
    for (const key in filterObject) {
      if (card.username === username) {
        return false;
      } else if (card.self_level.toLowerCase().includes(key)) {
        return true;
      }
      return false;
    }
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    filters?: string;
    levels?: string;
  };
}) {
  const filters = searchParams?.filters || '';
  const levels = searchParams?.levels || '';
  const query = searchParams?.query || '';
  const userData = await fetchSafeUser();

  if (!userData) {
    notFound();
  }
  if (userData?.complete_card === false) {
    redirect('/dashboard/player-card');
  } else {
    let searchFlag = false;
    let searchNoneFlag = false;
    let searchFetch = {} as DisplayCard[];
    let firstFilteredCards = null;
    let filteredCards = null;
    let filterFlag = false;
    let filterNoneFlag = false;

    const [initial, userCard, userConvos, allUsersData] = await Promise.all([
      fetchAllCards(),
      fetchUserCardData(),
      fetchUserConvos(userData, 1),
      fetchAllUsersWithId(),
    ]);

    const { convos, messages } = userConvos;

    if (!allUsersData) {
      throw new Error(
        'Unable to access database to fetch info about other users for fetching convo data',
      );
    }
    if (!initial) {
      throw new Error('Unable to access database to fetch all cards');
    }
    if (!userCard) {
      throw new Error('Unable to access database to fetch user card');
    }

    const allUsers = allUsersData.filter((user) => user.id !== userData.id);
    const initialFetch = initial.filter(
      (card) => card.username !== userData.username,
    );
    if (query && query.length > 2) {
      searchFlag = true;
      searchFetch = await fetchCardsByKeyword(query);
      if (searchFetch.length === 0) {
        searchNoneFlag = true;
      }
    }
    if ((levels && levels.length > 0) || (filters && filters.length > 0)) {
      filterFlag = true;
      if (filters && filters.length > 0) {
        // grab filters from url params and parse them into an object, fix home court key-value assignment before then filtering cards that match all key value pairs in filterObject
        const filterObject = JSON.parse(filters);
        // console.log(filterObject); // testing
        if (searchFlag === true && searchNoneFlag === false) {
          firstFilteredCards = filterCardsFunction(
            filterObject,
            searchFetch,
            userData.username,
          );
          if (levels && levels.length > 0) {
            const levelObject = JSON.parse(levels);
            filteredCards = filterByLevelFunction(
              levelObject,
              firstFilteredCards,
              userData.username,
            );
            if (filteredCards.length === 0) {
              filterNoneFlag = true;
            }
          } else {
            filteredCards = firstFilteredCards;
            if (filteredCards.length === 0) {
              filterNoneFlag = true;
            }
          }
        } else if (searchFlag === false) {
          firstFilteredCards = filterCardsFunction(
            filterObject,
            initialFetch,
            userData.username,
          );
          if (levels && levels.length > 0) {
            const levelObject = JSON.parse(levels);
            filteredCards = filterByLevelFunction(
              levelObject,
              firstFilteredCards,
              userData.username,
            );
            if (filteredCards.length === 0) {
              filterNoneFlag = true;
            }
          } else {
            filteredCards = firstFilteredCards;
            if (filteredCards.length === 0) {
              filterNoneFlag = true;
            }
          }
        }
      } else {
        const levelObject = JSON.parse(levels);
        if (searchFlag === true && searchNoneFlag === false) {
          filteredCards = filterByLevelFunction(
            levelObject,
            searchFetch,
            userData.username,
          );
          if (filteredCards.length === 0) {
            filterNoneFlag = true;
          }
        } else {
          filteredCards = filterByLevelFunction(
            levelObject,
            initialFetch,
            userData.username,
          );
          if (filteredCards.length === 0) {
            filterNoneFlag = true;
          }
        }
      }
    }

    return (
      <main className="flex h-full w-full max-w-[1100px] flex-col ">
        <FilterBar userCard={userCard} />
        <div className="relative" id="gradient-transition">
          <div className="z-4 absolute left-0 top--10 h-[30px] w-full">
            <Image
              src="/bottom-fade.png"
              alt="transition image"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1100px"
              fill={true}
              className=" rotate-180 transform"
              priority
            />
          </div>
        </div>
        {!searchFlag && !filterFlag && (
          <div className="grid h-[70vh] min-w-[343px]  grid-cols-1 items-start justify-items-center gap-y-2 overflow-x-auto p-2 sm:overflow-x-hidden  lg:mt-2 lg:min-w-[500px] lg:grid-cols-2   lg:gap-x-4">
            <Suspense fallback={<CardSkeletonBig />}>
              <CardsGrid
                convos={convos}
                messages={messages}
                userData={userData}
                allUsers={allUsers}
                data={initialFetch}
              />
            </Suspense>
          </div>
        )}
        {searchFlag && searchNoneFlag && !filterFlag && (
          <div className="grid h-[70vh] min-w-[343px] grid-cols-1 items-start justify-items-center gap-y-2 overflow-x-auto p-2 sm:overflow-x-hidden sm:p-4 md:h-[80vh] lg:mt-2 lg:min-w-[500px] lg:grid-cols-2   lg:gap-x-4">
            <div className="flex-col-2 relative flex items-start">
              <CardSkeletonBig />
            </div>
            <span className=" absolute origin-center ">No player results</span>
          </div>
        )}
        {searchFlag && !searchNoneFlag && !filterFlag && (
          <div className="grid h-[70vh] min-w-[343px] grid-cols-1  items-start justify-items-center gap-y-2 overflow-x-auto p-2 sm:overflow-x-hidden sm:p-4 md:h-[80vh] lg:mt-2 lg:min-w-[500px] lg:grid-cols-2   lg:gap-x-4">
            <Suspense fallback={<CardSkeletonBig />}>
              <CardsGrid
                convos={convos}
                messages={messages}
                userData={userData}
                allUsers={allUsers}
                data={searchFetch}
              />
            </Suspense>
          </div>
        )}
        {filterFlag && filterNoneFlag && (
          <div className="grid h-[70vh] min-w-[343px] grid-cols-1  items-start justify-items-center gap-y-2 overflow-x-auto p-2 sm:overflow-x-hidden sm:p-4 md:h-[80vh] lg:mt-2 lg:min-w-[500px] lg:grid-cols-2   lg:gap-x-4">
            <div className="flex-col-2 relative flex items-start">
              <CardSkeletonBig />
            </div>
            <span className=" absolute origin-center ">No player results</span>
          </div>
        )}
        {filterFlag && !filterNoneFlag && (
          <div className="grid h-[70vh] min-w-[343px] grid-cols-1  items-start justify-items-center gap-y-2 overflow-x-auto p-2 sm:overflow-x-hidden sm:p-4 md:h-[80vh] lg:mt-2 lg:min-w-[500px] lg:grid-cols-2   lg:gap-x-4">
            <Suspense fallback={<CardSkeletonBig />}>
              <CardsGrid
                convos={convos}
                messages={messages}
                userData={userData}
                allUsers={allUsers}
                data={filteredCards}
              />
            </Suspense>
          </div>
        )}
      </main>
    );
  }
}
