'use client';

import FilterPopover from './filter-pop-over';
import Search from '../../search';
import { DisplayCard } from '@/app/lib/definitions';

export default function FilterBar({ userCard }: { userCard: DisplayCard }) {
  return (
    <div className="mt-2 flex flex-col newcard:px-2">
      <div
        className="  flex h-[70px] w-full items-center justify-start gap-3 newcard:min-w-[500px]"
        id="filter-bar"
      >
        <div className="justify-right  block inline items-center pl-2">
          {' '}
          <FilterPopover userCard={userCard} />
        </div>

        {/*  POSSIBLE ACTION BUTTONS FOR FUTURE FEATURES <div className="sortbreaksm:block flex hidden lg:ml-2 ">
          <AvailabilityButton />
        </div>
        <div className="sortbreakmd:block hidden" id="playing-preferences">
          <PlayPrefButton />
        </div>
        <div className="sortbreak:block hidden" id="level">
          <LevelButton />
        </div> */}
        <Search placeholder="Search players..." />

        {/* <div id="sort-by" className=" ml-auto mr-5 hidden ">
          <SortButton />
        </div> */}
      </div>
      <div className="mx-4 border-b border-gray-200"></div>
    </div>
  );
}
