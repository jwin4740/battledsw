var boolBorder = true;


 $(document).ready(function() {

for (var i = 1; i < 31; i++)
{
	var monthBox = $("<div>");
	monthBox.addClass("dates");
	monthBox.text(i);
	$("#test").append(monthBox);

}


$(".dates").on("click", function(){
	if (boolBorder === true)
	{
		$(this).css({"border": "solid 4px #00ff00"});
		console.log(this);
	    boolBorder = false;
	    // document.onkeyup = function(event){
	    // userKey = event.key;
	    // console.log(userKey);	
	    // 	if (userKey === "r")
	    // 	{
	    // 		$(".dates").css(({"border": "solid 4px purple"}));
	    // 		console.log(this);
	    // 	}
	    // };

	}

	else if (boolBorder === false)
	{
		$(this).css({"border": "solid 2px black"});
	    boolBorder = true;
	    console.log(this)

	}
	
})



// $(".dates").on("click", function(){
// 	$(this).css({"border": "solid 4px red"});
// })
});