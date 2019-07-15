// Two integers N and M are said to be amicable pairs if N ≠ M and the sum of
// the proper divisors of N (sum(propDivs(N))) = M as well as sum(propDivs(M)) = N.
// Task: Calculate and show here the Amicable pairs below 20,000 (there are eight).

function amicablePairsUpTo (maxNum) {
  const divisorsSum = {};
  const result = [];
  let sum, root;

  for (let i = 1; i <= maxNum; i++) {
    sum = 1;
    root = Math.sqrt(i);

    for (let j = 2; j <= root; j++) {
      if (i % j === 0) sum += i / j === j ? j : j + i / j;
    }

    if (divisorsSum[sum] === i) result.push([sum, i]);
    divisorsSum[i] = sum;
  }

  return result;
}

console.log(amicablePairsUpTo(20000));
// [ [ 220, 284 ], [ 1184, 1210 ], [ 2620, 2924 ], [ 5020, 5564 ], [ 6232, 6368 ], [ 10744, 10856 ],
// [ 12285, 14595 ], [ 17296, 18416 ] ]
