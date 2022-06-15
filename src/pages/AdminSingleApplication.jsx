import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Spinner,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";

import api from "../api/api";
import apifrm from "../api/apifrm";

import ApplicationFormSoloParent from "../components/ApplicationFormSoloParent";
import ApplicationFormPwd from "../components/ApplicationFormPwd";
import ApplicationFormSeniorCitizen from "../components/ApplicationFormSeniorCitizen";

import GlobalToast from "../components/GlobalToast";

const AdminSingleApplication = () => {
  let { appId } = useParams();

  let [appliData, setAppliData] = useState(false);
  let [appliFiles, setAppliFiles] = useState(false);
  let [appliStat, setAppliStat] = useState(false);

  let [updated, setUpdated] = useState(false);

  let [showToast, setShowToast] = React.useState(false);
  let [toastMsg, setToastMsg] = React.useState("Nothing to see here");

  const onChangeText = (e) =>
    setUpdated({ ...updated, [e.target.name]: e.target.value });

  const submitTrack = async (e) => {
    e.preventDefault();
    let frmData = new FormData();

    frmData.append("statusMsg", updated.statusMsg);
    frmData.append("status", updated.status);
    frmData.append("app_id", appId);
    await apifrm
      .post(`application/status/post`, frmData)
      .then((res) => {
        setToastMsg("Status successfully updated");
        setShowToast(true);
        window.location.reload();
      })
      .catch((err) => {
        setToastMsg("Something went wrong and status is not updated");
        setShowToast(true);
      });
  };

  useEffect(() => {
    const getApp = async () => {
      let res = await api.get(`application/${appId}`);
      setAppliData(res.data.data);
      setAppliFiles(res.data.files);
      setAppliStat(res.data.app_status);
    };
    getApp();
  }, [appId]);

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin/">Admin Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/applications/">
          Applications
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {appliData && appliData.application_id}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mb-3">
        <Col md={12}>Tracking Status:</Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <div>
            {!appliStat ? (
              "Loading..."
            ) : (
              <ListGroup>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {appliStat.length > 0 ? (
                        <span>Submitted</span>
                      ) : (
                        <span>Error</span>
                      )}
                    </div>
                    {appliStat.length > 0 ? (
                      appliStat[0].statusMsg
                    ) : (
                      <span>Error</span>
                    )}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {appliStat.length > 0 ? (
                        <span>Processing</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    {appliStat.length > 1 ? (
                      appliStat[1].statusMsg
                    ) : (
                      <span>...</span>
                    )}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      {appliStat.length > 0 ? (
                        <span>Result</span>
                      ) : (
                        <span></span>
                      )}
                    </div>
                    {appliStat.length > 2 ? (
                      appliStat[2].status === 3 ? (
                        <span>Approved: {appliStat[2].statusMsg}</span>
                      ) : (
                        <span>Denied {appliStat[2].statusMsg}</span>
                      )
                    ) : (
                      <span>...</span>
                    )}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            )}
          </div>
        </Col>
        <Col md={6}>
          {appliStat && appliStat.length === 3 ? (
            appliStat[1].status === 2 ? (
              "Denied"
            ) : (
              "Completed"
            )
          ) : (
            <Form onSubmit={submitTrack}>
              <Form.Control
                onChange={onChangeText}
                className="mb-2"
                type="text"
                placeholder="Enter notes to client"
                name="statusMsg"
                id="statusMsg"
              />
              {appliStat.length === 2 && appliStat[1].status === 1 ? (
                <Form.Select
                  className="mb-2"
                  onChange={onChangeText}
                  name="status"
                  id="status"
                >
                  <option>Select</option>
                  <option value={2}>Denied</option>
                  <option value={3}>Completed</option>
                </Form.Select>
              ) : (
                ""
              )}
              {!appliStat ? (
                <Button type="submit" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit">
                  {appliStat.length === 1 ? "Start Processing" : "Send Result"}
                </Button>
              )}
            </Form>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {appliData || appliFiles ? (
            JSON.parse(appliData.application_data).appliType === 1 ? (
              <ApplicationFormSoloParent
                appFiles={appliFiles}
                subDate={appliData.created_at}
                appData={JSON.parse(appliData.application_data)}
                appId={appId}
              />
            ) : JSON.parse(appliData.application_data).appliType === 2 ? (
              <ApplicationFormPwd
                appFiles={appliFiles}
                subDate={appliData.created_at}
                appData={JSON.parse(appliData.application_data)}
                appId={appId}
              />
            ) : JSON.parse(appliData.application_data).appliType === 3 ? (
              <ApplicationFormSeniorCitizen
                appFiles={appliFiles}
                subDate={appliData.created_at}
                appData={JSON.parse(appliData.application_data)}
                appId={appId}
              />
            ) : (
              ""
            )
          ) : (
            <>
              <Spinner animation="border" size="sm" /> Fetching data...
            </>
          )}
        </Col>
      </Row>
      <GlobalToast
        onClose={() => setShowToast(false)}
        show={showToast}
        msg={toastMsg}
        title="Saved"
      />
    </Container>
  );
};

export default AdminSingleApplication;
