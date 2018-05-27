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
              window.localStorage.getItem('loggedIn') === 'true' ? (<Home />) : (<Redirect to='/login' />)
            )}/>
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