import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => 
    (
        <header className="App-header">
            <h1>Trippster</h1>
            <div className='subtitle'>With Trippster you can plan your future travels and keep track of the places you have already visited
           <span> Login or Register and start planning your next destination!</span>
           </div>
        </header>
    );
export default Header;