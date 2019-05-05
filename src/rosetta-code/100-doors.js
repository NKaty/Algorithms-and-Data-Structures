// There are 100 doors in a row that are all initially closed.
// You make 100 passes by the doors. The first time through,
// visit every door and 'toggle' the door (if the door is closed, open it;
// if it is open, close it). The second time, only visit every 2nd door
// (i.e., door #2, #4, #6, ...) and toggle it. The third time, visit every 3rd door
// (i.e., door #3, #6, #9, ...), etc., until you only visit the 100th door.

// Implement a function to determine the state of the doors after the last pass.
// Return the final result in an array, with only the door number
// included in the array if it is open.

function getFinalOpenedDoors (numDoors) {
  const doors = Array.from({ length: 100 }, () => false);

  for (let j = 1; j <= 100; j++) {
    for (let i = j - 1; i < doors.length; i++) {
      if ((i + 1) % j === 0) doors[i] = !doors[i];
    }
  }

  return doors.reduce((acc, item, index) => {
    if (item === true) acc.push(index + 1);
    return acc;
  }, []);
}

console.log(getFinalOpenedDoors()); // [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
