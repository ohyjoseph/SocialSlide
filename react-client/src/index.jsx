import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

import List from './components/List.jsx';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  testPost() {
    axios.post('/login', {username: 'he', password: 'as'})
      .then((response) => {
        console.log(response);
      })
  }

  render () {
    return (
      <Router>
        <div className='App'>
          <Route path='/' exact strict render={
            () => {
              return ( 
                <div>
                  <h1>Itemd List</h1>
                  <List items={this.state.items}/>
                  <button onClick={this.testPost}>Post Test</button>
                </div>
              )
            }
          }/>

          <Route path='/login' exact strict component={Login}/>
          
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));