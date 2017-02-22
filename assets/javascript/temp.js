var blankMonthBox = $("<div class='" + tempMonth + "day'>");
        switch (tempFirstDay) {
            case 0:
                tempFirstDay === "Sunday";
                giveBlanksCount = 0;
                break;
            case 1:
                tempFirstDay === "Monday";
                giveBlanksCount = 1;
                break;
            case 2:
                tempFirstDay === "Tuesday";
                giveBlanksCount = 2;
                break;
            case 3:
                tempFirstDay === "Wednesday";
                giveBlanksCount = 3;
                break;
            case 4:
                tempFirstDay === "Thursday";
                giveBlanksCount = 4;
                break;
            case 5:
                tempFirstDay === "Friday";
                giveBlanksCount = 5;
                break;
            case 6:
                tempFirstDay === "Saturday";
                giveBlanksCount = 6;
        }


        if (giveBlanksCount != 0) {
            for (var l = 0; l < giveBlanksCount; l++) {
                blankMonthBox.addClass(tempYear);
                blankMonthBox.addClass("datesblack");
                monthContainer.append(blankMonthBox)
            }
        }