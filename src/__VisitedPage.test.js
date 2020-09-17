import React from 'react';
import ReactDOM from 'react-dom';
import VisitedPage from './VisitedPage'

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<VisitedPage />,div);
    ReactDOM.unmountComponentAtNode(div);
});