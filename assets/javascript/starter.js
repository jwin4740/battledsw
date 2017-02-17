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
var lander;
var boxSelected;
var switchBox;
var ancestor;



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
    var days = $("<h5 class='daysofweek'> ...SUNDAY ..MONDAY ..TUESDAY WEDNESDAY THURSDAY FRIDAY ....SATURDAY</h5>");
    $("#" + tempMonth).append(monthContainer);
    monthContainer.append(days);

    for (var i = 1; i < tempDaysInMonth + 1; i++) {
        matchCount++;
        var monthBox = $("<div class='" + tempMonth + "day'>");
        monthBox.addClass("datesblack");
        monthBox.addClass(tempMonth + i);
        var openButton = $("<button class='openMenu'>+</button>");
        var popUpRunway = $("<div class='popUpRunway land" + tempMonth + i + "'>");
        var confessionInt = confessionArray[matchCount];

        if (confessionInt === "a") {

            console.log("show green");
            monthBox.addClass("datesgreen");
        }

        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        monthBox.append(openButton).append(popUpRunway);
        monthContainer.append(monthBox);

    }

    $("#" + tempMonth).append("<br style='clear: both;'><hr>");


    if (monthCount < 12) {

        startUp(monthCount);

    }
}


$("li").on("click", ".openMenu", function() {
    console.log($(this).parent());
    clickedVal = parseInt($(this).parent()[0].childNodes[0].data);
    var parentDiv = $(this).parent()[0];
    console.log(parentDiv);
    month = $(this).parent()[0].dataset.month;
   lander = $(".land" + month + clickedVal);
    console.log(lander.selector);

    if (clickerBool === true) {

        // popUpInfo();
        // $(this).parent().toggleClass("datesgreen");

      popUpInfo(lander.selector);

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

clickerBool = false;

});








// mySQL workbench, set up PHP environment with Apache
// established local host
// look up wamp or xamp
// mongo
function popUpInfo(destination) {
    var popUpContainer = $("<div id='popContainer'>");
    var popUpDivContain = $("<div id='menuContain'>");
    var popUpExit = $("<button id='exit'>x</button>");
    var popUpDiv = $("<div id='menu'>");
    var popUpConfession = $("<button id='confession' class='popButton'>CONFESS</button>");
    var popUpFalls = $("<button id='falls' class='popButton'>FALLS</button>");
    var popUpMass = $("<button id='mass' class='popButton'>MASS</button>");
    popUpDiv.append(popUpConfession).append(popUpFalls).append(popUpMass);
    popUpDivContain.append(popUpExit).append(popUpDiv);
    popUpContainer.append(popUpDivContain);
    $(destination).append(popUpContainer);

}

$("li").on("click", "#exit", function() {
   ancestor = $(this).parent("div").parent().parent();
   ancestor.empty();
    clickerBool = true;
    console.log(ancestor);
});

$("li").on("click", "#confession", function() {
    var removeBox = $(this).parent("div").parent().parent().parent();
   switchBox = $(this).parent("div").parent().parent().parent().parent();
   switchBox.toggleClass("datesgreen");
  removeBox.empty();
  clickerBool = true;
});


