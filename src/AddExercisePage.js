import React from 'react';
import config from './config';
import TokenService from './services/token-service.js';

import './AddExercisePage.css';
import zen from './images/zen.png';

export default class AddExercisePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          addExercise: []
        };
      };
      handleSubmit = (e) => {
        e.preventDefault();
        let user_id = TokenService.getUserId()
        //create an object to store the search filters
        const data = {};
    
        //get all the from data from the form component
        const formData = new FormData(e.target);
    
        //for each of the keys in form data populate it with form value
        for (let value of formData) {
          data[value[0]] = value[1]
        }
    
        let {
            name,
            exercise_length,
            date,
            notes
        } = data;
      
        //assigning the object from the form data to params in the state
        this.setState({
          addExercise: data
        });
        // console.log(addExercise)
        
        ////////////////POST REQUEST FOR exercises////////////////////////////
    
        const newExercise = {
            user_id,
            name,
            exercise_length,
            date,
            notes
        };
        console.log(newExercise)
    
    
        //useing the url and paramters above make the api call
        fetch(`${config.API_ENDPOINT}/exercise`, {
          method: 'POST',
          body: JSON.stringify(newExercise),
          headers: {
            'content-type': 'application/json'
          }
        })
    
          // if the api returns data ...
          .then(res => {
            if (!res.ok) {
              throw new Error('Something went wrong, please try again later.')
            }
            // ... convert it to json
            return res.json()
          })
          // use the json api output and assign to a variable
          .then(data => {
              console.log(data)
            window.location = `/exercise-list`
          })
          .catch(err => {
            this.setState({
              error: err.message
            })
          }) 
      }
render() {
return(
    <div className="outer-container">
    <div className="inner-container">
          <form className="add-exercise" onSubmit={this.handleSubmit}>
          <div className="box">
            <div className="input-group">
              <label htmlFor="exercise">Type of Exercise</label>
              <input
                type="text"
                name="name"
                className="login-input"
                required/>
            </div>
  
            <div className="input-group">
              <label htmlFor="length">Length of exercise</label>
              <input
                type="text"
                name="exercise_length"
                className="length-exercise"
                required/>
            </div>

            <div className="input-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                className="date"
                required/>
            </div>

            <div className="input-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                type="text"
                name="notes"
                className="notes"
                required/>
            </div>
  
            <button
              className="add-exercise-btn" type="submit"
              >Submit</button>
          
          </div>
          </form>
        </div>
        <div className="zen"><img src={zen} width="300" height="300"></img></div>
        </div>
)
}
}