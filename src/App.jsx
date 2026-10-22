import './App.css';

function getCalendarMonth(year, month) {
  var weeks = new Array(5);
  for (let i = 0; i < weeks.length; i++) {
    var week = new Array(7);
    for (let j=0; j < 7; j++) {
      var calDay = new Date(year, month, (i*7)+j+1)
      if (calDay.getMonth() != month) {
        break;
      }
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
      <tbody>
        {monthCal.map((week, ix, arr) => 
          <tr key={ix}>
            {week.map((day, di, darr) => 
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
