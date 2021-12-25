import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import SinglePost from './SinglePost';
import CircularProgress from '@mui/material/CircularProgress';

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [lodding, setLodding] = useState(false);

  // post featching firebase

  useEffect(() => {
    if (lodding) return;
    setLodding(true);
    return onSnapshot(
      query(collection(db, 'post'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
        setLodding(false);
      }
    );
  }, [db]);

  return (
    <>
      {lodding ? (
        <div className="flex items-center justify-center mt-12">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          {posts.map((carentPost) => (
            <SinglePost
              key={carentPost.id}
              id={carentPost.id}
              post={carentPost.data()}
            />
          ))}
        </>
      )}
    </>
  );
};

export default NewsFeed;
