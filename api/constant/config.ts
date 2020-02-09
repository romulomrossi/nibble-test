const Config = {
    "port": 8081,
    "environment": "dev",
    "mail": {
        "sender": {
            "user": "mail@gmail.com",
            "password": "pass"
        },
        "destination": {
            "address": "mail@gmail.com"
        }
    },
    "mongo":{
        "connection": "mongodb://localhost:27017/nibble-app"
    }
}

export default Config;