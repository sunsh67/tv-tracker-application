import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserCollection from './UserCollection';
import {myapp, host} from './appkey.js';

class UserController extends Component{
	constructor(props){
		super(props);
		this.state = {username:'', password:'', repeat:'',token:'', collections:[], warn:'', userInfoDisplay:'none'};
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleRepeat = this.handleRepeat.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
		this.getUserCollections = this.getUserCollections.bind(this);
	}
    handleUsername(e){
     if(e.target.value.toLowerCase().replace(/[a-z_0-9]*/, '')){
        this.setState({warn: 'username must contain only letters, numbers, and _!',username:''});
	}else{
		this.setState({username: e.target.value});
	}
	}
	handlePassword(e){
      this.setState({password: e.target.value});
	}
	handleRepeat(e){
      this.setState({repeat: e.target.value});
       }

  login(){
  	fetch(`${host}/users/${myapp}/${this.state.username}/session`, {
         method: 'POST',
         headers: new Headers({ 'Content-Type': 'application/json' }),
         body: JSON.stringify( { password: this.state.password})})
		.then((response) => {
			if(response.ok){
				return response.json();
			}
		})
		.then((json) => {
			if(json.status === 'login successful'){
				 this.setState({username:this.state.username, token: json.token, userInfoDisplay:'block'});
				 this.props.onAfter();
				 this.getUserCollections();
			}
		})
		.catch((error) => {this.setState({warn:'Ooops! Please Check Agian!'});}) 
  }

  getUserCollections(){
  	fetch(`${host}/users/${myapp}/${this.state.username}/profile`, {
         method: 'GET',
         headers: {'x-user-token': this.state.token}
     })
		.then((response) => {
			if(response.ok){
				return response.json();
			}
		})
		.then((json) => {
			let collections = json.profile.collections;
			if(collections.length > 0){
				this.setState({collections: collections});
			}})
		.catch((error) => {this.setState({warn:'Ooops! Please Check Agian!'});}) 

  }
  register(){
  	if(this.state.password !== this.state.repeat || this.state.password === ''){
         this.setState({warn: 'Please Confirm Your Password!'});
	}else{
		fetch(`${host}/users/${myapp}/${this.state.username}`, {
         method: 'POST',
         headers: new Headers({ 'Content-Type': 'application/json' }),
         body: JSON.stringify( { password: this.state.password})})
		.then((response) => {
			if(response.ok){
				return response.json();
			}
		})
		.then((json) => {
			if(json.status === 'user created'){
				 this.setState({username:this.state.username, userInfoDisplay:'block',token: json.token});
				 this.props.onAfter();
			}
		})
		.catch((error) => {this.setState({warn: 'Try Again! Maybe this user alreay exists! Or Username is invalid.'});})
	}

  }

  logout(){
  	fetch(`${host}/users/${myapp}/${this.state.username}/session`,{
		 method:'DELETE',
		headers: { 'x-user-token': this.state.token }
	})
		.then((response) => {
			if(response.ok){
				return response.json();
			}
		})
		.then((json) => {
			if(json.status === 'logout successful'){
			 this.setState({username:'', token:'', password:'',warn:'',userInfoDisplay:'none',collections:[]});
			 this.props.onAfterLogout();
			}
		})
		.catch((error) => { console.log('Ooops!');} )

  }
  render(){
  	if(this.props.userOption === 'login'){
  	return(
  	<div className='register-container'>
	<div className='register'>
	<div className='warn'>{this.state.warn}</div>
    <input onChange={this.handleUsername} placeholder='Your Name...'/>
    <input onChange={this.handlePassword} type="password" placeholder='Your Password...' />
    <button onClick={this.login}>Login</button>
    </div>
    <UserCollection choice={'toplist'} username={this.state.username}/>
    </div>
    );
  	}
  	if(this.props.userOption === 'register'){
  	return(
  	<div className='register-container'>
	<div className='register'>
	<div className='warn'>{this.state.warn}</div>
    <input onChange={this.handleUsername} placeholder='Name...'/>
    <input onChange={this.handlePassword} placeholder='Password...' type="password"/>
    <input onChange={this.handleRepeat} placeholder='Repaet Your Password...' type="password"/>
    <button onClick={this.register}>Create A New User</button>
    </div>
    <UserCollection choice={'toplist'} username={this.state.username}/>
    </div>
    );
  	}

  	if(this.props.userOption === 'userInfo'){
  	return(
  		<div className='register-container'>
  		<UserInfo username={this.state.username} display={this.state.userInfoDisplay} onLogout={this.logout}/>
  		<UserCollection choice={'userlist'} userCollections={this.state.collections} userToken={this.state.token} username={this.state.username}/>
  		<UserCollection choice={'toplist'} userCollections={this.state.collections} userToken={this.state.token} username={this.state.username}/>
  		</div>
  		);
  	}
  	return (<div><UserCollection choice={'toplist'} username={this.state.username}/></div>);
  }
}

export default UserController;
