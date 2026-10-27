import './App.css';

const days = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT"
};

function getCalendarMonth(year, month) {
  var firstDay = new Date(year, month, 1);
  var daysTillZero = firstDay.getDay();
  if (daysTillZero > 0) {
    firstDay.setDate(firstDay.getDate() - daysTillZero);
  }
  var currentDay = new Date(firstDay);
  var weeks = new Array(5);
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

export function App() {
  const today = new Date(Date.now());
  const monthCal = getCalendarMonth(today.getFullYear(), today.getMonth());
  return (
    <table>
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
                {day.toDateString()}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
}
