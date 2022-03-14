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
            <h2>Organization Chart</h2>
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
                                            <div key={d.id}>
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