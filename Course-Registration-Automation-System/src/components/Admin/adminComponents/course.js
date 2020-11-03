import React, { Component } from "react";
import { useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import { Link } from "react-router-dom";
import { render } from "react-dom";

const Course = () => {
  const [selectedSemester, setselectedSemester] = useState();
  const [allCourses, setallCourses] = useState([]);
  const [newCourses, setnewCourses] = useState([]);
  const [inputListManadatory, setInputListManadatory] = useState([-1]);
  const [inputListElective, setInputListElective] = useState([2]);
  const [lstOfElectives, setlstOfElectives] = useState([]);
  const [electiveNumber, setelectiveNumber] = useState(1);
  const [flag, setflag] = useState();
  const [manadatoryCoursesSelected, setmanadatoryCoursesSelected] = useState([]);
  const [electivesCoursesSelected, setelectivesCoursesSelected] = useState([]);


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




  const onSelectionOfSemester = (e) => {

    axios.get('http://localhost:5000/course/')
      .then(response => {
        var i;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].semester_num != "-1") continue;
          setallCourses(allCourses.push(response.data[i].course_name));
        }
        setnewCourses([...allCourses]);
      });

    setselectedSemester(e.target.value);
    console.log(allCourses);
  }


  // this functions will generate the list of all the courses in newCourses(which contains unassigned courses) as react-select tag.
  const generateCourseList = () => {
    var coursesList = [];
    var i, courseName;
    for (i = 0; i < newCourses.length; i++) {
      courseName = newCourses[i];
      coursesList.push({ value: courseName, label: courseName });
    }
    return coursesList;
  };

  // when one course is selected
  // update that course's semester in the database for which the course is selected
  // then remove the course from the array
  const onAdditionOfCourse = (e) => {
    var selectedCourse;
    setmanadatoryCoursesSelected([...manadatoryCoursesSelected, e.value]);
    const semester = {
      selectedCourse: String(e.value),
      semester_num: selectedSemester
    }

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"));


    const index = newCourses.indexOf(String(e.value));
    newCourses.splice(index, 1);
    console.log("newCourses = ", newCourses);

    setInputListManadatory([...inputListManadatory, -1]);
    setflag(1);
  };

  //   setInputList([...inputList, -1]);

  //   var lst = [...inputList];
  //   lst.pop();
  //   setInputList([...lst]);

  //coursesList.push(<option value={courseName}>{courseName}</option>);


  const onSelectionOfAnElective = (e) => {
    var lst = [];
    lst = [...e];
    console.log(lst);
    setlstOfElectives([...lst]);
  }

  const submitElectives = () => {
    var lst = []
    var i;
    for (i = 0; i < lstOfElectives.length; i++) {
      lst.push(lstOfElectives[i].value);
    }

    var string = "";
    var i;
    for (i = 0; i < lst.length; i++) {
      string = string.concat(lst[i] + " ");
    }
    lst.push(string);
    console.log("lst", lst);
    setelectivesCoursesSelected([...lst]);

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

    console.log("newCourses = ", newCourses);

    setInputListElective([...inputListElective, 2]);
    setflag(1);
  }

  const removeThisManadatoryCourse = (e) => {
    var deleteThisCourse;
    deleteThisCourse = e;

    /* Remove this course from 'manadatoryCoursesSelected'.
    Add it to 'newCourses' */

    const index = manadatoryCoursesSelected.indexOf(String(deleteThisCourse));
    manadatoryCoursesSelected.splice(index, 1);
    setmanadatoryCoursesSelected([...manadatoryCoursesSelected]);

    newCourses.push(deleteThisCourse);

    const semester = {
      selectedCourse: deleteThisCourse,
      semester_num: -1
    }

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"));

  }

  const removeThisElectiveCourse = (e) => {
    var deleteThisCourse;
    deleteThisCourse = e;
    console.log("e", e);
    var res;
    res = deleteThisCourse.split(" ");
    electivesCoursesSelected.splice(res.length - 1, 1);

    /* Remove this course from 'manadatoryCoursesSelected'.
    Add it to 'newCourses' */
    console.log("electivesCoursesSelected before", electivesCoursesSelected);
    console.log("newCourses before", newCourses);

    var i;
    for (i = 0; i < res.length - 1; i++) {
      const index = electivesCoursesSelected.indexOf(res[i]);
      electivesCoursesSelected.splice(index, 1);
      newCourses.push(res[i]);
    }
    setelectivesCoursesSelected([...electivesCoursesSelected]);

    console.log("electivesCoursesSelected after", electivesCoursesSelected);
    console.log("newCourses after", newCourses);

    for (i = 0; i < res.length - 1; i++) {
      const semester = {
        selectedCourse: res[i],
        semester_num: -1
      }

      axios.post('http://localhost:5000/course/update/', semester)
        .then(res => console.log("Update done"));
    }
  }

  return (
    <div>
      <div>
        <h3>Manadatory Courses Included In Semester {selectedSemester}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Manadatory Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manadatoryCoursesSelected.map((courses, i) => {
              console.log(courses, i);
              return (
                <tr>
                  <td>{courses}</td>
                  <td><a onClick={() => { removeThisManadatoryCourse(courses) }}>delete</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Elective Courses Included In Semester {selectedSemester}</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Elective Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {electivesCoursesSelected.map((courses, i) => {
              console.log(courses, i);
              if (i == electivesCoursesSelected.length - 1) {
                return (
                  <tr>
                    <td>{courses}</td>
                    <td><a onClick={() => { removeThisElectiveCourse(courses) }}>delete</a></td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>





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
              // console.log("Manadatory");
              // console.log(inputListManadatory);
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
              // console.log("Elective");
              // console.log(inputListElective);
              return (
                <div keys={i} class="form-group">
                  <label>Add Elective Course</label>
                  <Select
                    // defaultValue={getOptions()}
                    isMulti
                    name="colors"
                    options={generateCourseList()}
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
