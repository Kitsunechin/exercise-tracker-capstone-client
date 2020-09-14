import React from 'react';
import ReactDOM from 'react-dom';
import SideDrawer from './SideDrawer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><SideDrawer /></BrowserRouter>,div);
    ReactDOM.unmountComponentAtNode(div);
});