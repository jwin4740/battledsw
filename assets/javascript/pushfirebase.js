var boolBorder = false;
var confessionArray = [];
var count = 0;
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
// database.ref().set({
//     name : "john",
//     birthmonth: "june",
//     firecount: count
// });

database.ref().once("value", function (snapshot){
    var newCount = snapshot.val().firecount;
    
    console.log(newCount);
    count = newCount;
    count++;
    setTimeout(function () {
        pushCount(count);
    }, 2000);
});

function pushCount (count) {
    database.ref().update({
    
    firecount: count
});
console.log(count);
}


