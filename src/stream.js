const stream = require('stream');

function setupStreams(dataInputStream, dataOutputStream, callback) {
    let counter = 0;
    dataInputStream.on('data', (chunk) => {
      let obj = JSON.parse(Buffer.from(chunk).toString());
      obj.id = counter++;
      dataOutputStream.write(obj);
    });
    dataInputStream.on('error', (err) => reject(err));
    dataInputStream.on('end', () => callback());
}

let readable = new stream.Readable();
let writable = new stream.Writable({  objectMode: true, 
                                      write: (chunk, encoding, callback) => {
                                        console.log(chunk);
                                        callback(null, true);
                                      }
});
setupStreams(readable, writable, () => console.log("onEnd"));

readable.push('{ "log": "Request received 1" }');
readable.push('{ "log": "Request received 2" }');
readable.push(null);
//module.exports.setupStreams = setupStreams;
// console.log(readable)