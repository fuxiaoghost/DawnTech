module.exports = {
    apps: [{
        name: "dawntech.top",
        script: "./server.js",
        watch: true,
        env: {
            "NODE_ENV": "production",
            "APP_API": "http://api.dawntech.top:3000",
            "PORT": "80",
            "SERVER": "172.17.210.194"
        }
    }]
}