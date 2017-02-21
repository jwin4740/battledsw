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
var dataArray = ["blank"];
var tempYear;
var tempMonth;
var tempDaysInMonth = 0;
var clickerBool = true;
var clickedVal;
var year, month, days;
var currentYear = "";
var currentMonth = 0;
var monthLength = 0;
var yearsCoveredArray = ["2016", "2017"]; // hard coded
var yearObjectArray = [];
var monthsArray = ["April", "August", "December", "February", "January", "July", "June", "March",
    "May", "November", "October", "September"
];
var monthCount = 0;
var matchCount = 0;
var lander;
var boxSelected;
var switchBox;
var ancestor;
var confessionConstructObj = "";
var keyArray = [];



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
    this.year = year;
    this.month = month;
    this.monthLength = monthLength;
}


function DataConstruct(year, month, day, confessionBool, numFalls, numMass, totalDaysInMonth) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.confessionBool = confessionBool;
    this.numFalls = numFalls;
    this.numMass = numMass;
    this.totalDaysInMonth = totalDaysInMonth;
}


// push yearConstructor objects to an array
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
//     for (var i = 0; i < yearObjectArray.length; i++) {
//         if (i < 12) {
//             currentYear = "2016";
//         } else {
//             currentYear = "2017";
//         }
//         tempMonth = yearObjectArray[i].month;
//         tempDaysInMonth = yearObjectArray[i].monthLength;
//         console.log(tempDaysInMonth);
//         for (var j = 1; j < tempDaysInMonth + 1; j++) {
//             var daysRef = database.ref("/" + currentYear + "/" + tempMonth + "/" + j);
//             var dataConstructObj = new DataConstruct(currentYear, tempMonth, j, 0, 0, 0, tempDaysInMonth);
//             daysRef.set({ dataConstructObj });
//         }

//     }
// });

// if firebase is already established then it pushes the values to confessionArray


var childData = "";
var i = 0;



database.ref().once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(grandchildSnapshot) {
            keyArray.push(grandchildSnapshot.key);


            grandchildSnapshot.forEach(function(greatgrandchildSnapshot) {
                greatgrandchildData = greatgrandchildSnapshot.val().dataConstructObj.confessionBool;
                dataArray.push(greatgrandchildData);

            });
        });
    });

    console.log(dataArray);
    console.log(keyArray);
});


setTimeout(function() {
    initiatePage();
}, 3000);


function initiatePage() {
    console.log(dataArray.length);

    for (var j = 0; j < keyArray.length; j++) {
        if (j < 12) {
            tempYear = "2016";
        } else {
            tempYear = "2017";
        }

        tempMonth = keyArray[j];
        monthContainer = $("<div class='" + tempMonth + "container monthcontainer'>");
        var days = $("<h5 class='daysofweek'> ...SUNDAY ..MONDAY ..TUESDAY WEDNESDAY THURSDAY FRIDAY ....SATURDAY</h5>");
        monthContainer.append(days);
        $("#" + tempMonth + tempYear).append(monthContainer);
        $("#" + tempMonth).append("<br style='clear: both;'><hr>");
        tempDaysInMonth = moment().year(tempYear).month(tempMonth).daysInMonth();
        console.log(tempDaysInMonth);

        for (var i = 1; i < tempDaysInMonth + 1; i++) {
            matchCount++;
            var monthBox = $("<div class='" + tempMonth + "day'>");
            monthBox.addClass(tempYear);
            monthBox.addClass("datesblack");
            monthBox.addClass(tempMonth + i);
            var openButton = $("<button class='openMenu'>+</button>");
            var blackDiv = $("<div class='blackDiv'>");
            var massDiv = $("<div class='massDiv'>");
            var communionP = $("<p class='communionP'>");
            var popUpRunway = $("<div class='popUpRunway land" + tempMonth + i + "'>");
            var dataBin = dataArray[matchCount];

            if (dataBin === 1) {
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

    }


}


$("li").on("click", ".openMenu", function() {
    console.log($(this).parent());
    clickedVal = parseInt($(this).parent()[0].childNodes[0].data);
    console.log(clickedVal);
    var parentDiv = $(this).parent()[0];
    console.log(parentDiv);
   year = $(this).parent()[0].classList[1];

    month = $(this).parent()[0].dataset.month;
    console.log(month);
    lander = $(".land" + month + clickedVal);
    console.log(lander);

    if (clickerBool === true) {

        // popUpInfo();
        // $(this).parent().toggleClass("datesgreen");

        popUpInfo(lander);

        //     // $("." + parentClass).append(popup);

        if ($(this).hasClass("datesgreen")) {
            console.log(year);
            database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
                confessionBool: 1
            })

        } else {
            console.log(year);
            database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
                confessionBool: 0
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

        database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
            confessionBool: 1
        })

    } else {

        database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
            confessionBool: 0
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
