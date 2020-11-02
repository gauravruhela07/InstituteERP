import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import { render } from "react-dom";

const Course = () => {
  // var selectedSemester;
  const [selectedSemester, setselectedSemester] = useState(-1);
  const [allCourses, setallCourses] = useState([]);
  const [newCourses, setnewCourses] = useState([]);
  const [inputListManadatory, setInputListManadatory] = useState([-1]);
  const [inputListElective, setInputListElective] = useState([2]);
  const [lstOfElectives, setlstOfElectives] = useState([]);
  const [electiveNumber, setelectiveNumber] = useState(1);
  const [flag, setflag] = useState();

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
      //coursesList.push(<option value={courseName}>{courseName}</option>);
      coursesList.push({ value: courseName, label: courseName });
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
      //selectedCourse: String(e.target.value),
      selectedCourse: String(e.value),
      semester_num: selectedSemester
    }

    console.log("selectedCourse = " + selectedCourse);
    console.log("selectedSemester = " + selectedSemester);
    console.log("semester = " + semester);

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"));


    const index = newCourses.indexOf(String(e.value));
    newCourses.splice(index, 1);
    console.log("newCourses = ", newCourses);

    setInputListManadatory([...inputListManadatory, -1]);
    setflag(1);
  };

  // const onAdditionOfElective = () => {
  //   console.log("Elective Added");
  // };

  //it adds a new entry to select a new manadatory course
  // const handleManadatoryAdd = () => {
  //   setInputList([...inputList, -1]);
  //   setflag(1);
  // };

  //it adds a new entry to select a new elective course
  // const handleElectiveAdd = () => {
  //   console.log("Inside Elective Add");
  //   setInputList([...inputList, -1]);
  //   setflag(2);
  // };

  // const onSubmit = (e) => { };

  //it handles removal of a particular course 
  // const handleRemoval = () => {
  //   var lst = [...inputList];
  //   lst.pop();
  //   setInputList([...lst]);
  // };

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

  // const getOptions = () => {
  //   return [{ value: 'chocolate', label: 'Chocolate' }, { value: 'strawberry', label: 'Strawberry' }, { value: 'vanilla', label: 'Vanilla' }];
  // }

  const getOptionsForElectives = () => {
    var lst = [];
    var i;
    console.log()
    for (i = 0; i < newCourses.length; i++) {
      var a = { value: newCourses[i], label: newCourses[i] }
      lst.push(a);
    }
    //console.log("lst is");
    //console.log(lst);
    return lst;
  }

  const onSelectionOfAnElective = (e) => {
    //console.log(e.value);
    var lst = [];
    lst = [...e];
    console.log(lst);
    setlstOfElectives([...lst]);
  }

  const submitElectives = () => {
    //console.log(lstOfElectives);
    //console.log("Submitting Electives");
    var lst = []
    var i;
    for (i = 0; i < lstOfElectives.length; i++) {
      lst.push(lstOfElectives[i].value);
    }

    const semester = {
      selectedElectives: lst,
      semester_num: selectedSemester,
      electiveNumber: electiveNumber
    }

    setelectiveNumber(electiveNumber + 1);

    console.log("semester:-");
    console.log(semester);

    axios.post('http://localhost:5000/course/updateElective/', semester)
      .then(res => console.log("Update done"));


    var i;
    for (i = 0; i < lstOfElectives.length; i++) {
      const index = newCourses.indexOf(String(lstOfElectives[i].value));
      newCourses.splice(index, 1);
    }

    // const index = newCourses.indexOf(String(e.value));
    // newCourses.splice(index, 1);
    console.log("newCourses = ", newCourses);

    setInputListElective([...inputListElective, 2]);
    setflag(1);
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
        {
          inputListManadatory.map((x, i) => {
            //console.log(x, i);
            if (i == inputListManadatory.length - 1) {
              console.log("Manadatory");
              console.log(inputListManadatory);
              return (
                <div keys={i} class="form-group">
                  <label>Add Manadatory Course</label>
                  <Select options={generateCourseList()} onChange={onAdditionOfCourse} />
                </div>
              );
            }
          })
        }
        {
          inputListElective.map((x, i) => {
            if (i == inputListElective.length - 1) {
              console.log("Elective");
              console.log(inputListElective);
              return (
                <div keys={i} class="form-group">
                  <label>Add Elective Course</label>
                  <Select
                    // defaultValue={getOptions()}
                    isMulti
                    name="colors"
                    options={getOptionsForElectives()}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onSelectionOfAnElective}
                  />
                  <button type="button" class="btn btn-primary" value="Add these Electives" onClick={submitElectives}>Submit Electives</button>
                </div>
              );
            }
          })
        }
      </form>
    </div>
  );
};

export default Course;
