const Config = {
    "port": 8080,
    "environment": "dev",
    "mail": {
        "sender": {
            "user": "romulomrossi2@gmail.com",
            "password": "iv45w63zR"
        },
        "destination": {
            "address": "romulomrossi2@gmail.com"
        }
    },
    "mongo":{
        "connection": "mongodb://product-updates-mongodb.dev-databases:27017/nibble-app"
    }
}

export default Config;
