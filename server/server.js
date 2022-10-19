'use strict'

const cors = require('cors')

const debug = require('debug')('socket server')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const socketio = require('socket.io')

const port = process.env.PORT || 8080
const app = asyncify(express())

const server = http.createServer(app)

const io = socketio(server, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
    }
})

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cors())


///Socket.io/ WebSockets
io.on('connect', socket => {
    debug(`Connected ${socket}`)
})

io.on("disconnect", () => {
    console.log("desconectado")
});

io.on("connection", (socket) => {
    socket.emit('test', `Hello client ${socket}`)

    socket.on('hello', (data) => {
        io.emit('test', data)
        console.log(data);
    })
});


server.listen(port, () => {
    console.log(`server listening on port ${port}`)
    //device.connect()
})
