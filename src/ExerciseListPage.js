import React from 'react';
import config from './config';
import TokenService from './services/token-service.js';

import './ExerciseListPage.css'


export default class ExerciseListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          exercisesList: []
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
            console.log(data)
            //check if there is meaningfull data
            // check if there are no results
            if (data.totalItems === 0) {
              throw new Error('No exercise found')
            }
            this.setState({
                exercisesList: data
            })
            console.log(data)
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
    <div className="container">
    </div>
    </div>
)
}
}