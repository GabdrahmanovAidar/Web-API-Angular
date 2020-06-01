const StateMachine = require('javascript-state-machine');

export class StateMachineFactory {
  static create(config) {
    return new StateMachine(config);
  }
}
