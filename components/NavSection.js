import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import {
  AiTwotoneHome,
  AiOutlineCompass,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineCamera,
} from 'react-icons/ai';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { signIn, useSession } from 'next-auth/react';
import { openModel, openSidebar } from '../feature/modelSlice';
import { useDispatch } from 'react-redux';

const NavSection = () => {
  const route = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-white shadow-sm px-6 lg:px-0 w-100% h-16 sticky z-50 top-0">
        <div className="flex items-center justify-between max-w-screen-lg mx-auto h-16">
          <div className="">
            <div className="relative h-8 sm:w-28 w-24 object-contain cursor-pointer">
              <Image
                onClick={() => route.push('/')}
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
                layout="fill"
              />
            </div>
          </div>
          <div>
            <div className="relative hidden sm:inline-flex bg-gray-100 w-64 border-2 rounded-sm flex items-center">
              <AiOutlineSearch className="pointer-events-none text-xl ml-2" />

              <input
                type="text"
                placeholder="Search"
                className="outline-none px-2 p-1 bg-gray-100 w-60"
              />
            </div>
          </div>
          <div className="flex space-x-4 text-2xl items-center">
            <AiTwotoneHome className="iconStyle" />

            {session ? (
              <>
                <HiOutlinePaperAirplane className="rotate-45 hidden sm:block transform iconStyle" />
                <AiOutlineCamera
                  onClick={() => dispatch(openModel())}
                  className="iconStyle"
                />
                <AiOutlineCompass className="iconStyle " />
                <AiOutlineHeart className="iconStyle hidden sm:block" />
                <img
                  onClick={() => dispatch(openSidebar())}
                  src={session.user.image}
                  alt="image"
                  className="rounded-full w-8 h-8 object-cover cursor-pointer"
                />
              </>
            ) : (
              <button
                className="text-base font-semibold tracking-wide"
                onClick={()=> route.push("/singin")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSection;
