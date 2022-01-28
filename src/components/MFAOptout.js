
import React from "react";
import { useHistory } from "react-router";
 
const MFAOptout = () => {
  let history = useHistory()
  return <button onClick={() => history.push('/mfa-out')}>MFA optout </button>;
};
 
export default MFAOptout;