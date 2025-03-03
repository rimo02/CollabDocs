const http = require('http')
const cors = require('cors')
const express = require('express')
const { Server } = require('socket.io')
const authRoutes = require('./routes/authRoutes')
const docRoutes = require('./routes/docRoutes')
const authMiddleware = require('./middleware/auth')
const Document = require('./model/docBase')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const server = http.createServer(app);

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', "Authorization"],
    credentials: true
}))
app.use(express.json())
app.use("/api/", authRoutes)
app.use("/documents/", authMiddleware, docRoutes)

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN,
    }
})

const cache = new Map()
io.on('connection', (socket) => {

    socket.on('join-room', async (id) => {
        socket.join(id)

        if (!cache.has(id)) {
            const doc = await Document.findById(id);
            cache.set(id, doc ? doc.content : "")
        }
        socket.emit('load-document', cache.get(id))
    })

    socket.on('send-changes', ({ id, content }) => {
        cache.set(id, content);
        socket.to(id).emit('receive-changes', content)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
})

setInterval(async () => {
    for (const [id, content] of cache.entries()) {
        await Document.findByIdAndUpdate(id, { content, createdAt: Date.now() })
        cache.delete(id)
    }
}, 300000)

const path = require('path');

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}

module.exports = server