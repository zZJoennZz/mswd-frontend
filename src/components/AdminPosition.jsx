import React from "react";
import { Container, Table, Spinner, Form, Button } from "react-bootstrap";

import axios from "axios";

import FormModal from "./FormModal";

import { sortByDesc } from "../fn/functions";

import GlobalToast from "../components/GlobalToast";

const AdminPosition = () => {
  let [modalShow, setModalShow] = React.useState(false);
  let [frmTitle, setFrmTitle] = React.useState("");
  let [frmContent, setFrmContent] = React.useState("");
  let [frmBtnText, setFrmBtnText] = React.useState("");

  let [showToast, setShowToast] = React.useState(false);
  let [toastMsg, setToastMsg] = React.useState("Nothing to see here");

  let [editId, setEditId] = React.useState(0);

  let [position, setPosition] = React.useState(0);

  let [positionName, setPositionName] = React.useState("");
  let [positionDesc, setPositionDesc] = React.useState("");

  const onPosNameChange = (e) => setPositionName(e.target.value);
  const onPosDescChange = (e) => setPositionDesc(e.target.value);

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  const modalOnHide = () => setModalShow(false);

  const openModal = (frmMode, id = 0, posName, posDesc) => {
    setPositionName("");
    setPositionDesc("");
    if (frmMode === "new") {
      setFrmTitle("New Position");
      setFrmContent(
        <NewPosition
          textPosName={onPosNameChange}
          textPosDesc={onPosDescChange}
        />
      );
      setFrmBtnText("Save Position");
      setModalShow(true);
    } else if (frmMode === "edit") {
      setFrmTitle(`Edit ${posName}`);
      setEditId(id);
      setFrmContent(
        <EditPosition
          textPosName={onPosNameChange}
          textPosDesc={onPosDescChange}
          positionName={posName}
          positionDesc={posDesc}
        />
      );
      setFrmBtnText("Save Changes");
      setModalShow(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  const onSaveBtn = async () => {
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };

    let data = {
      position_name: positionName,
      position_desc: positionDesc,
    };

    if (frmTitle === "New Position") {
      try {
        await axios
          .post(`${process.env.REACT_APP_API}org/position/post`, data, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg("Position is saved");
            setShowToast(true);
            setModalShow(false);
          })
          .catch((error) => {
            setToastMsg(error);
            setShowToast(true);
            setModalShow(false);
          });
      } catch (error) {
        setToastMsg(error);
        setShowToast(true);
        setModalShow(false);
      }
    } else {
      try {
        await axios
          .put(`${process.env.REACT_APP_API}org/position/put/${editId}`, data, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg("Position changes is saved");
            setShowToast(true);
            setModalShow(false);
          })
          .catch((error) => {
            setToastMsg(error);
            setShowToast(true);
            setModalShow(false);
          });
      } catch (error) {
        setToastMsg(error);
        setShowToast(true);
        setModalShow(false);
      }
    }
  };

  const delPosition = async (posId) => {
    let headers = {
      Authorization: localStorage.getItem("token"),
      Accept: "application/json",
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
    };
    let a = window.confirm("Are you sure to delete this position?");
    if (a) {
      try {
        await axios
          .delete(`${process.env.REACT_APP_API}org/position/delete/${posId}`, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg("Position successfully deleted");
            setShowToast(true);
          })
          .catch((error) => {
            setToastMsg("You cannot delete USED position");
            setShowToast(true);
          });
      } catch (error) {
        setToastMsg("You cannot delete USED position");
        setShowToast(true);
      }
    }
  };

  React.useEffect(() => {
    const getDivision = async () => {
      let headers = {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      };

      try {
        let res = await axios.get(`${process.env.REACT_APP_API}org/position`, {
          headers: headers,
        });
        setPosition(sortByDesc(res.data.data));
      } catch (error) {
        setPosition(false);
      }
    };
    getDivision();
  }, [showToast]);

  return (
    <Container
      className="org-body"
      style={{ maxHeight: "500px", overflow: "auto" }}
      fluid
    >
      <Button onClick={openModal.bind(this, "new")} className="mb-3">
        Add New
      </Button>
      {!position ? (
        <div>
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Position Name</th>
              <th>Position Description</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {position.map((d) => (
              <tr key={d.id}>
                <td
                  onClick={openModal.bind(
                    this,
                    "edit",
                    d.id,
                    d.position_name,
                    d.position_desc
                  )}
                  style={{ cursor: "pointer" }}
                >
                  {d.position_name}
                </td>
                <td>{d.position_desc}</td>
                <td>{changeDateFormat(d.created_at)}</td>
                <td>
                  {changeDateFormat(d.updated_at)}{" "}
                  <Button
                    onClick={delPosition.bind(this, d.id)}
                    style={{ float: "right" }}
                    variant="danger"
                    size="sm"
                  >
                    X
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <FormModal
        show={modalShow}
        onHide={modalOnHide}
        btnclick={onSaveBtn}
        title={frmTitle}
        content={frmContent}
        btntxt={frmBtnText}
      />
      <GlobalToast
        onClose={() => setShowToast(false)}
        show={showToast}
        msg={toastMsg}
        title="Saved"
      />
    </Container>
  );
};

const NewPosition = ({ textPosName, textPosDesc }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Position Name</Form.Label>
        <Form.Control
          type="text"
          name="position_name"
          id="position_name"
          onChange={textPosName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Position Description</Form.Label>
        <Form.Control
          type="text"
          name="position_desc"
          id="position_desc"
          onChange={textPosDesc}
          required
        />
      </Form.Group>
    </Form>
  );
};

const EditPosition = ({
  positionName,
  textPosName,
  textPosDesc,
  positionDesc,
}) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Division Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={positionName}
          name="position_name"
          id="position_name"
          onChange={textPosName}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Position Description</Form.Label>
        <Form.Control
          type="text"
          defaultValue={positionDesc}
          name="position_desc"
          id="position_desc"
          onChange={textPosDesc}
          required
        />
      </Form.Group>
    </Form>
  );
};

export default AdminPosition;
