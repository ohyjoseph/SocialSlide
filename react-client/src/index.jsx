import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
//withRouter 
//react history
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      session: {
        loggedIn: false,
        username: undefined,
        avatarUrl: undefined
      }
    }
  }

  render () {
    return (
      <Router>
        <div className='app'>
          <div className='navbar'>
            <Navbar/>
          </div>
          <div className='home'>
            <Route path='/' exact strict component = {Home}/>
          </div>
          <div className='login'>
            <Route path='/login' exact strict component = {Login}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));