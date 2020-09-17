import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import AppContext from './AppContext';

import TokenService from './services/token-service.js';

import './SideDrawer.css';

class SideDrawer extends Component {
    static contextType = AppContext;
    logOutClick = () => {
        // console.log('Logging out')
        TokenService.clearAuthToken()
        TokenService.getUserId = (id) => {
        }
        window.location='/'
    };
    render() {
        let drawerClasses = 'side-drawer';
    if (this.props.show) {
        drawerClasses = 'side-drawer open'
    }
    return(
    <nav className={drawerClasses}>
        <div className='menu-list'>
        <NavLink className='nav-link' to='/'>
            <h3 onClick={this.context.drawerToggleButton}>Home</h3>
        </NavLink>
        <NavLink className='nav-link' to='/dashboard'>
            <h3 onClick={this.context.drawerToggleButton}>Dashboard</h3>
        </NavLink>
        <NavLink className='nav-link' to='/exercise-list'>
            <h3 onClick={this.context.drawerToggleButton}>Exercises List</h3>
        </NavLink>
        <NavLink className='nav-link' to='/add-exercise'>
            <h3 onClick={this.context.drawerToggleButton}>Add Exercise</h3>
        </NavLink>
        <NavLink className='nav-link' to="/" onClick={this.logOutClick}>
            <h3 onClick={this.context.drawerToggleButton}>Log Out</h3>
        </NavLink>
        </div>
    </nav>
    )
    }
}
export default SideDrawer
