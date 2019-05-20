// There are four types of common coins in US currency: quarters (25 cents),
// dimes (10 cents), nickels (5 cents), and pennies (1 cent).
// Implement a function to determine how many ways there are to make change
// for a dollar using these common coins? (1 dollar = 100 cents).

function countCoinsTD () {
  const coins = [1, 5, 10, 25];
  const amount = 100;
  const index = coins.length - 1;
  const memo = {};

  function countVariations(amount, index) {
    if (amount < 0 || index < 0) return 0;
    if (amount === 0) return 1;

    const key = `${index}/${amount}`;

    if (memo[key]) return memo[key];

    memo[key] = countVariations(amount - coins[index], index) + countVariations(amount, index - 1);

    return memo[key];
  }

  return countVariations(amount, index);
}

console.log(countCoinsTD()); // 242

function countCoinsBU () {
  const coins = [1, 5, 10, 25];
  const amount = 100;
  const table = Array.from({ length: amount + 1 }).fill(0);
  table[0] = 1;

  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      table[j] += table[j - coins[i]];
    }
  }

  return table[amount];
}

console.log(countCoinsBU()); // 242
