/**
 *
 * @param {Number!} timeout:
 * @param {(resolve, reject) => {}} executor
 * @returns {Promise?}
 */

const ERROR = '[ERROR] Invalide params for TimeoutPromise';

const useTimeoutPromise = (timeout, executor) => {
    if (!timeout || !executor) return new Promise((_, reject) => reject(ERROR));

    return new Promise((resolve, reject) => {
        executor(resolve, reject);
        setTimeout(reject, timeout);
    });
};

export default useTimeoutPromise;
