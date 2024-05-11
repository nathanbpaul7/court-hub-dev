'use client';
import React from 'react';
import { DisplayCard } from '@/app/lib/definitions';
import {
  CheckIcon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ColdIcon, ColdIconRed, WindyIcon, WindyIconRed } from '../components';
import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function EditCard({ userCard }: { userCard: DisplayCard }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="triplediv"
      className="col-span-full grid min-w-[343px] rounded-lg bg-white font-sans antialiased  newcard:min-w-[450px] "
    >
      <div className="h-27 mt-2  flex-row border-b border-gray-200 ">
        <div className="h-15 flex w-full flex-shrink flex-row justify-start">
          <div className="w-15 mb-6 ml-6 mr-1 mt-6 flex">
            <img
              src={userCard.image_url}
              alt="profile"
              className="w-14.5 h-14.5 rounded-full "
            />
          </div>
          <div className="p ml-2 flex flex-col justify-center text-left">
            <h2 className="text-md font-bold antialiased">
              {userCard.username}
            </h2>
            <span className="text-sm text-gray-500">
              {' '}
              {userCard.self_level.charAt(0).toUpperCase() +
                userCard.self_level.slice(1)}
              {userCard.tourn_level ? ' | ' + userCard.tourn_level : ''}
            </span>
          </div>
        </div>
      </div>
      <div className="max-h-100 flex w-full flex-col">
        <div className="h-25">
          <h2 className="text-md mb-3 ml-5 mt-4 font-bold">
            Playing preferences
          </h2>
          <div className="mx-6  mt-1 flex flex-wrap justify-start ">
            {userCard.singles_play && (
              <div className="mx-1.5 my-1 rounded-lg border-0.5 bg-green-100 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Singles</p>
              </div>
            )}
            {userCard.doubles_play && (
              <div className="mx-1.5 my-1 rounded-lg border-0.5 bg-green-100 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Doubles</p>
              </div>
            )}
            {userCard.open_play && (
              <div className="mx-1.5 my-1 rounded-lg border-0.5 bg-green-100 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Open Play</p>
              </div>
            )}
            {userCard.light_hitting && (
              <div className="mx-1.5 my-1 rounded-lg border-0.5 bg-green-100 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">
                  Light hitting
                </p>
              </div>
            )}
            {userCard.training_drills && (
              <div className="mx-1.5 my-1 rounded-lg border-0.5 bg-green-100 px-3 py-0.5">
                <p className="text-center text-sm text-blue-600">Drills</p>
              </div>
            )}
            {!userCard.training_drills &&
              !userCard.doubles_play &&
              !userCard.singles_play &&
              !userCard.open_play &&
              !userCard.light_hitting && (
                <div className="mx-1.5 my-1 rounded-lg border-0.5 border-dashed border-gray-500 px-3 ">
                  <p className="text-center text-sm">None</p>
                </div>
              )}
          </div>
        </div>
        <div className="h-25 flex w-full flex-col">
          <div className="basis-1/3">
            <h2 className="text-md ml-5 mt-3 w-full font-bold">Availability</h2>
          </div>

          <div className="mx-6 mb-1 mt-2 flex inline-flex space-x-1">
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
            </div>
          </div>
          <div className="mx-6 mb-1 flex inline-flex space-x-1">
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
            </div>
          </div>
        </div>
        <div id="moreinfo" className="mb-4">
          <h2 className="text-md ml-5 mt-3 font-bold">Weather tolerance</h2>
          <div className="mx-6 mb-1.5 mt-2 flex-row space-x-3 ">
            {userCard.weather_cold && (
              <div className="py-0.1 mb-1 inline-flex items-center justify-center rounded-lg border-0.5 border-blue-400 px-3 py-0.5 pt-1 ">
                <ColdIcon className="mr-1 inline h-4 w-4" />
                <p className="text-center text-xs">Cold</p>
                <CheckIcon className="ml-1 mt-0.5 inline h-4 w-4 text-blue-400" />
              </div>
            )}
            {!userCard.weather_cold && (
              <div className="py-0.1 mb-1 inline-flex items-center justify-center rounded-lg border-0.5 border-red-600 px-3 py-0.5 pt-1 ">
                <ColdIconRed className="text-red mr-1 inline h-4 w-4" />
                <p className="text-center text-xs">Cold</p>
                <XMarkIcon className="ml-1 mt-0.5 inline h-4 w-4 text-red-500" />
              </div>
            )}
            {userCard.weather_windy && (
              <div className="mb-1 inline-flex items-center justify-center rounded-lg border-0.5 border-blue-400 px-3 py-0.5 pt-1 ">
                <WindyIcon className="mr-1 inline h-4 w-4" />
                <p className="text-center text-xs">Windy</p>
                <CheckIcon className="ml-1 mt-0.5 inline h-4 w-4 text-blue-400" />
              </div>
            )}
            {!userCard.weather_windy && (
              <div className="mb-1 inline-flex items-center justify-center rounded-lg border-0.5 border-red-600 px-3 py-0.5 pt-1 ">
                <WindyIconRed className="mr-1 inline h-4 w-4" />
                <p className="text-center text-xs">Windy</p>
                <XMarkIcon className="ml-1 mt-0.5 inline h-4 w-4 text-red-500" />
              </div>
            )}
          </div>
          <h2 className="text-md ml-5 mt-3 font-bold">Player info</h2>
          <div className="mx-6 mb-1 mt-2 flex-row  ">
            <p className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm ">
              {userCard.about_player}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
