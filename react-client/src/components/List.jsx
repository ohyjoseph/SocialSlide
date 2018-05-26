import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    Theredd are { props.items.length } items.
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default List;