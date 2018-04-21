/*
Question C -- countWays(n): A child is climb­ing
up a stair­case with n steps, and can hop either 1 step,
2 steps, or 3 steps at a time. Imple­ment a method to
count how many pos­si­ble ways the child can jump up the
stairs. (Order matters.) This can be solved iteratively
or recursively, either is fine.
*/

function countWays(n) {
  // memoize to prevent extra function calls
  // goes from o(x^n) to o(n);
  const memoHash = {};
  // IIFE to have memo obj in scope
  return (function ladder(n) {
    if (n < 1) return 0;
    if (n === 1) return n;
    if (n === 2) return n;
    if (n === 3) return n;
    if (memoHash[n]) return memoHash[n]; // checks if in memo
    memoHash[n] = ladder(n - 2) + ladder(n - 1) + ladder(n - 3); // not in memo
    return memoHash[n];
  }(n));
}


console.log(countWays(10)); // 89;
console.log(countWays(4)); // 5;
