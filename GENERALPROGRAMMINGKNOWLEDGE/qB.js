/*
Question B -- Web Crawler: I wrote a crawler that visits web pages, stores a few keywords in a database, and follows links to other web pages.
I noticed that my crawler was wasting a lot of time visiting the same pages over and over, so I made a set, "visited", where I'm storing URLs
I've already visited. Now the crawler only visits a URL if it hasn't already been visited. Let’s see if we can make this crawler use less memory.
See if you can come up with a data structure better than a hash that just stores the entire URL. How can we trim down the amount of space taken
up by "visited"? Explain in words and implement your solution.
*/

// Given set sample
const urls = new Set([
  'google.com/map',
  'google.com/gmail',
  'facebook.com/ttp',
  'facebook.com/zucc',
  'google.com/map/newyork',
  'google.com/map/brooklyn',
]);  

function spaceSaver(sites) {
  const trie = {};
  let fancyRegx = /[(\/\.]/; // using regex to delimit on '/' and '.'
  for (let url of sites) {
    let curr = trie; // resets our curr so we can add new sites to trie
    const splitArr = url.split(fancyRegx);
    splitArr.forEach((el, idx) => {
      if (curr[el]) {
        curr = curr[el]; // if our prop exist in trie we move deeper in the object
      } else if (idx === splitArr.length - 1) {
        curr[el] = null; // if its the last element we point at null
      } else {
        curr[el] = {}; // Each property is init with empty object
        curr = curr[el];
      }
    });
  }
  return trie;
}
/*
The trie lowers space because we dont have two store for example google.com more
than once if its part of other urls. We can storea url once and add the other
 paths as keys for. 
*/

completedTrie = spaceSaver(urls);






// This function checks if our trie works!
function visited(url) {
  let curr = completedTrie;
  let fancyRegx = /[(\/\.]/;
  const splitArr = url.split(fancyRegx);
  for (let url of splitArr) {
    if (!curr.hasOwnProperty(url)) { // if the trie does not have the propery we didnt visite that url yet
      return false;
    }
    else {
      curr = curr[url];
    }
  }
  return true;
}
// Test Cases
console.log(visited('google.com/map')); // true
console.log(visited('google.com/gmail')); // true
console.log(visited('google.com/jobs')); // false
console.log(visited('facebook.com/map')); // false
console.log(visited('facebook.com/tpp')); // false 
