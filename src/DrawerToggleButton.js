import React from 'react';
import AppContext from './AppContext';

import './DrawerToggleButton.css';

class DrawerToggleButton extends React.Component {
    static contextType = AppContext
    render(){
        return(
            <button className="toggle-button" onClick={this.context.drawerToggleButton}>
                <div className="toggle-button_line"></div>
                <div className="toggle-button_line"></div>
                <div className="toggle-button_line"></div>
            </button>
    )
    }   
}

export default DrawerToggleButton;