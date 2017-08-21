import React, { Component } from 'react';
import SearchBar from './SearchBar';
import {myapp, host} from './appkey.js';
import Follow from './Follow.jsx';

class UserCollection extends Component{
  constructor(props){
    super(props);
    this.state = { update : false, warn:''};
    this.onFollow = this.onFollow.bind(this);
    this.displaySingleCollection = this.displaySingleCollection.bind(this);
    this.displaySingleSeries = this.displaySingleSeries.bind(this);
    this.isInList = this.isInList.bind(this);
  }

  onRemove(){
  }
  
  isInList(list,series){
    let isIn = false;
    list.forEach((item) => {
      if(item.name === series.name){
        isIn = true;
      }
    })
    return isIn;
  }

  onFollow(series){
     if(this.props.username !== ''){
      this.collections = this.props.userCollections;
      if(!this.isInList(this.collections, series)){
        series.addTime = new Date().toDateString();
        this.collections.push(series);
        fetch(`${host}/users/${myapp}/${this.props.username}/profile`, {
         method: 'PUT',
         headers: { 'x-user-token': this.props.userToken},
         body: JSON.stringify({toStore: { collections: this.collections}})
       })
        .then(()=>{
      this.setState({update : true, warn:'Congrats! This series in your list now, please login again then check it!'});
    })
        .catch((error) => (this.setState({warn:'Something went wrong!'})))
}
      else{
        this.setState({warn:'This series is in your list already!'});
      }
      }
    else{
      this.setState({warn:'Please Get Yourself On the Board First!!'});
    }
  }

	displaySingleCollection(collection){
      return(
        <div className='single-series-container' key = {collection.name}>
        <div id='pic'><img src={collection.pic} alt={collection.name}></img></div>
        <div id='name'>{collection.name}</div>
        <div id='network'>{collection.network}</div>
        <div id='addTime'>In My List Since: {collection.addTime}</div>
        <div><button id='rmBtn' onClick={this.onRemove}>remove</button></div>
       </div>
    );
	}
  
	displaySingleSeries(series){
		return(
        <div className='single-series-container' key = {series.name}>
        <div id='pic'>
        <img src={series.pic} alt={series.name}></img>
        </div>
        <div id='name'>{series.name}</div>
        <div id='year'>{series.year}</div>
        <div id='network'>{series.network}</div>
        <div>
        <Follow onFollow={this.onFollow} series={series}/>
        </div>
        </div>
    );
	}


	render(){
    let currcollections = this.props.userCollections;
    if(this.state.update === true){
      currcollections = this.collections;
    }
		const topList = [
		      {name: '13 Reasons Why', pic: 'https://art-s.nflximg.net/1fd67/7a023df3509f825228fcd2ad04e1c20026d1fd67.jpg', year: 2017, network: 'Netflix', isfollowed: false},
          {name: "Handmaid's Tale", pic: 'https://pbs.twimg.com/profile_images/875452499339100161/4o1Jvuur.jpg', year: 2017, network: 'Hulu', isfollowed: false},
          {name: 'Big Little Lies', pic: 'http://www.magazine-hd.com/apps/wp/wp-content/uploads/2017/02/big-little-lies.jpg', year: 2017, network: 'HBO', isfollowed: false},
          {name: 'Casual', pic: 'https://ibhuluimcom-a.akamaihd.net/ib.huluim.com/show/23170?region=US&size=952x536', year: 2015, network: 'Hulu', isfollowed: false},
          {name: 'Atypical', pic: 'http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2017/07/atypical-trailer1.jpg', year: 2017, network: 'Netflix', isfollowed: false},
          {name: 'Broad City', pic: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Broad_City_Logo_2014-02-07_20-26.gif', year: 2013, network: 'Comedy Central', isfollowed: false}];
		const topListDisplay = topList.map(this.displaySingleSeries);
		if(this.props.choice === 'toplist'){
			return(<div className='series-container'>
                   <SearchBar topList={topList}/>
                   <div className='warn'>{this.state.warn}</div>
                   <div id='trendtitle'>Trending Series Now</div>
                   {topListDisplay}
                   </div>);
		}
		if(this.props.choice ==='userlist'){
      if(this.props.userCollections === '' || this.props.userCollections.length === 0){ 
         return(<div id='nocollection'>You got no collection now. Go follow some!</div>);
      }
      else{
			let collectionList = currcollections.map(this.displaySingleCollection);
			return(<div className='series-container'>
            <div id='listtitle'>My Series List</div>
            {collectionList}
            </div>);
		}}
		return(<div></div>);
	}
}

export default UserCollection;