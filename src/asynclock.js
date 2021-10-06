var AsyncLock = require('async-lock'),
  Memcached = require("memcached");

// Bring up docker before run the program
// $ docker-compose -f memcached.yaml up
// (terminal 1) $ yarn asynclock A
// (terminal 2) $ yarn asynclock B

const key = 'key1'
const maxOpTm = 5
var argv = process.argv.slice(2);
let app = argv.length >= 1 ? argv[0] : 'X'
let cacheValue

var lock = new AsyncLock();
var memcached = new Memcached();

const getCache = () => {
  return new Promise((resolve, reject) => {
    memcached.get(key, function (err, data) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(data ? data : 0)
    })
  })
}

const operation = async i => {
  let value = 0,
    op = app + i;
  const tm = Math.floor(Math.random() * maxOpTm)

  console.log(`Execute operation ${op} for ${tm}s`);
  lock.acquire(key, async function (done) {
    console.log(`lock ${op} enter`)
    cacheValue = await getCache()
    value = parseInt(cacheValue) + 10
    console.log(value)
    memcached.set(key, value, 3600, function (err) {
      if (err) console.log(err)
    });

    setTimeout(function () {
      console.log(`lock ${op} done`)
      done()
    }, tm * 1000)

  }, function (err, ret) {
    console.log(`lock ${op} release`)
  }, {});
}

memcached.connect('localhost:11211', function (err, conn) {
  if (err) {
    console.log(conn.server, 'error while memcached connection!!');
  }

  operation(1); operation(2); operation(3);
});

