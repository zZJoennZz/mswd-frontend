import React, { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";

import IdAppliSoloParent from "../components/IdAppliSoloParent";
import IdAppliPwd from "../components/IdAppliPwd";
import IdAppliSeniorCitizen from "../components/IdAppliSeniorCitizen";

const Apply = (props) => {
  let [frmResult, setFrmResult] = useState("");

  const submitForm = (result) => {
    try {
      setFrmResult(result);
    } catch (e) {
      setFrmResult("failed");
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
          Something went wrong and your application isn't submitted. You might
          still have an existing application, if not, contact us at{" "}
          <Alert.Link href="/contact-us">here</Alert.Link>.
        </Alert>
      )}
    </Container>
  );
};

export default Apply;
