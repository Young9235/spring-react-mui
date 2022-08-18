import { useState } from 'react';
import AuthenticationService from 'src/components/AuthenticationService';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ----------------------------------------------------------------------

export default function Router() {
  const [isLoggedIn] = useState(AuthenticationService.isUserLoggedIn());

  console.log(isLoggedIn);

  return <div>{isLoggedIn ? <MainRoutes /> : <LoginRoutes />}</div>;
}
