  
import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import Login from './Login';
import Traductor from './Traductor';




class App extends Component{
  constructor(props)
  {
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount()
  {
    this.authListener();
  }
  authListener(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
      else{
        this.setState({user : null})
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.user ? (<Traductor/>) : (<Login/>)}
      </div>
    );
  }
}

export default App;