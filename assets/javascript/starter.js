var boolBorder = false;
var confessionArray = [];
var year, months, days;
var currentYear = moment().year();
var currentMonth = moment().month();
var monthLength = moment().daysInMonth();
var yearArray = [];

function yearConstruct (year, month, monthLength) {
    this.year = year,
    this.month = month,
    this.monthLength = monthLength
}

for (var i = 1; i <= 12; i++)
{
    month = moment().month(i - 1).format("MMMM");
    monthLength = moment(i, "M").daysInMonth();
    var yearConstructObj = new yearConstruct(currentYear, month, monthLength);
    yearArray.push(yearConstructObj);
}
console.log(yearArray);


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCYo9PGp7tCVZQ5zQ08GXau2Ic2AmcZw_E",
    authDomain: "rpsgame-adee5.firebaseapp.com",
    databaseURL: "https://rpsgame-adee5.firebaseio.com",
    storageBucket: "rpsgame-adee5.appspot.com",
    messagingSenderId: "919631435144"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentYearRef = database.ref("/2017");
var lastYearRef = database.ref("/lastYear");
var monthsRef = database.ref("/2017/months");




// var monthsRef = database.ref("/2017/months/January");
// var monthsRef = database.ref("/2017/months/February");
// var monthsRef = database.ref("/2017/months/March");

// var monthsRef = database.ref("/2017/months/April");
// var monthsRef = database.ref("/2017/months/May");
// var monthsRef = database.ref("/2017/months/June");
// var monthsRef = database.ref("/2017/months/July");

var daysRef = database.ref("/2017/months/days");




database.ref().once("value", function(snapshot) {
    if (snapshot.child("2017").exists()) {
        console.log("it is there");
    }

    if (!snapshot.child("2017").exists()) {

        monthsRef.push({
            january: "hello",
            february: "goodbye"
        });
    }
});




function dateConstruct(day, confessionBool) {
    this.day = day,
        this.confessionBool = confessionBool
}


console.log(confessionArray);

for (var i = 1; i < 31; i++) {
    var monthBox = $("<div>");
    monthBox.addClass("datesblack");
    monthBox.attr("data-value", i);
    monthBox.text(i);
    $(".test").append(monthBox);
}
// dateRef.on("child_added", function(childSnapshot) {
//     var fireConfess = childSnapshot.val().confessionBool;
//     confessionArray.push(fireConfess);
// });

// console.log(confessionArray);
// $(".datesblack").on("click", function() {
//     var date = $(this)[0];
//     console.log(date.attr());
//     $(this).css({ "border": "solid 3px red" });

// });
