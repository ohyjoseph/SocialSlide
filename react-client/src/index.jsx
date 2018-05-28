import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import FriendRequestList from './components/FriendRequestList.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
//withRouter 
//react history
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.localStorage)
    console.log(`LOGGED IN: ${window.localStorage.getItem('loggedIn')} USERNAME: ${window.localStorage.getItem('username')} AVATAR: ${window.localStorage.getItem('avatarUrl')}`);
  }

  render () {
    return (
      <Router>
        <div className='app'>
          <div className='navbar'>
            <Navbar/>
          </div>
          <div className='home'>
            {/* <Route path='/' exact strict component = {Home}/> */}
            <Route path='/' exact strict render={() => (
              window.localStorage.getItem('loggedIn') === 'true' ? (<div><Home /> <FriendRequestList /></div>) : (<Redirect to='/login' />)
            )}/>
          </div>
          <div className='login'>
            {/* <Route path='/login' exact strict component = {Login}/> */}
            <Route path='/login' exact strict render={() => (
              window.localStorage.getItem('loggedIn') !== 'true' ? (<div><Login /> <Signup /></div>) : (<Redirect to='/' />)
            )}/>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));