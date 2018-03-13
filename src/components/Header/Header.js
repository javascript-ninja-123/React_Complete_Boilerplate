import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  handleClick = () => console.log('clicked')
  render() {
    return (<div className='Header'>
      <nav>
        <div class="nav-wrapper">
          <Link to='/' class="brand-logo">Sung's Schedule</Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to='/calendar'>Calendar</Link>
            </li>
            <li>
              <Link class="waves-effect waves-light btn" to='/auth'>Sign In</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>);
  }
}

export default Header
