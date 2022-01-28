import React from "react";
import { useHistory } from "react-router";
import { Button, Modal, ModalHeader, ModalBody, Row, Col, ButtonToolbar } from 'reactstrap';
import { getConfig } from "../config";

export const MFAUpsell = () => {
    const history = useHistory()
    const config = getConfig()

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    let sessionToken = params.get('state')
    console.log(sessionToken)

    const makeChoice = (choice) => {
        const params = new URLSearchParams()
        params.set('state', sessionToken)
        params.set('choice', choice)

        const domain = new URL('https://' + config.domain + '/continue')
        domain.search = params
        window.location.href = domain.toString()
        return
    }

    return (
        <div>
            {!sessionToken && history.push('/')}
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                isOpen={true}
            >
                <ModalHeader>Would you like to enable Multifactor Authentication (MFA)?</ModalHeader>
                <ModalBody centered>
                    <Row>
                    <Col>
                    <ButtonToolbar >
                        <Button outline color="primary" className="mr-2" onClick={()=>makeChoice("yes")}>Yes</Button>
                        <Button outline color="danger" className="mr-2" onClick={()=>makeChoice("no")}>No</Button>
                        <Button outline color="secondary" onClick={()=>makeChoice("later")}>Remind me later</Button>
                    </ButtonToolbar>
                    </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>

    )
}