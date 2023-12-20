const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    this.emit("messageLogged", { message, id: 1, list: [1, 2, 3] });
  }

  test() {
    this.emit("testEvent");
  }
}

module.exports = Logger;
