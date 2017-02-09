var boolBorder = false;
var confessionArray = [];
var year, month, days;
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
                var confessionConstructObj = new confessionConstruct(tempMonth, j, false);
                daysRef.set({ confessionConstructObj });
            }
        }
        console.log("it doesnt exist");
    }
});

// if firebase is already established then it pushes the values to confessionArray
database.ref().once("value", function(snapshot) {
    if (snapshot.child("2017").exists()) {
        for (var i = 0; i < yearArray.length; i++) {
            var tempMonth = yearArray[i].month;
            var tempDaysInMonth = yearArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                database.ref("/2017/" + tempMonth + "/" + j).on("child_added", function(childSnapshot) {
                    var day = childSnapshot.val().confessionBool;
                    confessionArray.push(day);
                    console.log(confessionArray);

                });
            }
            // setTimeout(initiatePage(tempMonth, tempDaysInMonth), 500);
            
        }
        setTimeout(initiatePage(tempMonth, tempDaysInMonth), 5000);
    }
    // will work until I learn promises
    console.log(yearArray);
});


function initiatePage(tempMonth, tempDaysInMonth) {
    var monthHead = $("<h2 class='monthHeader'>" + tempMonth + "</h2>");
    $(".test").append(monthHead);
    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        var monthBox = $("<div class='" + tempMonth + "day'></div>");

        if (confessionArray[i] === true) {
            console.log("show green");
            monthBox.addClass("datesgreen");
        } else {
            monthBox.addClass("datesblack");

        }

        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        $(".test").append(monthBox);
    }
    console.log(confessionArray)
    $(".test").append("<br style='clear: both;'><hr>");
}


$(".test").on("click", ".datesblack", function() {
    $(this).toggleClass("datesgreen");
    var clickedVal = parseInt($(this)[0].innerText);
    console.log(clickedVal);
    var month = ($(this)[0].dataset.month);

    if ($(this).hasClass("datesgreen")) {


        var confessionConstructObj = new confessionConstruct(month, clickedVal, true);
        database.ref("/2017/" + month + "/" + clickedVal).set({
            confessionConstructObj
        });


    } else {
        var confessionConstructObj = new confessionConstruct(month, clickedVal, false);
        database.ref("/2017/" + month + "/" + clickedVal).set({
            confessionConstructObj
        });

    }

    // var daysRef = database.ref("/2017/" + tempMonth + "/" + j);
    //             daysRef.push({
    //                 confession: false,
    //                 init: "no"
    //             });

});
