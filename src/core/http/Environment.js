const ENV_ENUM = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: 'production',
};

module.exports = {
    CURRENT_ENVIRONMENT: ENV_ENUM.DEVELOPMENT,
    CONFIG: {
        [ENV_ENUM.DEVELOPMENT]: {
            apiDomain: 'https://spring-demo-5464.herokuapp.com',
        },
        [ENV_ENUM.PRODUCTION]: {
            apiDomain: 'https://spring-demo-5464.herokuapp.com',
        },
    },

    getConfig() {
        return this.CONFIG?.[this.CURRENT_ENVIRONMENT] || {};
    },

    getApiDomain() {
        return this.getConfig()?.apiDomain || '';
    },
};
