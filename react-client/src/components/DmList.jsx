import React from 'react';
import axios from 'axios';
import DmListEntry from './DmListEntry.jsx';

class DmList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      dms: []
    }
    this.selectDmsHandler = this.selectDmsHandler.bind(this);
  }

  componentWillMount() {
    this.selectDmsHandler();
  }
  
  selectDmsHandler() {
    axios.post('/dms', {username: window.localStorage.getItem('username'), friend: 'test2'})
      .then((response) => {
        console.log(`DMs: ${JSON.stringify(response.data)}`);
        this.setState({
          dms: response.data
        });
      }).catch((err) => {
        console.error('ERROR selecting dms:', err);
      })
  }
  
  render () {
    return (
      <div>
        <h4>Direct Message</h4>
        <div style={{overflow: 'auto', width:'300px', height:'200px'}}>
            {this.state.dms.map((dm, ind) =>
              <DmListEntry key={ind} dm={dm}/>
            )}
        </div>
      </div>
    )
  }
}

export default DmList;