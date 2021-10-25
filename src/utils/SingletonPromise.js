let singletonPromises = {};

/**
 *
 * @param {String!} key:
 * @param {(resolve, reject) => {}} executor
 * @returns {Promise?}
 */

const ERROR = '[ERROR] Invalide params for SingletonPromise';

const SingletonPromise = (key, executor) => {
    if (!key || !executor) return new Promise((_, reject) => reject(ERROR));

    if (!singletonPromises[key]) {
        singletonPromises[key] = new Promise(executor);

        singletonPromises[key]
            .catch(() => null)
            .finally(() => {
                delete singletonPromises[key];
            });
    }
    return singletonPromises[key];
};

export default SingletonPromise;
