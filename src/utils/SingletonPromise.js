let singletonPromises = {};

/**
 *
 * @param {String!} key:
 * @param {(resolve, reject) => {}} executor
 * @returns {Promise?}
 */
const SingletonPromise = (key, executor) => {
    if (!key || !executor) return new Promise((_, reject) => reject());

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
