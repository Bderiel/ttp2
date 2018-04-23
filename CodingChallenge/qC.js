/*
Question C -- countWays(n): A child is climb­ing
up a stair­case with n steps, and can hop either 1 step,
2 steps, or 3 steps at a time. Imple­ment a method to
count how many pos­si­ble ways the child can jump up the
stairs. (Order matters.) This can be solved iteratively
or recursively, either is fine.
*/

// recursively
// function countWays(n) {
//   // memoize to prevent extra function calls
//   // goes from o(x^n) to o(2n);
//   const memoHash = {};
//   // IIFE to have memo obj in scope
//   return (function ladder(n) {
//     if (n < 1) return 0;
//     if (n === 1) return n;
//     if (n === 2) return n;
//     if (n === 3) return n;
//     if (memoHash[n]) return memoHash[n]; // checks if in memo
//     memoHash[n] = ladder(n - 2) + ladder(n - 1) + ladder(n - 3); // not in memo
//     return memoHash[n];
//   }(n));
// }


// iteratively
// this is one is better space wise. always O(3); and O(n) time
function countWays(n) {
  if (n < 1) return 0;
  const memo = [1, 2, 3];
  for (let i = 3; i < n; i++) {
    const temp =
    memo[memo.length - 1] + memo[memo.length - 2] + memo[memo.length - 3];
    memo[0] = memo[1];
    memo[1] = memo[2];
    memo[2] = temp;
  }
  return memo[memo.length - 1];
}

console.log(countWays(10)); // 230
console.log(countWays(4)); // 6

