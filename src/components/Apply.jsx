import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

import IdAppliSoloParent from "../components/IdAppliSoloParent";
import IdAppliPwd from "../components/IdAppliPwd";
import IdAppliSeniorCitizen from "../components/IdAppliSeniorCitizen";

const Apply = (props) => {
  let [frmResult, setFrmResult] = useState("");
  let [frmMsg, setFrmMsg] = useState("");

  const submitForm = (result, msg) => {
    try {
      setFrmResult(result);
      setFrmMsg(msg);
    } catch (e) {
      setFrmResult("failed");
      setFrmMsg(msg);
    }
  };

  return (
    <Container className="mt-3 mb-3 text-start">
      <Button onClick={props.resetId} size="sm" className="mb-3">
        Go Back
      </Button>
      {frmResult === "" ? (
        <>
          {props.selId === 1 ? (
            <IdAppliSoloParent submitApplication={submitForm} />
          ) : (
            ""
          )}

          {props.selId === 2 ? (
            <IdAppliPwd submitApplication={submitForm} />
          ) : (
            ""
          )}

          {props.selId === 3 ? (
            <IdAppliSeniorCitizen submitApplication={submitForm} />
          ) : (
            ""
          )}
        </>
      ) : frmResult !== "failed" ? (
        <Alert variant="success">
          Your application have been submitted successfully! Please save your
          application # here for tracking: <b>{frmResult}</b>
        </Alert>
      ) : (
        <Alert variant="danger">
          {frmMsg}. Please contact us at{" "}
          <Alert.Link href="/contact-us">here</Alert.Link>.
        </Alert>
      )}
    </Container>
  );
};

export default Apply;
