import React from 'react'

const RunningDateTime = () => {
    let [currDateTime, setCurrDateTime] = React.useState('');

    setInterval(
        () => {
            let dt = new Date().toLocaleString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              });
            setCurrDateTime(dt);
        },
        1000
    )

    return (
        <div>
            <small><strong>Philippine Standard Time:</strong></small><br />
            {currDateTime}
        </div>
    )
}

export default RunningDateTime