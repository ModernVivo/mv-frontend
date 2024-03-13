import Image from "next/image";
import { useRouter } from "next/router";
import { get } from "lodash";

import { useAppDispatch } from '~/hooks/reduxHooks';
import { doLogout } from '~/store/slices/authSlice';
import { useAppSelector } from '~/hooks/reduxHooks';

export default function NavBar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const CURRENT_USER = useAppSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(doLogout());
  }

  const first_name = get(CURRENT_USER, 'first_name');

  return (
    <div className="flex items-center justify-between bg-text-primary px-8 py-4 shadow-lg">
      <Image
        src="/mv_text_logo_white.png"
        alt="logo"
        width={225}
        height={30}
        className="cursor-pointer"
        onClick={() => void router.push("/")}
      />
      <div>
        {first_name && <span className="text-gray-50 mr-5">Welcome, {get(CURRENT_USER, 'first_name')}!</span>}
        <button className="bg-blue-600 text-white hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
