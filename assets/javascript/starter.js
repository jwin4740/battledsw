var boolBorder = false;
var confessionArray = [];


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
var dateRef = database.ref("/dates");

function dateConstruct (day, confessionBool){
    this.day = day,
    this.confessionBool = confessionBool
}


console.log(confessionArray);

    for (var i = 1; i < 31; i++) {
        var monthBox = $("<div>");
        monthBox.addClass("datesblack");
        monthBox.attr("data-value", i);
        monthBox.text(i);
        $(".test").append(monthBox);
    }
   
    dateRef.on("child_added", function(childSnapshot) {
        var fireConfess = childSnapshot.val().confessionBool;
        confessionArray.push(fireConfess);
    });

console.log(confessionArray);
    $(".datesblack").on("click", function() {
        var date = $(this)[0];
        console.log(date.attr());
        $(this).css({ "border": "solid 3px red" });
       
    });


