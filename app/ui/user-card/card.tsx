'use client';
import React from 'react';
import { DisplayCard } from '@/app/lib/definitions';
import { roboto } from '../fonts';
import {
  CheckIcon,
  SunIcon,
  UserIcon,
  XMarkIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import {
  ColdIcon,
  ColdIconRed,
  HomeIcon,
  TennisBallIcon,
  TennisTravel,
  WindyIcon,
  WindyIconRed,
} from '../components';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  SafeUser,
  UserIdGrab,
  ConvoData,
  MessageData,
} from '@/app/lib/definitions';
import DashboardMessageDialog from '../dashboard/messaging/new-dashboard-message-modal';

export default function Card({
  userCard,
  convos,
  messages,
  userData,
  allUsers,
}: {
  userCard: DisplayCard;
  convos: ConvoData[];
  messages: MessageData[];
  userData: SafeUser;
  allUsers: UserIdGrab[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  let homeCourt = userCard.home_court.toString();
  if (userCard.home_court === 'poplar') {
    homeCourt = 'Poplar';
  } else if (userCard.home_court === 'fairmount') {
    homeCourt = 'Fairmount';
  } else if (userCard.home_court === 'fdr') {
    homeCourt = 'FDR';
  }

  return (
    <div
      id="triplediv"
      className="grid w-full min-w-[343px] grid-cols-1 rounded-lg border-2 border-gray-200 bg-white font-sans antialiased sm:max-w-[500px]"
    >
      <div className="h-27 flex-row ">
        <div className="bg-highlight-green flex h-20 w-full flex-grow flex-row justify-start rounded-t-md">
          <div className="ml-6 mt-6 flex w-32">
            <img
              src={userCard.image_url}
              alt="profile"
              className="h-28 w-28 rounded-full  ring-4 ring-white "
            />
          </div>

          <div className="flex flex-grow items-center justify-end">
            <div className="mr-4 flex gap-2">
              <div className=" bg-green-badge  flex items-center rounded-lg border-0.5 px-3 py-1">
                <HomeIcon className=" mr-1 h-5 w-5  " />
                <p className="text-center text-xs  text-blue-600">
                  {homeCourt}
                </p>
              </div>
              {userCard.will_travel && (
                <div className=" bg-green-badge  flex items-center rounded-lg border-0.5 px-3 py-1">
                  <TennisTravel className=" h-5 w-5" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className=" ml-6 mt-16 flex flex-col justify-center text-left">
          <h2 className="text-2xl font-semibold text-blue-600 antialiased">
            {userCard.username}
          </h2>
          <span className="text-sm text-blue-600">
            {' '}
            {userCard.self_level.charAt(0).toUpperCase() +
              userCard.self_level.slice(1)}
            {userCard.years_xp ? ' | ' + userCard.years_xp + 'yrs' : ''}
            {userCard.tourn_level ? ' | ' + userCard.tourn_level : ''}
          </span>
        </div>
      </div>
      <div className="max-h-100 flex w-full flex-col">
        <div className="h-25">
          <div className="mb-3 ml-5 mt-4 flex items-center">
            <TennisBallIcon className="h-6 h-6 py-0.5 pr-0.5 text-blue-600" />
            <h2
              className={`${roboto.className} ml-2 text-sm tracking-widest text-blue-600`}
            >
              PLAY PREFERENCES
            </h2>
          </div>
          <div className="mx-6  mt-1 flex flex-wrap justify-start ">
            {userCard.singles_play && (
              <div className="bg-highlight-green mx-1.5 my-1 rounded-lg border-0.5 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Singles</p>
              </div>
            )}
            {userCard.doubles_play && (
              <div className="bg-highlight-green mx-1.5 my-1 rounded-lg border-0.5 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Doubles</p>
              </div>
            )}
            {userCard.open_play && (
              <div className="bg-highlight-green mx-1.5 my-1 rounded-lg border-0.5 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Open Play</p>
              </div>
            )}
            {userCard.light_hitting && (
              <div className="bg-highlight-green mx-1.5 my-1 rounded-lg border-0.5 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">
                  Light hitting
                </p>
              </div>
            )}
            {userCard.training_drills && (
              <div className="bg-highlight-green mx-1.5 my-1 rounded-lg border-0.5 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Drills</p>
              </div>
            )}
            {!userCard.training_drills &&
              !userCard.doubles_play &&
              !userCard.singles_play &&
              !userCard.open_play &&
              !userCard.light_hitting && (
                <div className="mx-1.5 my-1 rounded-lg border-0.5 border-0.5 border-gray-500 px-3 ">
                  <p className="text-center text-sm">None</p>
                </div>
              )}
          </div>
        </div>
        <div className="h-25 flex w-full flex-col">
          <div className="basis-1/3">
            <div className="mb-2 ml-5 mt-4 flex items-center">
              <ClockIcon className="h-6 w-6 text-blue-600" />
              <h2
                className={`${roboto.className} ml-2 text-sm tracking-widest text-blue-600`}
              >
                AVAILABILITY
              </h2>
            </div>
          </div>

          <div className="mx-6 mb-1 mt-2 flex inline-flex space-x-1 text-blue-600">
            <h3 className="text-sm font-semibold tracking-wide">Weekdays:</h3>
            <div className="mx-6 flex flex-wrap space-x-1.5">
              {userCard.weekday_early_am && (
                <p className="text-center text-sm">Early am</p>
              )}
              {userCard.weekday_late_am && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className="text-center text-sm">Late am</p>
                </>
              )}
              {userCard.weekday_early_pm && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Early pm</p>
                </>
              )}
              {userCard.weekday_late_pm && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className="text-center text-sm">Late pm</p>
                </>
              )}
              {userCard.weekday_evening && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Evening</p>
                </>
              )}
              {!userCard.weekday_early_am &&
                !userCard.weekday_late_am &&
                !userCard.weekday_early_pm &&
                !userCard.weekday_late_pm &&
                !userCard.weekday_evening && (
                  <p className=" text-center text-sm">None</p>
                )}
            </div>
          </div>
          <div className="mx-6 mb-1 flex inline-flex space-x-1 text-blue-600">
            <h3 className="text-sm font-semibold tracking-wide">Weekends:</h3>
            <div className="mx-6 flex flex-wrap space-x-1.5">
              {userCard.weekend_early_am && (
                <p className=" text-center text-sm">Early am</p>
              )}
              {userCard.weekend_late_am && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Late am</p>
                </>
              )}
              {userCard.weekend_early_pm && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Early pm</p>
                </>
              )}
              {userCard.weekend_late_pm && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Late pm</p>
                </>
              )}
              {userCard.weekend_evening && (
                <>
                  <span className="text inline text-sm">|</span>
                  <p className=" text-center text-sm">Evening</p>
                </>
              )}
              {!userCard.weekend_early_am &&
                !userCard.weekend_late_am &&
                !userCard.weekend_early_pm &&
                !userCard.weekend_late_pm &&
                !userCard.weekend_evening && (
                  <p className=" text-center text-sm">None</p>
                )}
            </div>
          </div>
        </div>
        {isOpen && (
          <div id="moreinfo" className="h-75">
            <div className="mb-2 ml-4 mt-4 flex items-center">
              <SunIcon className="h-6 w-6 text-blue-600" />
              <h2
                className={`${roboto.className} ml-2 text-sm tracking-widest text-blue-600`}
              >
                WEATHER TOLERANCE
              </h2>
            </div>
            <div className="mx-6 mb-1.5 mt-2 flex-row space-x-3 ">
              {userCard.weather_cold && (
                <div className="py-0.1 bg-highlight-green mb-1 inline-flex items-center justify-center rounded-lg px-3 py-0.5 ">
                  <p className="text-center text-sm text-blue-600">Cold</p>
                  <CheckIcon className="ml-1 mt-0.5 inline h-3 w-3 text-blue-600" />
                </div>
              )}
              {!userCard.weather_cold && (
                <div className="py-0.1 bg-highlight-red mb-1 inline-flex items-center justify-center rounded-lg   px-3 py-0.5 ">
                  <p className="text-center text-sm text-red-500">Cold</p>
                  <XMarkIcon className="ml-1 mt-0.5 inline h-3 w-3 text-red-500" />
                </div>
              )}
              {userCard.weather_windy && (
                <div className="bg-highlight-green mb-1 inline-flex items-center justify-center  rounded-lg px-3 py-0.5 ">
                  <p className="text-center text-sm text-blue-600">Windy</p>
                  <CheckIcon className="ml-1 mt-0.5 inline h-3 w-3 text-blue-600" />
                </div>
              )}
              {!userCard.weather_windy && (
                <div className="bg-highlight-red mb-1 inline-flex items-center justify-center rounded-lg   px-3 py-0.5 ">
                  <p className="text-center text-sm text-red-500">Windy</p>
                  <XMarkIcon className="ml-1 mt-0.5 inline h-3 w-3 text-red-500" />
                </div>
              )}
            </div>
            <div className="mb-2 ml-5 mt-4 flex items-center">
              <UserIcon className="h-6 w-6 text-blue-600" />
              <h2
                className={`${roboto.className} ml-2 text-sm tracking-widest text-blue-600`}
              >
                PLAYER INFO
              </h2>
            </div>
            <div className="mx-6 mb-4 mt-2 flex-row  ">
              <p className="bg-highlight-green w-full rounded-lg px-3 py-2 text-sm text-blue-600 ">
                {userCard.about_player}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="min-h-20 my-2 flex border-t-2 border-gray-200 px-2 ">
        <div className=" flex w-full justify-between">
          <button
            id="open"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="items-center rounded-lg px-4 py-2 text-left text-sm font-medium text-blue-600  focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
          >
            <span className="underline">
              {isOpen ? 'See less' : 'See more'}
            </span>
            <ChevronDownIcon
              className={`${
                isOpen ? 'rotate-180 transform' : ''
              } "text-bold text-blue-500" inline h-4 w-4`}
            />
          </button>
          <div className="m-2 flex justify-end">
            <DashboardMessageDialog
              otherUsername={userCard.username}
              convos={convos}
              messages={messages}
              userData={userData}
              allUsers={allUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
