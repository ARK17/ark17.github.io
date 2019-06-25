(function () {
    var monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dayNameEN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayLICount = 0; //to count so far added li element in days UL
    //leap year calculation
    var now = new Date();
    var date = now.getDate();//20th jan
    var day = now.getDay();//saturday -- 0
    var month = now.getMonth();//jan -- 0
    var year = now.getFullYear();
    var currYear = year;
    var currMonth = month;
    var currDate = date;
    var currDay = day;
    console.log(date + " " + day + " " + month + " " + year);

    var dateElem = document.getElementsByClassName("days")[0];
    var weekElem = document.getElementsByClassName("weekdays")[0];
    var monthElem = document.getElementById('currMonth');
    var yearElem = document.getElementById('currYear');

    window.onload = function () {
        init();
        dayEventListener();
    };

    var prev = document.querySelector(".prev");
    prev.addEventListener("click", () => {
        month--;
        if (month === currMonth && year === currYear) {
            init();
        } else {
            //resetWeekDay();
            if (month < 0) {
                year--;
                month = 11;
                init();
            } else {
                init();
            }
        }
    });
    var next = document.querySelector(".next");
    next.addEventListener("click", () => {
        month++;
        if (month === currMonth && year === currYear) {
            init();
        } else {
            //resetWeekDay();
            if (month > 11) {
                year++;
                month = 0;
                init();
            }
            else {
                init();
            }
        }
    });
    //init
    function init() {
        //remove all the days of month
        destroyNode(dateElem);
        //check for leap year
        leapYear();
        //chnage to current month 
        changeMonth(month);
        //chnage to current year
        changeYear(year);
        //create the days of that month
        populateDateGrid();
        console.log("init day " + currDay + " init date " + currDate);
        //activateElem(weekElem.childNodes[((currDay+1)*2)-1]);
        //mark today's date
        activateElem(dateElem.childNodes[(currDate + dayValue())].firstChild, 'today'); //because every li element has a text node extra here
    }
    function activateElem(elem, clsName) {
        elem.className = elem.className+' ' +clsName;
    }
    function destroyNode(root) {
        while (root.firstChild) {
            root.removeChild(root.firstChild);
        }
    }
    function populateDateGrid() {
        dayLICount = 0;
        addPrevMonthDates();
        addCurrMonthDates();
        addNextMonthDates();
    }
    //global var to hold the selected day ref; is there any other option to get the parent of the event?
    var selectedLi;
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        removeAClass(selectedLi, 'active');
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            removeAClass(selectedLi, 'active');
            modal.style.display = "none";
        }
    }
    function dayEventListener() {
        console.log("inside dayEventListenr conditon");
        var dayUL = document.getElementById('daysOfMonth');
        dayUL.onclick = function (event) {
            var target = event.target;
            while (target != this) {
                if (target.tagName == 'LI') {
                    selectedLi = target.firstChild;
                    // When the user clicks on the day, open the modal 
                    modal.style.display = "block";
                    activateElem(selectedLi, 'active');
                    return;
                }
                target = target.parentNode;
            }
        }
    }

    function addPrevMonthDates() {

        var daysInPrevMonth = days[getPrevMonth()];
        var extraDaysStartFrom = daysInPrevMonth - dayValue();
        //console.log(d+"\n  prev "+prevMonth +' days '+daysInPrevMonth+'\n'+extraDaysStartFrom);
        for (var index = extraDaysStartFrom; index <= daysInPrevMonth; index++) {
            var item = createLI(index);
            item.className = 'gray';
            dateElem.appendChild(item);
            dayLICount++;
        }
    }
    function getPrevMonth() {
        return ((month - 1) === -1 ? 11 : (month - 1));
    }
    function dayValue() {
        //1995-12-17
        var d = new Date(year + '-' + (month + 1) + '-' + 1);
        return (d.getDay() - 1);
    }
    function addCurrMonthDates() {
        for (var index = 1; index <= days[month]; index++) {
            var item = createLI(index);
            //item.className = 'active';
            dateElem.appendChild(item);
            dayLICount++;
        }
    }
    function addNextMonthDates() {

        for (var index = 1; index <= (42 - dayLICount); index++) {
            var item = createLI(index);
            item.className = 'gray';
            dateElem.appendChild(item);
        }
    }
    function createLI(text) {

        var newLI = document.createElement('LI');
        newLI.appendChild(createSpan(text));
        //newLI.onclick = showNote(text);
        return newLI;
    }
    function createSpan(text) {
        var strText = '';
        if (text < 10) {
            strText = '0' + text;
        } else {
            strText = text.toString();
        }
        var newSpan = document.createElement('span');
        newSpan.appendChild(document.createTextNode(strText));
        //newLI.onclick = showNote(text);
        return newSpan;
        //<span class="date-news">November 3, 2009</span>
    }
    function showNote(dateParam) {
        alert('date clicked ' + dateParam);
    }
    //reset week and day of month active class
    function resetWeekDay() {
        hideItem(weekElem.childNodes[(currDay * 2 - 1)]);
        hideItem(dateElem.childNodes[(date * 2 - 1)]);
    }
    //change
    function changeMonth(monthParam) {
        console.log('changing to ' + monthParam);
        monthElem.firstChild.textContent = monthsEN[monthParam];
    }
    function changeYear(yearParam) {
        console.log('changing to ' + yearParam);
        yearElem.textContent = yearParam;
    }
    function leapYear() {
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            days[1] = 29;
        } else {
            days[1] = 28;
        }
    }
    function changeMonthCellLen(monthParam) {
        console.log('changing to ' + monthParam);
        var daysInMonth = days[monthParam];
        console.log('Days in current month ' + daysInMonth);
        var childNo = (31 * 2 - 1);//because every li element has a text node extra here
        if (daysInMonth === 31) {
            removeAClass(dateElem.childNodes[childNo], 'remove');
            removeAClass(dateElem.childNodes[childNo - 1], 'remove');
            removeAClass(dateElem.childNodes[childNo - 2], 'remove');
        }
        if (daysInMonth === 30) {
            hideItem(dateElem.childNodes[childNo]);
        } if (daysInMonth === 28) {
            hideItem(dateElem.childNodes[childNo]);
            hideItem(dateElem.childNodes[childNo - 1]);
            hideItem(dateElem.childNodes[childNo - 2]);
        } if (daysInMonth === 29) {
            hideItem(dateElem.childNodes[childNo]);
            hideItem(dateElem.childNodes[childNo - 1]);
        }

    }
    function hideItem(elem) {
        elem.className = 'remove';
    }
    function removeAClass(elem, clsName) {
        try {
            elem.classList.remove(clsName);
        } catch (error) {
            console.log("checked! " + error);
        }
    }
    function removeItem(elem, childNo) {
        elem.removeChild(elem.childNodes[childNo]);
    }
}
)();