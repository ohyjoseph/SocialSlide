import React from 'react';

const DmListEntry = (props) => {

  return (
    <div>
      <div>
        {props.dm.sender}
      </div>
      <div>
        {props.dm.message}
      </div>
      <br></br>
    </div>
  )
}

export default DmListEntry;