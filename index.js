const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const PORT = 5000;
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
    }
});

//クライアント側と通信
io.on("connection",(socket)=>{
    console.log("クライアントと接続しました");

    //クライアントからの受信
    socket.on("send_message",(data)=>{
        console.log(data);
        
        //他のクライアントへ送信
        io.emit("receive_data",data);
    })

    socket.on("disconnect",()=>{
        console.log("クライアントと接続が切れました");
    })
});

server.listen(PORT, () => {
    console.log('server running on 5000');
});