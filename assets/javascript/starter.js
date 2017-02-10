var boolBorder = false;
var confessionString = "d";
var confessionString2 = "d";
var confessionString3 = "d";
var confessionString4 = "d";

var year, month, days;
var currentYear = moment().year();
var currentMonth = moment().month();
var monthLength = moment().daysInMonth();
var yearArray = [];
var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];
var monthCount = 0;
var matchCount = 0;

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


for (var i = 1; i <= 12; i++) {
    month = moment().month(i - 1).format("MMMM");
    monthLength = moment(i, "M").daysInMonth();
    var yearConstructObj = new yearConstruct(currentYear, month, monthLength);
    yearArray.push(yearConstructObj);
}
console.log(yearArray);


database.ref().once("value", function(snapshot) {
    if (!snapshot.child("2017").exists()) {
        for (var i = 0; i < yearArray.length; i++) {
            var tempMonth = yearArray[i].month;
            var tempDaysInMonth = yearArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                var daysRef = database.ref("/2017/" + tempMonth + "/" + j);
                var confessionConstructObj = new confessionConstruct(tempMonth, j, "b");
                daysRef.set({ confessionConstructObj });
            }
        }
        console.log("it doesnt exist");
    }
});

// if firebase is already established then it pushes the values to confessionString


startUp(monthCount);


function startUp(monthCount) {
    database.ref().once("value", function(snapshot) {
        if (snapshot.child("2017").exists()) {
            var tempMonth = yearArray[monthCount].month;
            var tempDaysInMonth = yearArray[monthCount].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                database.ref("/2017/" + tempMonth + "/" + j).on("child_added", function(childSnapshot) {
                    var day = childSnapshot.val().confessionBool;
                    confessionString += day;


                });



            }
            setTimeout(function() {
                initiatePage(tempMonth, tempDaysInMonth)
            }, 200);
            // setTimeout(initiatePage(tempMonth, tempDaysInMonth), 5000);
        }
        // will work until I learn promises

    });
}

function initiatePage(tempMonth, tempDaysInMonth) {
    monthCount++;
    
    var monthHead = $("<h2 class='monthHeader'>" + tempMonth + "</h2>");
    $(".test").append(monthHead);
    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        matchCount++;
        var monthBox = $("<div class='" + tempMonth + "day'></div>");
        monthBox.addClass("datesblack");
        var confessionInt = confessionString[matchCount];
       
        if (confessionInt === "a") {
           
            console.log("show green");
            monthBox.addClass("datesgreen");
        }

        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        $(".test").append(monthBox);
    }
  
    $(".test").append("<br style='clear: both;'><hr>");


    if (monthCount < 12) {

        startUp(monthCount)

    }
}


$(".test").on("click", ".datesblack", function() {
    $(this).toggleClass("datesgreen");
    var clickedVal = parseInt($(this)[0].innerText);
    console.log(clickedVal);
    var month = ($(this)[0].dataset.month);

    if ($(this).hasClass("datesgreen")) {

        database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
            confessionBool: "a"
        })

    } else {

        database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
            confessionBool: "b"
        });
    }

});
