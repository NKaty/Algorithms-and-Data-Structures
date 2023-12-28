// A binary watch has 4 LEDs on the top which represent the hours (0-11),
// and the 6 LEDs on the bottom represent the minutes (0-59).
// Each LED represents a zero or one, with the least significant bit on the right.
// Given a non-negative integer n which represents the number of LEDs
// that are currently on, return all possible times the watch could represent.

// Note:
// 1. The order of output does not matter.
// 2. The hour must not contain a leading zero, for example "01:00" is not valid,
// it should be "1:00".
// 3. The minute must be consisted of two digits and may contain a leading zero,
// for example "10:2" is not valid, it should be "10:02".

// hamming weight
const countBits = (n) => {
  let count = 0;

  while (n !== 0) {
    n &= (n - 1);
    count++;
  }

  return count;
};

const readBinaryWatch = (num) => {
  const possibleTimes = [];

  // For each possible time we count the number of bits in it and
  // compare this number with the number of LEDs that are currently on
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 60; j++) {
      if (countBits(i) + countBits(j) === num) {
        possibleTimes.push(`${i}:` + `0${j}`.slice(-2));
      }
    }
  }

  return possibleTimes;
};

console.log(readBinaryWatch(0)); // [ '0:00' ]
console.log(readBinaryWatch(1));
// ['0:01', '0:02', '0:04', '0:08', '0:16', '0:32', '1:00', '2:00', '4:00', '8:00']
