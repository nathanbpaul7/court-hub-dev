import { fetchSafeUser, fetchUserNotificationSettings } from '@/app/lib/data';
import EmailNotifForm from '@/app/ui/settings/email-notif-form';
import ResetPasswordModal from '@/app/ui/settings/reset-password-dialog';
import { auth } from '@/auth';
import { UserIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';

export default async function Page() {
  const userData = await fetchSafeUser(); // need to write new fetch function to grab user data around email notifications
  if (!userData) {
    throw new Error(
      'unable to access user account data and unable to load page',
    );
  }
  const session = await auth();
  if (!session?.user)
    throw new Error(
      'unable to access user session data to view account info, you are not logged in',
    );
  const notificationSettings = await fetchUserNotificationSettings(
    userData.email,
  );
  if (!notificationSettings) {
    throw new Error(
      'unable to access user notification settings data to view account info',
    );
  }
  const cookieStore = cookies();
  const resetTrue = cookieStore.has('reset');
  const resetFailed = cookieStore.has('reset_failed');
  let resetFlag = false;
  if (resetTrue) resetFlag = true;
  else resetFlag = false;

  return (
    <main className="mt-8 flex h-[80vh] w-full max-w-[1100px] flex-col justify-start  px-4 text-blue-600 md:py-2">
      {resetTrue && (
        <div className="mb-4 flex rounded-lg bg-highlight-green p-2">
          <span className="text-small p-2 text-blue-600 ">
            You&apos;ve successfully reset your password!
          </span>
        </div>
      )}
      {resetFailed && (
        <div className="my-4 rounded-lg bg-highlight-green p-2">
          <span className="inline p-2 text-red-500 ">
            Password reset failed. Please try again.
          </span>
        </div>
      )}
      <div className="flex flex-col ">
        <h1 className="mb-2 text-lg font-bold">Account Info</h1>
        <div className="mt-2 flex items-start">
          <UserIcon className="mt-2 h-8 w-8 text-green-logo" />
          <div className="ml-6  flex flex-col">
            <p className="font-semibold">
              Name: <span className="font-normal"> {userData.username}</span>
            </p>
            <p className="font-semibold">
              Email: <span className="font-normal">{userData.email} </span>
            </p>
            {session.user.provider === 'credentials' && (
              <ResetPasswordModal
                userData={userData}
                resetFormOpen={resetFlag}
              />
            )}
          </div>
        </div>
      </div>

      <EmailNotifForm
        email={userData.email}
        notificationSettings={notificationSettings}
      />
    </main>
  );
}
