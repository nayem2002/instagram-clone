import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { signOut, useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar, closeSidebar } from '../feature/modelSlice';

export default function ProfileSidebar() {
  const { sidebar } = useSelector((state) => state.model);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  return (
    <div>
      <Drawer
        anchor="right"
        open={sidebar}
        onClose={() => dispatch(closeSidebar())}
      >
        <Box
          sx={{ width: 300, height: '100vh' }}
          onClick={() => dispatch(openSidebar())}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h2 className="text-3xl font-semibold mx-auto mt-2">
                Your profile
              </h2>
              <div className="flex mt-32 flex-col items-center">
                <img
                  className="w-32 h-32 rounded-full object-cover mb-6"
                  src={session?.user?.image}
                  alt={session?.user?.name}
                />
                <p className="text-2xl font-semibold">{session?.user?.name}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="w-full bg-yellow-500 text-white py-3 font-semibold text-xl hover:bg-yellow-400"
            >
              Log out
            </button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
