import { HiOutlineEmojiHappy } from 'react-icons/hi';
import { useRef, useState } from 'react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import CancelIcon from '@mui/icons-material/Cancel';

import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import { closeModel } from '../feature/modelSlice';
import { useDispatch } from 'react-redux';

const PostFunction = () => {
  const targetImage = useRef();
  const [post, setPost] = useState('');
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [lodding, setLodding] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  //   Add emoji functionality

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setPost(post + emoji);
  };

  // File targating functonality

  const handleFile = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
  };

  //   Uploading data on firebase functionality

  const onSubmit = async () => {
    if (lodding) return;
    setLodding(true);
    try {
      const docRef = await addDoc(collection(db, 'post'), {
        userName: session.user.name,
        userImage: session.user.image,
        userTag: session.user.username,
        userId: session.user.uid,
        postTitle: post,
        timestamp: serverTimestamp(),
      });
      const imageRef = ref(storage, `post/${docRef.id}/image`);
      if (file) {
        await uploadString(imageRef, file, 'data_url').then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'post', docRef.id), {
            image: downloadURL,
          });
        });
      }
      setPost('');
      setFile(null);
      dispatch(closeModel());
    } catch (e) {
      alert(e.message);
    }
    setLodding(false);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div
        className={`${
          lodding && 'opacity-60'
        } w-80 p-3 space-y-3 overflow-y-visible static`}
      >
        <div className="mt-3 flex flex-col items-center space-y-2">
          {!file && (
            <>
              <span
                onClick={() => targetImage.current.click()}
                className="bg-red-400 rounded-full cursor-pointer p-3 text-white"
              >
                <CameraAltOutlinedIcon />
              </span>
              <input
                onChange={handleFile}
                type="file"
                hidden
                ref={targetImage}
              />
            </>
          )}
          {/* slected photo here */}

          {file && (
            <div className="relative w-full">
              <CancelIcon
                style={{ fontSize: '25px' }}
                onClick={() => setFile(null)}
                className="absolute cursor-pointer top-2 left-3 hover:text-red-600"
              />
              <img
                className="w-full object-contain max-h-44 rounded-xl"
                src={file}
                alt="image"
              />
            </div>
          )}
          <h2 className="font-semibold">Upload photo</h2>
        </div>
        <div className="flex items-center flex-col space-y-3">
          <div className="flex items-center space-x-2 w-full">
            <HiOutlineEmojiHappy
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ fontSize: '30px', cursor: 'pointer' }}
            />
            {/* eomji section here */}

            {showEmojiPicker && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: 'absolute',
                  boxShadow: '0px 10px 15px -3px rgb(0 0 0 / 40%)',
                  borderRedius: '20px',
                  width: 240,
                  right: 20,
                  zIndex: 33,
                }}
                showSkinTones={false}
                showPreview={false}
              />
            )}

            <input
              type="text"
              placeholder="Enter your caption"
              className="outline-none "
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          {!lodding && (
            <button
              onClick={onSubmit}
              disabled={!post.trim() && !file}
              type="button"
              className="disabled:opacity-50 bg-red-600 hover:bg-red-500 w-full py-2 text-white font-semibold text-base"
            >
              Upload
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostFunction;
