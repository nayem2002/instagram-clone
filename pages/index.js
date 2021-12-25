import Head from 'next/head';
import NavSection from '../components/NavSection';
import NewsFeed from '../components/NewsFeed';
import Story from '../components/Story';
import ProfileSection from '../components/ProfileSection';
import { useSession } from 'next-auth/react';
import Model from '../components/Model';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <Head>
        <title>Instagram Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavSection />
        <div
          className={` mx-6 lg:mx-auto ${
            session
              ? 'max-w-screen-lg  grid grid-cols-3 space-x-8 relative'
              : 'max-w-3xl'
          }`}
        >
          <div className="md:col-span-2 col-span-3 ">
            <Story />
            <NewsFeed />
          </div>
          {session && (
            <div className=" relative hidden md:block ">
              <div className="fixed max-w-xs">
                <ProfileSection />
              </div>
            </div>
          )}
          <Model />
        </div>
      </div>
    </div>
  );
}
