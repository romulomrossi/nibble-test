const Config = {
    "port": 8080,
    "environment": "dev",
    "mail": {
        "sender": {
            "user": "some@mail.com",
            "password": "password"
        },
        "destination": {
            "address": "some@mail.com"
        }
    },
    "mongo":{
        "connection": "mongodb://localhost:27017/nibble-app"
    }
}

export default Config;
