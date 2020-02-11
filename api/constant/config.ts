const Config = {
    "port": 8080,
    "environment": "dev",
    "mail": {
        "sender": {
            "user": "romulo.rossi@hub2b.com.br",
            "password": "iv45w63z"
        },
        "destination": {
            "address": "romulomrossi2@gmail.com"
        }
    },
    "mongo":{
        "connection": "mongodb://localhost:27017/nibble-app"
    }
}

export default Config;