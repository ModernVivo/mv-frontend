import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { NavBar } from "~/features/navbar/";
import { Footer } from "../footer";
import { useAppSelector } from '~/hooks/reduxHooks';
import { PUBLIC_PATHS } from '~/constants';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const CURRENT_PATH: string = router.asPath.split('?')[0] ?? '';

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, [token]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in 
    const path: string = url.split('?')[0] ?? '';
    if (!token && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  if (!authorized) {
    return null
  }

  if (PUBLIC_PATHS.includes(CURRENT_PATH)) {
    return children;
  }

  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
