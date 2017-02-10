var boolBorder = false;
var confessionArray = ["blank"];
var year, month, days;
var clickedVal;
var currentYear = moment().year();
var currentMonth = moment().month();
var monthLength = moment().daysInMonth();
var yearArray = [];
var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];

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

function yearConstruct(year, month, monthLength) {
    this.year = year,
        this.month = month,
        this.monthLength = monthLength
}


function confessionConstruct(month, day, confessionBool) {
    this.month = month,
        this.day = day,
        this.confessionBool = confessionBool
}


// for(var i = 1; i < 29; i++) {

//     var confessionObj = new confessionConstruct(monthsArray[1], i, false);
//     database.ref("/February/" + i).set({
//         confessionObj
//     });
// }



startUp();



function startUp() {
    for (var i = 1; i < 29; i++) {
        database.ref("/February/" + i).on("child_added", function(childsnapshot) {

            var bool = childsnapshot.val().confessionBool;

            confessionArray.push(bool);
        });
    }
    setTimeout(function() {
        initiatePage(monthsArray[1], 28);
    }, 2000);
}



function initiatePage(tempMonth, tempDaysInMonth) {
    var monthHead = $("<h2 class='monthHeader'>" + tempMonth + "</h2>");
    $(".test").append(monthHead);
    console.log(confessionArray);
    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        var monthBox = $("<div class='" + tempMonth + "day'></div>");
        monthBox.addClass("datesblack");
        if (confessionArray[i] === true) {
            console.log("show green");
            monthBox.addClass("datesgreen");
        }

        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        $(".test").append(monthBox);
    }

    $(".test").append("<br style='clear: both;'><hr>");
}


$(".test").on("click", ".datesblack", function() {
    $(this).toggleClass("datesgreen");
    var clickedVal = parseInt($(this)[0].innerText);
    console.log(clickedVal);
    var month = ($(this)[0].dataset.month);

    if ($(this).hasClass("datesgreen")) {


        // var confessionConstructObj = new confessionConstruct(month, clickedVal, true);
        database.ref("/February/" + clickedVal + "/confessionObj").update({
            confessionBool: true
        });


    } else {
        database.ref("/February/" + clickedVal + "/confessionObj").update({
            confessionBool: false
        });

        // database.ref("/February/" + 2).on("child_added", function(childsnapshot) {

        //     var bool = childsnapshot.val().confessionBool;

        //     confessionArray.push(bool);
        //     console.log(confessionArray);
        // });
    }
});


// database.ref("/February/" + 2 + "/confessionObj").on("child_changed", function(snapshot) {
//            var bool = snapshot.val().confessionBool;
//            console.log(bool);
//        });
