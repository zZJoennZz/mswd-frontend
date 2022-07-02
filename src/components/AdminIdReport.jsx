import React from "react";
import { barangays } from "select-philippines-address";

import { Row, Col, Table, Form, Button } from "react-bootstrap";

import axios from "axios";

const AdminIdReport = ({ repType, repCat, repStatus = false }) => {
  let [brgyList, setBrgyList] = React.useState(false);
  let [allApps, setAllApps] = React.useState(false);

  let [dateFrom, setDateFrom] = React.useState("");
  let [dateTo, setDateTo] = React.useState("");

  const getAllApps = async () => {
    if (dateFrom !== "" || dateTo !== "") {
      let headers = {
        Authorization: localStorage.getItem("token"),
        Accept: "application/json",
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      };
      await axios
        .get(
          `${process.env.REACT_APP_API}application/get_all_report/${dateFrom}/${dateTo}`,
          { headers }
        )
        .then((res) => {
          setAllApps(res.data.data);
        })
        .catch((err) => alert(err));
    } else {
      alert("Please put dates!");
    }
  };

  React.useEffect(() => {
    let isMounted = true;

    barangays("031422").then((brgys) => {
      if (isMounted) {
        setBrgyList(brgys);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const getAge = (dob) => {
    const getDob = new Date(dob);
    const monthDiff = Date.now() - getDob.getTime();
    const ageDt = new Date(monthDiff);
    const getYear = ageDt.getUTCFullYear();

    return Math.abs(getYear - 1970);
  };

  const repData = (ageFrom, ageTo, brgy) => {
    let theData = !allApps
      ? {}
      : allApps.filter((app) => {
          let toReturn = false;

          let dAge = parseInt(getAge(JSON.parse(app.application_data).dob));
          let appType = parseInt(JSON.parse(app.application_data).appliType);
          let appliType = JSON.parse(app.application_data).appli_type;
          let dBrgy = parseInt(JSON.parse(app.application_data).barangay);
          let appProcess = parseInt(app.status);

          if (
            dAge >= ageFrom &&
            dAge <= ageTo &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            parseInt(brgy) === dBrgy &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (
            dAge >= ageFrom &&
            dAge <= ageTo &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            brgy === "all" &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (
            ageFrom === "all" &&
            ageTo === "all" &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            brgy === "all" &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (repStatus !== false) {
            if (
              dAge >= ageFrom &&
              dAge <= ageTo &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              parseInt(brgy) === dBrgy &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }
            if (
              dAge >= ageFrom &&
              dAge <= ageTo &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }

            if (
              ageFrom === "all" &&
              ageTo === "all" &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }
          }

          return toReturn;
        });

    if (theData === {}) {
      return false;
    }

    return theData;
  };

  const repDataByGender = (gender, brgy) => {
    let theData = !allApps
      ? {}
      : allApps.filter((app) => {
          let toReturn = false;

          let dSex = parseInt(JSON.parse(app.application_data).sex);
          let appType = JSON.parse(app.application_data).appliType;
          let appliType = JSON.parse(app.application_data).appli_type;
          let dBrgy = parseInt(JSON.parse(app.application_data).barangay);
          let appProcess = parseInt(app.status);

          if (
            parseInt(dSex) === parseInt(gender) &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            parseInt(brgy) === parseInt(dBrgy) &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (
            parseInt(dSex) === parseInt(gender) &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            brgy === "all" &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (
            gender === "all" &&
            appType === parseInt(repType) &&
            appliType === repCat &&
            brgy === "all" &&
            repStatus === false
          ) {
            toReturn = true;
          }

          if (repStatus !== false) {
            if (
              parseInt(dSex) === parseInt(gender) &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              parseInt(brgy) === parseInt(dBrgy) &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }

            if (
              parseInt(dSex) === parseInt(gender) &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }

            if (
              gender === "all" &&
              appType === parseInt(repType) &&
              appliType === repCat &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }
          }

          return toReturn;
        });

    if (theData === {}) {
      return false;
    }
    return theData;
  };

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Date From</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Date To</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setDateTo(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button onClick={getAllApps}>Filter</Button>
        </Col>
      </Row>
      <Row>
        {!allApps ? (
          <Col>Please put date range.</Col>
        ) : (
          <>
            <Button onClick={() => window.print()}>Print</Button>
            <Col md={12} className="paper-size2">
              <h2>
                Report for {dateFrom} - {dateTo}
              </h2>
              <Table size="sm" striped responsive bordered>
                <thead>
                  <tr>
                    <th rowSpan={3}>Barangay</th>
                    <th colSpan={13} className="text-center">
                      {repType === 1 ? "Solo Parents" : ""}
                      {repType === 2 ? "Persons with Disabilities" : ""}
                      {repType === 3 ? "Senior Citizen" : ""} (
                      {repCat === "new" ? "New" : ""}
                      {repCat === "loss" ? "Loss" : ""}
                      {repCat === "renew" ? "Renew" : ""}
                      {repStatus === 0 ? "Processing" : ""}
                      {repStatus === 2 ? "Denied" : ""} Applications)
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th>(0 - 9)</th>
                    <th>(10 - 19)</th>
                    <th>(20 - 29)</th>
                    <th>(30 - 39)</th>
                    <th>(40 - 49)</th>
                    <th>(50 - 59)</th>
                    <th>(60 - 69)</th>
                    <th>(70 - 79)</th>
                    <th>(80 - 89)</th>
                    <th>(90 - 99)</th>
                    <th>(100 +)</th>
                  </tr>
                </thead>
                <tbody>
                  {!brgyList ? (
                    <tr>
                      <td colSpan={2}>Loading...</td>
                    </tr>
                  ) : (
                    brgyList.map((brgy) => {
                      return (
                        <tr key={brgy.brgy_code}>
                          <th>{brgy.brgy_name}</th>
                          <td className="text-center">
                            {repData(0, 9, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(10, 19, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(20, 29, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(30, 39, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(40, 49, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(50, 59, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(60, 69, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(70, 79, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(80, 89, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(90, 99, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repData(100, 1000, brgy.brgy_code).length}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total (each age bracket)</th>
                    <td className="text-center">
                      {repData(0, 9, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(10, 19, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(20, 29, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(30, 39, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(40, 49, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(50, 59, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(60, 69, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(70, 79, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(80, 89, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(90, 99, "all").length}
                    </td>
                    <td className="text-center">
                      {repData(100, 1000, "all").length}
                    </td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td colSpan={12} className="text-center">
                      {repData("all", "all", "all").length}
                    </td>
                  </tr>
                </tfoot>
              </Table>
              <Table size="sm" striped responsive bordered>
                <thead>
                  <tr>
                    <th rowSpan={3}>Barangay</th>
                    <th colSpan={13} className="text-center">
                      {repType === 1 ? "Solo Parents" : ""}
                      {repType === 2 ? "Persons with Disabilities" : ""}
                      {repType === 3 ? "Senior Citizen" : ""} (
                      {repCat === "new" ? "New" : ""}
                      {repCat === "loss" ? "Loss" : ""}
                      {repCat === "renew" ? "Renew" : ""} Applications)
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                </thead>
                <tbody>
                  {!brgyList ? (
                    <tr>
                      <td colSpan={2}>Loading...</td>
                    </tr>
                  ) : (
                    brgyList.map((brgy) => {
                      return (
                        <tr key={brgy.brgy_code}>
                          <th>{brgy.brgy_name}</th>
                          <td className="text-center">
                            {repDataByGender(1, brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByGender(2, brgy.brgy_code).length}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total (each gender)</th>
                    <td className="text-center">
                      {repDataByGender(1, "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByGender(2, "all").length}
                    </td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td colSpan={2} className="text-center">
                      {repDataByGender("all", "all").length}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default AdminIdReport;
