// day variables




// and change the toggle function to look like this-

var togClass;
var userName;
var password = "";
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

var boxSelected;



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

$("#logout").on("click", function() {

    signOut();


});
$("#submituser").on("click", function() {
    userName = $("#username").val();
    password = $("#password").val();

    signIn();


});




function displayUser() {
    $("#displayUser").html(userName + " is logged in");

}

function createUser() {
    firebase.auth().createUserWithEmailAndPassword("jwin4740@gmail.com", "helloworld").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}


function signIn() {
    firebase.auth().signInWithEmailAndPassword(userName, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        displayUser();
        $("#username").val("");
        $("#password").val("");
    });


}


function signOut() {
    firebase.auth().signOut().then(function() {
        console.log("you are signed out");
    }, function(error) {
        console.log(error);
    });
}
$('.collapsible').collapsible();

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
// create popup
var popUpDiv = $("<div id='menu'>");
var popUpConfession = $("<button id='confession' class='popButton'>CONFESS</button>");
var popUpFalls = $("<button id='falls' class='popButton'>FALLS</button>");
var popUpMass = $("<button id='mass' class='popButton'>MASS</button>");
popUpDiv.append(popUpConfession).append(popUpFalls).append(popUpMass);
$("#login").append(popUpDiv);


$("#login").append(popUpDiv);
database.ref().once("value", function(snapshot) {
    if (!snapshot.child(userName + "/2017").exists()) {
        for (var i = 0; i < yearArray.length; i++) {
            tempMonth = yearArray[i].month;
            tempDaysInMonth = yearArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                var daysRef = database.ref(userName + "/2017/" + tempMonth + "/" + j);
                var confessionConstructObj = new confessionConstruct(tempMonth, j, "b", 0, 0);
                daysRef.set({ confessionConstructObj });
            }
        }
        console.log("it doesnt exist");
    }
});
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
        monthBox.addClass(tempMonth + i);
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

var popUpDiv = $("<div id='menu'>");
var popUpConfession = $("<button id='confession' class='popButton'>CONFESS</button>");
var popUpFalls = $("<button id='falls' class='popButton'>FALLS</button>");
var popUpMass = $("<button id='mass' class='popButton'>MASS</button>");
popUpDiv.append(popUpConfession).append(popUpFalls).append(popUpMass);
$(this).append(popUpDiv);

        //     var popup = $("<div style='float: right;' class='popup'><input id='confession'><input id='fall'><input id='mass'><button id='confirm'>Confirm</button></div>");
        //     var subclass = ($(this));
        //     console.log(subclass);
        //     var parentClass = ($(this)[0].parentElement.classList[0]);
        togClass = $(this)[0];
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



});

$("#login").on("click", "#confession", function() {
    console.log("helloworld");
    console.log(month);
    console.log(clickedVal);
    $("." + month + clickedVal).append("yo");
});
//     if (event.key === "e") {
//         return;
//     }
// });

// function clickerVal() {

//     var funClick = $("." + month + "day");
//     console.log(month + "day");
//     var blackDot = $("<img src='/assets/images/blackdot.png>");
//     var whiteDot = $("<p>");
//     funClick[clickedVal - 1].append(whiteDot);

// }


// mySQL workbench, set up PHP environment with Apache
// established local host
// look up wamp or xamp
// mongo
