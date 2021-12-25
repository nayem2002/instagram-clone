import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { closeModel } from '../feature/modelSlice';
import { forwardRef, useRef } from 'react';
import PostFunction from './PostFunction';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

export default function Model() {
  const { model } = useSelector((state) => state.model);
  const dispatch = useDispatch();
  return (
    <div>
      <Dialog
        open={model}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => dispatch(closeModel())}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* model content component */}

        <PostFunction />
      </Dialog>
    </div>
  );
}
