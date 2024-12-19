


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoConnect = require('./db/connection');
const router = require('./Routers/userRouter');
const authrouter = require('./Routers/authRouter');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();

app.use('/api', router);
app.use(router);
app.use(authrouter);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: '*',
    },
    pingTimeout: 60000,
});

io.on('connection', (socket) => {
    console.log('A user connected.');

    socket.on('setup', (user) => {
        socket.join(user._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('new message', (newMessage) => {
        const chat = newMessage.chat;
        if (!chat.users) return console.log('Chat users not defined.');

        chat.users.forEach((user) => {
            if (user._id === newMessage.sender._id) return;

            socket.to(user._id).emit('message received', newMessage);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected.');
    });
});
