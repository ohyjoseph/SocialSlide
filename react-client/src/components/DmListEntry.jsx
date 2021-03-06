import React from 'react';

const DmListEntry = (props) => {

  return (
    window.localStorage.username === props.dm.sender ? 
    <div className="container bg text-right">
      <div>
        <b>{props.dm.sender}</b>
      </div>
      <div className='text-muted'>
        {new Date(props.dm.createdat).toString().substring(4, new Date(props.dm.createdat).toString().length - 15)}
      </div>
      <p>
        {props.dm.message}
      </p>
      <br></br>
    </div>
    :
    <div className="container bg-light text-left">
    <div>
      <b>{props.dm.sender}</b>
    </div>
    <div className='text-muted'>
      {new Date(props.dm.createdat).toString().substring(4, new Date(props.dm.createdat).toString().length - 15)}
    </div>
    <p>
      {props.dm.message}
    </p>
    <br></br>
  </div>
  )
}

export default DmListEntry;