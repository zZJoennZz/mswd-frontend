import React from "react";
//import { Link } from 'react-router-dom';
import { Container, Table, Spinner, Form } from "react-bootstrap";

import axios from "axios";

import FormModal from "./FormModal";

import { sortByDesc } from "../fn/functions";

import GlobalToast from "../components/GlobalToast";

const AdminDivision = () => {
  let [modalShow, setModalShow] = React.useState(false);
  let [frmTitle, setFrmTitle] = React.useState("");
  let [frmContent, setFrmContent] = React.useState("");
  let [frmBtnText, setFrmBtnText] = React.useState("");

  let [showToast, setShowToast] = React.useState(false);
  let [toastMsg, setToastMsg] = React.useState("Nothing to see here");

  let [editId, setEditId] = React.useState(0);

  let [division, setDivision] = React.useState(0);

  let [divisionName, setDivisionName] = React.useState("");

  const textOnChange = (e) => {
    setDivisionName(e.target.value);
  };

  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  const modalOnHide = () => setModalShow(false);

  const openModal = (frmMode, id = 0, div_name) => {
    setDivisionName("");
    if (frmMode === "new") {
      if (division.length <= 0) {
        alert("This will be the main division.");
      }
      setFrmTitle("New Division");
      setFrmContent(<NewDivision textOnCh={textOnChange} />);
      setFrmBtnText("Save Division");
      setModalShow(true);
    } else if (frmMode === "edit") {
      setFrmTitle(`Edit ${div_name}`);
      setEditId(id);
      setFrmContent(
        <EditDivision textOnCh={textOnChange} divName={div_name} />
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

    if (frmTitle === "New Division") {
      let data = {
        division_name: divisionName,
        order: division.length <= 0 ? 1 : 2,
        sub_division_of:
          division.length <= 0 ? 0 : division[division.length - 1].id,
      };
      try {
        await axios
          .post(`${process.env.REACT_APP_API}org/division/post`, data, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg("Division is saved");
            setShowToast(true);
            setModalShow(false);
          })
          .catch((error) => {
            setToastMsg(error);
            setShowToast(true);
            setModalShow(false);
          });
        console.log(data);
      } catch (error) {
        setToastMsg(error);
        setShowToast(true);
        setModalShow(false);
      }
    } else {
      let data = {
        division_name: divisionName,
      };
      try {
        await axios
          .put(`${process.env.REACT_APP_API}org/division/put/${editId}`, data, {
            headers: headers,
          })
          .then((res) => {
            setToastMsg("Division changes is saved");
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

  React.useEffect(() => {
    const getDivision = async () => {
      let headers = {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      };
      try {
        let res = await axios.get(`${process.env.REACT_APP_API}org/division`, {
          headers: headers,
        });
        setDivision(sortByDesc(res.data.data));
        //setDivision([]);
      } catch (error) {
        setDivision(false);
      }
    };
    getDivision();
  }, [showToast]);

  return (
    <Container style={{ maxHeight: "500px", overflow: "auto" }} fluid>
      <h3>Divisions</h3>

      {/* <Button onClick={openModal.bind(this, 'new')} className="mb-3">Add New</Button> */}
      {!division ? (
        <div>
          <Spinner animation="border" />
        </div>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Division Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {division.map((d) => (
              <tr
                key={d.id}
                style={{ cursor: "pointer" }}
                onClick={openModal.bind(this, "edit", d.id, d.division_name)}
              >
                <td>{d.division_name}</td>
                <td>{changeDateFormat(d.created_at)}</td>
                <td>{changeDateFormat(d.updated_at)}</td>
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

const NewDivision = ({ textOnCh }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Division Name</Form.Label>
        <Form.Control
          type="text"
          name="division_name"
          id="division_name"
          onChange={textOnCh}
        />
      </Form.Group>
    </Form>
  );
};

const EditDivision = ({ divName, textOnCh }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Division Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={divName}
          name="division_name"
          id="division_name"
          onChange={textOnCh}
        />
      </Form.Group>
    </Form>
  );
};

export default AdminDivision;
