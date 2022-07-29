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

          if (repStatus !== false) {
            if (
              dAge >= ageFrom &&
              dAge <= ageTo &&
              appType === parseInt(repType) &&
              parseInt(brgy) === dBrgy &&
              repStatus === parseInt(appProcess)
            ) {
              toReturn = true;
            }
            if (
              dAge >= ageFrom &&
              dAge <= ageTo &&
              appType === parseInt(repType) &&
              brgy === "all" &&
              repStatus === parseInt(appProcess)
            ) {
              toReturn = true;
            }

            if (
              ageFrom === "all" &&
              ageTo === "all" &&
              appType === parseInt(repType) &&
              brgy === "all" &&
              repStatus === parseInt(appProcess)
            ) {
              toReturn = true;
            }
          }
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

          if (repStatus !== false) {
            if (
              parseInt(dSex) === parseInt(gender) &&
              appType === parseInt(repType) &&
              parseInt(brgy) === parseInt(dBrgy) &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }

            if (
              parseInt(dSex) === parseInt(gender) &&
              appType === parseInt(repType) &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }

            if (
              gender === "all" &&
              appType === parseInt(repType) &&
              brgy === "all" &&
              repStatus === appProcess
            ) {
              toReturn = true;
            }
          }

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

          return toReturn;
        });

    if (theData === {}) {
      return false;
    }
    return theData;
  };

  const repDataByDis = (disability, brgy) => {
    let theData = !allApps
      ? {}
      : allApps.filter((app) => {
          let toReturn = false;

          let tod1 = JSON.parse(app.application_data).tod1;
          let tod2 = JSON.parse(app.application_data).tod2;
          let tod3 = JSON.parse(app.application_data).tod3;
          let tod4 = JSON.parse(app.application_data).tod4;
          let tod5 = JSON.parse(app.application_data).tod5;
          let tod6 = JSON.parse(app.application_data).tod6;
          let tod7 = JSON.parse(app.application_data).tod7;
          let tod8 = JSON.parse(app.application_data).tod8;
          let tod9 = JSON.parse(app.application_data).tod9;
          let tod10 = JSON.parse(app.application_data).tod10;
          let appType = JSON.parse(app.application_data).appliType;
          let appliType = JSON.parse(app.application_data).appli_type;
          let dBrgy = parseInt(JSON.parse(app.application_data).barangay);
          let appProcess = parseInt(app.status);

          let otherConditions =
            appType === parseInt(repType) &&
            parseInt(brgy) === parseInt(dBrgy) &&
            repStatus === appProcess;

          let otherConditionsAll =
            appType === parseInt(repType) &&
            brgy === "all" &&
            repStatus === appProcess;

          let conditionsOthers =
            appType === parseInt(repType) &&
            appliType === repCat &&
            parseInt(brgy) === parseInt(dBrgy) &&
            repStatus === false;

          let conditionsOthersAll =
            appType === parseInt(repType) &&
            appliType === repCat &&
            brgy === "all" &&
            repStatus === false;

          if (repStatus !== false) {
            if (otherConditions && tod1 && disability === "tod1")
              toReturn = true;
            if (otherConditions && tod2 && disability === "tod2")
              toReturn = true;
            if (otherConditions && tod3 && disability === "tod3")
              toReturn = true;
            if (otherConditions && tod4 && disability === "tod4")
              toReturn = true;
            if (otherConditions && tod5 && disability === "tod5")
              toReturn = true;
            if (otherConditions && tod6 && disability === "tod6")
              toReturn = true;
            if (otherConditions && tod7 && disability === "tod7")
              toReturn = true;
            if (otherConditions && tod8 && disability === "tod8")
              toReturn = true;
            if (otherConditions && tod9 && disability === "tod9")
              toReturn = true;
            if (otherConditions && tod10 && disability === "tod10")
              toReturn = true;

            if (otherConditionsAll && tod1 && disability === "tod1")
              toReturn = true;
            if (otherConditionsAll && tod2 && disability === "tod2")
              toReturn = true;
            if (otherConditionsAll && tod3 && disability === "tod3")
              toReturn = true;
            if (otherConditionsAll && tod4 && disability === "tod4")
              toReturn = true;
            if (otherConditionsAll && tod5 && disability === "tod5")
              toReturn = true;
            if (otherConditionsAll && tod6 && disability === "tod6")
              toReturn = true;
            if (otherConditionsAll && tod7 && disability === "tod7")
              toReturn = true;
            if (otherConditionsAll && tod8 && disability === "tod8")
              toReturn = true;
            if (otherConditionsAll && tod9 && disability === "tod9")
              toReturn = true;
            if (otherConditionsAll && tod10 && disability === "tod10")
              toReturn = true;
          }

          if (conditionsOthers && tod1 && disability === "tod1") {
            toReturn = true;
          }
          if (conditionsOthers && tod2 && disability === "tod2") {
            toReturn = true;
          }
          if (conditionsOthers && tod3 && disability === "tod3") {
            toReturn = true;
          }
          if (conditionsOthers && tod4 && disability === "tod4") {
            toReturn = true;
          }
          if (conditionsOthers && tod5 && disability === "tod5") {
            toReturn = true;
          }
          if (conditionsOthers && tod6 && disability === "tod6") {
            toReturn = true;
          }
          if (conditionsOthers && tod7 && disability === "tod7") {
            toReturn = true;
          }
          if (conditionsOthers && tod8 && disability === "tod8") {
            toReturn = true;
          }
          if (conditionsOthers && tod9 && disability === "tod9") {
            toReturn = true;
          }
          if (conditionsOthers && tod10 && disability === "tod10") {
            toReturn = true;
          }

          if (conditionsOthersAll && tod1 && disability === "tod1") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod2 && disability === "tod2") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod3 && disability === "tod3") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod4 && disability === "tod4") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod5 && disability === "tod5") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod6 && disability === "tod6") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod7 && disability === "tod7") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod8 && disability === "tod8") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod9 && disability === "tod9") {
            toReturn = true;
          }
          if (conditionsOthersAll && tod10 && disability === "tod10") {
            toReturn = true;
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
            <Col md={12} className="mb-3">
              <Button className="float-end" onClick={() => window.print()}>
                Print
              </Button>
            </Col>
            <Col md={12} className="paper-size2">
              <Table size="sm" striped responsive bordered>
                <thead>
                  <tr>
                    <th rowSpan={3} width="20%">
                      Barangay
                    </th>
                    <th colSpan={13} className="text-center">
                      <div>
                        Report of {repType === 1 ? "Solo Parents" : ""}
                        {repType === 2 ? "Persons with Disabilities" : ""}
                        {repType === 3 ? "Senior Citizen" : ""} (
                        {repCat === "new" ? "New" : ""}
                        {repCat === "loss" ? "Loss" : ""}
                        {repCat === "renew" ? "Renew" : ""}
                        {repStatus === 0 ? "Processing" : ""}
                        {repStatus === 1 ? "Approved" : ""}
                        {repStatus === 2 ? "Denied" : ""} Applicants)
                      </div>
                      <div>
                        from the month of {dateFrom} to {dateTo}
                      </div>
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th colSpan={12}>Age</th>
                  </tr>
                  <tr className="text-center">
                    {repType === 1 && (
                      <>
                        <th>18 and below</th>
                        <th>19 - 25</th>
                        <th>26 - 35</th>
                        <th>36 - 45</th>
                        <th>46 - 55</th>
                        <th>56 - 65</th>
                        <th>66 - 75</th>
                      </>
                    )}
                    {repType === 2 && (
                      <>
                        <th>0 - 9</th>
                        <th>10 - 19</th>
                        <th>20 - 29</th>
                        <th>30 - 39</th>
                        <th>40 - 49</th>
                        <th>50 - 59</th>
                        <th>60 - 69</th>
                        <th>70 - 79</th>
                        <th>80 - 89</th>
                        <th>90 - 99</th>
                        <th>100 and above</th>
                      </>
                    )}
                    {repType === 3 && (
                      <>
                        <th>60 - 69</th>
                        <th>70 - 79</th>
                        <th>80 - 89</th>
                        <th>90 - 99</th>
                        <th>100 and above</th>
                      </>
                    )}
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
                          {repType === 2 && (
                            <>
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
                            </>
                          )}
                          {repType === 1 && (
                            <>
                              <th>{brgy.brgy_name}</th>
                              <td className="text-center">
                                {repData(0, 18, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(19, 25, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(26, 35, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(36, 45, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(46, 55, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(56, 65, brgy.brgy_code).length}
                              </td>
                              <td className="text-center">
                                {repData(66, 75, brgy.brgy_code).length}
                              </td>
                            </>
                          )}
                          {repType === 3 && (
                            <>
                              <th>{brgy.brgy_name}</th>
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
                            </>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      Total No. of {repCat === "new" ? "New" : ""}
                      {repCat === "loss" ? "loss" : ""}
                      {repCat === "renew" ? "renew" : ""}
                      {repStatus === 0 ? "Processing" : ""}
                      {repStatus === 1 ? "Approved" : ""}
                      {repStatus === 2 ? "Denied" : ""} applicant for{" "}
                      {repType === 1 ? "Solo Parents" : ""}
                      {repType === 2 ? "Persons with Disabilities" : ""}
                      {repType === 3 ? "Senior Citizen" : ""} (by age bracket)
                    </th>
                    {repType === 2 && (
                      <>
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
                      </>
                    )}
                    {repType === 1 && (
                      <>
                        <td className="text-center">
                          {repData(0, 18, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(19, 25, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(26, 35, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(36, 45, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(46, 55, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(56, 65, "all").length}
                        </td>
                        <td className="text-center">
                          {repData(66, 75, "all").length}
                        </td>
                      </>
                    )}
                    {repType === 3 && (
                      <>
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
                      </>
                    )}
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
                    <th rowSpan={3} width="20%">
                      Barangay
                    </th>
                    <th colSpan={13} className="text-center">
                      <div>
                        Report of {repType === 1 ? "Solo Parents" : ""}
                        {repType === 2 ? "Persons with Disabilities" : ""}
                        {repType === 3 ? "Senior Citizen" : ""} (
                        {repCat === "new" ? "New" : ""}
                        {repCat === "loss" ? "Loss" : ""}
                        {repCat === "renew" ? "Renew" : ""}
                        {repStatus === 0 ? "Processing" : ""}
                        {repStatus === 1 ? "Approved" : ""}
                        {repStatus === 2 ? "Denied" : ""} Applicants)
                      </div>
                      <div>
                        from the month of {dateFrom} to {dateTo}
                      </div>
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th colSpan={2}>Gender</th>
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
                    <th>
                      Total No. of {repCat === "new" ? "New" : ""}
                      {repCat === "loss" ? "loss" : ""}
                      {repCat === "renew" ? "renew" : ""}
                      {repStatus === 0 ? "Processing" : ""}
                      {repStatus === 1 ? "Approved" : ""}
                      {repStatus === 2 ? "denied" : ""} applicant for{" "}
                      {repType === 1 ? "Solo Parents" : ""}
                      {repType === 2 ? "Persons with Disabilities" : ""}
                      {repType === 3 ? "Senior Citizen" : ""} (by gender)
                    </th>
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

              <Table className="table3" size="sm" striped bordered>
                <thead>
                  <tr>
                    <th rowSpan={3} width="20%">
                      Barangay
                    </th>
                    <th colSpan={13} className="text-center">
                      <div>
                        Report of {repType === 1 ? "Solo Parents" : ""}
                        {repType === 2 ? "Persons with Disabilities" : ""}
                        {repType === 3 ? "Senior Citizen" : ""} (
                        {repCat === "new" ? "New" : ""}
                        {repCat === "loss" ? "Loss" : ""}
                        {repCat === "renew" ? "Renew" : ""}
                        {repStatus === 0 ? "Processing" : ""}
                        {repStatus === 1 ? "Approved" : ""}
                        {repStatus === 2 ? "Denied" : ""} Applicants)
                      </div>
                      <div>
                        from the month of {dateFrom} to {dateTo}
                      </div>
                    </th>
                  </tr>
                  <tr className="text-center">
                    <th colSpan={10}>Type of Disability</th>
                  </tr>
                  <tr className="text-center">
                    <th>Deaf or Hard of Hearing</th>
                    <th>Intellectual Disability</th>
                    <th>Learning Disability</th>
                    <th>Mental Disability</th>
                    <th>Physical Disability (Orthopedic)</th>
                    <th>Psychosocial Disability</th>
                    <th>Speech and Language Impairment</th>
                    <th>Visual Disability</th>
                    <th>Cancer (RA11215)</th>
                    <th>Rare Disease (RA10747)</th>
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
                            {repDataByDis("tod1", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod2", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod3", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod4", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod5", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod6", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod7", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod8", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod9", brgy.brgy_code).length}
                          </td>
                          <td className="text-center">
                            {repDataByDis("tod10", brgy.brgy_code).length}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      Total No. of {repCat === "new" ? "New" : ""}
                      {repCat === "loss" ? "loss" : ""}
                      {repCat === "renew" ? "renew" : ""}
                      {repStatus === 0 ? "Processing" : ""}
                      {repStatus === 1 ? "Approved" : ""}
                      {repStatus === 2 ? "denied" : ""} applicant for{" "}
                      {repType === 1 ? "Solo Parents" : ""}
                      {repType === 2 ? "Persons with Disabilities" : ""}
                      {repType === 3 ? "Senior Citizen" : ""} (by gender)
                    </th>
                    <td className="text-center">
                      {repDataByDis("tod1", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod2", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod3", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod4", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod5", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod6", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod7", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod8", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod9", "all").length}
                    </td>
                    <td className="text-center">
                      {repDataByDis("tod10", "all").length}
                    </td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td colSpan={10} className="text-center">
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
