import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";

const AdminManageAcct = ({ usrList }) => {
  const changeDateFormat = (dateToChange) => {
    let theDate = new Date(dateToChange);
    return theDate.toLocaleDateString("en-US");
  };

  async function delUser(id) {
    let a = window.confirm(
      `Are you sure to delete this? You cannot revert this action.`
    );

    if (a) {
      let headers = {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      };
      try {
        axios
          .delete(`${process.env.REACT_APP_API}delete_user/${id}`, { headers })
          .then((res) => {
            alert("Success!");
            window.location.reload();
          })
          .catch((err) => alert(err));
      } catch (error) {
        alert(error);
      }
    }
  }

  //   React.useEffect(() => {
  //     const getUser = async () => {
  //       api
  //         .get(`getsingle/${userId}`)
  //         .then((res) => setUserDetail(res.data.data))
  //         .catch((e) => alert(e));
  //     };
  //     getUser();
  //   }, [userId]);

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          {usrList && (
            <Table responsive bordered hover size="sm">
              <thead>
                <tr>
                  <th width="40%">Name</th>
                  <th width="20%">Date Created</th>
                  <th width="20%">Last Updated</th>
                  <th style={{ textAlign: "right" }} width="20%">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {usrList.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name + " " + d.last_name}</td>
                    <td>{changeDateFormat(d.created_at)}</td>
                    <td>{changeDateFormat(d.updated_at)}</td>
                    <td style={{ textAlign: "right" }}>
                      <Button
                        size="sm"
                        href={`/admin/settings/user/${d.id}`}
                        disabled={d.id === 1 ? true : false}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={delUser.bind(this, d.id)}
                        disabled={d.id === 1 ? true : false}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminManageAcct;
