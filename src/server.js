const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const circleobjs = {};

let player1id;

let playersinRoom = 0;
let Roomnumber = 0;

let colorsSetup = {};

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handler = (request, response) => {
  console.log(request.url);
  if (request.url === '/') {
    fs.readFile(`${__dirname}/../hosted/client.html`, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (request.url === '/bundle.js') {
    fs.readFile(`${__dirname}/../hosted/bundle.js`, (err, data) => {
      if (err) {
        throw err;
      }

      response.writeHead(200, { 'Content-Type': 'application/javascript' });
      response.end(data);
    });
  }
};

const app = http.createServer(handler);

app.listen(port);

const io = socketio(app);


io.on('connection', (socket) => {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  const newroom = [];
  if (playersinRoom === 0) {
    for (let y = 0; y < 6; y++) {
      newroom[y] = [];
    }
    for (let x = 0; x < 6; x++) {
      for (let k = 0; k < 6; k++) {
        newroom[x][k] = null;
      }
    }
    circleobjs[Roomnumber] = newroom;
  }
  playersinRoom += 1;

  socket.join(`room ${Roomnumber}`);

  socket.emit('Joined', { R, G, B, circleobjs: circleobjs[Roomnumber], Roomnumber });

  if (playersinRoom === 2) {
    io.in(`room ${Roomnumber}`).emit('Start', {bool:true});
    Roomnumber += 1;
    playersinRoom = 0;
  }


  socket.on("Setup",(data) => {
    let keys = Object.keys(colorsSetup);
    
    if(keys.length % 2 == 0)
    {
        data.id = socket.id;
        player1id = socket.id;
        colorsSetup[data.id] = data;
        
    }
    else if(keys.length % 2 == 1)
    {
      data.id = socket.id; 
      colorsSetup[socket.id] = data;

      colorsSetup[player1id].opponent = data.id;
      colorsSetup[data.id].opponent = player1id;
      let player1 = colorsSetup[player1id];
      let player2 = colorsSetup[data.id];

      //console.dir(player2);
      let grid = circleobjs[player1.roomNumber];

      grid[2][2] = {x:250,y:250,R:player1.R,G:player1.G,B:player1.B};
      grid[3][3] = {x:350,y:350,R:player1.R,G:player1.G,B:player1.B};
      grid[2][3] = {x:250,y:350,R:player2.R,G:player2.G,B:player2.B};
      grid[3][2] = {x:350,y:250,R:player2.R,G:player2.G,B:player2.B};

      circleobjs[player1.roomNumber] = grid;

      io.in(`room ${player1.roomNumber}`).emit("SetupfromServer", grid);

      socket.broadcast.to(player1id).emit("Turn",{turn:true});

    }


  });

  console.log('user has joined a room');


  socket.on('updateCanvas', (data) => {
    console.log('recieved circle');

    let x = (data.circle.x - 50) / 100;
    let y = (data.circle.y - 50) / 100;

    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    const array = circleobjs[data.roomNumber];
    if (array[x][y] === null) {
      array[x][y] = data;
    }

    io.in(`room ${data.roomNumber}`).emit('UpdatefromServer', (data));

    socket.broadcast.to(colorsSetup[socket.id].opponent).emit("Turn",{turn:true});

    console.log('broadcasting circle');
  });


  socket.on('disconnect', () => {
    // socket.leave('room1');
    console.log('user left the room');
  });
});

console.log(`Listening on localhost on ${port}`);
