// day variables
// and change the toggle function to look like this-

var monthConfessionCount = 0;
var monthFallCount = 0;
var monthMassCount = 0;

var confessionBool = ""
var day = "";
var novoFall;
var novoMass;
var massLanding;
var fallLanding;
var togClass;
var tempnumMass = 0;

var userName;
var snapshotArray = [];
var password = "";
var keyBool = true;
var confessionArray = ["blank"];
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
var yearsCoveredArray = ["2015", "2016", "2017"]; // hard coded
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
var numFalls = 0;
var numMass = 0;
var dataIndex = 0;
var tempnumFalls = 0;
var totalFallCount = 0;
var totalConfessionCount = 0;
var totalMassCount = 0;
var tempFirstDay = "";

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


// on load the page opens the current month's tab and content
openCurrentMonthTab();
function openCurrentMonthTab() {
    var year = moment().format("YYYY");
    var month = moment().format("MMMM")
    $("#" + month + year).parent("li").children(0).addClass("active");
}

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
//             currentYear = "2015";
//         } else if (i < 24) {
//             currentYear = "2016";
//         }
//         else {
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
                var greatgrandchildData = greatgrandchildSnapshot.val().dataConstructObj;
                var confessionData = greatgrandchildSnapshot.val().dataConstructObj.confessionBool;
                confessionArray.push(confessionData);
                dataArray.push(greatgrandchildData);

            });
        });
    });

    // console.log(confessionArray);
    // console.log(keyArray);
    // console.log(dataArray);
});


setTimeout(function() {
    initiatePage();
    calculateTotals();
}, 1500);

function calculateTotals() {
    for (var i = 1; i < dataArray.length; i++) {
        totalFallCount += dataArray[i].numFalls;
        totalConfessionCount += dataArray[i].confessionBool;
        totalMassCount += dataArray[i].numMass;
    }
    displayTotalCounts();

}

function initiatePage() {

    console.log(confessionArray.length);

    for (var j = 0; j < keyArray.length; j++) {

        if (j < 12) {
            tempYear = "2015";
        } else if (j < 24 && j > 11) {
            tempYear = "2016";
        } else {
            tempYear = "2017";
        }
        monthMassCount = 0;
        monthFallCount = 0;
        monthConfessionCount = 0;
        tempMonth = keyArray[j];
        monthContainer = $("<div class='" + tempMonth + "container monthcontainer'>");

        var days = $("<h4 class='daysofweek'>` .......SUNDAY .............MONDAY ............TUESDAY .........WEDNESDAY .......THURSDAY .........FRIDAY ............SATURDAY`</h4>");
        monthContainer.append(days);
        $("#" + tempMonth + tempYear).append(monthContainer);
        tempFirstDay = moment().year(tempYear).month(tempMonth).date(1).format("dddd");
        console.log(tempFirstDay);
        console.log(tempYear);
        console.log(tempMonth);
        tempDaysInMonth = moment().year(tempYear).month(tempMonth).daysInMonth();
        console.log(tempDaysInMonth);

        var giveBlanksCount = 0
        switch (tempFirstDay) {
            case "Monday":

                giveBlanksCount = 1;
                break;
            case "Tuesday":

                giveBlanksCount = 2;
                break;
            case "Wednesday":

                giveBlanksCount = 3;
                break;
            case "Thursday":

                giveBlanksCount = 4;
                break;
            case "Friday":

                giveBlanksCount = 5;
                break;
            case "Saturday":

                giveBlanksCount = 6;
                break;
            default:

                break;
        }

        console.log(giveBlanksCount);
        if (giveBlanksCount != 0) {
            for (var l = 0; l < giveBlanksCount; l++) {
                var blankMonthBox = $("<div class='" + tempMonth + "day'>");
                blankMonthBox.addClass(tempYear);
                blankMonthBox.addClass("datesblack");
                monthContainer.append(blankMonthBox);

            }
        }

        for (var i = 1; i < tempDaysInMonth + 1; i++) {
            matchCount++;
            var monthBox = $("<div class='" + tempMonth + "day'>");
            monthBox.addClass(tempYear);
            monthBox.attr("data-count", matchCount);
            monthBox.addClass("datesblack");
            monthBox.addClass(tempMonth + i);
            var openButton = $("<button class='openMenu'>+</button>");
            var blackDiv = $("<div class='blackDiv'>");
            var massDiv = $("<div class='massDiv'>");
            var communionP = $("<p class='communionP'>");
            var popUpRunway = $("<div class='popUpRunway land" + tempMonth + i + "'>");

            // using dataArray values
            var confessionBin = dataArray[matchCount].confessionBool;
            numFalls = dataArray[matchCount].numFalls;
            numMass = dataArray[matchCount].numMass;
            var fallCounter = 0;
            var massCounter = 0;
            if (numFalls != 0) {
                do {
                    displayFalls(blackDiv);
                    fallCounter++;
                    monthFallCount++;
                }
                while (fallCounter < numFalls);
            }
            if (numMass != 0) {
                do {
                    displayMass(massDiv);
                    massCounter++;
                    monthMassCount++;
                }
                while (massCounter < numMass);
            }


            if (confessionBin === 1) {
                console.log("show green");
                monthBox.addClass("datesgreen");
                monthConfessionCount++;
            }
            massDiv.append(communionP);
            monthBox.attr("data-value", i);
            monthBox.attr("data-month", tempMonth);
            monthBox.text(i);
            monthBox.append(openButton).append(blackDiv).append(massDiv).append(popUpRunway);
            monthContainer.append(monthBox);

        } // internal for loop end

        $("#" + tempMonth + tempYear + "Falls").html(monthFallCount);
        $("#" + tempMonth + tempYear + "Confessions").html(monthConfessionCount);
        $("#" + tempMonth + tempYear + "Mass").html(monthMassCount);
        $("#" + tempMonth + tempYear).append("<br style='clear: both;'><hr>");

    } // external for loop end


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
        totalConfessionCount++;
        displayTotalCounts();
    } else {

        database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
            confessionBool: 0
        });
        totalConfessionCount--;
        displayTotalCounts();
    }
    removeBox.empty();
    clickerBool = true;
});

