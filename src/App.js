import React from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';

// import config from './config'
import './App.css';
import AppContext from './AppContext';
import TokenService from './services/token-service.js';

import NotFoundPage from './NotFoundPage';
import LandingPage from './LandingPage';
import Navigation from './Navigation';

import Dashboard from './Dashboard'
import ExerciseListPage from './ExerciseListPage'
import AddExercisePage from './AddExercisePage'
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';


export default class App extends React.Component {
  
  state = {
    sideDrawerOpen: false,
  };
  /////needed//////
  drawerToggleButton = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  };


render() {
  const contextValue = {
    drawerToggleButton: this.drawerToggleButton, ///needed
  };
  


  let backdrop;

  if (this.state.sideDrawerOpen) {
    backdrop = <Backdrop click={this.backdropClickHandler}/>
  };

  return (
    <AppContext.Provider value={contextValue}>
    <div style={{height:'100%'}} className="App">
      <Navigation />
      <SideDrawer show={this.state.sideDrawerOpen}/>
      {backdrop}
      <main className='Main-view'>
        <Switch>
        <Route exact path='/' render={() => {
            return <LandingPage />
          }}/>
          <Route path='/dashboard' render={() => {
              return (TokenService.hasAuthToken()
              ? <Dashboard />
              : <Redirect to={{pathname: '/dashboard'}} />)
          }} />
          <Route path='/exercise-list' render={() => {
              return (TokenService.hasAuthToken()
              ? <ExerciseListPage />
              : <Redirect to={{pathname: '/exercise-list'}} />)
          }} />
          <Route path='/add-exercise' render={() => {
              return (TokenService.hasAuthToken()
              ? <AddExercisePage/>
              : <Redirect to={{pathname: '/add-exercise'}} />)
          }} />
          />
         <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
    </AppContext.Provider>
  );
 };
};

