'use client';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { CourtIcon, CourtTestIcon } from '../components';
import { courts } from '@/app/lib/court-data';
import { roboto } from '../fonts';
import {
  InformationCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CourtInfoTabs({
  setSelectedCourt,
  selectedCourt,
  playerCounts,
}: {
  setSelectedCourt: (value: number) => void;
  selectedCourt: number;
  playerCounts: { [key: string]: number };
}) {
  return (
    <div className="bg-highlight-green mt-2 mt-4 flex max-w-xl flex-col  overflow-y-scroll rounded-2xl border-gray-300 px-4 pb-4 sortbreakxsm:w-[400px] lg:mt-0 lg:w-full ">
      <Tab.Group selectedIndex={selectedCourt} onChange={setSelectedCourt}>
        <Tab.List className="border-green-badge bg-highlight-green sticky top-0 z-10 flex space-x-8 border-b-2 text-blue-600   ">
          {courts.map((court) => (
            <Tab as={Fragment} key={court.index}>
              {({ selected }) => (
                <button
                  className={`flex flex-grow justify-center py-4 text-base hover:text-black  focus:outline-none focus:ring-0
                    ${
                      selected
                        ? ' border-green-logo rounded-t-xl border-b-4 font-semibold'
                        : ''
                    }
                  `}
                >
                  {court.shortname}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="m-2 ">
          {courts.map((court) => (
            <Tab.Panel
              key={court.index}
              className=" flex flex-grow flex-col rounded-xl p-1 text-blue-600 md:p-3"
            >
              <div>
                <div key="court-header" className="mb-2 lg:mb-6">
                  <h3 className="text-lg font-semibold md:text-xl ">
                    {court.name}
                  </h3>
                  <p className="text-xs md:text-sm ">{court.address}</p>
                </div>
                <div
                  id="zoomed-map-mobile"
                  className="mb-4 flex flex-col overflow-hidden rounded-xl p-2 lg:hidden "
                >
                  {court.value === 'poplar' && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.4586741298912!2d-75.15141762314481!3d39.9674483918796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c879db028577%3A0x6911618782ff5464!2s880%20N%208th%20St%2C%20Philadelphia%2C%20PA%2019123!5e0!3m2!1sen!2sus!4v1714679365574!5m2!1sen!2sus"
                      className="flex-shrink-1 h-full w-full"
                      loading="lazy"
                    />
                  )}
                  {court.value === 'fairmount' && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1528.3992327117278!2d-75.18810542750073!3d39.990608903614074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c7904167072b%3A0x6d326b0fa0cd8e87!2sFairmount%20Park%20Tennis%20Courts!5e0!3m2!1sen!2sus!4v1714679573506!5m2!1sen!2sus"
                      className="flex-shrink-1 h-full w-full"
                      loading="lazy"
                    />
                  )}
                  {court.value === 'fdr' && (
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12242.637668621068!2d-75.19412656466805!3d39.904257037536354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c56c4d0a90af%3A0xeb510b8690d0383!2sTennis%20Court%20at%20FDR%20park!5e0!3m2!1sen!2sus!4v1714679505106!5m2!1sen!2sus"
                      className="flex-shrink-1 h-full w-full"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex  justify-between">
                  <div key="court-details" className="flex flex-col">
                    <div
                      key="court-details-header"
                      className="mb-4 flex items-center"
                    >
                      <CourtTestIcon className="z-0 mr-2 h-4 w-4 rotate-90 transform" />
                      <p
                        className={`${roboto.className} text-xs tracking-widest`}
                      >
                        COURT DETAILS
                      </p>
                    </div>
                    <div
                      key="detail-topics"
                      className="flex flex-col space-y-1 text-sm"
                    >
                      <div id="number-courts" className="flex space-x-1">
                        <p className=" font-semibold">Number of courts:</p>{' '}
                        <p className="">{court.courts}</p>
                      </div>
                      <div id="court-type" className="flex space-x-1">
                        <p className=" font-semibold">Surface:</p>{' '}
                        <p className="">
                          {court.type
                            .split('-')
                            .join(' ')
                            .replace(/^\w/, (l) => l.toUpperCase())}
                        </p>
                      </div>
                      <div id="court-lights" className="flex space-x-1">
                        <p className=" font-semibold">Lights:</p>{' '}
                        <p className="">{court.lights ? 'Yes' : 'No'}</p>
                      </div>
                      <div id="court-bathrooms" className="flex space-x-1">
                        <p className=" font-semibold">Bathrooms:</p>{' '}
                        <p className="">{court.bathrooms ? 'Yes' : 'No'}</p>
                      </div>
                      <div id="court-water" className="flex space-x-1">
                        <p className=" font-semibold">Water Fountains:</p>{' '}
                        <p className="">{court.water ? 'Yes' : 'No'}</p>
                      </div>
                      <div id="court-parking" className="flex space-x-1">
                        <p className=" font-semibold">Parking:</p>{' '}
                        <p className="">
                          {court.parking.replace(/^\w/, (l) => l.toUpperCase())}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="zoomed-map" className="ml-4 hidden p-4 lg:block">
                    {court.value === 'poplar' && (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d764.4586741298912!2d-75.15141762314481!3d39.9674483918796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c879db028577%3A0x6911618782ff5464!2s880%20N%208th%20St%2C%20Philadelphia%2C%20PA%2019123!5e0!3m2!1sen!2sus!4v1714679365574!5m2!1sen!2sus"
                        className="flex-shrink-1 h-full w-full"
                        loading="lazy"
                      />
                    )}
                    {court.value === 'fairmount' && (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1528.3992327117278!2d-75.18810542750073!3d39.990608903614074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c7904167072b%3A0x6d326b0fa0cd8e87!2sFairmount%20Park%20Tennis%20Courts!5e0!3m2!1sen!2sus!4v1714679573506!5m2!1sen!2sus"
                        className="flex-shrink-1 h-full w-full"
                        loading="lazy"
                      />
                    )}
                    {court.value === 'fdr' && (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12242.637668621068!2d-75.19412656466805!3d39.904257037536354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c56c4d0a90af%3A0xeb510b8690d0383!2sTennis%20Court%20at%20FDR%20park!5e0!3m2!1sen!2sus!4v1714679505106!5m2!1sen!2sus"
                        className="flex-shrink-1 h-full w-full"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div key="court-players" className="flex flex-col">
                  <div
                    key="court-players-header"
                    className="mb-4 mt-8 flex items-center"
                  >
                    <UserGroupIcon className="mr-2 h-5 w-5 " />
                    <p
                      className={`${roboto.className} text-xs tracking-widest`}
                    >
                      PLAYERS
                    </p>
                  </div>
                  <div
                    key="player-topics"
                    className="flex flex-col space-y-1 text-sm"
                  >
                    <div id="number-players" className="flex ">
                      <p className=" font-semibold">Number of players:</p>{' '}
                      <p className="mx-1">{playerCounts[court.value]}</p>
                      <div className="ml-3">
                        <Link
                          href={`/dashboard?filters=%7B"${court.value}"%3Atrue%7D`}
                          className="hover:text-green-logo underline"
                        >
                          View players
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div key="court-info" className="flex h-full flex-col">
                  <div
                    key="court-info-header"
                    className="mb-4 mt-8 flex items-center"
                  >
                    <InformationCircleIcon className="mr-2 h-5 w-5 " />
                    <p
                      className={`${roboto.className} text-xs tracking-widest`}
                    >
                      MORE INFO
                    </p>
                  </div>

                  <div id="more-info" className="flex w-full">
                    <p className="text-sm md:text-base">{court.description}</p>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
