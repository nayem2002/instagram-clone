import { AiOutlineHeart } from 'react-icons/ai';
import Moment from 'react-moment';

const CommentPage = ({ comment }) => {
  return (
    <>
      <div className="px-4 mt-4 bg-white py-3 mb-2 ">
        {comment.map((carent) => (
          <>
            <div className="flex items-start justify-between ">
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 cursor-pointer h-10 rounded-full object-cover"
                  src={carent.data().image}
                  alt=""
                />
                <p className="font-semibold hover:underline cursor-pointer">
                  {carent.data().userName}
                </p>
                <p className="text-sm opacity-70">{carent.data().comment}</p>
              </div>
              <span className="hover:bg-gray-100 transition-all duration-150 p-3 cursor-pointer rounded-full">
                <AiOutlineHeart className="text-xl text-red-500" />
              </span>
            </div>
            <div className="flex ml-14 items-center space-x-3 mb-4">
              <Moment className="opacity-70 text-sm" fromNow>
                {carent?.data()?.timestamp?.toDate()}
              </Moment>
              <p className="text-sm">2 likes</p>
              <p className="cursor-pointer">Reply</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default CommentPage;
