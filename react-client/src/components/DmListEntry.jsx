import React from 'react';

const DmListEntry = (props) => {

  return (
    <div>
      <div>
        <b>{props.dm.sender}</b>
      </div>
      <div>
        {props.dm.createdat}
      </div>
      <div>
        {props.dm.message}
      </div>
      <br></br>
    </div>
  )
}

export default DmListEntry;