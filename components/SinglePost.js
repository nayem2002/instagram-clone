import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { IoIosMore } from 'react-icons/io';
import { FaRegComment, FaRegBookmark } from 'react-icons/fa';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { BsEmojiSmile } from 'react-icons/bs';
import { openFollowModel } from '../feature/modelSlice';
import { useDispatch } from 'react-redux';
import ModelComponent from './ModelComponent';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Moment from 'react-moment';
import { useRouter } from 'next/dist/client/router';

const SinglePost = ({ post, id }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [featchComment, setFeatchComment] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  // likes setup function

  const handleLikeFunction = async () => {
    try {
      if (like) {
        await deleteDoc(doc(db, 'post', id, 'likes', session.user.uid));
      } else {
        await setDoc(doc(db, 'post', id, 'likes', session.user.uid), {
          userName: session.user.name,
        });
      }
    } catch (e) {
      alert('Please login first then commment');
    }
  };

  // add emaji

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };
  // likes featching

  useEffect(
    () =>
      onSnapshot(collection(db, 'post', id, 'likes'), (snapshot) => {
        setUserLikes(snapshot.docs);
      }),
    [db, id]
  );
  useEffect(
    () =>
      setLike(
        userLikes.findIndex(
          (carrentLike) => carrentLike.id === session?.user?.uid
        ) !== -1
      ),
    [userLikes]
  );

  // comment upload

  const onComment = async () => {
    try {
      const docRef = await addDoc(collection(db, 'post', id, 'comment'), {
        comment: comment,
        userName: session.user.name,
        userTag: session.user.username,
        userImage: session.user.image,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      alert('Please login first then commment');
    }
    setShowEmojiPicker(false);
    setComment('');
  };

  // fatching comment data

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'post', id, 'comment'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setFeatchComment(snapshot.docs);
        }
      ),
    [db, id]
  );

  return (
    <>
      <div className="mt-7 bg-white p-3 mb-8 shadow-sm max-h-instaHeiht">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img
              src={post?.userImage}
              alt=""
              className="w-12 h-12 object-cover rounded-full border-2 cursor-pointer border-red-400 p-1"
            />
            <div>
              <p className="text-sm font-semibold cursor-pointer hover:underline ">
                {post?.userName}
              </p>
              <p className="text-xs cursor-pointer opacity-60 ">
                {post?.userTag}
              </p>
            </div>
          </div>
          <span
            onClick={() => dispatch(openFollowModel())}
            className="p-3 text-xl hover:bg-gray-100 rounded-full transition-all duration-150 cursor-pointer"
          >
            <IoIosMore />
          </span>
        </div>
        {/* model component here */}
        <ModelComponent id={id} post={post} />
        <div className="flex items-center justify-center">
          <img className="object-center max-h-96" src={post.image} />
        </div>
        <div className="flex justify-between items-center text-xl mt-1">
          <div className="flex items-center">
            {/* like function here */}
            <div
              className="p-3 text-2xl hover:bg-gray-100 text-red-500  rounded-full transition-all duration-150 cursor-pointer"
              onClick={handleLikeFunction}
            >
              {like ? <AiTwotoneHeart /> : <AiOutlineHeart />}
            </div>

            <span className="p-3 hover:bg-gray-100 rounded-full transition-all duration-150 cursor-pointer">
              <FaRegComment />
            </span>
            <span className="p-3 hover:bg-gray-100 rounded-full transition-all duration-150 cursor-pointer">
              <HiOutlinePaperAirplane className="transform rotate-45 " />
            </span>
          </div>
          <span className="p-3 hover:bg-gray-100 rounded-full transition-all duration-150 cursor-pointer">
            <FaRegBookmark />
          </span>
        </div>
        <div className="py-1  space-y-2">
          {userLikes.length > 0 && (
            <p className="font-semibold text-base"> {userLikes.length} likes</p>
          )}
          <p className="">{post.postTitle}</p>
          {featchComment.length > 0 && (
            <p
              onClick={() => router.push(`/${id}`)}
              className="text-sm opacity-60 cursor-pointer mb-2"
            >
              View {featchComment.length} comment
            </p>
          )}

          <Moment className="text-sm opacity-50" fromNow>
            {post?.timestamp?.toDate()}
          </Moment>
        </div>
        <hr />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4 ">
            <div className="relative">
              <BsEmojiSmile
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="cursor-pointer hover:opacity-60 relative text-2xl"
              />
              {/* eomji section here */}

              {showEmojiPicker && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    boxShadow: '0px 10px 15px -3px rgb(0 0 0 / 40%)',
                    borderRedius: '10px',
                    width: 240,
                    left: 20,
                    bottom: 30,
                    zIndex: 222,
                  }}
                  showSkinTones={false}
                  showPreview={false}
                />
              )}
            </div>

            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="outline-none"
            />
          </div>
          <button
            onClick={onComment}
            placeholder="Add a comment.."
            type="button"
            disabled={!comment.trim()}
            className="text-blue-500 text-sm disabled:opacity-60 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
