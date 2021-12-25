import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { closeFollowModel } from '../feature/modelSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc } from '@firebase/firestore';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 300,
  bgcolor: 'white',
  borderRadius: '12px',
  p: 2,
  px: 4,
  pb: 3,
  outline: 'none',
};

export default function ModelComponent({ id, post }) {
  const dispatch = useDispatch();
  const { followModel } = useSelector((state) => state.model);
  const { data: session } = useSession();

  const handleDelet = async () => {
    await deleteDoc(doc(db, 'post', id));
    dispatch(closeFollowModel());
  };
  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={followModel}
        onClose={() => dispatch(closeFollowModel())}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <div className="grid place-items-center space-y-4 gap-y-2 ">
            <p className="cursor-pointer text-red-500 font-semibold">Report</p>
            {session?.user?.uid === post.userId ? null : (
              <p className="cursor-pointer text-red-500 font-semibold">
                Unfollow
              </p>
            )}
            {session?.user?.uid === post.userId && (
              <p
                onClick={handleDelet}
                className="cursor-pointer text-red-500 font-semibold"
              >
                Delete
              </p>
            )}
            <p className="cursor-pointer">Go to post</p>
            <p className="cursor-pointer">Share to..</p>
            <p className="cursor-pointer">Copy Link</p>
            <p className="cursor-pointer">Embed</p>
            <p
              onClick={() => dispatch(closeFollowModel())}
              className="cursor-pointer"
            >
              Cancel
            </p>
          </div>
        </Box>
      </StyledModal>
    </div>
  );
}
