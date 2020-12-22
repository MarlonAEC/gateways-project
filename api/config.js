module.exports={
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 9000,
    BASE_URL: process.env.BASE_URL || 'http://localhost:9000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/gateway_management'
};