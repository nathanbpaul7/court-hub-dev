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
  if (!userData) {
    throw new Error('unable to access user account data');
  }
  if (cardCheck) {
    card = cardCheck;
  }
  return (
    <div className="relative flex flex-col items-center overflow-hidden ">
      <div className="flex w-full ">
        <SideNav userData={userData} card={card} />
      </div>
      <div
        id="pageroot"
        className="flex h-screen w-full justify-center overflow-hidden  "
      >
        {children}
      </div>
      <div className="flex h-40 w-full justify-center bg-green-logo p-4 text-white ">
        <div className=" grid w-full grid-cols-2 items-center space-y-4 text-center">
          <div className="flex h-full w-full items-center justify-center">
            <span>
              <h2>
                © Court Hub 2024, developed by Nathan Paul for CS50x final
                project
              </h2>
            </span>
          </div>
          <div className="flex h-full w-full items-center justify-center border-l border-white">
            <span>
              <h2>Accesibility info</h2>
              <h2>Privacy Policy</h2>
              <h2>Terms of Service</h2>
              <h2>Contact / Support</h2>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
