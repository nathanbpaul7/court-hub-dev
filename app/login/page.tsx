import ChubLogo from '@/app/ui/chub-logo';
import LoginForm from '@/app/ui/login-form';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default function LoginPage() {
  const cookieStore = cookies();
  const registeredTrue = cookieStore.has('registered');
  const registerFailed = cookieStore.has('register_failed');
  let registered = false;
  let registerFailFlag = false;

  if (registeredTrue) {
    // Display success message
    registered = true;
  }
  if (registerFailed) {
    // Display failure message
    registerFailFlag = true;
  }
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <div className="bg-green-logo flex h-20 w-full  items-center rounded-lg p-3">
          <div className="ml-4 w-40 text-white md:w-40">
            <Link href={'/'}>
              <ChubLogo />
            </Link>
          </div>
        </div>
        {registered && (
          <span className="inline p-2 text-blue-500 ">
            {' '}
            You&apos;ve successfully registered! Login below to get started.{' '}
          </span>
        )}
        {registerFailFlag && (
          <span className="inline p-2 text-red-500 ">
            {' '}
            Registration failed. Please try again by clicking register below.{' '}
          </span>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
