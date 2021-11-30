import Http from '@core/http';
import UserData from '@core/data/userprofile/UserData';

module.exports = {
    getJoinedQueue() {
        return Http.request({
            method: Http.METHOD.GET,
            path: '/room/room-user',
        });
    },
};
