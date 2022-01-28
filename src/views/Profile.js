import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import MFAOptin from "../components/MFAOptin";
import MFAOptout from "../components/MFAOptout";

export const ProfileComponent = () => {
  const { user, getIdTokenClaims } = useAuth0();
  const [idToken, setIDToken] = useState({})

  useEffect(()=>{
    if(!idToken.sub){ // checks for sub attribute, which exists on all id tokens
      getIDToken()
    }
  })

  const getIDToken = async () => {
    const idt = await getIdTokenClaims()
    console.log(idt)
    setIDToken({...idt})
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row className="mb-5 pb-5">
        {idToken && !idToken.amr && 
          <MFAOptin />
        }
        {idToken && idToken.amr && idToken.amr.includes("mfa") &&
          <MFAOptout />
        }
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
