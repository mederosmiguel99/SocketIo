const io = require('socket.io-client');

const socket = io('http://localhost:8080')

socket.on('test',(payload)=>{
    console.log(payload);
})

setTimeout(() => {
    socket.emit('hello',"Hello from client")  
}, 1000);