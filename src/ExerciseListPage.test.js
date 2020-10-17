import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseListPage from './ExerciseListPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExerciseListPage />,div);
    ReactDOM.unmountComponentAtNode(div);
});