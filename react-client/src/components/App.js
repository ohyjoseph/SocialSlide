import React from 'react';
import { BrowserRouter as Router, Link, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import DmList from './DmList.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
//withRouter 
//react history

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(window.localStorage)
    console.log(`LOGGED IN: ${window.localStorage.getItem('loggedIn')} USERNAME: ${window.localStorage.getItem('username')} AVATAR: ${window.localStorage.getItem('avatarUrl')}`);
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <div className='app'>
            <div className='navbar'>
              <Navbar />
            </div>
            {/* <Route path='/' exact strict component = {Home}/> */}
            <div className='home'>
              <Route path='/' exact strict render={() => (
                window.localStorage.getItem('loggedIn') === 'true' ? (<Home />) : (<Redirect to='/login' />)
              )} />
            </div>
            {/* <Route path='/login' exact strict component = {Login}/> */}
            <div className='login'>
              <Route path='/login' exact strict render={() => (
                window.localStorage.getItem('loggedIn') !== 'true' ? (<div><Login /> <Signup /></div>) : (<Redirect to='/' />)
              )} />
            </div>
            <div className='dm'>
              {/* <Route path='/dm' exact strict component={DmList} /> */}
              <Route path='/dm' exact strict render={() => (
                window.localStorage.getItem('loggedIn') === 'true' ? (<div><DmList location={this.props.location} /></div>) : (<Redirect to='/' />)
              )} />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;