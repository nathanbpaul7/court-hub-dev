import SideNav from '@/app/ui/dashboard/topnav-final';
import { fetchSafeUser, fetchUserCardData } from '../lib/data';
import { SafeUser } from '../lib/definitions';
import { signOut } from '@/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let card = null;
  const userData = await fetchSafeUser();
  const cardCheck = await fetchUserCardData();

  if (cardCheck) {
    card = cardCheck;
  }
  return (
    <div className="flex flex-col items-center ">
      <div className="flex w-full ">
        <SideNav userData={userData} card={card} />
      </div>
      <div
        id="pageroot"
        className="flex h-screen w-full justify-center overflow-y-scroll "
      >
        {children}
      </div>
    </div>
  );
}
