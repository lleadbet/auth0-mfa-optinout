
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect, useHistory } from "react-router";
 
const MFAOptout = () => {
  const { loginWithRedirect } = useAuth0();
  let history = useHistory()
  return <button onClick={() => history.push('/mfa-out')}>MFA optout </button>;
};
 
export default MFAOptout;