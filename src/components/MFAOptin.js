import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
 
const MFAOptin = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect({ acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor', redirectUri:`${window.location.origin}/profile`})}>MFA optin </button>;
};
 
export default MFAOptin;