// The encoding rule is: k[encoded_string], where the
// encoded_string inside the square brackets is repeated
//  exactly k times.Note: k is guaranteed to be a positive
//   integer.


function decodeString(str) {
  // stack keeps track of [
  const stack = [];
  let output = '';
  for (let i = 0; i < str.length; i++) {
    const curr = str[i];
    if (curr === '[') {
      stack.push(i);
    } if (curr === ']') {
      const idx = stack.pop();
      // add what's inside brakets to output repeat times in front of bracket.
      output += str.slice(idx + 1, i).repeat(Number(str[idx - 1]));
    }
  }
  return output;
}


// works for case with only one backet deccode;
const s1 = '4[ab]'; // , the output should be decodeString(s) = "abababab"
const s2 = '2[b3[a]]';// , the output should be decodeString(s) = "baaabaaa"

// console.log(decodeString(s1));
// console.log(decodeString(s2))
