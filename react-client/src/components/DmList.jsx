import React from 'react';
import axios from 'axios';
import DmListEntry from './DmListEntry.jsx';
import $ from 'jquery';

class DmList extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      dms: [],
      messageText: ''
    }
    this.selectDmsHandler = this.selectDmsHandler.bind(this);
    this.handleChangeMessageText = this.handleChangeMessageText.bind(this);
    this.handleKeyPressEnter = this.handleKeyPressEnter.bind(this);
  }

  componentWillMount() {
    this.selectDmsHandler();
    setInterval(this.selectDmsHandler, 1000);
  }

  handleChangeMessageText(event) {
    this.setState({messageText: event.target.value});
  }

  handleKeyPressEnter(event) {
    if(event.key == 'Enter'){
      this.sendMessageHandler();
    }
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  
  selectDmsHandler() {
    axios.post('/dms', {username: window.localStorage.getItem('username'), friend: this.getParameterByName('username', window.location.href)})
      .then((response) => {
        console.log(`DMs: ${JSON.stringify(response.data)}`);
        this.setState({
          dms: response.data
        });
      }).catch((err) => {
        console.error('ERROR selecting dms:', err);
      })
  }

  sendMessageHandler() {
    axios.post('/senddm', {sender: window.localStorage.username, receiver: this.getParameterByName('username', window.location.href), message: this.state.messageText})
      .then((response) => {
        console.log('MESSAGE SENT');
        $('.form-control').val('');
        this.setState({
          messageText: ''
        })
      }).catch((err) => {
        console.error('ERROR sending message:', err);
      })
  }
  
  render () {
    return (
      <div>
        <h4>Direct Message</h4>
        <nav className="navbar navbar-light bg-light form-inline">
          <input className="form-control mr-sm-2" type="text" value={this.state.passwordText} onChange={this.handleChangeMessageText} onKeyPress={this.handleKeyPressEnter}/>
          <button className='btn btn-success' onClick={() => (this.sendMessageHandler())}> Send </button>
        </nav>
        <br></br>
        <div style={{overflow: 'auto', width:'400px', height:'450px'}}>
            {this.state.dms.map((dm, ind) =>
              <DmListEntry key={ind} dm={dm}/>
            )}
        </div>
      </div>
    )
  }
}

export default DmList;