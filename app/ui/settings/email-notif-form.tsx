'use client';
import { Switch } from '@headlessui/react';
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useFormStatus, useFormState } from 'react-dom';
import { updateEmailPrefs } from '@/app/lib/actions';
import { User } from 'next-auth';
import { NotificationSettings } from '@/app/lib/definitions';
import clsx from 'clsx';

export default function EmailNotifForm({
  email,
  notificationSettings,
}: {
  email: string;
  notificationSettings: NotificationSettings;
}) {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(updateEmailPrefs, initialState);

  const [marketingEnabled, setMarketingEnabled] = useState(
    notificationSettings.marketing,
  );
  const [inboxEnabled, setInboxEnabled] = useState(notificationSettings.inbox);
  const [courtUpdateEnabled, setCourtUpdateEnabled] = useState(
    notificationSettings.court_updates,
  );
  const [settingsChangeFlag, setSettingsChangeFlag] = useState(false);

  useEffect(() => {
    setSettingsChangeFlag(
      marketingEnabled !== notificationSettings.marketing ||
        inboxEnabled !== notificationSettings.inbox ||
        courtUpdateEnabled !== notificationSettings.court_updates,
    );
  }, [
    marketingEnabled,
    inboxEnabled,
    courtUpdateEnabled,
    notificationSettings,
  ]);

  return (
    <form action={dispatch} className="text-blue-600">
      <div>
        <input type="hidden" name="email" value={email} />
        <input
          type="hidden"
          name="marketing_enabled"
          value={marketingEnabled ? 'true' : 'false'}
        />
        <input
          type="hidden"
          name="inbox_enabled"
          value={inboxEnabled ? 'true' : 'false'}
        />
        <input
          type="hidden"
          name="courtupdates_enabled"
          value={courtUpdateEnabled ? 'true' : 'false'}
        />
        <div className="my-2 flex flex-col">
          <h1 className="mt-4 text-lg font-bold">Email Notifications</h1>
        </div>
        <div className="mb-2 mt-4 flex  items-center gap-2">
          <ChatBubbleLeftRightIcon className=" mr-2 inline h-8 w-8 flex-shrink-0 text-green-logo" />

          <div className="ml-2 flex flex-col ">
            <h1 className="font-semibold tracking-wide antialiased ">
              Player Interactions
            </h1>
            <span className="text-sm text-blue-600 ">
              Receive emails when players message you or you have invitations to
              play.
            </span>
          </div>
          <div className="sm:mt-4">
            <InboxToggle
              setInboxEnabled={setInboxEnabled}
              enabled={inboxEnabled}
            />
          </div>
        </div>
        <div className="mb-2 mt-4 flex  items-center gap-2">
          <CalendarDaysIcon className=" mr-2 inline h-8 w-8 flex-shrink-0 text-green-logo" />

          <div className="ml-2 flex flex-col ">
            <h1 className="font-semibold tracking-wide antialiased ">
              Court Updates
            </h1>
            <span className=" text-sm text-blue-600 ">
              Receive emails about schedule changes and events at your home
              court location.
            </span>
          </div>
          <div className="sm:mt-4">
            <CourtUpdateToggle
              setCourtUpdateEnabled={setCourtUpdateEnabled}
              enabled={courtUpdateEnabled}
            />
          </div>
        </div>
        <div className="mb-2 mt-4 flex  items-center gap-2">
          <EnvelopeOpenIcon className=" mr-2 inline h-8 w-8 flex-shrink-0 text-green-logo" />

          <div className="ml-2 flex flex-col ">
            <h1 className="font-semibold tracking-wide antialiased ">
              Court Hub Newsletter
            </h1>
            <span className=" text-sm text-blue-600 ">
              Receive monthly updates about new features and promotions from
              Court Hub.
            </span>
          </div>
          <div className="sm:mt-4">
            <MarketingToggle
              setMarketingEnabled={setMarketingEnabled}
              enabled={marketingEnabled}
            />
          </div>
        </div>
        <div className="mt-4 flex w-full max-w-2xl justify-end sm:mt-6 md:ml-6">
          <SubmitButton settingsChangeFlag={settingsChangeFlag} />
        </div>
      </div>
    </form>
  );
}
function MarketingToggle({
  enabled,
  setMarketingEnabled,
}: {
  enabled: boolean;
  setMarketingEnabled: (value: boolean) => void;
}) {
  const handleChange = () => {
    setMarketingEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">
        I&apos;d like to receive emails about new features and updates from
        Court Hub about my home court location.
        {/* This includes but is not limited
        to info about clean-up parties, social gatherings, and court scheduling
        updates (example: if a school or city program blocks out a weekly time
        at the court). */}
      </span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

function InboxToggle({
  enabled,
  setInboxEnabled,
}: {
  enabled: boolean;
  setInboxEnabled: (value: boolean) => void;
}) {
  const handleChange = () => {
    setInboxEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">
        I&apos;d like to receive email notifications when players message me or
        I receive invitations to play from the app.
      </span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

function CourtUpdateToggle({
  enabled,
  setCourtUpdateEnabled,
}: {
  enabled: boolean;
  setCourtUpdateEnabled: (value: boolean) => void;
}) {
  const handleChange = () => {
    setCourtUpdateEnabled(!enabled);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className={`${
        enabled ? 'bg-green-logo' : 'bg-gray-300'
      } relative inline-flex h-5 w-10 items-center rounded-full`}
    >
      <span className="sr-only">
        I&apos;d like to receive email notifications when there are schedule
        changes or events at my home court location.
      </span>
      <span
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

export function SubmitButton({
  settingsChangeFlag,
}: {
  settingsChangeFlag: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx(
        'mt-2 flex h-10 w-full items-center justify-center rounded-lg  px-4 text-sm font-medium text-white shadow-md',
        {
          'bg-green-logo': settingsChangeFlag,
          'bg-gray-300': !settingsChangeFlag,
        },
      )}
      type="submit"
      aria-disabled={pending}
      disabled={!settingsChangeFlag}
    >
      {pending ? 'Updating' : 'Update'}
    </button>
  );
}
