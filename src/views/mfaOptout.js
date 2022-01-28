import React, { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";

export const MFAOptoutPage = () => {
    const { getAccessTokenWithPopup } = useAuth0();
    const [accessToken, setAccessToken] = useState('')
    const [isFinished, setFinishedState] = useState('')

    useEffect(()=>{
        if(!accessToken){
            getAccessToken()
        }
    }, [accessToken, setAccessToken])


    const getAccessToken = async () => {
        let t = await getAccessTokenWithPopup({
            acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor', 
            audience: 'https://lucasleadbetter-sandbox.us.auth0.com/mfa/', 
            scope:'read:authenticators remove:authenticators',
            redirectUri:`${window.location.origin}/mfa-out`
        })
        setAccessToken(t)
        getMFAEnrollmentsAndDelete(t)
    }

    const getMFAEnrollmentsAndDelete = async (token) => {
       const res = await fetch(`https://lucasleadbetter-sandbox.us.auth0.com/mfa/authenticators`, {headers:{Authorization: `Bearer ${token}`}})
       const mfaEnrollments = await res.json()
       console.log(mfaEnrollments)

       for(let mfa of mfaEnrollments){
        let res = await fetch(`https://lucasleadbetter-sandbox.us.auth0.com/mfa/authenticators/${mfa.id}`, {
            headers:{Authorization: `Bearer ${token}`},
            method: "DELETE"
           })
           console.log(res.status)
       }
       setFinishedState(true)
    }
    return (
        <div>
            {isFinished && 
                <div>
                    You've succesfully opted out of MFA. 
                </div>
            }
            {!isFinished && 
                <Loading />
            }
        </div>


    )
}

export default MFAOptoutPage