function wrapGameAction(emitter, actionName, callback) {
  emitter.addListener(actionName, (x) => {
    let v = undefined
    try {
      v = JSON.parse(x)
    } catch (err) {
      console.log(err)
    }

    callback(v)
  });
}

const events = require('events');

let emitter = new events.EventEmitter();
wrapGameAction(emitter, "player_1_select", console.log);
emitter.emit("player_1_select", "{ \"row\": 1, \"column\": 1 }");

// module.exports.wrapGameAction = wrapGameAction;