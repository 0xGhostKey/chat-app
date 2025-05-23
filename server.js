const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    console.log('ユーザー接続');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('ユーザー切断');
    });
});

http.listen(process.env.PORT || 3000, () => {
    console.log('チャットサーバー起動中');
});