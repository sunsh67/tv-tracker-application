import React, { Component } from 'react';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.result = [];	
		this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
	}

	handleFilterTextInputChange(e){
		let filterText = e.target.value;
		this.props.topList.forEach((series) => {
			if(series.name.indexOf(filterText) !== -1 || series.network.indexOf(filterText) !== -1){
				this.result.push(series);
			}
		})
	    if(filterText === ''){
	    	this.result = this.props.topList;
	    }
	}

	render(){
		return(
			<div className='searchbar'>
			<form>
			<input type='text' placeholder='Search...' onChange={this.handleFilterTextInputChange}/>
			</form>
			</div>
			);
	}
}

export default SearchBar;