import React from 'react';
import {
    Dropdown
} from 'react-bootstrap';

const AdminNavBar = ({ logOut }) => {

    return (
        <nav className="navbar navbar-light bg-light p-3">
            <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between">
                <a className="navbar-brand" href="/admin">
                    MSWD Dashboard
                </a>
                
            </div>
            <div className="col-12 col-md-4 col-lg-2">
                {/* ASDASDASDASDASDASDASDADSDASDASDASDASDASDASDASDASDASDASASDASDASDASDASDASDASDASD */}
            </div>
            <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                <div className="dropdown">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
                            Hello, Admin!
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* <Dropdown.Item href="/action-1">Settings</Dropdown.Item> */}
                            <Dropdown.Item href="/admin/settings">Settings</Dropdown.Item>
                            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    )
};

export default AdminNavBar;
