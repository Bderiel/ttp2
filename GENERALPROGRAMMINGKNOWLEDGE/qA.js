/* 
Question A-- sortByStrings(s, t): Sort the letters in the string s by the order they occur in the string
t.You can assume t will not have repetitive characters.For s =  "weather" and t = "therapyw", the output
should be sortByString(s, t) = "theeraw".For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".
*/

function sortByStrings(s, t) {
  const dict = {};
  // We give dict a key of the the char in s and a value of our index. O(n) Time and Space
  for (let i = 0; i < t.length; i++) {
    dict[t[i]] = i;
  }

  // We use built in sort that only works on arrays O(nlogn) Time and O(n) Space because of split method and return the output;
  return s.split('').sort((a, b) => dict[a] - dict[b]).join('');
}


let s = "weather";
let t = "therapyw";

let s1 = "good";
let t1 = "odg";

console.log(sortByStrings(s, t)); // theeraw
console.log(sortByStrings(s1, t1)); // oodg
