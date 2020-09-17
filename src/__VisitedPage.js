import React from 'react';
import config from './config';
import Iframe from 'react-iframe';
import AuthApiService from './services/auth-api-service';
import TokenService from './services/token-service.js';

import './VisitedPage.css';

//to add user at a later stage
class VisitedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      params: {
        selectCountry: ''
      },
      dropDownCountries: [],
      visitedCountriesAdded: [],
      noteAdded: ''
    };
  };
  
  componentDidMount() {
    this.populatevisitedCountry();
    const url = `${config.API_ENDPOINT}/all`;

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
          throw new Error('No user found')
        }
        this.setState({
          dropDownCountries: data
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })

    ////////////////GET REQUEST FOR NOTES///////////////////////////
    const url_notes = `${config.API_ENDPOINT}/notes`;

    const options_notes = {
      method: 'GET',
      headers: {
        "Authorization": "",
        "Content-Type": "application/json"
      }
    };

    //using the url and paramters above make the api call
    fetch(url_notes, options_notes)

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
          throw new Error('No user found')
        }
        this.setState({
          noteAdded: data
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      })
  }
 ///////////////////////////////////////////////////
  populatevisitedCountry() {
      
    const url = `${config.API_ENDPOINT}/visited/user/${TokenService.getUserId()}`;

    const options = {
      method: 'GET',
      headers: {
        "Authorization": "",
        "Content-Type": "application/json"
      }
    };

    //useing the url and paramters above make the api call
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
          throw new Error('No user found')
        }
        this.setState({
          visitedCountriesAdded: data
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      });
  };
  formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&')
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
    }
    let {
      selectCountry,
    } = data;

    let countryId = selectCountry.split('_')[0];
    let countryNicename = selectCountry.split('_')[1];
  
   
    //assigning the object from the form data to params in the state
    this.setState({
      params: data
    });

    //check if the state is populated with the search params data
    ////////////////POST REQUEST////////////////////////////

    const newCountry = {
      id: countryId,
      user_id: TokenService.getUserId(), 
      nicename: countryNicename
    };


    //useing the url and paramters above make the api call
    fetch(`${config.API_ENDPOINT}/visited`, {
      method: 'POST',
      body: JSON.stringify(newCountry),
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
        this.populatevisitedCountry()
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      }) 
 
  }

  handleAddNote = (e) => {
    e.preventDefault();
    //create an object to store the search filters
    const data = {};

    //get all the from data from the form component
    const formData = new FormData(e.target);

    //for each of the keys in form data populate it with form value
    for (let value of formData) {
      data[value[0]] = value[1]
    }

    let {
      noteArea,
      country_id
    } = data;
  
    //assigning the object from the form data to params in the state
    this.setState({
      noteAdded: data
    });
    
    
    ////////////////POST REQUEST FOR NOTES////////////////////////////

    const newNote = {
      user_country_id: country_id, 
      note_content: noteArea
    };


    //useing the url and paramters above make the api call
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(newNote),
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
        window.location = `/visited`
      })
      .catch(err => {
        this.setState({
          error: err.message
        })
      }) 
  }
  
  render() { 

    let showVisitedList = ''
    if (this.state.visitedCountriesAdded.length !== 0) {
      showVisitedList = this.state.visitedCountriesAdded.map((country, key) => {
          let valueOutput = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDfouOPkJqw5K1AKoxQofTjm3jf3dlV4l0&q=${country.nicename}&maptype=roadmap`
          ////display note //////
          //if there are more than one objects in the array map them
          let showNote = ''
            if (this.state.noteAdded.length >1) {
              showNote = this.state.noteAdded.map((note, key) => {
              
                if(note.user_country_id == country.country_id) {
                  return (
                    <div key={key}>
                    <p>{note.note_content}</p>
                    </div>)
                }
                
              })
            }
            //if there is just one object in the array show that
            else if (this.state.noteAdded.length == 1) {
              showNote =   `<div key={key}>
                  <p>${this.state.noteAdded.noteArea}</p>
                </div>`
            }
            //if array is empty show empty string
            else {
              showNote = ''
            }

          return (
              <div key={key}>
                <h3>{country.nicename}</h3>
                <Iframe url={valueOutput}
                        width="100%"
                        height="150px"
                        id={key}
                        className="myClassname"
                        display="initial"
                        position="relative"/>
                <form onSubmit={this.handleAddNote}>
                  <label>
                  Add notes on your trip:
                  <textarea name="noteArea"/>
                  </label>
                  <input type="hidden" defaultValue={country.country_id} name='country_id' ></input>
                  <button type="submit">Submit</button>
                </form>
                <h4>Existing notes:</h4>
                {showNote}
              </div>
          )
      });
    }


    const visitedCountriesArray = [];
    if (this.state.visitedCountriesAdded.length !== 0) {
      for (let i=0;i<this.state.visitedCountriesAdded.length;i++) {
        visitedCountriesArray.push(this.state.visitedCountriesAdded[i].nicename)
      }
      
    }


    let listOfCountries = ''
    if(this.state.dropDownCountries.length !== 0 ){
      listOfCountries = this.state.dropDownCountries.map((country, key) => {
      
      let valueOutput = `${country.id}_${country.nicename}`
      //only display the countries which were not yet added to the bucket list
      if(!visitedCountriesArray.includes(country.nicename))
      {
        return (
          <option key={key} name="nicename" value={valueOutput}>{country.nicename}</option>
          )
      }
    });
    }

   return (
    <div className="Visited-list">
        <form onSubmit={this.handleSubmit}>
        <label htmlFor="countries">Choose a country:</label>
            <select name="selectCountry" aria-controls="countryView" id="countries" required>
                <option value="">None</option>
                {listOfCountries}
            </select>
        <button>Add</button>
      </form>
      <section id="countryView" aria-live="polite">
        <header>
            {showVisitedList}
        </header>
      </section>
    </div>
    )
} }
export default VisitedPage;