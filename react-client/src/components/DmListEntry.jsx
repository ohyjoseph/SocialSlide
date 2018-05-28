import React from 'react';

const DmListEntry = (props) => {

  return (
    <div className="container bg-light">
      <div>
        <b>{props.dm.sender}</b>
      </div>
      <div>
        {props.dm.createdat}
      </div>
      <p>
        {props.dm.message}
      </p>
      <br></br>
    </div>
  )
}

export default DmListEntry;