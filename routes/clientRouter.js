let fs = require("fs");
let router = require("express").Router();
let Student = require("../models/student");
let Appointment = require("../models/appointment");
let Question = require("../models/question");
let config = require("../config");

let colors = ["success", "info", "warning", "primary", "danger", "dark"];


router.get("/profile/:studentId", function(req, res) {
  Student.findById(req.params.studentId, function(err, student) {
    if (err) return console.log(err);
    res.render("student/profile");
  });
});

router.get("/reset_password/:studentId", function(req, res) {
  Student.findById(req.params.studentId)
  .select("_id matNo email")
  .exec(function(err, staff) {
    if (err) return console.log(err);
    res.render("staff/reset-password");
  });
});

router.post("/reset_password/:studentId", function(req, res) {
  if (req.body.matNo == req.session.user.matNo && req.body.email == req.session.user.email) {
    if (req.body.password != req.body.confirmPassword) {
      req.flash("error_msg", "Passwords do not match");
      res.redirect("/student/reset_password");
    }
    Student.findByIdAndUpdate(req.params.studentId, {$set: {password: req.body.password}})
    .exec(function(err, student) {
      if (err) return console.log(err);
      req.session.user = student;
      console.log("Password reset successful");
      req.flash("success_msg", "Password Reset Successfully");
      res.redirect("/student/login/" + req.params.studentId);
    });
  }
});

router.get("/appointment/:studentId", function(req, res) {
  Appointment.find({student: req.params.studentId})
    .populate("staff")
    .exec(function(err, docs) {
      if (err) return console.log(err);
      for (let i = 0, length = docs.length; i < length; i++) {
        docs[i].timeScheduled = docs[i].timeApproved ? new Date(docs[i].timeApproved).toGMTString() : false;
        docs[i].staffName =  docs[i].timeApproved ?  (docs[i].staff.name.surname + " " + docs[i].staff.name.otherName) : "";
        docs[i].color = colors[i % colors.length];
      }
      res.render("student/appointment", {appointments: docs});
    })
})

router.post("/appointment/book/:studentId", function(req, res) {
  Appointment.create({title: req.body.title, student: req.params.studentId}, function(err, doc) {
    if (err) return console.log(err);
    res.redirect("/student/appointment/" + req.params.studentId);
  });
});

router.get("/question/:studentId", function(req, res) {
  Question.find({student: req.params.studentId})
    .populate("staff")
    .exec(function(err, docs) {
      if (err) return console.log(err);
      for (let i = 0, length = docs.length; i < length; i++) {
        docs[i].staffName =  docs[i].isSolved ?  (docs[i].staff.name.surname + " " + docs[i].staff.name.otherName) : "";
        docs[i].color = colors[i % colors.length];
      }
      res.render("student/question", {questions: docs});
    })
})

router.post("/question/:studentId", function(req, res) {
  Question.create({title: req.body.title, student: req.params.studentId},
    function(err, doc) {
      if (err) return console.log(err);
      res.redirect("/student/question/" + req.params.studentId);
    });
});

router.get("/home", function(req, res) {
  res.render("student/home");
});

module.exports = router;