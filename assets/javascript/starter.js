// day variables
// and change the toggle function to look like this-
var confessionBool = ""
var day = "";
var novoFall;
var fallLanding;
var togClass;
var userName;
var snapshotArray = [];
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
var currentYear = "";
var currentMonth = 0;
var monthLength = 0;
var yearsCoveredArray = ["2016", "2017"]; // hard coded
var yearObjectArray = [];
var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
];
var monthCount = 0;
var matchCount = 0;
var lander;
var boxSelected;
var switchBox;
var ancestor;
var confessionConstructObj = "";



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

// $("#logout").on("click", function() {

//     signOut();


// });
// $("#submituser").on("click", function() {
//     userName = $("#username").val();
//     password = $("#password").val();

//     signIn();


// });




// function displayUser() {
//     $("#displayUser").html(userName + " is logged in");

// }

// function createUser() {
//     firebase.auth().createUserWithEmailAndPassword("jwin4740@gmail.com", "helloworld").catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//     });
// }


// function signIn() {
//     firebase.auth().signInWithEmailAndPassword(userName, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         displayUser();
//         $("#username").val("");
//         $("#password").val("");
//     });


// }


// function signOut() {
//     firebase.auth().signOut().then(function() {
//         console.log("you are signed out");
//     }, function(error) {
//         console.log(error);
//     });
// }
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


// push yearConstructor objects to an 
for (var j = 0; j < yearsCoveredArray.length; j++) {
    currentYear = yearsCoveredArray[j];
    for (var i = 1; i <= 12; i++) {
        month = moment().year(currentYear).month(i - 1).format("MMMM");
        monthLength = moment().year(currentYear).month(i - 1).daysInMonth();
        var yearConstructObj = new yearConstruct(currentYear, month, monthLength);
        yearObjectArray.push(yearConstructObj);
    }
}
console.log(yearObjectArray);



// database.ref().once("value", function(snapshot) {
//     for (var k = 0; k < yearsCoveredArray.length; k++) {
//         currentYear = yearsCoveredArray[k];
//         for (var i = 0; i < yearObjectArray.length; i++) {
//             tempMonth = yearObjectArray[i].month;
//             tempDaysInMonth = yearObjectArray[i].monthLength;
//             for (var j = 1; j < tempDaysInMonth + 1; j++) {
//                 var daysRef = database.ref("/" + currentYear + "/" + tempMonth + "/" + j);
//                 var confessionConstructObj = new confessionConstruct(tempMonth, j, "b", 0, 0);
//                 daysRef.set({ confessionConstructObj });
//             }
//         }
//     }
// });

// if firebase is already established then it pushes the values to confessionArray

setTimeout(function() { startUp(); }, 3000);

function startUp() {

    for (var k = 0; k < yearsCoveredArray.length; k++) {
        currentYear = yearsCoveredArray[k];
        for (var i = 0; i < yearObjectArray.length - 12; i++) {
            tempMonth = yearObjectArray[i].month;
            tempDaysInMonth = yearObjectArray[i].monthLength;
            for (var j = 1; j < tempDaysInMonth + 1; j++) {
                database.ref("/" + currentYear + "/" + tempMonth + "/" + j + "/" + confessionConstructObj).once("value", function(snapshot) {
                    var day = snapshot.val();
                    confessionArray.push(day);

                });
            }
        }

    }
    console.log(confessionArray);


    setTimeout(function() { readBool(); }, 3000);
}

function readBool() {
console.log(confessionArray.length);
    for (var j = 1; j < confessionArray.length; j++) {
        console.log(confessionArray[j].confessionConstructObj.confessionBool);
    }



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
        var blackDiv = $("<div class='blackDiv'>");
        var massDiv = $("<div class='massDiv'>");
        var communionP = $("<p class='communionP'>");
        var popUpRunway = $("<div class='popUpRunway land" + tempMonth + i + "'>");
        var confessionInt = confessionArray[matchCount];

        if (confessionInt === "a") {

            console.log("show green");
            monthBox.addClass("datesgreen");
        }
        massDiv.append(communionP);
        monthBox.attr("data-value", i);
        monthBox.attr("data-month", tempMonth);
        monthBox.text(i);
        monthBox.append(openButton).append(blackDiv).append(massDiv).append(popUpRunway);
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
    if (switchBox.hasClass("datesgreen")) {

        database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
            confessionBool: "a"
        })

    } else {

        database.ref("/2017/" + month + "/" + clickedVal + "/confessionConstructObj").update({
            confessionBool: "b"
        });
    }
    removeBox.empty();
    clickerBool = true;
});

$("li").on("click", "#falls", function() {
    fallLanding = $(this).parent("div").parent().parent().parent().parent()[0].children[1];
    makeFall(fallLanding);
});

function makeFall(destination) {
    novoFall = $("<p class='blackP'></p>");
    console.log(novoFall);
    destination.append(novoFall[0]);
}
