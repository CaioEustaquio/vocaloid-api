const env = require("env-var");

const config = {

    port: env.get('PORT').required().asInt(),
    nodeEnv: env.get('NODE_ENV').default('development').asString(),
    dbConnectionString: env.get("DB_CONNECTION_STRING").required().asString()
}

module.exports = config;