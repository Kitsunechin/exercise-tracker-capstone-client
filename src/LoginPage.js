import React from 'react';

import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';

import './LandingPage.css';
export default class LoginPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        params: {
          username: '',
          password: ''
        }
      };
    };

    formatQueryParams(params) {
      const queryItems = Object.keys(params)
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      return queryItems.join('&')
    };

    validateUsername(inputUsername){
      let outputUsername = inputUsername;
      // only lowercase and uppercase letters and dash
      let userformat = /^[a-zA-Z\-]+$/;
      if(!inputUsername.match(userformat)) {
          outputUsername = ""
      }
      return outputUsername
    };

    validatePassword(inputPassword){
      let outputPassword = inputPassword;
      // at least one number, one lowercase and one uppercase letter
      // at least eight characters that are letters, numbers or the underscore
      let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
      if(!inputPassword.match(passwordformat)) {
          outputPassword = ""
      }
      return outputPassword
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      //create an object to store the search filters
      const data = {};

      //get all the from data from the form component
      const formData = new FormData(e.target);

      //for each of the keys in form data populate it with form value
      for (let value of formData) {
          data[value[0]] = value[1]
      };
 
      let {username, password} = data;
    
      if (this.validateUsername(username) === '') {
        this.setState({
            error: 'username is not valid'
        });
      };
      if (this.validatePassword(password) === '') {
        this.setState({
            error: 'password is not valid'
        });
      };
      //assigning the object from the form data to params in the state
      this.setState({
          params: data
      });

      //check if the state is populated with the search params data
      this.setState({ error: null })
      AuthApiService.postLogin({
        user_name: username,
        user_password: password,
      })
  
      .then(response => {
        username = ''
        password = ''
        TokenService.saveAuthToken(response.authToken)
        TokenService.saveUserId(response.userId)
        window.location ='/visited'
      })
      .then(response => {
      
      })
      .catch(err => {
      });   
     
    }
  
    render() {
      const errorMessage = this.state.error ? <p className="error-message">{this.state.error}</p> : false
      return (
        <div className="inner-container">
          <form className="add-user" onSubmit={this.handleSubmit}>
          {errorMessage}
          <div className="box">
            <div className="input-group">
              <label htmlFor="username">Username: Kitsune</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                required/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password: Kitsune666</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                required/>
            </div>
  
            <button
              type="submit"
              >Login</button>
          
          </div>
          </form>
        </div>
      );
    };
  };