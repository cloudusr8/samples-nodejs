async function runSequentially(functions) {
  let results = [];
  for (const f of functions) {
    results.push(await f());
  }
  return results;
}

let counter = 1;
function incrementCounterAsync() {
  return new Promise((resolve, reject) => {
      counter += 1;
      resolve(counter);
  });
}
let promise = runSequentially([incrementCounterAsync, incrementCounterAsync, incrementCounterAsync]);
if(promise) {
  promise.then(result => console.log(result))
  .catch(error => console.log("Error: " + error));
}
// module.exports.runSequentially = runSequentially;