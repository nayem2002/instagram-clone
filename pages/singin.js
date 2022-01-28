import {
  getProviders,
  getSession,
  signIn as signInProvider,
} from 'next-auth/react';
import NavSection from '../components/NavSection';
import Image from 'next/image';

const SignIn = ({ providers }) => {
  return (
    <>
      <NavSection />
      <div
        style={{ height: 'calc(100vh - 64px' }}
        className="w-100% flex items-center justify-center flex-col sm:space-y-20 space-y-14 text-center"
      >
        <div className="-mt-32 grid place-items-center">
          <div className="relative sm:w-72 w-52 object-contain sm:h-24 h-16">
            <Image
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="logo"
              layout="fill"
            />
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur <br />
            adipisicing elit. Modi, voluptas!
          </p>
        </div>

        {Object.values(providers).map((provider) => (
          <div key={provider.name} className="align-center">
            <button
              className="bg-blue-600 py-3 px-4 rounded-xl text-sm text-white hover:bg-blue-800"
              onClick={() => signInProvider(provider.id, { callbackUrl: '/' })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SignIn;

export async function getServerSideProps(contex) {
  const providers = await getProviders();
  const session = await getSession(contex);
  return {
    props: { providers, session },
  };
}
