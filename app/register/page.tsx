import RegisterForm from '../ui/registration/register-form';
import ChubLogo from '@/app/ui/chub-logo';
import { fetchExistingUsers } from '../lib/data';
import { ChubLogoGraphic } from '../ui/components';

export default async function Page() {
  const userData = await fetchExistingUsers();
  const usernames = userData.usernames;
  const emails = userData.emails;

  return (
    <main className="flex items-center justify-center overflow-y-scroll">
      <div className="relative mx-auto flex w-full max-w-[1000px] flex-col space-y-2.5 p-4 ">
        <div className="bg-green-logo flex h-20 w-full items-center rounded-lg p-3">
          <div className="ml-4 flex h-full w-full items-center">
            <ChubLogoGraphic className="w-1/8 h-2/3"></ChubLogoGraphic>
          </div>
        </div>
        <RegisterForm userNames={usernames} emails={emails} />
      </div>
    </main>
  );
}
