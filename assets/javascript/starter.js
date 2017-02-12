// day variables

$('.collapsible').collapsible();


// and change the toggle function to look like this-


var keyBool = true;
var confessionArray = ["blank"];
var fallArray = ["blank"];
var massArray = ["blank"];
var tempMonth;
var tempDaysInMonth;
var clickerBool = true;
var clickedVal;
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


function confessionConstruct(month, day, confessionBool, numFalls, numMass) {
    this.month = month,
        this.day = day,
        this.confessionBool = confessionBool,
        this.numFalls = numFalls,
        this.numMass = numMass;
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
                var confessionConstructObj = new confessionConstruct(tempMonth, j, "b", 0, 0);
                daysRef.set({ confessionConstructObj });
            }
        }
        console.log("it doesnt exist");
    }
});

// if firebase is already established then it pushes the values to confessionArray


startUp(monthCount);


function startUp(monthCount) {
    database.ref().once("value", function(snapshot) {
        if (snapshot.child("2017").exists()) {
            var tempMonth = yearArray[monthCount].month;
            var tempDaysInMonth = yearArray[monthCount].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                database.ref("/2017/" + tempMonth + "/" + j).on("child_added", function(childSnapshot) {
                    var day = childSnapshot.val().confessionBool;
                    var fall = childSnapshot.val().numFalls;
                    var mass = childSnapshot.val().numMass;
                    confessionArray.push(day);
                    fallArray.push(fall);
                    massArray.push(mass);
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
    console.log(confessionArray);
    console.log(fallArray);
    console.log(massArray);
    var monthContainer = $("<div class='" + tempMonth + "container monthcontainer'>");
    var days = $("<strong><h5 class='daysofweek'> ...SUNDAY ..MONDAY ..TUESDAY WEDNESDAY THURSDAY FRIDAY ....SATURDAY</h5></strong>");
    $("#" + tempMonth).append(monthContainer);
    monthContainer.append(days);
    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        matchCount++;
        var monthBox = $("<div class='" + tempMonth + "day'>");
        monthBox.addClass("datesblack");
        var confessionInt = confessionArray[matchCount];

        if (confessionInt === "a") {

            console.log("show green");
            monthBox.addClass("datesgreen");
        }

        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        monthContainer.append(monthBox);

    }

    $("#" + tempMonth).append("<br style='clear: both;'><hr>");


    if (monthCount < 12) {

        startUp(monthCount);

    }
}


$("li").on("click", ".datesblack", function() {
    console.log($(this)[0]);
    console.log($(this)[0].attributes[2].nodeValue);
    if (clickerBool === true) {



        //     var popup = $("<div style='float: right;' class='popup'><input id='confession'><input id='fall'><input id='mass'><button id='confirm'>Confirm</button></div>");
        //     var subclass = ($(this));
        //     console.log(subclass);
        //     var parentClass = ($(this)[0].parentElement.classList[0]);
        var togClass = $(this)[0];
        console.log(togClass);
        $(this).toggleClass("datesgreen");
        clickedVal = parseInt($(this)[0].firstChild.data);
        console.log(clickedVal);
        month = $(this)[0].attributes[2].nodeValue
            //     // $("." + parentClass).append(popup);

        if ($(this).hasClass("datesgreen")) {

            database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
                confessionBool: "a"
            })

        } else {

            database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
                confessionBool: "b"
            });
        }
    }
   
    $(document).on("keypress", togClass, function(event) {
        if (event.key === "o") {
             clickerVal();

     
        }
        if (event.key === "e") {
            return;
        }
    });

});

function clickerVal() {

    var funClick = $("." + month + "day");
    console.log(month + "day");
    funClick[clickedVal - 1].append("A");
    
}
