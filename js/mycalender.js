(function () {
    var monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dayNameEN = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
                month=11;
                init();
            }else{
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
                month=0;
                init();
            }
            else{
                init();
            } 
        }
    });
    //init
    function init() {
        destroyNode(dateElem);
        leapYear();
        changeMonth(month);
        changeYear(year);
        populateDateGrid();
        console.log("init day "+currDay + " init date "+currDate);
        //activateElem(weekElem.childNodes[((currDay+1)*2)-1]);
        activateElem(dateElem.childNodes[(currDate+dayValue())]); //because every li element has a text node extra here
    }
    function activateElem(elem) {
        elem.className = 'active';
    }
    function destroyNode(root) {
        while( root.firstChild ){
            root.removeChild( root.firstChild );
          }
    }
    function populateDateGrid() {
        dayLICount = 0;
        addPrevMonthDates();
        addCurrMonthDates();
        addNextMonthDates();
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
        return ((month-1) === -1? 11 : (month-1));
    }
    function dayValue() {
        //1995-12-17
        var d = new Date(year+'-'+(month+1)+'-'+1);
        return (d.getDay()-1);
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
        for (var index = 1; index <= (42-dayLICount); index++) {
            var item = createLI(index);
            item.className = 'gray';
            dateElem.appendChild(item); 
        }
    }
    function createLI(text) {
        var newLI = document.createElement('LI');
        newLI.appendChild(document.createTextNode(text.toString()));
        return newLI;
    }
    //reset week and day of month active class
    function resetWeekDay() {
        hideItem(weekElem.childNodes[(currDay * 2 - 1)]); 
        hideItem(dateElem.childNodes[(date * 2 - 1)]); 
    }
    //change
    function changeMonth(monthParam) {
        console.log('changing to '+monthParam);
        monthElem.firstChild.textContent = monthsEN[monthParam];
    }
    function changeYear(yearParam) {
        console.log('changing to '+yearParam);
        yearElem.textContent = yearParam;
    }
    function leapYear() {
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            days[1] = 29;
        }else{
            days[1] = 28;
        }
    }
    function changeMonthCellLen(monthParam){
        console.log('changing to '+monthParam);
        var daysInMonth = days[monthParam];
        console.log('Days in current month '+daysInMonth);
        var childNo=(31 * 2 - 1);//because every li element has a text node extra here
        if (daysInMonth===31) {
            showItem(dateElem.childNodes[childNo]);
            showItem(dateElem.childNodes[childNo-1]);
            showItem(dateElem.childNodes[childNo-2]);
        } 
        if (daysInMonth===30) {
            hideItem(dateElem.childNodes[childNo]);
        }  if (daysInMonth===28) {
            hideItem(dateElem.childNodes[childNo]);
            hideItem(dateElem.childNodes[childNo-1]);
            hideItem(dateElem.childNodes[childNo-2]);
        } if (daysInMonth===29) {
            hideItem(dateElem.childNodes[childNo]);
            hideItem(dateElem.childNodes[childNo-1]);
        } 
        
    }
    function hideItem(elem) {
        elem.className = 'remove';
    }
    function showItem(elem) {
        try {
            elem.classList.remove("remove");
        } catch (error) {
           console.log("checked! "+error); 
        }
    }
    function removeItem(elem, childNo) {
        elem.removeChild(elem.childNodes[childNo]);
    }
}
)();