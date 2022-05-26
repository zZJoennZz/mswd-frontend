import React from "react";

import axios from "axios";

import "./orgchart.css";

import { Container, Row, Col } from "react-bootstrap";

const OrgChart = () => {
  let [division, setDivision] = React.useState(false);
  let [org, setOrg] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      let divRes = await axios.get(`${process.env.REACT_APP_API}org/division`);
      setDivision(divRes.data.data);
      let orgRes = await axios.get(`${process.env.REACT_APP_API}org`);
      setOrg(orgRes.data.data);
    };
    getData();
  }, []);
  if (
    division.length <= 0 ||
    org.length <= 0 ||
    division === false ||
    org === false
  ) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <Container className="text-center border pt-3 mb-5 rounded" fluid>
          <Row>
            <Col
              lg={12}
              style={{
                fontSize: "25px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Organization
            </Col>
          </Row>
          <Row>
            <Col lg={4} style={{ padding: "0 40px" }}>
              <Row className="border rounded border-primary p-3">
                <Col lg={12} className="text-center">
                  <div className="org-person">
                    Hon. Cipriano D. Violago, Jr.P
                  </div>
                  <div className="org-position">Municipal Mayor</div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <Row className="border pt-4 pb-4 rounded border-primary">
                <Col lg={4}>
                  <img
                    src={org[0].img_path}
                    className="org-img"
                    alt={
                      org[0].first_name +
                      " " +
                      org[0].middle_initial +
                      " " +
                      org[0].last_name
                    }
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person">
                    {org[0].first_name +
                      " " +
                      org[0].middle_initial +
                      " " +
                      org[0].last_name}{" "}
                    {org[0].suffix === "N/A" || org[0].suffix === null
                      ? ""
                      : org[0].suffix}
                  </div>
                  <div className="org-position">{org[0].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>test</Col>
          </Row>
          <Row className="mt-2 mb-2">
            <Col lg={12}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>test</Col>
            <Col lg={4}>
              <Row className="border pt-4 pb-4 rounded border-primary">
                <Col lg={4}>
                  <img
                    src={org[1].img_path}
                    className="org-img"
                    alt={
                      org[1].first_name +
                      " " +
                      org[1].middle_initial +
                      " " +
                      org[1].last_name
                    }
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person">
                    {org[1].first_name +
                      " " +
                      org[1].middle_initial +
                      " " +
                      org[1].last_name}{" "}
                    {org[1].suffix === "N/A" || org[1].suffix === null
                      ? ""
                      : org[1].suffix}
                  </div>
                  <div className="org-position">{org[1].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}></Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="mt-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>test</Col>
            <Col lg={4}>
              <Row className="border pt-4 pb-4 rounded border-primary">
                <Col lg={4}>
                  <img
                    src={org[2].img_path}
                    className="org-img"
                    alt={
                      org[2].first_name +
                      " " +
                      org[2].middle_initial +
                      " " +
                      org[2].last_name
                    }
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person">
                    {org[2].first_name +
                      " " +
                      org[2].middle_initial +
                      " " +
                      org[2].last_name}{" "}
                    {org[2].suffix === "N/A" || org[2].suffix === null
                      ? ""
                      : org[2].suffix}
                  </div>
                  <div className="org-position">{org[2].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>test</Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="mt-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
                  />
                </svg>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} className="p-3">
              <Row>
                <Col lg={12}>
                  <div className="division-name bg-primary text-white rounded-top">
                    {division[1].division_name}
                  </div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src={org[3].img_path}
                    className="org-img"
                    alt={
                      org[3].first_name +
                      " " +
                      org[3].middle_initial +
                      " " +
                      org[3].last_name
                    }
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[3].first_name +
                      " " +
                      org[3].middle_initial +
                      " " +
                      org[3].last_name}{" "}
                    {org[3].suffix === "N/A" || org[3].suffix === null
                      ? ""
                      : org[3].suffix}
                  </div>
                  <div className="org-position-sm">{org[3].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[4].first_name +
                      " " +
                      org[4].middle_initial +
                      " " +
                      org[4].last_name}{" "}
                    {org[4].suffix === "N/A" || org[4].suffix === null
                      ? ""
                      : org[4].suffix}
                  </div>
                  <div className="org-position-sm">{org[4].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[5].first_name +
                      " " +
                      org[5].middle_initial +
                      " " +
                      org[5].last_name}{" "}
                    {org[5].suffix === "N/A" || org[5].suffix === null
                      ? ""
                      : org[5].suffix}
                  </div>
                  <div className="org-position-sm">{org[5].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[6].first_name +
                      " " +
                      org[6].middle_initial +
                      " " +
                      org[6].last_name}{" "}
                    {org[6].suffix === "N/A" || org[6].suffix === null
                      ? ""
                      : org[6].suffix}
                  </div>
                  <div className="org-position-sm">{org[6].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={3} className="p-3">
              <Row>
                <Col lg={12}>
                  <div className="division-name bg-primary text-white rounded-top">
                    {division[2].division_name}
                  </div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[7].first_name +
                      " " +
                      org[7].middle_initial +
                      " " +
                      org[7].last_name}{" "}
                    {org[7].suffix === "N/A" || org[7].suffix === null
                      ? ""
                      : org[7].suffix}
                  </div>
                  <div className="org-position-sm">{org[7].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[8].first_name +
                      " " +
                      org[8].middle_initial +
                      " " +
                      org[8].last_name}{" "}
                    {org[8].suffix === "N/A" || org[8].suffix === null
                      ? ""
                      : org[8].suffix}
                  </div>
                  <div className="org-position-sm">{org[8].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[9].first_name +
                      " " +
                      org[9].middle_initial +
                      " " +
                      org[9].last_name}{" "}
                    {org[9].suffix === "N/A" || org[9].suffix === null
                      ? ""
                      : org[9].suffix}
                  </div>
                  <div className="org-position-sm">{org[9].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[10].first_name +
                      " " +
                      org[10].middle_initial +
                      " " +
                      org[10].last_name}{" "}
                    {org[10].suffix === "N/A" || org[10].suffix === null
                      ? ""
                      : org[10].suffix}
                  </div>
                  <div className="org-position-sm">{org[10].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={3} className="p-3">
              <Row>
                <Col lg={12}>
                  <div className="division-name bg-primary text-white rounded-top">
                    {division[3].division_name}
                  </div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[11].first_name +
                      " " +
                      org[11].middle_initial +
                      " " +
                      org[1].last_name}{" "}
                    {org[11].suffix === "N/A" || org[11].suffix === null
                      ? ""
                      : org[11].suffix}
                  </div>
                  <div className="org-position-sm">{org[11].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[12].first_name +
                      " " +
                      org[12].middle_initial +
                      " " +
                      org[12].last_name}{" "}
                    {org[12].suffix === "N/A" || org[12].suffix === null
                      ? ""
                      : org[12].suffix}
                  </div>
                  <div className="org-position-sm">{org[12].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[13].first_name +
                      " " +
                      org[13].middle_initial +
                      " " +
                      org[13].last_name}{" "}
                    {org[13].suffix === "N/A" || org[13].suffix === null
                      ? ""
                      : org[13].suffix}
                  </div>
                  <div className="org-position-sm">{org[13].position_name}</div>
                </Col>
              </Row>
            </Col>
            <Col lg={3} className="p-3">
              <Row>
                <Col lg={12}>
                  <div className="division-name bg-primary text-white rounded-top">
                    {division[4].division_name}
                  </div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[14].first_name +
                      " " +
                      org[14].middle_initial +
                      " " +
                      org[14].last_name}{" "}
                    {org[14].suffix === "N/A" || org[14].suffix === null
                      ? ""
                      : org[14].suffix}
                  </div>
                  <div className="org-position-sm">{org[14].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[15].first_name +
                      " " +
                      org[15].middle_initial +
                      " " +
                      org[15].last_name}{" "}
                    {org[15].suffix === "N/A" || org[15].suffix === null
                      ? ""
                      : org[15].suffix}
                  </div>
                  <div className="org-position-sm">{org[15].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[16].first_name +
                      " " +
                      org[16].middle_initial +
                      " " +
                      org[16].last_name}{" "}
                    {org[16].suffix === "N/A" || org[16].suffix === null
                      ? ""
                      : org[16].suffix}
                  </div>
                  <div className="org-position-sm">{org[16].position_name}</div>
                </Col>
              </Row>
              <Row className="border mb-3 pt-2 pb-2 rounded border-primary">
                <Col lg={4}>
                  <img
                    src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                    className="org-img"
                    alt="test"
                  />
                </Col>
                <Col lg={8} className="pt-2 text-start">
                  <div className="org-person-sm">
                    {org[17].first_name +
                      " " +
                      org[17].middle_initial +
                      " " +
                      org[17].last_name}{" "}
                    {org[17].suffix === "N/A" || org[17].suffix === null
                      ? ""
                      : org[17].suffix}
                  </div>
                  <div className="org-position-sm">{org[17].position_name}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default OrgChart;
