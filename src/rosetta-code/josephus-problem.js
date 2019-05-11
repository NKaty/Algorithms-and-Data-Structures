// Josephus problem is a math puzzle with a grim description:
// n prisoners are standing on a circle, sequentially numbered from 0 to n−1.
// An executioner walks along the circle, starting from prisoner 0,
// removing every k-th prisoner and killing him. As the process goes on,
// the circle becomes smaller and smaller, until only one prisoner remains, who is then freed.
// Given any n, k > 0, find out which prisoner will be the final survivor.

function josephus (init, kill) {
  let circle = Array.from({ length: init }, (e, i) => i);
  let counter = init < kill ? kill % init - 1 : kill - 1;
  let length = circle.length;
  const removed = [];

  if (kill === 1) return { survivor: circle[length - 1], removed: circle.slice(0, -1) };

  while (circle.length > 1) {
    removed.push(circle[counter]);
    circle[counter] = undefined;

    if (counter + kill >= length) {
      circle = circle.filter(item => typeof item !== 'undefined');
      counter = counter + kill - length;
      length = circle.length;
      counter = counter >= length ? counter % length : counter;
    } else {
      counter += kill;
    }
  }

  return { survivor: circle[0], removed };
}

console.log(josephus(41, 3));
// { survivor: 30, removed: [2,5,8,11,14,17,20,23,26,29,32,35,38,0,4,9,13,18,22,27,31,36,40,6,12,19,25,33,39,7,16,28,37,10,24,1,21,3,34,15] }
console.log(josephus(15, 1)); // { survivor: 14, removed: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ] }
