import React from 'react';

import axios from 'axios';

import './orgchart.css';

const OrgChart = () => {
    let [division, setDivision] = React.useState(false);
    let [org, setOrg] = React.useState(false);

    React.useEffect(() => {
        const getData = async () => {
            let divRes = await axios.get(`${process.env.REACT_APP_API}org/division`);
            setDivision(divRes.data.data);
            let orgRes = await axios.get(`${process.env.REACT_APP_API}org`);
            setOrg(orgRes.data.data);
        }
        getData();
    }, []);
    return (
        <div style={{ textAlign: 'left', paddingBottom: '20px' }}>
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

                    {/* <li>
                    <h2 class="level-2 rectangle">Director A</h2>
                    <ol class="level-3-wrapper">
                        <li>
                        <h3 class="level-3 rectangle">Manager A</h3>
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
                        </ol>
                        </li>
                        <li>
                        <h3 class="level-3 rectangle">Manager B</h3>
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
                        </ol>
                        </li>
                    </ol>
                    </li> */}
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
        </div>
    )
}

export default OrgChart;