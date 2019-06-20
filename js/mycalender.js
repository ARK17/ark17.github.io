(function () {
    var monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dayNameEN = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        //leap year calculation
        var now = new Date();
        var date = now.getDate();
        var day = now.getDay();//saturday
        var month = now.getMonth();
        var year = now.getFullYear();

        console.log(date + " " + day + " " + month + " " + year);
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            days[1] = 29;
        }
        var dateElem = document.getElementsByClassName("days")[0];
        var monthElem = document.getElementById('currMonth');
        var yearElem = document.getElementById('currYear');

    window.onload = function () {
        init();
    };
    
    var prev = document.querySelector(".prev");
    prev.addEventListener("click", () => {
        month--;
        if (month < 0) {
            year--;
            month=11;
            changeMonth(month);
            changeYear(year);
            changeMonthCellLen(month);
        }else{
            changeMonth(month);
            changeMonthCellLen(month);
        }
    });
    var next = document.querySelector(".next");
    next.addEventListener("click", () => {
        month++;
        if (month > 11) {
            year++;
            month=0;
            changeMonth(month);
            changeYear(year);
            changeMonthCellLen(month);
        }
        else{
            changeMonth(month);
            changeMonthCellLen(month);
        }
    });
    //init
    function init() {
        changeMonth(month);
        changeYear(year);
        var weekElem = document.getElementsByClassName("weekdays")[0];
        weekElem.childNodes[(day * 2 - 1)].className = 'active';
        dateElem.childNodes[(date * 2 - 1)].className = 'active';//because every li element has a text node extra here
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
    function changeMonthCellLen(monthParam){
        console.log('changing to '+monthParam);
        var daysInMonth = days[monthParam];
        console.log('Days in current month '+daysInMonth);
        var childNo=(31 * 2 - 1);//because every li element has a text node extra here
        
        if (daysInMonth===30) {
            removeItem(dateElem, childNo);
        } else if (daysInMonth===28) {
            removeItem(dateElem, childNo);
            removeItem(dateElem, childNo-1);
            removeItem(dateElem, childNo-2);
        }else if (daysInMonth===29) {
            removeItem(dateElem, childNo);
            removeItem(dateElem, childNo-1);
        } 
        
    }
    function removeItem(elem, childNo) {
        elem.removeChild(elem.childNodes[childNo]);
    }
}
)();