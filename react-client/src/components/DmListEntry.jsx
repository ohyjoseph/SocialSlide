import React from 'react';

const DmListEntry = (props) => {

  return (
    <div>
      {props.dm.sender}
      {props.dm.receiver}
      {props.dm.message}
    </div>
  )
}

export default DmListEntry;