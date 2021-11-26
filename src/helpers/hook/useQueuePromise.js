const useQueuePromise = () => {
    let currentTaskIndex = 0;
    let tasksQueue = [];

    /**
     * Add a promise task to queue
     * @param {Function} taskInstance: a function returns Promise
     * @param {Any} param
     */
    const addTask = (taskInstance, param) => {
        tasksQueue.push({ taskInstance, param });
    };

    /**
     * Start executing tasks in queue
     * @param {Function} callbackPerTask
     * @param {Function?} callbackErrorPerTask
     * @returns {Promise}: trigger .then when task is done
     */
    const startExecuting = (callbackPerTask = () => null, callbackErrorPerTask) => {
        return executeCurrentTask(callbackPerTask, callbackErrorPerTask);
    };

    const isDone = () => {
        return currentTaskIndex >= tasksQueue.length;
    };

    const executeCurrentTask = (callbackPerTask = () => null, callbackErrorPerTask) =>
        new Promise(resolveWhenDone => {
            if (isDone()) {
                return resolveWhenDone();
            }

            const { taskInstance, param } = tasksQueue[currentTaskIndex] || {};
            currentTaskIndex += 1;

            if (typeof taskInstance !== 'function') {
                return executeCurrentTask(callbackPerTask, callbackErrorPerTask).then(
                    resolveWhenDone
                );
            }

            const task = taskInstance(param);

            if (!isPromise(task)) {
                return executeCurrentTask(callbackPerTask, callbackErrorPerTask).then(
                    resolveWhenDone
                );
            }

            return task
                ?.then(callbackPerTask)
                ?.catch(callbackErrorPerTask || callbackPerTask)
                ?.finally(() => {
                    executeCurrentTask(callbackPerTask, callbackErrorPerTask).then(resolveWhenDone);
                });
        });

    const isPromise = promise => {
        return typeof promise?.then === 'function';
    };

    return {
        addTask,
        startExecuting,
    };
};

module.exports = useQueuePromise;

// const promise1 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('111');
//     }, 1000);
//   });
// };
// const promise2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('222');
//     }, 0);
//   });
// };
// const promise3 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('333');
//     }, 1000);
//   });
// };

// const queue = useQueuePromise();

// queue.addTask(promise1);
// queue.addTask(promise2);
// queue.addTask(promise3);

// queue
//   .startExecuting((res) => {
//     console.log(res);
//   })
//   .then(() => {
//     console.log('done');
//   });

// queue.addTask(promise2);
// queue.addTask(promise1);
