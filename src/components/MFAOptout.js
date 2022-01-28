
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from "react-router";
 
const MFAOptout = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => <Redirect to="/mfa-out" />}>MFA optout </button>;
};
 
export default MFAOptout;