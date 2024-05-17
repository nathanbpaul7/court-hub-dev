'use client';
import { use, useState } from 'react';
import Image from 'next/image';
import CourtInfoTabs from './court-tab-display';
import { TennisRacketIcon } from '../components';

export default function CourtInfoTotal({
  homecourt,
  playerCounts,
}: {
  homecourt: string;
  playerCounts: { [key: string]: number };
}) {
  let homecourtIndex = 0;
  if (homecourt === 'poplar') {
    homecourtIndex = 0;
  } else if (homecourt === 'fairmount') {
    homecourtIndex = 1;
  } else if (homecourt === 'fdr') {
    homecourtIndex = 2;
  }

  const [selectedCourt, setSelectedCourt] = useState(homecourtIndex);
  // handle how the court is selected by images on the map
  const handleCourtClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const courtId = (event.target as HTMLImageElement).id;
    let courtIndex = 0;
    if (courtId === 'poplar') {
      courtIndex = 0;
    } else if (courtId === 'fairmount') {
      courtIndex = 1;
    } else if (courtId === 'fdr') {
      courtIndex = 2;
    }
    setSelectedCourt(courtIndex);
  };

  return (
    <div className=" flex h-[80vh] w-full flex-col items-center md:h-auto lg:flex-row  lg:items-start  lg:gap-8">
      <div className=" bg-highlight-green hidden h-full flex-col rounded-2xl p-4 px-6 lg:flex  lg:justify-center">
        <div className=" flex max-w-[500px] rounded-xl  p-4  text-left text-blue-600 ">
          <h3 className="text-lg font-semibold md:text-xl ">
            All Court Locations
          </h3>
        </div>
        <div
          id="phillymap"
          className=" relative flex flex-col overflow-hidden rounded-2xl  "
        >
          <Image
            src="/philly-map.png"
            alt="Philly Court Map"
            priority
            width={500}
            height={700}
            className="h-auto w-auto  flex-shrink-0 "
          />
          <Image
            src="/tennis-ball.png"
            id="poplar"
            alt="Poplar Court"
            width={35}
            height={35}
            onClick={handleCourtClick}
            className={`ring-green-logo absolute right-[28%] top-[27.5%] z-10 flex-shrink-0 rounded-full shadow-xl ring-2   ${
              selectedCourt === 0 ? 'ring-highlight-logo ' : 'hover:ring-4'
            }`}
          />
          {selectedCourt === 0 && (
            <TennisRacketIcon className="stroke-green-logo fill-green-logo absolute right-[18%] top-[23.25%] h-24 w-24 rotate-[270deg] transform   " />
          )}
          <Image
            src="/tennis-ball.png"
            alt="Fairmount Court"
            id="fairmount"
            width={35}
            height={35}
            onClick={handleCourtClick}
            className={` ring-green-logo absolute left-[33.5%] top-[5.5%] z-10 flex-shrink-0 rounded-full shadow-xl ring-2 
             ${selectedCourt === 1 ? 'ring-green-logo ' : 'hover:ring-4'}`}
          />
          {selectedCourt === 1 && (
            <TennisRacketIcon className="stroke-green-logo fill-green-logo absolute left-[23%] top-[1.50%] h-24 w-24 rotate-[0deg] transform   " />
          )}
          <Image
            src="/tennis-ball.png"
            alt="FDR Court"
            id="fdr"
            width={35}
            height={35}
            onClick={handleCourtClick}
            className={`ring-green-logo absolute bottom-[3%] left-[42%] z-10 flex-shrink-0 rounded-full ring-2 
            hover:ring-4 ${
              selectedCourt === 2 ? 'ring-green-logo ' : 'hover:ring-4'
            }`}
          />
          {selectedCourt === 2 && (
            <TennisRacketIcon className="stroke-green-logo fill-green-logo absolute left-[37.9%] top-[79.8%] h-24 w-24 rotate-[180deg] transform   " />
          )}
        </div>
        <div className=" flex max-w-[500px] flex-col justify-center rounded-xl  p-4 text-blue-600 ">
          <p className=" mt-4 break-words text-left ">
            Court Hub is currently deployed to three court locations across
            Philadelphia. Have a suggestion for a court(s) in Philadelphia that
            could benefit from Court Hub?{' '}
            <a href="mailto:courthubinfo@gmail.com" className=" underline ">
              Reach out via email.
            </a>
          </p>
        </div>
      </div>
      <CourtInfoTabs
        setSelectedCourt={setSelectedCourt}
        selectedCourt={selectedCourt}
        playerCounts={playerCounts}
      />
    </div>
  );
}
