import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {render} from 'react-dom';

export default class Course extends Component
{
	constructor(props)
	{
		super(props);

		// this will add a new course, and then open another drop down for adding other course
		this.onAdditionOfCourse = this.onAdditionOfCourse.bind(this);
		// this will make the form disappear
		this.onSubmit = this.onSubmit.bind(this);
		this.renderSelectBox = this.renderSelectBox.bind(this);

		this.state = {
			counter: 0,
			prevVal: -1,
			coursename: ''
		}
	}

	createSelectedItems(){
		let item = [];
		item.push(<option value="os">OS</option>);
		item.push(<option value="dbms">DBMS</option>);
		item.push(<option value="networks">Networks</option>);
		item.push(<option value="algo">Algo</option>);
		return item;
	}


	onAdditionOfCourse(e){
		this.setState({
			coursename: e.target.value
		});
	}

	renderSelectBox(){
		if (this.state.counter!=this.state.prevVal)
		{
			console.log(this.state.prevVal);
			console.log(this.state.counter);
			this.state.prevVal = this.state.counter;
			this.state.counter++;
			return(
				<div>
					<label>Add Course </label>
					<select value={this.state.value} onChange={this.onAdditionOfCourse}>
						{this.createSelectedItems()}
					</select>
				</div>
			);
		}
	}

	onSubmit(e){

	}


	render()
	{
		return(
			<div>
				<h3>Choose the Semester</h3>
				<button type="button" class="btn btn-primary">Semester1</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester2</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester3</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester4</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester5</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester6</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester7</button>&nbsp;&nbsp;&nbsp;
				<button type="button" class="btn btn-primary">Semester8</button>&nbsp;&nbsp;&nbsp;

				<h3>Enter the courses</h3>
				<form onSubmit = {this.onSubmit}>
				{this.renderSelectBox()}
				</form>
			</div>

			);
	}
}