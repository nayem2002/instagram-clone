import { useRouter } from 'next/dist/client/router';
import { useSession } from 'next-auth/react';
import Suggest from './Suggest';
import ProfileSidebar from './ProfileSidebar';
import { useDispatch } from 'react-redux';
import { openSidebar } from '../feature/modelSlice';

const ProfileSection = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <>
      <div className=" mt-14">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={session?.user?.image}
              alt="image"
              className="rounded-full w-12 h-12 object-cover cursor-pointer"
            />
            <div>
              <p className=" font-semibold text-sm cursor-pointer hover:underline">
                {session?.user?.name}
              </p>
              <p className="text-gray-400 text-xs">
                @{session?.user?.username}
              </p>
            </div>
          </div>
          <p
            onClick={() => dispatch(openSidebar())}
            className="text-blue-500 cursor-pointer text-sm"
          >
            Vlew profile
          </p>
        </div>
        <div className="flex items-center justify-between my-6">
          <p className="text-gray-400 text-sm">Suggestions For You</p>
          <p className="text-sm cursor-pointer">See All</p>
        </div>

        {/* suggest component here */}
        <div>
          <Suggest />
        </div>
        <div className="mt-12 text-xs text-gray-400 space-y-3">
          <p>
            About .Help .Press .API .Jobs .Privacy. Terms. Locations. Top.
            Accounts. Hash. tags. Language
          </p>
          <p>© 2021 INSTAGRAM FROM META</p>
        </div>
      </div>
      <ProfileSidebar />
    </>
  );
};

export default ProfileSection;
