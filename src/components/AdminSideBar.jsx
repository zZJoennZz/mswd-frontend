import React from 'react';

const AdminSideBar = () => {
    return (
        <div className="position-sticky pt-3">
            <ul className="nav flex-column">
                <li className="nav-item navbar-text">
                    <a className="nav-link" aria-current="page" href="/admin/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    &nbsp;<span className="ml-2">Dashboard</span>
                    </a>
                </li>
                <li className="nav-item navbar-text">
                    <a className="nav-link" href="/admin/announcements">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-megaphone" viewBox="0 0 16 16">
                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z"/>
                    </svg>
                    &nbsp;<span className="ml-2">Announcements</span>
                    </a>
                </li>
                <li className="nav-item navbar-text">
                    <a className="nav-link" href="/admin/applications">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                    &nbsp;<span className="ml-2">Applications</span>
                    </a>
                </li>
                <li className="nav-item navbar-text">
                    <a className="nav-link" href="/admin/inquiries">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-question" viewBox="0 0 16 16">
                    <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                    <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                    </svg>
                    &nbsp;<span className="ml-2">Inquiries</span>
                    </a>
                </li>
                <li className="nav-item navbar-text">
                    <a className="nav-link" href="/admin/faqs">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" x="0px" y="0px" viewBox="0 0 512.001 512.001" style={{ "enableBackground" : "new 0 0 512.001 512.001" }} xml="preserve"> <g> <g> <path d="M478.329,183.82H300.803c-7.9-27.511-23.412-52.593-45.133-72.042c-32.922-29.481-75.446-43.016-119.749-38.119 C64.871,81.518,8.048,138.871,0.809,210.032c-3.953,38.846,6.67,77.251,29.909,108.14c22.271,29.6,54.229,50.063,90.203,57.816 l37.845,37.844c3.177,3.178,7.395,4.861,11.698,4.86c2.138,0,4.296-0.416,6.358-1.27c6.214-2.574,10.227-8.582,10.227-15.307 V375.62c6.223-1.391,12.285-3.155,18.172-5.257v1.05c0,18.566,15.105,33.671,33.671,33.671h56.539l30.119,30.119 c2.694,2.694,6.269,4.121,9.916,4.121c1.812,0,3.641-0.353,5.389-1.076c5.267-2.182,8.67-7.275,8.67-12.976v-20.188H478.33 c18.566,0,33.671-15.105,33.671-33.671V217.489C512,198.925,496.895,183.82,478.329,183.82z M177.625,361.164 c-3.825,0.682-6.609,4.007-6.609,7.892v33.06c0,0.191,0,0.357-0.33,0.494c-0.33,0.135-0.446,0.019-0.583-0.115l-39.539-39.539 c-1.121-1.121-2.55-1.886-4.106-2.194c-33.084-6.575-62.535-25.124-82.928-52.229c-20.805-27.654-30.313-62.059-26.771-96.878 c3.121-30.685,17.014-59.873,39.119-82.19c22.109-22.32,51.16-36.479,81.805-39.868c5.332-0.59,10.628-0.882,15.885-0.882 c33.893,0,65.884,12.154,91.405,35.007c29.082,26.042,45.761,63.35,45.761,102.359 C290.735,292.663,243.166,349.473,177.625,361.164z M495.966,371.414c0,9.725-7.912,17.637-17.637,17.637H341.508 c-4.427,0-8.017,3.589-8.017,8.017v23.403l-29.071-29.071c-1.503-1.504-3.542-2.348-5.668-2.348h-59.859 c-9.725,0-17.637-7.912-17.637-17.637v-7.818c51.32-25.224,85.513-77.856,85.513-137.515c0-8.852-0.781-17.622-2.28-26.228 h173.841c9.725,0,17.637,7.912,17.637,17.637V371.414z"/> </g> </g> <g> <g> <path d="M449.792,246.027c-3.13-3.131-8.206-3.131-11.337,0l-79.845,79.845l-37.069-37.069c-3.131-3.131-8.207-3.131-11.337,0 c-3.131,3.131-3.131,8.207,0,11.337l42.737,42.737c1.565,1.565,3.617,2.348,5.668,2.348c2.051,0,4.104-0.782,5.669-2.348 l85.513-85.513C452.923,254.233,452.923,249.157,449.792,246.027z"/> </g> </g> <g> <g> <path d="M153.385,286.464c-0.003,0-0.007,0-0.011,0c-4.427,0-8.022,3.595-8.022,8.022c0,0.001,0,0.003,0,0.005 c0,0.002,0,0.003,0,0.005c0,4.427,3.595,8.022,8.022,8.022c0.003,0,0.008,0,0.011,0c4.427,0,8.022-3.595,8.022-8.022 c0-0.001,0-0.003,0-0.005c0-0.002,0-0.003,0-0.005C161.407,290.059,157.812,286.464,153.385,286.464z"/> </g> </g> <g> <g> <path d="M189.094,164.713c-9.712-9.712-22.397-15.06-35.719-15.059c-27.994,0.002-50.769,22.78-50.769,50.773 c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017c0-19.154,15.583-34.739,34.737-34.74 c9.039,0,17.697,3.679,24.38,10.362c6.683,6.683,10.363,15.342,10.363,24.381c-0.001,15.227-10.176,28.911-24.742,33.279 c-10.776,3.231-18.014,12.886-18.014,24.024v2.554c0,4.427,3.589,8.017,8.017,8.017c4.427,0,8.017-3.589,8.017-8.017v-2.554 c0-4.002,2.647-7.485,6.587-8.666c21.295-6.386,36.169-26.385,36.17-48.636C204.154,187.11,198.806,174.424,189.094,164.713z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg> 
                    &nbsp;<span className="ml-2">FAQs</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default AdminSideBar;
