import { useEffect, useState } from 'react';
import { fackUserData } from './DrmmyData';

const Suggest = () => {
  const [suggestId, setSuggestId] = useState(fackUserData);

  return (
    <>
      <div>
        {suggestId.slice(0, 4).map(({ id, avatar, user }) => (
          <div key={id} className="flex justify-between items-center space-y-8">
            <div className="flex items-center space-x-3 ">
              <img
                src={avatar}
                alt={user}
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
              />

              <div>
                <p className="text-sm tranc w-16 truncate text-center cursor-pointer font-semibold ">
                  {user}
                </p>
                <p className="text-xs text-gray-400">Follow for you</p>
              </div>
            </div>
            <p className="text-sm text-blue-500 cursor-pointer hover:text-blue-700">
              Follow
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Suggest;
