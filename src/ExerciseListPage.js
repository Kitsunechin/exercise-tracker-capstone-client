import React from 'react';
import config from './config';
import TokenService from './services/token-service.js';

import './ExerciseListPage.css';
import work from './images/letsgo.png';

export default class ExerciseListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          exercisesList: []
        };
      };

      deleteExercise(event) {
        event.preventDefault()
    
        const data = {}
    
        const formData = new FormData(event.target)
    
        for (let value of formData) {
            data[value[0]] = value[1]
        };
    
        const requestOptions = {
          method: 'DELETE'
        };
    
        let { exerciseId } = data
        
        fetch(`${config.API_ENDPOINT}/exercise/${exerciseId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          }
    
        })
    
        .then(response => {
    
          window.location = `/exercise-list`
        });
    
      };
      
      componentDidMount() {
        let logedinUserId = TokenService.getCurrentLoggedInUser()
      
        const url = `${config.API_ENDPOINT}/exercise/user/${logedinUserId}`;
    
        const options = {
          method: 'GET',
          headers: {
            "Authorization": "",
            "Content-Type": "application/json"
          }
        };
    
        //using the url and paramters above make the api call
        fetch(url, options)
    
          // if the api returns data ...
          .then(res => {
            if (!res.ok) {
              throw new Error('Something went wrong, please try again later.')
            }
            // ... convert it to json
            return res.json()
          })
          // use the json api output
          .then(data => {
            //check if there is meaningfull data
            // check if there are no results
            if (data.totalItems === 0) {
              throw new Error('No exercise found')
            }
            this.setState({
                exercisesList: data
            })
          })
          .catch(err => {
            this.setState({
              error: err.message
            });
          });
        };
  
    render() {
      let showExercise = this.state.exercisesList.map((exercise, key) => {         
              return (
                  <div className="exercise-element" key={key}>
                  <p><span>name of the exercise: </span>{exercise.name}</p>
                  <p><span>length of the exercise: </span>{exercise.exercise_length} min</p>
                  <p><span>date of the exercise: </span>{(exercise.date).slice(0, 10)}</p>
                  <p><span>note: </span>{exercise.notes}</p>
                  <form className="exerciseForm"onSubmit={this.deleteExercise}>
                      <input type='hidden' name='exerciseId' defaultValue={exercise.id}></input>
                      <button type='submit' className='exerciseDeleteBtn'>Delete Exercise</button>
                  </form> 
                  </div>);     
      });
            return(
                <div className="outer-container">
                <div className="inner-container">
                    {showExercise}
                </div>
                <div className="image"><img src={work} width="500" height="300"></img></div>
                </div>
            );
    };
};