import faker from 'faker';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { fackUserData } from './DrmmyData';

const Story = () => {
  const [res, setRes] = useState(fackUserData);
  const { data: session } = useSession();

  // useEffect(() => {
  //   const res = [...Array(20)].map((_, i) => {
  //     return {
  //       ...faker.helpers.contextualCard(),
  //       id: i,
  //     };
  //   });
  //   setRes(res);
  // }, []);
  // console.log(res.map(({ avatar }) => avatar));
  return (
    <>
      <div className="bg-white px-2 flex items-center space-x-3 mt-8 py-6 shadow-sm w-100% overflow-x-scroll scrollbar-hide">
        {session && (
          <div className="relative">
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="w-16 h-16 object-cover rounded-full cursor-pointer border-2 border-red-400 p-1"
            />
            <p className="text-xs tranc w-16 truncate text-center ">
              Your story
            </p>
            <p className="absolute bottom-3 -right-1 w-8 cursor-pointer border-2 border-white  bg-blue-500 rounded-full grid z-10 place-items-center">
              <span className="text-lg font-semibold text-white">+</span>
            </p>
          </div>
        )}

        {res.map(({ id, avatar, user }) => (
          <div key={id} className="">
            <img
              src={avatar}
              alt=""
              className="w-16 h-16 object-cover rounded-full cursor-pointer border-2 border-red-400 p-1"
            />
            <p className="text-xs tranc w-16 truncate text-center ">{user}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Story;
