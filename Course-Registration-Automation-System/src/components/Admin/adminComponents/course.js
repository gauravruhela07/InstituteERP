import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { render } from "react-dom";

const Course = () => {
  // var selectedSemester;
  const [selectedSemester, setselectedSemester] = useState(-1);
  const [allCourses, setallCourses] = useState([]);
  const [newCourses, setnewCourses] = useState([]);
  const [inputList, setInputList] = useState([]);

  // this functions will generate the list of all the unselected courses as a select tag form.
  const generateCourseList = () => {
    var coursesList = [];
    var i, courseName;
    // console.log(newCourses);
    // setallCourses([]);
    // setallCourses([...newCourses]);
    console.log("allCourses " + allCourses);
    for (i = 0; i < newCourses.length; i++) {
      courseName = newCourses[i];
      coursesList.push(<option value={courseName}>{courseName}</option>);
    }
    return coursesList;
  };

  const displaySemesters = () => {
    let item = [];
    item.push(<option value="None">None</option>);
    item.push(<option value="1">Semester1</option>);
    item.push(<option value="2">Semester2</option>);
    item.push(<option value="3">Semester3</option>);
    item.push(<option value="4">Semester4</option>);
    item.push(<option value="5">Semester5</option>);
    item.push(<option value="6">Semester6</option>);
    item.push(<option value="7">Semester7</option>);
    item.push(<option value="8">Semester8</option>);
    return item;
  };

  // when one course is selected
  // update that course's semester in the database for which the course is selected
  // then remove the course from the array
  const onAdditionOfCourse = (e) => {
    // console.log(e.target.value);
    // console.log(newCourses);
    var selectedCourse;
    // selectedCourse = String(e.target.value);
    const semester = {
      selectedCourse: String(e.target.value),
      semester_num: selectedSemester
    }

    console.log("selectedCourse = " + selectedCourse);
    console.log("selectedSemester = " + selectedSemester);
    console.log("semester = " + semester);

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"));


    const index = newCourses.indexOf(String(e.target.value));
    newCourses.splice(index, 1);
    console.log("newCourses = ", newCourses);
  };

  //it adds a new entry to select a new course
  const handleAdd = () => {
    setInputList([...inputList, -1]);
  };

  const onSubmit = (e) => { };

  //it handles removal of a particular course 
  const handleRemoval = () => {
    var lst = [...inputList];
    lst.pop();
    setInputList([...lst]);
  };

  // when the admin has selected a semester, display him all the courses.
  // admin will select the courses for a particular semester
  // selected courses will be removed from the list
  const onSelectionOfSemester = (e) => {

    axios.get('http://localhost:5000/course/')
      .then(response => {
        var i;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].semester_num != "-1") continue;
          // allCourses.push(response.data[i].course_name);
          //console.log(response.data[i].course_name);
          setallCourses(allCourses.push(response.data[i].course_name));
        }
        console.log(allCourses);
        setnewCourses([...allCourses]);
      });
    console.log(allCourses);

    setselectedSemester(String(e.target.value));
    console.log("selectedSemester = " + selectedSemester);
  }

  return (
    <div>
      <form >
        <div className="form-group">
          <label>Select Semester</label>
          <select className="form-control" name="semesterSelect" onChange={onSelectionOfSemester}>
            {displaySemesters()}
          </select>
        </div>
        <button type="button" class="btn btn-primary" value="Add" onClick={handleAdd}>Add Course</button>
        {
          inputList.map((x, i) => {
            // console.log(x, i);
            return (
              <div key={i} class="form-group">
                <label>Add Course </label>
                <select class="form-control" name="courseSelect" onChange={onAdditionOfCourse}>
                  {generateCourseList()}
                </select>
                <button type="button" class="btn btn-primary" value="Remove" onClick={handleRemoval}>Remove This Course</button>
              </div>
            );
          })
        }
      </form>
    </div>
  );
};

export default Course;
