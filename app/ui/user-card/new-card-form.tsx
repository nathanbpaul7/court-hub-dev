'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { ColdIcon, WindyIcon } from '../components';
import {
  UserCircleIcon,
  ArrowRightCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import AvatarModal from './avatar-modal';
import { PutBlobResult } from '@vercel/blob';
import { Button } from '../button';
import { useFormStatus } from 'react-dom';
import { seedCard } from '@/app/lib/actions';
import HomeCourtSelect from './home-court-radio';
import { Switch } from '@headlessui/react';
import Image from 'next/image';
import { TennisTravel } from '../components';
import { useEffect } from 'react';

type NewCardFormProps = {
  username: string;
};

export default function NewCardForm({
  username,
  closeModal,
}: {
  username: string;
  closeModal: () => void;
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const initialAvatar = {
    url: '',
    downloadUrl: '',
    pathname: '',
    contentType: 'image/jpeg',
    contentDisposition: '',
  } as PutBlobResult;

  const [state, dispatch] = useFormState(seedCard, initialState);
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
  });
  const [travelEnabled, setTravelEnabled] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState('poplar');
  const [newUserBlob, setBlob] = useState(initialAvatar);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = (event.target as HTMLButtonElement).id;
    const hiddenInput = document.getElementById(buttonId) as HTMLInputElement;
    if (hiddenInput?.value === 'true') {
      hiddenInput.value = 'false';
    } else {
      hiddenInput.value = 'true';
    }
    setButtonClicked((prevState) => ({
      ...prevState,
      [buttonId]: !prevState[buttonId as keyof typeof prevState],
    }));
  };

  const handleCourtClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const courtId = (event.target as HTMLImageElement).id;
    setSelectedCourt(courtId);
  };

  const uploadCrop = async (blob: Blob | null) => {
    if (blob) {
      const file = new File([blob], `${username}.jpg`, { type: 'image/jpeg' });
      try {
        const response = await fetch(
          `/api/avatar/upload?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );

        if (response.ok) {
          const newBlob = (await response.json()) as PutBlobResult;
          setBlob(newBlob);
          // Display the image on the form
          const imageElement = document.createElement('img');
          imageElement.src = newBlob.url;
          imageElement.alt = 'Avatar';
          imageElement.className = 'rounded-full';
          const imageContainer = document.getElementById('avatar-container');
          const avatarDisplay = document.getElementById('avatar-display');
          if (avatarDisplay) {
            avatarDisplay.className =
              'h-full mt-2 flex flex-col border-2 p-2 w-full';
          }
          if (imageContainer) {
            imageContainer.innerHTML = '';
            imageContainer.appendChild(imageElement);
          }
        } else {
          console.error('Failed to upload avatar');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  return (
    <form action={dispatch}>
      <input type="hidden" name="username" value={username} />
      <input type="hidden" name="home_court" value={selectedCourt} />
      <input
        type="hidden"
        name="will_travel"
        value={travelEnabled ? 'true' : 'false'}
      />
      <div className="relative mx-auto flex w-full max-w-[1000px] flex-col space-y-2.5 p-4 ">
        <div className="border-b border-gray-100 pb-12">
          <h1 className="text-base text-lg font-semibold leading-7 text-gray-900">
            Create player card for{' '}
            <span className="bold text-blue-600">{username}</span>.
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            This information will be displayed publicly on Court Hub so that
            other players can connect with you. Please be mindful of what you
            share.
          </p>
          <div className="mt-5 grid grid-cols-1 items-center gap-x-6 gap-y-2 md:grid-cols-6">
            <div className="col-span-1 flex   md:col-span-5">
              <label
                htmlFor="about_player"
                className="mt-1 max-w-sm items-center text-sm font-medium leading-3 text-gray-900"
              >
                About:
              </label>

              <p className=" ml-2 max-w-sm break-words text-xs  text-gray-400">
                Write a few sentences about you as a tennis player, or maybe
                leave a note about your playing preferences.
              </p>
            </div>
            <div className="col-span-1 grid md:col-span-3 ">
              <div className="">
                <textarea
                  id="about_player"
                  name="about_player"
                  placeholder="I just started playing tennis..."
                  rows={6}
                  className="block h-full w-full resize-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-1 space-y-2 md:col-span-3">
              <div
                id="avatar-display"
                className="h-max-md flex flex-col rounded-md border-2  "
              >
                <div className=" flex justify-center " id="avatar-container">
                  <UserCircleIcon className="h-20 w-20 text-gray-400" />
                </div>
                <div className="mb-3 justify-center p-2">
                  <AvatarModal onCrop={uploadCrop} />
                </div>
              </div>
            </div>
            <input
              name="image_url"
              type="hidden"
              id="image_url"
              value={newUserBlob?.url}
            />
          </div>
        </div>
        <div id="player-profile" className=" grid grid-cols-6">
          <div className="col-span-full grid">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Player Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Tell us about your preferred types of play, experience level,
              availability, and court preferences to help us match you with
              other players in Philadelphia.
            </p>
          </div>
          <div className=" relative col-span-full mt-4 grid space-y-6 rounded-md border-2 p-3 ">
            <fieldset>
              <legend className="text-md font-semibold leading-6 text-gray-900">
                Preferred Types of Play:{' '}
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Select all that apply
              </p>
              <div className=" mt-3 space-y-6">
                <div className="gap-y-3 space-x-3 space-y-3">
                  <PillSelect
                    buttonClicked={buttonClicked}
                    handleButtonClick={handleButtonClick}
                    id="singles_play"
                    title="Singles"
                  />
                  <input
                    type="hidden"
                    id="singles_play"
                    name="singles_play"
                    value={buttonClicked['singles_play'] ? 'true' : 'false'}
                  />
                  <PillSelect
                    buttonClicked={buttonClicked}
                    handleButtonClick={handleButtonClick}
                    id="doubles_play"
                    title="Doubles"
                  />
                  <input
                    type="hidden"
                    id="doubles_play"
                    name="doubles_play"
                    value={buttonClicked['doubles_play'] ? 'true' : 'false'}
                  />
                  <PillSelect
                    buttonClicked={buttonClicked}
                    handleButtonClick={handleButtonClick}
                    id="open_play"
                    title="Open Play*"
                  />
                  <input
                    type="hidden"
                    id="open_play"
                    name="open_play"
                    value={buttonClicked['open_play'] ? 'true' : 'false'}
                  />
                  <PillSelect
                    buttonClicked={buttonClicked}
                    handleButtonClick={handleButtonClick}
                    id="light_hitting"
                    title="Light Hitting"
                  />
                  <input
                    type="hidden"
                    id="light_hitting"
                    name="light_hitting"
                    value={buttonClicked['light_hitting'] ? 'true' : 'false'}
                  />
                  <PillSelect
                    buttonClicked={buttonClicked}
                    handleButtonClick={handleButtonClick}
                    id="training_drills"
                    title="Training / Drills"
                  />
                  <input
                    type="hidden"
                    id="training_drills"
                    name="training_drills"
                    value={buttonClicked['training_drills'] ? 'true' : 'false'}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-start ">
                <p className=" max-w-md break-words text-xs">
                  * catch-all for those willing to play with an odd # of
                  players, rotating games like king of the court, etc.
                </p>
              </div>
            </fieldset>
            <div className="mt-4">
              <legend className="text-md font-semibold  text-gray-900">
                Player Properties
              </legend>
              <p className="mt-2 text-sm text-gray-600">
                Tell us a little about your game!
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-6 ">
              <div className="col-span-1 grid md:col-span-3">
                <label
                  htmlFor="self_level"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Your Playing Level
                </label>
                <div className="">
                  <select
                    id="self_level"
                    name="self_level"
                    className="block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  >
                    <option disabled>Take your best guess...</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Beginner-Intermediate">
                      Beginner-Intermediate
                    </option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Intermediate-Advanced">
                      Intermediate-Advanced
                    </option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 grid md:col-span-3">
                <label
                  htmlFor="tourn_level"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tournament Level (if known)
                </label>
                <div className="">
                  <select
                    id="tourn_level"
                    name="tourn_level"
                    className="block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  >
                    <option disabled>Select from options...</option>
                    <option value={0}>n/a</option>
                    <option value={1.0}>1.0</option>
                    <option value={1.5}>1.5</option>
                    <option value={2.0}>2.0</option>
                    <option value={2.5}>2.5</option>
                    <option value={3.0}>3.0</option>
                    <option value={3.5}>3.5</option>
                    <option value={4.0}>4.0</option>
                    <option value={4.5}>4.5</option>
                    <option value={5.0}>5.0</option>
                  </select>
                </div>
              </div>
              <div className="col-span-1 mb-2 grid md:col-span-3 md:mt-4">
                <label
                  htmlFor="tourn_level"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Years of Experience{' '}
                  <p className="inline text-xs"> (approximate)</p>
                </label>
                <div className="">
                  <select
                    id="years_xp"
                    name="years_xp"
                    className="block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  >
                    <option disabled>Select from range</option>
                    <option value={0}>Less than 1 year</option>
                    <option value={1}>1-3 years</option>
                    <option value={2}>3-5 years</option>
                    <option value={3}>5+ years</option>
                    <option value={4}>10+ years</option>
                    <option value={5}>20+ years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-4 flex flex-col rounded-md border-2 p-3 ">
          <legend className="text-md font-semibold text-gray-900">
            Court Preference:
          </legend>
          <p className="mb-4 mt-2 text-sm leading-6 text-gray-600">
            Set where you prefer to play as your <b>home court.</b>
          </p>
          <div className="flex flex-col items-start lg:flex-row lg:items-start  lg:gap-2">
            <div className="relative mb-4 overflow-hidden rounded-md newcard:ml-4 sm:ml-6 lg:mx-4 lg:mb-0">
              <Image
                src="/philly-map.png"
                alt="Philly Court Map"
                width={400}
                height={200}
                className="flex-shrink-0 "
              />
              <Image
                src="/tennis-ball.png"
                id="poplar"
                alt="Poplar Court"
                width={35}
                height={35}
                onClick={handleCourtClick}
                className={`absolute right-[28%] top-[27.5%] flex-shrink-0 rounded-full ring-green-100 hover:ring-4 ${
                  selectedCourt === 'poplar' ? 'ring-4 ring-green-100' : ''
                }`}
              />
              <Image
                src="/tennis-ball.png"
                alt="Fairmount Court"
                id="fairmount"
                width={35}
                height={35}
                onClick={handleCourtClick}
                className={`absolute left-[33.5%] top-[5.5%] flex-shrink-0 rounded-full ring-green-100 hover:ring-4 ${
                  selectedCourt === 'fairmount' ? 'ring-4 ring-green-100' : ''
                }`}
              />
              <Image
                src="/tennis-ball.png"
                alt="FDR Court"
                id="fdr"
                width={35}
                height={35}
                onClick={handleCourtClick}
                className={`absolute bottom-[3%] left-[42%] flex-shrink-0 rounded-full ring-green-100 hover:ring-4 ${
                  selectedCourt === 'fdr' ? 'ring-4 ring-green-100' : ''
                }`}
              />
            </div>

            <HomeCourtSelect
              setSelectedCourt={setSelectedCourt}
              selectedCourt={selectedCourt}
            />
          </div>
          <div className="mb-2 mt-6 flex items-center gap-2">
            <div>
              <TravelToggle
                setTravelEnabled={setTravelEnabled}
                enabled={travelEnabled}
              />
            </div>
            <span className=" text-sm text-blue-600 antialiased sm:text-sm ">
              I can travel to other courts to meet players
            </span>
            <TennisTravel className=" mr-2 inline h-10 w-10 flex-shrink-0" />
          </div>
        </div>
        <div className="col-span-full mt-4 space-y-7 rounded-md border-2 p-3 lg:col-span-3 lg:ml-2">
          <fieldset>
            <legend className="text-md font-semibold leading-6 text-gray-900">
              Weekday Availability:
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select all that apply
            </p>
            <div className="mt-3 space-y-6">
              <div className="gap-y-3 space-x-3 space-y-3">
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekday_early_am"
                  title="Early AM"
                />
                <input
                  type="hidden"
                  id="weekday_early_am"
                  name="weekday_early_am"
                  value={buttonClicked['weekday_early_am'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekday_late_am"
                  title="Late AM"
                />
                <input
                  type="hidden"
                  id="weekday_late_am"
                  name="weekday_late_am"
                  value={buttonClicked['weekday_late_am'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekday_early_pm"
                  title="Early PM"
                />
                <input
                  type="hidden"
                  id="weekday_early_pm"
                  name="weekday_early_pm"
                  value={buttonClicked['weekday_early_pm'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekday_late_pm"
                  title="Late PM"
                />
                <input
                  type="hidden"
                  id="weekday_late_pm"
                  name="weekday_late_pm"
                  value={buttonClicked['weekday_late_pm'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekday_evening"
                  title="Evening"
                />
                <input
                  type="hidden"
                  id="weekday_evening"
                  name="weekday_evening"
                  value={buttonClicked['weekday_evening'] ? 'true' : 'false'}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-md font-semibold leading-6 text-gray-900">
              Weekend Availability
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select all that apply
            </p>
            <div className="mt-3 space-y-6">
              <div className="gap-y-3 space-x-3 space-y-3">
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekend_early_am"
                  title="Early AM"
                />
                <input
                  type="hidden"
                  id="weekend_early_am"
                  name="weekend_early_am"
                  value={buttonClicked['weekend_early_am'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekend_late_am"
                  title="Late AM"
                />
                <input
                  type="hidden"
                  id="weekend_late_am"
                  name="weekend_late_am"
                  value={buttonClicked['weekend_late_am'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekend_early_pm"
                  title="Early PM"
                />
                <input
                  type="hidden"
                  id="weekend_early_pm"
                  name="weekend_early_pm"
                  value={buttonClicked['weekend_early_pm'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekend_late_pm"
                  title="Late PM"
                />
                <input
                  type="hidden"
                  id="weekend_late_pm"
                  name="weekend_late_pm"
                  value={buttonClicked['weekend_late_pm'] ? 'true' : 'false'}
                />
                <PillSelect
                  buttonClicked={buttonClicked}
                  handleButtonClick={handleButtonClick}
                  id="weekend_evening"
                  title="Evening"
                />
                <input
                  type="hidden"
                  id="weekend_evening"
                  name="weekend_evening"
                  value={buttonClicked['weekend_evening'] ? 'true' : 'false'}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-md font-semibold leading-6 text-gray-900">
              Weather Tolerance
            </legend>
            <p className="mt-0 text-sm leading-6 text-gray-600">
              Cold is considered below 50°F. It&apos;s okay if you don&apos;t
              like playing in bad weather!
            </p>
            <div className="mb-3 mt-3 space-y-6">
              <div className="gap-y-3 space-x-3 space-y-3">
                <input
                  type="hidden"
                  id="weather_cold"
                  name="weather_cold"
                  value={buttonClicked['weather_cold'] ? 'true' : 'false'}
                />
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
                <input
                  type="hidden"
                  id="weather_windy"
                  name="weather_windy"
                  value={buttonClicked['weather_windy'] ? 'true' : 'false'}
                />
              </div>
            </div>
          </fieldset>
        </div>{' '}
        <div className="col-span-full  flex flex-row items-center justify-between gap-4">
          {state.errors?.image_url &&
            state.errors.image_url.map((error: string) => (
              <p className=" text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          {state.message && (
            <p className=" text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}

          <div className="col-span-full ml-auto flex flex-row items-center gap-4">
            <div className="mt-2 flex inline-flex items-center gap-2 text-center">
              <button
                className="rounded-lg bg-gray-200 px-3 py-2 text-left text-sm text-gray-600 shadow-sm transition-colors hover:bg-gray-300"
                onClick={() => closeModal()}
              >
                Cancel
                <XCircleIcon className=" ml-1 inline h-5 w-5 text-right text-gray-600" />
              </button>
              <SubmitButton closeModal={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </form>
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
      className={`rounded-full border px-6 py-2 text-blue-500 ${
        buttonClicked[id]
          ? 'bg-green-logo border-blue-600 text-white'
          : 'border-blue-600 hover:bg-green-100'
      }`}
      onClick={handleButtonClick}
    >
      {' '}
      {title}{' '}
    </button>
  );
}

function SubmitButton({ closeModal }: { closeModal: () => void }) {
  const { pending } = useFormStatus();
  const [wasPending, setWasPending] = useState(false);

  return (
    <button
      className="rounded-lg bg-blue-600 px-3 py-2 text-left text-sm text-white shadow-sm transition-colors hover:text-green-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      type="submit"
      aria-disabled={pending}
    >
      Done
      <ArrowRightCircleIcon className=" ml-1 inline h-5 w-5 text-right  " />
    </button>
  );
}
function TravelToggle({
  enabled,
  setTravelEnabled,
}: {
  enabled: boolean;
  setTravelEnabled: (value: boolean) => void;
}) {
  const handleChange = () => {
    setTravelEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-yellow-50'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">
        I&apos;m willing and able to travel to other courts besides my home
        court to play
      </span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
