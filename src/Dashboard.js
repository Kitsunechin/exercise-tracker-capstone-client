import React from 'react';
import './Dashboard.css';
import config from './config';
import TokenService from './services/token-service.js';

import firstPrize from './images/first-prize.png';
import secondPrize from './images/second-prize.png';
import thirdPrize from './images/third-prize.png';

export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          exercisesList: [],
          consecutiveValue: 0
        };
      };


    componentDidMount() {
        const url = `${config.API_ENDPOINT}/exercise/user/${TokenService.getUserId()}`;
    
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
            // console.log(data)
            //check if there is meaningfull data
            // check if there are no results
            if (data.totalItems === 0) {
              throw new Error('No exercise found')
            }
            //generate an array for each exercises
            let allDates = [];
            for (let j = 0; j < data.length; j++){
                allDates.push(data[j].date)
            }
            
            // console.log(allDates)



            //check for consecutive exercise dates
            
            let consecutive = 0;

            for (let i = 0; i < allDates.length - 1; i++){
                let today= new Date(allDates[i])
                let tomorrow= new Date(allDates[i+1])
                //console.log(today,tomorrow)
                //console.log(today.valueOf())
                //console.log(tomorrow.valueOf())

                if ((tomorrow.valueOf() - today.valueOf()) === 86400000){                
                    consecutive++;
                }
               
            
            }
            console.log(consecutive)
         
            this.setState({
                consecutiveValue: consecutive
            })
          })
          .catch(err => {
            this.setState({
              error: err.message
            })
          })
        }
render() {
    let showBadge = ""
    if (this.state.consecutiveValue > 5){
      showBadge = <div className="exercise-div">
        <img src={firstPrize}></img>
      </div>
    }
    else if (this.state.consecutiveValue > 3){
      showBadge = <div className="exercise-div">
        <img src={secondPrize}></img>
      </div>
    }
    else if (this.state.consecutiveValue > 1){
      showBadge = <div className="exercise-div">
        <img src={thirdPrize}></img>
      </div>
    }
    let showExercise = this.state.exercisesList.map((exercise, key) => {  
        console.log(exercise)       
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
            </div>)     
    })
return(
    <div className="outer-container">
    <div className="container">
        {showBadge}
    </div>
    </div>
)
}
}