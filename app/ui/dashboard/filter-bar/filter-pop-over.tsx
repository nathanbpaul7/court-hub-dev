import { Popover, Transition, Switch } from '@headlessui/react';
import { ChangeEvent, Fragment } from 'react';
import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { XCircleIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ColdIcon, TennisTravel, WindyIcon } from '../../components';
import { DisplayCard } from '@/app/lib/definitions';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { set } from 'zod';
import CourtSelect from './court-select-radio';

export default function FilterPopover({ userCard }: { userCard: DisplayCard }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const appendFilter = useDebouncedCallback(
    (filterOptions: { [key: string]: boolean }) => {
      console.log(`Filtering...`);
      const params = new URLSearchParams(searchParams);

      // Create a filters object
      const filters: { [key: string]: boolean } = {};

      // Iterate over the filterOptions object
      for (const [key, value] of Object.entries(filterOptions)) {
        if (value) filters[key] = value;
        else delete filters[key];
      }
      if (Object.keys(filters).length === 0) {
        params.delete('levels');
      } else {
        // Stringify the filters object and set it as a query parameter
        params.set('levels', JSON.stringify(filters));
      }

      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  const setFilter = useDebouncedCallback(
    (filterOptions: { [key: string]: boolean }) => {
      console.log(`Filtering...`);
      const params = new URLSearchParams(searchParams);

      // Create a filters object
      const filters: { [key: string]: boolean } = {};

      // Iterate over the filterOptions object and fix the key if it's a today filter
      for (const [key, value] of Object.entries(filterOptions)) {
        let adjustedKey = key;
        if (key.startsWith('today_')) {
          const todayTest = new Date().getDay();
          if (todayTest === 0 || todayTest === 6) {
            adjustedKey = key.replace('today_', 'weekend_');
          } else {
            adjustedKey = key.replace('today_', 'weekday_');
          }
          if (value) filters[adjustedKey] = value;
          else delete filters[adjustedKey];
        } else {
          if (value) filters[key] = value;
          else delete filters[key];
        }
      }

      // Stringify the filters object and set it as a query parameter
      if (Object.keys(filters).length === 0) {
        params.delete('filters');
      } else {
        params.set('filters', JSON.stringify(filters));
      }
      replace(`${pathname}?${params.toString()}`);
    },
    500,
  );

  const clearFilter = useDebouncedCallback(() => {
    console.log(`Clearing filter...`);
    const params = new URLSearchParams(searchParams);
    searchParams.forEach((value, key) => {
      if (key !== 'query') {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const [buttonClicked, setButtonClicked] = useState({
    singles_play: false,
    doubles_play: false,
    open_play: false,
    light_hitting: false,
    training_drills: false,
    weekday_early_am: false,
    weekday_late_am: false,
    weekday_early_pm: false,
    weekday_late_pm: false,
    weekday_evening: false,
    weekend_early_am: false,
    weekend_late_am: false,
    weekend_early_pm: false,
    weekend_late_pm: false,
    weekend_evening: false,
    weather_cold: false,
    weather_windy: false,
    today_early_am: false,
    today_late_am: false,
    today_early_pm: false,
    today_late_pm: false,
    today_evening: false,
    poplar: false,
    fdr: false,
    fairmount: false,
    will_travel: false,
  });

  const handleClearClick = () => {
    setButtonClicked({
      singles_play: false,
      doubles_play: false,
      open_play: false,
      light_hitting: false,
      training_drills: false,
      weekday_early_am: false,
      weekday_late_am: false,
      weekday_early_pm: false,
      weekday_late_pm: false,
      weekday_evening: false,
      weekend_early_am: false,
      weekend_late_am: false,
      weekend_early_pm: false,
      weekend_late_pm: false,
      weekend_evening: false,
      weather_cold: false,
      weather_windy: false,
      today_early_am: false,
      today_late_am: false,
      today_early_pm: false,
      today_late_pm: false,
      today_evening: false,
      poplar: false,
      fdr: false,
      fairmount: false,
      will_travel: false,
    });
    setIsCheckedLevel({
      beginner: false,
      intermediate: false,
      advanced: false,
    });
    setIsChecked({
      today: true,
      weekdays: false,
      weekends: false,
    });
    setAvailEnabled(false);
    setPrefEnabled(false);
    clearFilter();
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = (event.currentTarget as HTMLButtonElement).id;
    setButtonClicked((prevState) => {
      const updatedState = {
        ...prevState,
        [buttonId]: !prevState[buttonId as keyof typeof prevState],
      };

      setFilter(updatedState);
      return updatedState;
    });
  };

  const [isChecked, setIsChecked] = useState({
    today: true,
    weekdays: false,
    weekends: false,
  });

  const [isCheckedLevel, setIsCheckedLevel] = useState({
    beginner: false,
    intermediate: false,
    advanced: false,
  });

  const handleCheckboxClick = (event: ChangeEvent<HTMLInputElement>) => {
    const checkboxId = (event.target as HTMLInputElement).id;
    if (
      checkboxId === 'beginner' ||
      checkboxId === 'intermediate' ||
      checkboxId === 'advanced'
    ) {
      setIsCheckedLevel((prevState) => {
        const updatedState = {
          ...prevState,
          [checkboxId]: !prevState[checkboxId as keyof typeof prevState],
        };
        appendFilter(updatedState);
        return updatedState;
      });
    } else if (
      checkboxId === 'today' ||
      checkboxId === 'weekdays' ||
      checkboxId === 'weekends'
    ) {
      setIsChecked((prevState) => ({
        ...prevState,
        [checkboxId]: !prevState[checkboxId as keyof typeof prevState],
      }));
    }
  };

  const [availEnabled, setAvailEnabled] = useState(false);

  const flagAvailToggler = (newEnabledState: boolean) => {
    setAvailEnabled(newEnabledState);
    if (newEnabledState) {
      setIsChecked((prevState) => ({
        ...prevState,
        today: false,
        weekdays: true,
        weekends: true,
      }));
      setButtonClicked((prevState) => {
        const updatedState = {
          ...prevState,
          weekday_early_am: userCard.weekday_early_am,
          weekday_late_am: userCard.weekday_late_am,
          weekday_early_pm: userCard.weekday_early_pm,
          weekday_late_pm: userCard.weekday_late_pm,
          weekday_evening: userCard.weekday_evening,
          weekend_early_am: userCard.weekend_early_am,
          weekend_late_am: userCard.weekend_late_am,
          weekend_early_pm: userCard.weekend_early_pm,
          weekend_late_pm: userCard.weekend_late_pm,
          weekend_evening: userCard.weekend_evening,
        };
        setFilter(updatedState);
        return updatedState;
      });
    } else {
      setIsChecked((prevState) => ({
        ...prevState,
        today: true,
        weekdays: false,
        weekends: false,
      }));
      setButtonClicked((prevState) => {
        const updatedState = {
          ...prevState,
          weekday_early_am: false,
          weekday_late_am: false,
          weekday_early_pm: false,
          weekday_late_pm: false,
          weekday_evening: false,
          weekend_early_am: false,
          weekend_late_am: false,
          weekend_early_pm: false,
          weekend_late_pm: false,
          weekend_evening: false,
        };
        setFilter(updatedState);
        return updatedState;
      });
    }
  };
  const [prefEnabled, setPrefEnabled] = useState(false);
  const flagPlayPrefToggle = (newEnabledState: boolean) => {
    setPrefEnabled(newEnabledState);
    if (newEnabledState) {
      setButtonClicked((prevState) => {
        const updatedState = {
          ...prevState,
          singles_play: userCard.singles_play,
          doubles_play: userCard.doubles_play,
          open_play: userCard.open_play,
          light_hitting: userCard.light_hitting,
          training_drills: userCard.training_drills,
        };
        setFilter(updatedState);
        return updatedState;
      });
    } else {
      setButtonClicked((prevState) => {
        const updatedState = {
          ...prevState,
          singles_play: false,
          doubles_play: false,
          open_play: false,
          light_hitting: false,
          training_drills: false,
        };
        setFilter(updatedState);
        return updatedState;
      });
    }
  };
  const flagTravelToggle = (newEnabledState: boolean) => {
    setButtonClicked((prevState) => {
      const updatedState = {
        ...prevState,
        will_travel: newEnabledState,
      };
      setFilter(updatedState);
      return updatedState;
    });
  };

  return (
    <div className="z-20">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${
                open ? ' text-highlight-green focus:border-blue-600' : ''
              } bg-green-logo hover:text-highlight-green flex inline-flex rounded-2xl px-4 py-2 text-white  text-white`}
            >
              <AdjustmentsHorizontalIcon className=" h-5 w-5 " />
              <p className="text-md mx-1 antialiased sortbreakxsm:mx-2.5">
                Filter
              </p>
            </Popover.Button>
            {/* <Popover.Overlay className="fixed inset-0  bg-black opacity-30" /> */}

            <Transition
              as={Fragment}
              enter="transition ease-out duration-400"
              enterFrom=" opacity-0"
              enterTo="opacity-100 translate-x-0"
              leave="transition ease-in duration-400"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo=" opacity-0"
            >
              <Popover.Panel
                as="div"
                className="fixed left-0 top-0 z-20  w-full min-w-[343px]   md:absolute md:mt-2 md:w-screen md:max-w-[1400px] md:translate-y-10 "
              >
                {({ close }) => (
                  <div className=" z-20 flex flex-col border-t border-black/5 bg-gray-100 shadow-lg ring-1 ring-black/5 md:w-[65%] md:max-w-[450px] md:rounded-xl sortbreaksm:max-w-[530px] lg:max-w-[750px]">
                    <div
                      id="header"
                      className="col-span-full mt-1 flex h-auto flex-col  border-b-0.5 border-gray-400"
                    >
                      <div className=" ml-4 mt-2 flex flex-grow border-gray-400">
                        {' '}
                        <h1 className=" whitespace-nowrap px-2 pt-2 text-left text-sm font-semibold text-black sm:mr-2 md:text-base">
                          Filter players by the following criteria:
                        </h1>
                        <button
                          className="ml-auto"
                          onClick={(event) => close()}
                        >
                          <XMarkIcon className=" mr-2 h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                      <div className="justify-left mb-2 ml-4 mt-2 flex flex-wrap items-center gap-y-2 rounded-lg px-2 py-1">
                        <AvailToggle
                          flagAvailToggler={flagAvailToggler}
                          enabled={availEnabled}
                        />
                        <span className="whitespace-no-wrap ml-2 mr-4 text-xs newcard:text-sm ">
                          My Availability
                        </span>
                        <PlayPrefToggle
                          flagPlayPrefToggler={flagPlayPrefToggle}
                          enabled={prefEnabled}
                        />
                        <span className="whitespace-no-wrap ml-2 mr-2 text-xs newcard:text-sm">
                          My Play Preferences
                        </span>
                        <button
                          className="text-center lg:ml-auto"
                          onClick={handleClearClick}
                        >
                          <XCircleIcon className="ml-1 inline h-5 w-5 text-gray-700" />
                          <span className="whitespace-no-wrap ml-1 mr-2 text-xs text-gray-700 underline newcard:text-sm">
                            Clear selected filters
                          </span>
                        </button>
                      </div>
                    </div>
                    <div
                      id="filter-scrollable"
                      className=" h-[80vh] overflow-y-scroll rounded-lg md:h-full "
                    >
                      <div
                        id="level+courts"
                        className="m-4 grid h-auto grid-cols-1 px-4 lg:grid lg:grid-cols-2 lg:space-x-6"
                      >
                        <div className="col-span-1 mb-4 flex flex-col lg:mb-2">
                          <span className=" mb-2 text-sm font-semibold">
                            Courts
                            <p className="ml-2 inline text-sm text-gray-500">
                              Select a court to filter players by location
                            </p>
                          </span>
                          <button
                            onClick={handleButtonClick}
                            id="poplar"
                            className="mt-2 flex items-center justify-start"
                          >
                            <span
                              className={`border-green-logo relative ml-1 flex flex-grow cursor-pointer rounded-lg border-0.5 px-5 py-2  focus:outline-none ${
                                buttonClicked.poplar
                                  ? 'bg-green-logo border-green-logo text-white'
                                  : 'border-green-logo'
                              }`}
                            >
                              <div className="flex w-full flex-grow items-center justify-between">
                                <div className="flex flex-grow items-center text-left">
                                  <div className="">
                                    <p className="font-medium">
                                      East Poplar Park
                                    </p>
                                    <span
                                      className={`text inline text-sm text-gray-500 ${
                                        buttonClicked.poplar ? 'text-white' : ''
                                      }`}
                                    >
                                      {' '}
                                      880 N 8th St, Philadelphia, PA
                                    </span>
                                  </div>
                                </div>
                                {buttonClicked.poplar && (
                                  <div className="pl-4 ">
                                    <CheckIcon className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                            </span>
                          </button>
                          <button
                            onClick={handleButtonClick}
                            id="fairmount"
                            className="mt-2  flex items-center "
                          >
                            <span
                              className={`border-green-logo relative ml-1 flex flex-grow cursor-pointer rounded-lg border-0.5 px-5 py-2  focus:outline-none ${
                                buttonClicked.fairmount
                                  ? 'bg-green-logo border-green-logo text-white'
                                  : 'border-green-logo'
                              }`}
                            >
                              <div className="flex w-full flex-grow items-center justify-between">
                                <div className="flex items-center text-left">
                                  <div className="">
                                    <p className="font-medium">
                                      Fairmount Park
                                    </p>
                                    <span
                                      className={`text inline text-sm text-gray-500 ${
                                        buttonClicked.fairmount
                                          ? 'text-white'
                                          : ''
                                      }`}
                                    >
                                      {' '}
                                      3300 Ridge Ave, Philadelphia, PA
                                    </span>
                                  </div>
                                </div>
                                {buttonClicked.fairmount && (
                                  <div className="pl-4 ">
                                    <CheckIcon className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                            </span>
                          </button>
                          <button
                            onClick={handleButtonClick}
                            id="fdr"
                            className="mt-2 flex items-center justify-start"
                          >
                            <span
                              className={`border-green-logo relative ml-1 flex flex-grow cursor-pointer rounded-lg border-0.5 px-5 py-2  focus:outline-none ${
                                buttonClicked.fdr
                                  ? 'bg-green-logo border-green-logo text-white'
                                  : 'border-green-logo'
                              }`}
                            >
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center text-left">
                                  <div className="">
                                    <p className="font-medium">FDR Park</p>
                                    <span
                                      className={`text inline text-sm text-gray-500 ${
                                        buttonClicked.fdr ? 'text-white' : ''
                                      }`}
                                    >
                                      {' '}
                                      3300 Ridge Ave, Philadelphia, PA
                                    </span>
                                  </div>
                                </div>
                                {buttonClicked.fdr && (
                                  <div className="pl-4 ">
                                    <CheckIcon className="h-5 w-5" />
                                  </div>
                                )}
                              </div>
                            </span>
                          </button>
                          <div className=" mt-4 flex items-center justify-between ">
                            <TennisTravel className="mx-2 h-8 w-8 flex-shrink-0" />
                            <span className=" text-sm ">
                              Include players who are willing to travel to any
                              court
                            </span>
                            <div className="ml-2 ">
                              <TravelToggle
                                flagTravelToggle={flagTravelToggle}
                                enabled={buttonClicked['will_travel']}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 flex flex-col">
                          <span className=" mb-4 text-sm font-semibold">
                            Level
                          </span>
                          <div className="flex items-center justify-start">
                            <input
                              type="checkbox"
                              id="beginner"
                              className="mr-4 border-2 border-gray-400 p-2"
                              onChange={handleCheckboxClick}
                              checked={isCheckedLevel.beginner}
                            />
                            Beginner (1.0 - 3.0 NTRP rating)
                          </div>
                          <div className="mt-2 flex items-center justify-start">
                            <input
                              type="checkbox"
                              id="intermediate"
                              className="mr-4 border-2 border-gray-400 p-2"
                              onChange={handleCheckboxClick}
                              checked={isCheckedLevel.intermediate}
                            />
                            Intermediate (3.5 - 4.0 NTRP rating)
                          </div>

                          <div className="mt-2 flex items-center justify-start">
                            <input
                              type="checkbox"
                              id="advanced"
                              className="mr-4 border-2 border-gray-400 p-2"
                              onChange={handleCheckboxClick}
                              checked={isCheckedLevel.advanced}
                            />
                            Advanced (4.0+ NTRP rating)
                          </div>
                        </div>
                      </div>
                      <div
                        id="play_pref"
                        className="m-4 grid h-auto max-h-[200px] grid-cols-1 px-4"
                      >
                        <span className="col-span-1 mb-4 text-sm font-semibold">
                          Playing Preferences
                        </span>
                        <div className=" flex flex-wrap items-center justify-start gap-2">
                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="singles_play"
                            title="Singles"
                          />

                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="doubles_play"
                            title="Doubles"
                          />

                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="open_play"
                            title="Open (odd # players)"
                          />

                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="light_hitting"
                            title="Light Hitting"
                          />

                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="training_drills"
                            title="Training / Drills"
                          />
                        </div>
                      </div>
                      <div
                        id="availability"
                        className="m-4 grid h-auto grid-cols-1 px-4"
                      >
                        <span className="col-span-1 mb-4 text-sm font-semibold">
                          Availability
                        </span>
                        <div>
                          <div
                            id="today-check"
                            className="flex items-center justify-start"
                          >
                            <input
                              type="checkbox"
                              id="today"
                              className="mr-4 border-2 border-gray-400 p-2 accent-green-400"
                              onChange={handleCheckboxClick}
                              checked={isChecked.today}
                            />
                            Today
                          </div>
                          {isChecked.today && (
                            <div
                              id="select-avail-buttons"
                              className="ml-6 mt-2 flex flex-wrap items-center justify-start gap-2"
                            >
                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="today_early_am"
                                title="Early AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="today_late_am"
                                title="Late AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="today_early_pm"
                                title="Early PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="today_late_pm"
                                title="Late PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="today_evening"
                                title="Evening"
                              />
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <div
                            id="weekdays"
                            className="flex items-center justify-start"
                          >
                            <input
                              type="checkbox"
                              id="weekdays"
                              className="mr-4 border-2 border-gray-400 p-2"
                              onChange={handleCheckboxClick}
                              checked={isChecked.weekdays}
                            />
                            Weekdays
                          </div>
                          {isChecked.weekdays && (
                            <div
                              id="select-avail-buttons"
                              className="ml-6 mt-2 flex flex-wrap items-center justify-start gap-2"
                            >
                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekday_early_am"
                                title="Early AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekday_late_am"
                                title="Late AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekday_early_pm"
                                title="Early PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekday_late_pm"
                                title="Late PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekday_evening"
                                title="Evening"
                              />
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <div
                            id="weekends"
                            className="flex items-center justify-start"
                          >
                            <input
                              type="checkbox"
                              id="weekends"
                              className="mr-4 border-2 border-gray-400 p-2"
                              onChange={handleCheckboxClick}
                              checked={isChecked.weekends}
                            />
                            Weekends
                          </div>
                          {isChecked.weekends && (
                            <div
                              id="select-avail-buttons"
                              className="ml-6 mt-2 flex flex-wrap items-center justify-start gap-2"
                            >
                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekend_early_am"
                                title="Early AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekend_late_am"
                                title="Late AM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekend_early_pm"
                                title="Early PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekend_late_pm"
                                title="Late PM"
                              />

                              <PillSelect
                                buttonClicked={buttonClicked}
                                handleButtonClick={handleButtonClick}
                                id="weekend_evening"
                                title="Evening"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        id="weather"
                        className="m-4 grid h-auto max-h-[160px] grid-cols-1 px-4 pb-4"
                      >
                        <span className="col-span-1 mb-4 text-sm font-semibold">
                          Weather Tolerance
                        </span>
                        <div className="flex flex-wrap items-center justify-start gap-2">
                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="weather_cold"
                            title={
                              <>
                                <ColdIcon
                                  className={`mr-2 inline h-4 w-4 ${
                                    buttonClicked['weather_cold']
                                      ? 'fill-white'
                                      : 'text-blue-500'
                                  }`}
                                />
                                Cold
                              </>
                            }
                          />

                          <PillSelect
                            buttonClicked={buttonClicked}
                            handleButtonClick={handleButtonClick}
                            id="weather_windy"
                            title={
                              <>
                                <WindyIcon
                                  className={`mr-2 inline h-4 w-4 ${
                                    buttonClicked['weather_windy']
                                      ? 'fill-white'
                                      : 'text-blue-500'
                                  }`}
                                />
                                Windy
                              </>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function AvailToggle({
  flagAvailToggler,
  enabled,
}: {
  flagAvailToggler: (enabled: boolean) => void;
  enabled: boolean;
}) {
  const handleChange = () => {
    const newEnabledState = !enabled;
    flagAvailToggler(newEnabledState);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">Set filter to my availability</span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
function PlayPrefToggle({
  flagPlayPrefToggler,
  enabled,
}: {
  flagPlayPrefToggler: (enabled: boolean) => void;
  enabled: boolean;
}) {
  const handleChange = () => {
    const newEnabledState = !enabled;
    flagPlayPrefToggler(newEnabledState);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">Set filter to my playing preferences</span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
function PillSelect({
  buttonClicked,
  handleButtonClick,
  id,
  title,
}: {
  buttonClicked: any;
  handleButtonClick: any;
  id: string;
  title: string | any;
}) {
  return (
    <button
      id={id}
      type="button"
      className={`rounded-full border px-6 py-2 text-xs text-blue-600 ${
        buttonClicked[id]
          ? 'bg-green-logo border-green-logo text-white'
          : 'border-green-logo'
      }`}
      onClick={handleButtonClick}
    >
      {' '}
      {title}{' '}
    </button>
  );
}
function TravelToggle({
  enabled,
  flagTravelToggle,
}: {
  enabled: boolean;
  flagTravelToggle: (enabled: boolean) => void;
}) {
  const handleChange = () => {
    flagTravelToggle(!enabled);
  };

  return (
    <Switch
      as="button"
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">
        I&apos;m able to travel to other courts besides my home court to play
      </span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
