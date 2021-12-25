import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import NavSection from '../components/NavSection';
import CommentPage from '../components/CommentPage';
import SinglePost from '../components/SinglePost';

const CommentComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const [featchComment, setFeatchComment] = useState([]);
  const [post, setPost] = useState([]);
  console.log(id);

  console.log(featchComment);

  useEffect(
    () =>
      onSnapshot(doc(db, 'post', id), (snapshort) => {
        setPost(snapshort.data());
      }),
    [db, id]
  );

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

  console.log(post);
  return (
    <>
      <NavSection />
      <div className="max-w-3xl mx-auto">
        <SinglePost post={post} id={id} />
        <CommentPage comment={featchComment} />
      </div>
    </>
  );
};

export default CommentComponent;
