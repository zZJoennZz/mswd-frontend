import React from "react";

// import axios from "axios";

import "./orgchart.css";

import { Container, Row, Col } from "react-bootstrap";

const OrgChart = () => {
  // let [division, setDivision] = React.useState(false);
  // let [org, setOrg] = React.useState(false);

  // React.useEffect(() => {
  //   const getData = async () => {
  //     let divRes = await axios.get(`${process.env.REACT_APP_API}org/division`);
  //     setDivision(divRes.data.data);
  //     let orgRes = await axios.get(`${process.env.REACT_APP_API}org`);
  //     setOrg(orgRes.data.data);
  //   };
  //   getData();
  // }, []);
  return (
    <>
      {/* <div style={{ textAlign: 'left', paddingBottom: '20px' }}>
                <h2 style={{ textAlign: 'center' }} className="mt-5 mb-3">Organization Chart</h2>
                <div class="container1">
                    <div class="level-1 rectangle">
                    
                        <div className="mb-5">
                            <div>
                                <img src={org[0].img_path} className="img-avatar" alt={org[0].first_name + " " + org[0].middle_initial + " " + org[0].last_name} />
                            </div>
                            <span className="division-people">{org[0].first_name + " " + org[0].middle_initial + " " + org[0].last_name}</span>
                            <div className="division-position-description">{org[0].position_name}</div>
                        </div>
                    
                    </div>
                    <ol class="level-2-wrapper">
                        <li>
                        <div class="level-2 rectangle">
                        <div className="mb-5">
                                <div>
                                    <img src={org[1].img_path} className="img-avatar" alt={org[1].first_name + " " + org[1].middle_initial + " " + org[1].last_name} />
                                </div>
                                <span className="division-people">{org[1].first_name + " " + org[1].middle_initial + " " + org[1].last_name}</span>
                                <div className="division-position-description">{org[1].position_name}</div>
                            </div>
                        </div>
                        <ol class="level-3-wrapper">
                            <li>
                                <div class="level-3 rectangle">
                                    <div>
                                        <img src={org[2].img_path} className="img-avatar" alt={org[2].first_name + " " + org[2].middle_initial + " " + org[2].last_name} />
                                    </div>
                                    <span className="division-people">{org[2].first_name + " " + org[2].middle_initial + " " + org[2].last_name}</span>
                                    <div className="division-position-description">{org[2].position_name}</div>
                                </div>
                                <ol class="level-4-wrapper">
                                <li>
                                        <h4 class="level-4 rectangle">Person A</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person B</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person C</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person D</h4>
                                    </li>
                                    <li>
                                        <h4 class="level-4 rectangle">Person A</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person B</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person C</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person D</h4>
                                    </li>
                                    <li>
                                        <h4 class="level-4 rectangle">Person A</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person B</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person C</h4>
                                        </li>
                                        <li>
                                        <h4 class="level-4 rectangle">Person D</h4>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                        </li>
                    </ol>
                </div>
                <ol className="organizational-chart">
                    <li>
                        {
                            !division || !org ?
                                "Loading..."
                            :
                                <>
                                    <div>
                                        <div className="division-name">{division.filter((d) => d.sub_division_of === 0)[0].division_name}</div>

                                        <div className="division-people">
                                        {
                                            org.filter((e) => e.division_id === division.filter((d) => d.sub_division_of === 0)[0].id).map(d => 
                                                <div key={d.id} className="mb-5">
                                                    <div>
                                                        <img src={d.img_path} className="img-avatar" alt={d.first_name + " " + d.middle_initial + " " + d.last_name} />
                                                    </div>
                                                    <span className="division-people">{d.first_name + " " + d.middle_initial + " " + d.last_name}</span>
                                                    <div className="division-position-description">{d.position_name}</div>
                                                </div>
                                            )
                                        }
                                        </div>
                                    </div>
                                    <ol>              
                                        {
                                            division.filter((d) => d.sub_division_of !== 0).map(e =>
                                                <li key={e.id}>
                                                    <div>
                                                        <div className="division-name">{e.division_name}</div>  
                                                        <div className="division-people">
                                                        {
                                                            org.filter((o) => o.division_id === e.id).map(x => 
                                                                <div key={x.id}>
                                                                    <span className="division-people-small">{x.first_name + " " + x.middle_initial + " " + x.last_name}</span>
                                                                    <div className="division-position-description">{x.position_name}</div>
                                                                </div>
                                                            )
                                                        }
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }  
                                    </ol>   
                                </>
                        }
                    </li>
                </ol>
            </div> */}
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
                <div className="org-person">Hon. Cipriano D. Violago, Jr.</div>
                <div className="org-position">Municipal Mayor</div>
              </Col>
            </Row>
          </Col>
          <Col lg={4}>
            <Row className="border pt-4 pb-4 rounded border-primary">
              <Col lg={4}>
                <img
                  src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                  className="org-img"
                  alt="test"
                />
              </Col>
              <Col lg={8} className="pt-2 text-start">
                <div className="org-person">Hon. Cipriano D. Violago, Jr.</div>
                <div className="org-position">Municipal Mayor</div>
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
                  fill-rule="evenodd"
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
                  src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                  className="org-img"
                  alt="test"
                />
              </Col>
              <Col lg={8} className="pt-2 text-start">
                <div className="org-person">Hon. Cipriano D. Violago, Jr.</div>
                <div className="org-position">Municipal Mayor</div>
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
                  fill-rule="evenodd"
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
                  src="https://minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
                  className="org-img"
                  alt="test"
                />
              </Col>
              <Col lg={8} className="pt-2 text-start">
                <div className="org-person">Hon. Cipriano D. Violago, Jr.</div>
                <div className="org-position">Municipal Mayor</div>
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
                  fill-rule="evenodd"
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
                <div className="division-name bg-primary text-white">
                  Program Division
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="p-3">
            <Row>
              <Col lg={12}>
                <div className="division-name bg-primary text-white">
                  Technical Division
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="p-3">
            <Row>
              <Col lg={12}>
                <div className="division-name bg-primary text-white">
                  Administrative Division
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
              </Col>
            </Row>
          </Col>
          <Col lg={3} className="p-3">
            <Row>
              <Col lg={12}>
                <div className="division-name bg-primary text-white">
                  Emergency Response Division
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
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
                  Hon. Cipriano D. Violago, Jr.
                </div>
                <div className="org-position-sm">Municipal Mayor</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrgChart;
