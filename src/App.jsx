import './App.css';
import { useState } from 'react';

const days = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT"
};

const monthNames = {
  0: "January", 1: "February", 2: "March", 3: "April",
  4: "May", 5: "June", 6: "July", 7: "August",
  8: "September", 9: "October", 10: "November", 11: "December"
};

function getCalendarMonth(year, month) {
  var firstDay = new Date(year, month, 1);
  var daysTillZero = firstDay.getDay();
  if (daysTillZero > 0) {
    firstDay.setDate(firstDay.getDate() - daysTillZero);
  }
  var currentDay = new Date(firstDay);
  var weeks = new Array(6);
  for (let i = 0; i < weeks.length; i++) {
    var week = new Array(7);
    for (let j=0; j < 7; j++) {
      var calDay = new Date(currentDay);
      currentDay.setDate(currentDay.getDate() + 1);
      week[j] = calDay
    }
    // this (the line below this comment) is where things went awry 
    // I had initially written: weeks.push(week)
    // that was incorrect as it simply extended the size of the array. 
    // this would have been fine if we didn't initialize the weeks array with a length
    // this caused the outer loop to enter unplanned iterations as we base its stopping criteria
    // on the length of the weeks array. 
    weeks[i] = week
  }
  return weeks;
}

export function CalendarDay ({day}) {
  return (
    <div>
      <div>
        {day.getDate()}
      </div>
      <div>
        <p>No Events</p>
      </div>
    </div>
  )
}

export function CalendarControls ({month, year, nextMonth, prevMonth}){
  return (
    <div className="flex flex-row gap-2 p-2">
      <div>
        <button className="bg-blue-500 text-white p-2 rounded"
                onClick={prevMonth()}>Prev</button>
      </div>
      <div>
        <p className="text-3xl">{month} {year}</p>
      </div>
      <div>
        <button className="bg-blue-500 text-white p-2 rounded"
                onClick={nextMonth()}>Next</button>
      </div>
    </div>
  )
}

export function App() {
  //const today = new Date(Date.now());
  var [focalDate, setFocalDate] = useState(new Date(Date.now()))

  var prevMonth = () => {
    var curMonth = focalDate.getMonth() - 1
    setFocalDate(new Date(focalDate.getFullYear(), curMonth, 1))
  }
  var nextMonth = () => {
    var curMonth = focalDate.getMonth() + 1
    setFocalDate(new Date(focalDate.getFullYear(), curMonth, 1))
  }

  const monthCal = getCalendarMonth(focalDate.getFullYear(), focalDate.getMonth());
  return (
    <>
      <CalendarControls month={monthNames[focalDate.getMonth()]}
                        year={focalDate.getFullYear()}
                        prevMonth={() => prevMonth}
                        nextMonth={() => nextMonth}/>
      <table className="">
        <thead>
          <tr>
            {Object.values(days).map((day, ix) => 
              <th key={ix}>{day}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {monthCal.map((week, ix) => 
            <tr key={ix}>
              {week.map((day, di) => 
                <td key={di}>
                  <CalendarDay day={day}/> 
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
