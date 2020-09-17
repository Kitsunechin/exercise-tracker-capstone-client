import React from 'react';
import ReactDOM from 'react-dom';
import BucketListPage from './BucketListPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BucketListPage />,div);
    ReactDOM.unmountComponentAtNode(div);
});