$("li").on("click", "#falls", function() {
    fallLanding = $(this).parent("div").parent().parent().parent().parent()[0].children[1];
    dataIndex = parseInt($(this).parent("div").parent().parent().parent().parent()[0].dataset.count);

    tempnumFalls = dataArray[dataIndex].numFalls;
    tempnumFalls++;
    totalFallCount++;

    dataArray[dataIndex].numFalls = tempnumFalls;

    console.log(tempnumFalls);


    displayTotalCounts();
    makeFall(fallLanding);

});

function displayFalls(destination) {
    novoFall = $("<p class='blackP'></p>");
    destination.append(novoFall[0]);

}

function makeFall(destination) {
    novoFall = $("<p class='blackP'></p>");
    destination.append(novoFall[0]);
    database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
        numFalls: tempnumFalls
    });
}

function displayTotalCounts() {
    console.log(totalFallCount);
    $("#totalFalls").html(totalFallCount);
    $("#totalConfessions").html(totalConfessionCount);
    $("#totalMass").html(totalMassCount);
}





$("li").on("click", "#mass", function() {
    massLanding = $(this).parent("div").parent().parent().parent().parent()[0].children[2];

    dataIndex = parseInt($(this).parent("div").parent().parent().parent().parent()[0].dataset.count);

    tempnumMass = dataArray[dataIndex].numMass;
    tempnumMass++;
    totalMassCount++;

    dataArray[dataIndex].numMass = tempnumMass;

    console.log(tempnumMass);


    displayTotalCounts();
    makeMass(massLanding);

});

function displayMass(destination) {
    novoMass = $("<p class='massP'></p>");
    destination.append(novoMass[0]);

}

function makeMass(destination) {
    novoMass = $("<p class='massP'></p>");
    destination.append(novoMass[0]);
    database.ref("/" + year + "/" + month + "/" + clickedVal + "/dataConstructObj").update({
        numMass: tempnumMass
    });
}
