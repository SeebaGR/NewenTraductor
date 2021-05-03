import React , { Component } from "react";
import firebase from "./firebase";
import Navbar from './Navbar/Navbar'

class Login extends Component{
constructor(props)
{
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
        email : "",
        password : ""
    }
}
login(e){
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
        console.log(u)
    }).catch((err)=>{
        console.log(err);
    })
}
handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
}
render()
{
    return(
        <div>
        <Navbar/>
        <br />
        <br />
        <br />
        <br />
        <div class="container">
            <div class="row">
                <div class="col"></div>
            <div class="col-6">
        <form class="centerB">
            <div class="form-group mx-sm-3">
            <label for="exampleInputEmail1">Correo</label>
             <input
             
            type="email"
            class="form-control"
            id="email"
            name="email"
            placeholder="Ingrese su Correo"
            onChange={this.handleChange}
            value={this.state.email}
            />
            <small id="emailHelp" class="form-text text-muted">Uso exclusivo adminstradores Newen Traductor.</small>
         </div>
         <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input
            class="form-control"
            name="password"
            type= "password"
            onChange={this.handleChange}
            id="password"
            placeholder="Ingrese contraseña"
            value={this.state.password}
            />
            </div>
        
            <button type="submit" class="btn btn-success" onClick={this.login}>Login</button>
        </form>

        </div>
        <div class="col"></div>
        </div>
        </div>





    </div>
    )
}
}
export default Login;