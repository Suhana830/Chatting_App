const express = require("express");
const http = require("http");
const path = require("path")
const app = express();

const {Server } = require("socket.io")


const server = http.createServer(app);

//below one handling socket io 
const io = new Server(server)

const User = {};

//here socket is client
io.on('connection', (socket) => {
   
 
   socket.on("user-connected",(name)=>{
    User[socket.id] = name;
   })
   
   socket.on("message",(m)=>{
      
     const msg = {
      name:User[socket.id],
      content:m
    }
     io.emit("message",msg);
   })



    socket.on("disconnect",()=>{
       console.log(`${socket.id} get disconnect`)
    })

   
  });

  


app.use(express.static(path.resolve("./views")))

app.use("/",(req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

server.listen(9000,()=>{console.log("server connected at port 9000")})