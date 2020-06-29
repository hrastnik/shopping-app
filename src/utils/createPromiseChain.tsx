/**
 *
 * Creates a promise internaly and returns two methods - add and create.
 *
 * ADD
 *
 * Add puts an async action on the end of the chain meaning it will run
 * but will wait for the other actions on the chain to complete before running.
 * Example:
 *    const delayFiveAndLog = async () => {
 *      await new Promise(a => setTimeout(a, 5000));
 *      console.log('Done');
 *    }
 *
 *    chain.add(delayFiveAndLog);
 *    chain.add(delayFiveAndLog);
 *
 * The above code will output
 *  Done // after 5 sec
 *  Done // after another 5 sec
 *
 * CREATE
 *
 * Create will wrap an existing action with a function that calls add.
 * It's useful for creating functions to be ran on the promise chain
 *
 * Example
 *    const delayAndLog = async (delayMs) => {
 *      await new Promise(a => setTimeout(a, delayMs));
 *      console.log('Done');
 *    }
 *    const delayAndLogChain = chain.create(delayAndLog)
 *
 *    delayAndLogChain(3000);
 *    delayAndLogChain(3000);
 *
 * The above code will output
 *  Done // after 3 sec
 *  Done // after another 3 sec
 */
const createPromiseChain = () => {
  let promiseChain = Promise.resolve();

  const add = (action) => {
    promiseChain = promiseChain.then(action);
    return promiseChain;
  };

  /**
   * Creates an action that is ran through the promise chain.
   * When you create mulitple such methods, they will always run one
   * by one. The last method called will wait for all the previous
   * methods to resolve.
   */
  const create = (asyncAction) => {
    return (...args) => add(() => asyncAction(...args));
  };

  return {
    add,
    create,
  };
};

export { createPromiseChain };
