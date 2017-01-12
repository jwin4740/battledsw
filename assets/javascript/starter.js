var boolBorder = false;

$(document).ready(function() {


    for (var i = 1; i < 31; i++) {
        var monthBox = $("<div>");
        monthBox.addClass("datesblack");
        monthBox.text(i);
        $(".test").append(monthBox);
    }


    $(".datesblack").on("click", function() {
        var location = $(this);
        location.css({ "border": "solid 2px yellow" });
        document.onkeyup = function(event) {
            if (event.key === "r") {
                location.css({ "border": "solid 4px red" });
            }
            if (event.key === "b") {
                location.css({ "border": "solid 2px black" });
            }
        }


    });
    $("#saveme").on("click", function(event) {

        var testerval = $("#tester").val().trim();
        localStorage.setItem("testvalue", testerval);
        $("#runway").append(localStorage.getItem("testvalue"));
    });
    $("#runway").append(localStorage.getItem("testvalue"));

});
