import Environment from './Environment';
import axios from 'axios';
import SingletonPromise from '@utils/SingletonPromise';

const DEFAULT_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const METHOD = {
    GET: 'get',
    POST: 'post',
};

module.exports = {
    METHOD,

    setAccessToken(token) {
        //TODO
    },

    getAccessToken() {
        //TODO
    },

    _getHeader() {
        const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
        return {
            ...DEFAULT_HEADERS,
            ...headers,
        };
    },

    request(props) {
        const {
            path = '',
            data = null,
            method = METHOD.GET,
            requestId = new Date().getTime() + path,
            timeout = 30 * 1000, //in seconds
            retry = 0,
        } = props;

        return SingletonPromise(requestId, (resolve, reject) => {
            const options = {
                method,
                timeout,
                url: Environment.getApiDomain() + path,
                headers: this._getHeader(),
                ...(!!data ? { data } : {}), // eleminate field data when undefined
            };

            const _successHandler = ({ data }) => {
                if (__DEV__) {
                    console.logg?.(data, 'green', '[RESPONSE from API]' + path);
                }
                if (!data) {
                    throw Error(`Cannot find response from api: ${options.url}`);
                }
                resolve(data);
            };

            const _failHandler = e => {
                if (retry < 1) {
                    reject(e);
                    return;
                }

                this.request({
                    ...props,
                    retry: retry - 1,
                })
                    .then(resolve)
                    .catch(reject);
            };

            axios(options).then(_successHandler).catch(_failHandler);

            if (__DEV__) {
                console.logg?.(data, 'blue', '>>>>>> REQUEST API ' + path);
            }
        });
    },
};
