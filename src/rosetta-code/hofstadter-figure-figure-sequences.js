// These two sequences of positive integers are defined as:
// R(1)=1, S(1)=2R(n)=R(n−1)+S(n−1), n>1.
// The sequence S(n) is further defined as the sequence of positive
// integers not present in R(n).
// Sequence R starts: 1, 3, 7, 12, 18, ...
// Sequence S starts: 2, 4, 5, 6, 8, ...
// Task: Create two functions named ffr and ffs that when given n return R(n)
// or S(n) respectively.(Note that R(1) = 1 and S(1) = 2 to avoid off-by-one errors).
// No maximum value for n should be assumed.

function getSequences(n) {
  const r = [0, 1];
  const s = [0, 2];
  const objR = { 1: true };

  for (let i = 2; i <= n; i++) {
    r[i] = r[i - 1] + s[i - 1];
    objR[r[i]] = true;
    s[i] = s[i - 1] + 1;
    if (objR[s[i]]) s[i]++;
  }

  return { r, s };
}

function ffr(n) {
  return getSequences(n).r[n];
}

function ffs(n) {
  return getSequences(n).s[n];
}

console.log(ffr(1000)); // 526334
console.log(ffs(1000)); // 1041
