import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';

const Course = () => {
  console.log("rendering");
  const [selectedSemester, setselectedSemester] = useState();
  const [newCourses, setnewCourses] = useState([]);
  const [inputListManadatory, setInputListManadatory] = useState([-1]);
  const [inputListElective, setInputListElective] = useState([2]);
  const [lstOfElectives, setlstOfElectives] = useState([]);
  const [lstOfDepartments, setlstOfDepartments] = useState([]);
  const [electiveNumber, setelectiveNumber] = useState(1);
  const [manadatoryCoursesSelected, setmanadatoryCoursesSelected] = useState([]);
  const [electivesCoursesSelected, setelectivesCoursesSelected] = useState([]);
  const [departmentForCourse, setdepartmentForCourse] = useState([]);
  const [allDepartments, setallDepartments] = useState([]);
  const [courseSelected, setcourseSelected] = useState();

  useEffect(() => {
    console.log("filling up newCourses")
    let mySet = new Set()
    axios.get('http://localhost:5000/course/')
      .then(response => {
        var i;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].semester_num != "-1") continue;
          if (mySet.has(response.data[i].department) == false) {
            mySet.add(response.data[i].department);
            setallDepartments(allDepartments => allDepartments.concat({ value: response.data[i].department, label: response.data[i].department }));
          }
          setnewCourses(newCourses => newCourses.concat(response.data[i].course_name));
        }
      });
  }, [])



  useEffect(() => {
    console.log("filling up newCourses")
    axios.get('http://localhost:5000/course/allDepartments')
      .then(response => {
        var i;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].semester_num != "-1") continue;
          setnewCourses(newCourses => newCourses.concat(response.data[i].course_name));
        }
      });
  }, [])


  useEffect(() => {
    console.log("newCourses in useEffect", newCourses);
  }, [newCourses])


  useEffect(() => {
    console.log("selectedSemester in useEffect", selectedSemester);
  }, [selectedSemester])


  useEffect(() => {
    console.log("manadatoryCourses in useEffect", manadatoryCoursesSelected);
  }, [manadatoryCoursesSelected])


  useEffect(() => {
    console.log("departmentForCourse in useEffect", departmentForCourse);
  }, [departmentForCourse])



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
    console.log("Inside onSelectionOfSemester");

    console.log("manadatoryCoursesSelected on entering function", manadatoryCoursesSelected);


    setselectedSemester(e.target.value);
    const semester = {
      semester_num: e.target.value
    }

    var eleDone = [];
    var manad = [];
    var ele = [];
    axios.post('http://localhost:5000/course/getSelectedSemesterCourses', semester)
      .then(response => {
        var i;
        var j;
        var ithElective;
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].elective == "-1") {
            manad.push(response.data[i].course_name);
            // console.log("temporary array of manad", manad);
          }
          else {
            var string = "";
            ithElective = response.data[i].elective;
            var index = eleDone.indexOf(ithElective);
            if (index != -1) continue;
            for (j = 0; j < response.data.length; j++) {
              if (ithElective == response.data[j].elective) {
                string = string.concat(response.data[j].course_name + ",");
              }
            }
            string = string.slice(0, -1);
            eleDone.push(ithElective);
            // console.log("string", string);
            ele.push(string);
          }
        }
        setmanadatoryCoursesSelected([...manad]);
        setelectivesCoursesSelected([...ele]);
      })
      .catch(err => console.log(err))

    console.log("After Axios");
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
    setcourseSelected(e.value);
  };

  const onSelectionOfADepartment = (e) => {
    var lst = [];
    lst = [...e];
    // console.log("e", e);
    setlstOfDepartments([...lst]);
  }

  const submitManadatory = () => {
    var string = "";
    var i;
    for (i = 0; i < lstOfDepartments.length; i++) {
      if (i < lstOfDepartments.length - 1) string = string.concat(lstOfDepartments[i].value + ",");
      else if (i == lstOfDepartments.length - 1) string = string.concat(lstOfDepartments[i].value);
    }
    console.log("string of departments", string);
    setdepartmentForCourse([...departmentForCourse, string]);
    setmanadatoryCoursesSelected([...manadatoryCoursesSelected, courseSelected]);
    const semester = {
      selectedCourse: courseSelected,
      semester_num: selectedSemester,
      departmentsAlloted: string
    }

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"))
      .catch(err => console.log(err))

    const index = newCourses.indexOf(courseSelected);
    newCourses.splice(index, 1);
    setnewCourses([...newCourses]);

    setInputListManadatory([...inputListManadatory, -1]);

  }

  const onSelectionOfAnElective = (e) => {
    var lst = [];
    lst = [...e];
    // console.log("e", e);
    setlstOfElectives([...lst]);
  }

  const submitElectives = () => {
    var i;
    var string = "";
    var lst = [];
    for (i = 0; i < lstOfElectives.length; i++) {
      lst.push(lstOfElectives[i].value);
      if (i < lstOfElectives.length - 1) string = string.concat(lstOfElectives[i].value + ",");
      else if (i == lstOfElectives.length - 1) string = string.concat(lstOfElectives[i].value);
    }
    electivesCoursesSelected.push(string);
    setelectivesCoursesSelected([...electivesCoursesSelected]);

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
    setnewCourses([...newCourses]);

    setInputListElective([...inputListElective, 2]);
  }

  const removeThisManadatoryCourse = (e) => {
    var deleteThisCourse;
    deleteThisCourse = e;

    /* Remove this course from 'manadatoryCoursesSelected'.
    Add it to 'newCourses' */

    const index = manadatoryCoursesSelected.indexOf(String(deleteThisCourse));
    manadatoryCoursesSelected.splice(index, 1);
    departmentForCourse.splice(index, 1);
    setdepartmentForCourse([...departmentForCourse]);
    setmanadatoryCoursesSelected([...manadatoryCoursesSelected]);

    newCourses.push(deleteThisCourse);
    setnewCourses([...newCourses]);

    const semester = {
      selectedCourse: deleteThisCourse,
      departmentsAlloted: "",
      semester_num: -1
    }

    axios.post('http://localhost:5000/course/update/', semester)
      .then(res => console.log("Update done"));

  }

  const removeThisElectiveCourse = (e) => {
    var deleteThisCourses;
    deleteThisCourses = e;
    console.log("e in remove", e);
    var res;
    res = deleteThisCourses.split(",");

    console.log("electivesCoursesSelected before", electivesCoursesSelected);
    console.log("newCourses before", newCourses);

    const index = electivesCoursesSelected.indexOf(deleteThisCourses);
    electivesCoursesSelected.splice(index, 1);
    setelectivesCoursesSelected([...electivesCoursesSelected]);

    var i;
    for (i = 0; i < res.length; i++) {
      newCourses.push(res[i]);
    }
    setnewCourses([...newCourses]);

    console.log("electivesCoursesSelected after", electivesCoursesSelected);
    console.log("newCourses after", newCourses);

    for (i = 0; i < res.length; i++) {
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Manadatory Courses</th>
              <th>Departments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manadatoryCoursesSelected.map((courses, i) => {
              // console.log(courses, i);
              var dep = departmentForCourse[i];
              return (
                <tr>
                  <td>{courses}</td>
                  <td>{dep}</td>
                  <td><a onClick={() => { removeThisManadatoryCourse(courses) }}>delete</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Elective Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {electivesCoursesSelected.map((courses, i) => {
              return (
                <tr>
                  <td>{courses}</td>
                  <td><a onClick={() => { removeThisElectiveCourse(courses) }}>delete</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form >
        <div className="form-group">
          <label>Select Semester</label>
          {console.log("Semester select box")}
          <select className="form-control" name="semesterSelect" onChange={onSelectionOfSemester}>
            {displaySemesters()}
          </select>
        </div>
        {
          inputListManadatory.map((x, i) => {
            if (i == inputListManadatory.length - 1) {
              return (
                <div>
                  <div keys={i} class="form-group">
                    <label>Add Manadatory Course</label>
                    <Select options={generateCourseList()} onChange={onAdditionOfCourse} />
                  </div>
                  <div keys={i} class="form-group">
                    <label>Allot the departments</label>
                    <Select
                      // defaultValue={getOptions()}
                      isMulti
                      name="colors"
                      options={allDepartments}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={onSelectionOfADepartment}
                    />
                    <button type="button" class="btn btn-primary" value="Add these Electives" onClick={submitManadatory}>Submit Manadatory</button>
                  </div>
                </div>
              );
            }
          })
        }
        {
          inputListElective.map((x, i) => {
            if (i == inputListElective.length - 1) {
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

























// import React, { Component } from "react";
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import Select from 'react-select';
// import { Link } from "react-router-dom";
// import { render } from "react-dom";

// const Course = () => {
//   const [selectedSemester, setselectedSemester] = useState();
//   const [allCourses, setallCourses] = useState([]);
//   const [newCourses, setnewCourses] = useState([]);
//   const [inputListManadatory, setInputListManadatory] = useState([-1]);
//   const [inputListElective, setInputListElective] = useState([2]);
//   const [lstOfElectives, setlstOfElectives] = useState([]);
//   const [electiveNumber, setelectiveNumber] = useState(1);
//   const [manadatoryCoursesSelected, setmanadatoryCoursesSelected] = useState([]);
//   const [electivesCoursesSelected, setelectivesCoursesSelected] = useState([]);


//   const displaySemesters = () => {
//     let item = [];
//     item.push(<option value="None">None</option>);
//     item.push(<option value="1">Semester1</option>);
//     item.push(<option value="2">Semester2</option>);
//     item.push(<option value="3">Semester3</option>);
//     item.push(<option value="4">Semester4</option>);
//     item.push(<option value="5">Semester5</option>);
//     item.push(<option value="6">Semester6</option>);
//     item.push(<option value="7">Semester7</option>);
//     item.push(<option value="8">Semester8</option>);
//     return item;
//   };


//   const onSelectionOfSemester = (e) => {
//     //manadatoryCoursesSelected = []
//     setmanadatoryCoursesSelected([]);
//     //electivesCoursesSelected = [];
//     setelectivesCoursesSelected([]);
//     axios.get('http://localhost:5000/course/')
//       .then(response => {
//         var i;
//         var lst = [];
//         for (i = 0; i < response.data.length; i++) {
//           if (response.data[i].semester_num != "-1") continue;
//           // setallCourses(allCourses.push(response.data[i].course_name));
//           // setallCourses([...allCourses, response.data[i].course_name]);
//           lst.push(response.data[i].course_name);
//         }
//         setallCourses([...lst]);
//         setnewCourses([...lst]);
//       });

//     console.log("allCourses", allCourses);

//     setselectedSemester(e.target.value);
//     const semester = {
//       semester_num: e.target.value
//     }
//     var eleDone = [];
//     axios.post('http://localhost:5000/course/getSelectedSemesterCourses', semester)
//       .then(response => {
//         var i;
//         var j;
//         var ithElective;
//         for (i = 0; i < response.data.length; i++) {
//           // console.log("manadatoryCoursesSelected", manadatoryCoursesSelected)
//           if (response.data[i].elective == "-1") {
//             manadatoryCoursesSelected.push(response.data[i].course_name)
//             setmanadatoryCoursesSelected([...manadatoryCoursesSelected]);
//           }
//           else {
//             var string = "";
//             ithElective = response.data[i].elective;
//             var index = eleDone.indexOf(ithElective);
//             if (index != -1) continue;
//             for (j = 0; j < response.data.length; j++) {
//               if (ithElective == response.data[j].elective) {
//                 string = string.concat(response.data[j].course_name + ",");
//               }
//             }
//             string = string.slice(0, -1);
//             eleDone.push(ithElective);
//             console.log("string", string);
//             electivesCoursesSelected.push(string);
//             setelectivesCoursesSelected([...electivesCoursesSelected]);
//           }
//         }
//       });

//   }


//   // this functions will generate the list of all the courses in newCourses(which contains unassigned courses) as react-select tag.
//   const generateCourseList = () => {
//     var coursesList = [];
//     var i, courseName;
//     for (i = 0; i < newCourses.length; i++) {
//       courseName = newCourses[i];
//       coursesList.push({ value: courseName, label: courseName });
//     }
//     return coursesList;
//   };

//   // when one course is selected
//   // update that course's semester in the database for which the course is selected
//   // then remove the course from the array
//   const onAdditionOfCourse = (e) => {
//     var selectedCourse;
//     setmanadatoryCoursesSelected([...manadatoryCoursesSelected, e.value]);
//     const semester = {
//       selectedCourse: String(e.value),
//       semester_num: selectedSemester
//     }

//     axios.post('http://localhost:5000/course/update/', semester)
//       .then(res => console.log("Update done"));


//     const index = newCourses.indexOf(String(e.value));
//     newCourses.splice(index, 1);
//     console.log("newCourses = ", newCourses);

//     setInputListManadatory([...inputListManadatory, -1]);
//   };

//   //   setInputList([...inputList, -1]);

//   //   var lst = [...inputList];
//   //   lst.pop();
//   //   setInputList([...lst]);

//   //coursesList.push(<option value={courseName}>{courseName}</option>);


//   const onSelectionOfAnElective = (e) => {
//     var lst = [];
//     lst = [...e];
//     // console.log("e", e);
//     setlstOfElectives([...lst]);
//   }

//   const submitElectives = () => {
//     var i;
//     var string = "";
//     var lst = [];
//     for (i = 0; i < lstOfElectives.length; i++) {
//       lst.push(lstOfElectives[i].value);
//       if (i < lstOfElectives.length - 1) string = string.concat(lstOfElectives[i].value + ",");
//       else if (i == lstOfElectives.length - 1) string = string.concat(lstOfElectives[i].value);
//     }
//     electivesCoursesSelected.push(string);
//     setelectivesCoursesSelected([...electivesCoursesSelected]);

//     const semester = {
//       selectedElectives: lst,
//       semester_num: selectedSemester,
//       electiveNumber: electiveNumber
//     }

//     setelectiveNumber(electiveNumber + 1);

//     console.log("semester:-");
//     console.log(semester);

//     axios.post('http://localhost:5000/course/updateElective/', semester)
//       .then(res => console.log("Update done"));

//     var i;
//     for (i = 0; i < lstOfElectives.length; i++) {
//       const index = newCourses.indexOf(String(lstOfElectives[i].value));
//       newCourses.splice(index, 1);
//     }

//     // console.log("newCourses = ", newCourses);

//     setInputListElective([...inputListElective, 2]);
//     // setflag(1);
//   }

//   const removeThisManadatoryCourse = (e) => {
//     var deleteThisCourse;
//     deleteThisCourse = e;

//     /* Remove this course from 'manadatoryCoursesSelected'.
//     Add it to 'newCourses' */

//     const index = manadatoryCoursesSelected.indexOf(String(deleteThisCourse));
//     manadatoryCoursesSelected.splice(index, 1);
//     setmanadatoryCoursesSelected([...manadatoryCoursesSelected]);

//     newCourses.push(deleteThisCourse);

//     const semester = {
//       selectedCourse: deleteThisCourse,
//       semester_num: -1
//     }

//     axios.post('http://localhost:5000/course/update/', semester)
//       .then(res => console.log("Update done"));

//   }

//   const removeThisElectiveCourse = (e) => {
//     var deleteThisCourses;
//     deleteThisCourses = e;
//     console.log("e in remove", e);
//     var res;
//     res = deleteThisCourses.split(",");

//     console.log("electivesCoursesSelected before", electivesCoursesSelected);
//     console.log("newCourses before", newCourses);

//     const index = electivesCoursesSelected.indexOf(deleteThisCourses);
//     electivesCoursesSelected.splice(index, 1);
//     setelectivesCoursesSelected([...electivesCoursesSelected]);

//     var i;
//     for (i = 0; i < res.length; i++) {
//       newCourses.push(res[i]);
//     }
//     setnewCourses([...newCourses]);

//     console.log("electivesCoursesSelected after", electivesCoursesSelected);
//     console.log("newCourses after", newCourses);

//     for (i = 0; i < res.length; i++) {
//       const semester = {
//         selectedCourse: res[i],
//         semester_num: -1
//       }

//       axios.post('http://localhost:5000/course/update/', semester)
//         .then(res => console.log("Update done"));
//     }
//   }

//   return (
//     <div>
//       <div>
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Manadatory Courses</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {manadatoryCoursesSelected.map((courses, i) => {
//               // console.log(courses, i);
//               return (
//                 <tr>
//                   <td>{courses}</td>
//                   <td><a onClick={() => { removeThisManadatoryCourse(courses) }}>delete</a></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <div>
//         {/* <h3>Elective Courses Included In Semester {selectedSemester}</h3> */}
//         <table className="table">
//           <thead className="thead-light">
//             <tr>
//               <th>Elective Courses</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {electivesCoursesSelected.map((courses, i) => {
//               // console.log(courses, i);
//               return (
//                 <tr>
//                   <td>{courses}</td>
//                   <td><a onClick={() => { removeThisElectiveCourse(courses) }}>delete</a></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <form >
//         <div className="form-group">
//           <label>Select Semester</label>
//           <select className="form-control" name="semesterSelect" onChange={onSelectionOfSemester}>
//             {displaySemesters()}
//           </select>
//         </div>
//         {
//           inputListManadatory.map((x, i) => {
//             //console.log(x, i);
//             if (i == inputListManadatory.length - 1) {
//               // console.log("Manadatory");
//               // console.log(inputListManadatory);
//               return (
//                 <div keys={i} class="form-group">
//                   <label>Add Manadatory Course</label>
//                   <Select options={generateCourseList()} onChange={onAdditionOfCourse} />
//                 </div>
//               );
//             }
//           })
//         }
//         {
//           inputListElective.map((x, i) => {
//             if (i == inputListElective.length - 1) {
//               // console.log("Elective");
//               // console.log(inputListElective);
//               return (
//                 <div keys={i} class="form-group">
//                   <label>Add Elective Course</label>
//                   <Select
//                     // defaultValue={getOptions()}
//                     isMulti
//                     name="colors"
//                     options={generateCourseList()}
//                     className="basic-multi-select"
//                     classNamePrefix="select"
//                     onChange={onSelectionOfAnElective}
//                   />
//                   <button type="button" class="btn btn-primary" value="Add these Electives" onClick={submitElectives}>Submit Electives</button>
//                 </div>
//               );
//             }
//           })
//         }
//       </form>
//     </div>
//   );
// };

// export default Course;