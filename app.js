/*

*/
var students = [];
var records = document.getElementById('records');

// constructor function to create new students
function Student(name, techPoints, lifePoints) {
  this.name = name.toLowerCase();
  this.studentID = (students.length + 1);
  this.techPoints = techPoints;
  this.lifePoints = lifePoints;
  this.isDropout = false;
};

//method (prototype on Student) that, when called, marks as dropout
Student.prototype.markDropout = function() {
  this.isDropout = true;
}

//method (prototype on Student) that, when called, adds employability to each student
Student.prototype.runEmployability = function() {
  if(this.lifePoints < 70 || this.techPoints < 50){
    this.recommendation = 'Not recommended';
  } else if (this.techPoints > 70) {
    this.recommendation = 'Front-End Developer'
  } else if (this.techPoints > 50){
    this.recommendation = 'Prototyper';
  }
}

//method (prototype on Student) to produce html to print student info
Student.prototype.toHTML = function () {
  var html = '';
  html += this.name.toUpperCase() + '<br>';
  html += 'Tech Skills: ' + this.techPoints + '%' + '<br>';
  html += 'Life Skills: ' + this.lifePoints + '%' + '<br>';
  if(this.isDropout){
    html += 'Status: Inactive'+ '<br>';
  }else{
    html += 'Status: Active'+ '<br>';
  }
  if (this.recommendation !== undefined){
    html += 'Employability: ' + this.recommendation + '<br>';
  }
  html += '<br><br>';
  return html;
}

//function to merge all html of students in the array
function mergeHTML (){
  var html = '';
  for (i=0; i<students.length; i++){
    html += students[i].toHTML();
  }
  return html;
}

//function to print one student info
function printHTML (html){
  records.innerHTML = '';
  records.innerHTML = html;
}

// When click on AddStudent button, create new students, add it to array and print info
var addStudent = document.getElementById('add student');
addStudent.onclick = function() {
  var name = prompt('Input Student Name');
  var techPoints = prompt('Input Tech Points');
  var lifePoints = prompt('Input Life Points');
  var student = new Student (name, techPoints, lifePoints);
  students.push(student);
  printHTML(student.toHTML());
};

// When click on UpdateRecords, update dropout of student selected by user
var updateDropout = document.getElementById('update dropout');
updateDropout.onclick = function() {
  var studentToSearch = prompt('What is the name of the student?').toLowerCase();
  var studentFound = false;
  for (var i = 0; i < students.length; i++){
    if(students[i].name === studentToSearch){
      studentFound = true;
      students[i].markDropout();
      printHTML(students[i].toHTML());
    }
  }
  if (!studentFound){
    alert("Sorry, we didn't find " + studentToSearch + " in our records");
  }
}

// When click on print all button, show all results in html
var printAll = document.getElementById('print all');
printAll.onclick = function() {
  printHTML(mergeHTML());
}

// When click on Run employability, include recommendation to students
var runEmployability = document.getElementById('run employability');
runEmployability.onclick = function() {
  for (var i = 0; i < students.length; i++){
    students[i].runEmployability();
  }
  printHTML(mergeHTML());
}

//Class Average

//Best Student
