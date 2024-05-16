import SideNav from '@/app/ui/dashboard/topnav-final';
import { fetchSafeUser, fetchUserCardData } from '../lib/data';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  let card = null;
  const userData = await fetchSafeUser();
  const cardCheck = await fetchUserCardData();
  if (!cardCheck || !userData) {
    throw new Error('unable to access user card data');
  }
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
