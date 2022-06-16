import React from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import "./orgchart.css";

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
  return (
    <div style={{ textAlign: "left", paddingBottom: "20px" }}>
      <h2 style={{ textAlign: "center" }} className="mt-5 mb-3">
        Organization Chart
      </h2>
      <ol className="organizational-chart">
        <li>
          {!division || !org ? (
            "Loading..."
          ) : (
            <>
              <div>
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col>
                        <div
                          className="border rounded bg-white p-4 mb-3 side-org"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          OFFICE OF SENIOR CITIZEN AFFAIR / FSCAP
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div
                          className="border rounded bg-white p-4 mb-3"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          SOLO PARENTS FEDERATION OF SAN RAFAEL
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div
                          className="border rounded bg-white p-4"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          PAG-ASA YOUTH ASSOCIATION (PYA)
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <div className="division-name">
                      {
                        division.filter((d) => d.sub_division_of === 0)[0]
                          .division_name
                      }
                    </div>

                    <div className="division-people">
                      {org
                        .filter(
                          (e) =>
                            e.division_id ===
                            division.filter((d) => d.sub_division_of === 0)[0]
                              .id
                        )
                        .map((d) => (
                          <div
                            key={d.id}
                            className="bg-white border rounded mb-3 p-3"
                          >
                            <div className="mt-3">
                              <img
                                src={d.img_path}
                                alt={
                                  d.first_name +
                                  ` ` +
                                  d.middle_initial +
                                  ` ` +
                                  d.last_name
                                }
                                className="org-img"
                              />
                            </div>
                            <span className="division-people">
                              {d.first_name +
                                " " +
                                d.middle_initial +
                                " " +
                                d.last_name}
                            </span>
                            <div className="division-position-description">
                              {d.position_name}
                            </div>
                          </div>
                        ))}
                    </div>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col>
                        <div className="border rounded bg-white p-4 mb-3 side-org">
                          PERSONS WITH DISABILITY (PWD) FEDERATION
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div
                          className="border rounded bg-white p-4"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                            color: "gray",
                          }}
                        >
                          KONSEHONG PAMBAYAN PARA SA KABABAIHAN (KPK)
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <ol>
                {division
                  .filter((d) => d.sub_division_of !== 0)
                  .map((e) => (
                    <li key={e.id}>
                      <div>
                        <div className="division-name">{e.division_name}</div>
                        <div className="division-people mt-4">
                          {org
                            .filter((o) => o.division_id === e.id)
                            .map((x) => (
                              <div
                                key={x.id}
                                className="mb-5 border rounded bg-white"
                              >
                                <div className="mt-3">
                                  <img
                                    src={x.img_path}
                                    alt={
                                      x.first_name +
                                      ` ` +
                                      x.middle_initial +
                                      ` ` +
                                      x.last_name
                                    }
                                    className="org-img"
                                  />
                                </div>
                                <span className="division-people-small">
                                  {x.first_name +
                                    " " +
                                    x.middle_initial +
                                    " " +
                                    x.last_name}
                                </span>
                                <div className="division-position-description">
                                  {x.position_name}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </li>
                  ))}
              </ol>
            </>
          )}
        </li>
      </ol>
    </div>
  );
};

export default OrgChart;
