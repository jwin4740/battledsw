var boolBorder = false;
var confessionArray = [];
var year, month, days;
var currentYear = moment().year();
var currentMonth = moment().month();
var monthLength = moment().daysInMonth();
var yearArray = [];
var tempMonth = 0;
var tempDaysInMonth = 0;
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


function dateConstruct(day, confessionBool) {
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
            tempMonth = yearArray[i].month;
            tempDaysInMonth = yearArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                var daysRef = database.ref("/2017/" + tempMonth + "/" + j);
                daysRef.push({
                    confession: false,
                    init: "no",
                    month: tempMonth
                });
            }
        }
    }
});

// if firebase is already established then it pushes the values to confessionArray
database.ref().once("value", function(snapshot) {
    if (snapshot.child("2017").exists()) {
        for (var i = 0; i < yearArray.length; i++) {
            tempMonth = yearArray[i].month;
            tempDaysInMonth = yearArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                database.ref("/2017/" + tempMonth + "/" + j).on("child_added", function(childSnapshot) {
                    var day = childSnapshot.val().confession;
                    confessionArray.push(day);
                });
            }
            setTimeout(initiatePage, 100);
        }
    }
     // will work until I learn promises
    console.log(confessionArray);
});


function initiatePage() {
var monthHead = $("<br style='clear : both;'><br><h2 class='monthHeader'>" + tempMonth + "</h2>");
    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        var monthBox = $("<div class='" + tempMonth + "'></div>");

        if (confessionArray[i] === true) {
            console.log("show green");
            monthBox.addClass("datesgreen");
        } else {
            monthBox.addClass("datesblack");
            console.log("show black");
        }

        monthBox.attr("data-value", i);
        monthBox.text(i);
        $(".test").append(monthHead).append(monthBox);
    }
}


$(".test").on("click", ".datesblack", function() {
    $(this).toggleClass("datesgreen");
    var clickedVal = parseInt($(this)[0].innerText);
    console.log(clickedVal);

    if ($(this).hasClass("datesgreen")) {
        console.log("pass");
    } else {
        console.log("fail");
    }

    // var daysRef = database.ref("/2017/" + tempMonth + "/" + j);
    //             daysRef.push({
    //                 confession: false,
    //                 init: "no"
    //             });

});
