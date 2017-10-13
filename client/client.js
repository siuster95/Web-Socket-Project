//variables 
let canvas;

let ctx;

let mouseX;

let mouseY;

let markerpositionx;
let markerpositiony;

let roomNumber;

let socket;

let circleobjs = [];

let positions = [];

let yourturn = false;

let R;
let G;
let B;

let play = false;

let turnlabel;

let canPlace = false;

const user = Math.floor(Math.random() * 1000);

//functions
const markerposition = (X,Y) => {
    //first row
    if(Y < 100){
     if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 50;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 50;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 50;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 50;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 50;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 50;
     }
    }
    //second row
    else if(Y< 200)
    {
        if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 150;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 150;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 150;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 150;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 150;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 150;
     }
    }
    //third row
    else if(Y< 300)
    {
        if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 250;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 250;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 250;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 250;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 250;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 250;
     }
    }
        //forth row
    else if(Y< 400)
    {
        if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 350;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 350;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 350;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 350;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 350;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 350;
     }
    }
    //fifth row
    else if(Y< 500)
    {
        if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 450;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 450;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 450;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 450;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 450;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 450;
     }
    }
    //sixth row
    else if(Y< 600)
    {
        if(X < 100)
     {
         markerpositionx = 50;
         markerpositiony = 550;
     }
     else if(X < 200)
     {
         markerpositionx = 150;
         markerpositiony = 550;
     }
     else if(X < 300)
     {
         markerpositionx = 250;
         markerpositiony = 550;
     }
     else if(X < 400)
     {
         markerpositionx = 350;
         markerpositiony = 550;
     }
     else if(X < 500)
     {
         markerpositionx = 450;
         markerpositiony = 550;
     }
     else if(X < 600)
     {
         markerpositionx = 550;
         markerpositiony = 550;
     }
    }
};

const drawPredict = () => {
    
    if(play == true && yourturn == true)
    {
    redraw();
    let positionsAllowed = []
    for(let x =0;x < positions.length;x++)
    {
        //if a circle exist there, don't draw
        if(markerpositionx == positions[x].x && markerpositiony == positions[x].y)
        {
            return;
        }
        //find whether or not this color is the same as users
        if(positions[x].R != R && positions[x].G != G && positions[x].B != B)
        {
            //get the x and y
            let circleX = (positions[x].x - 50) / 100;
            let circleY = (positions[x].y - 50) / 100;
            //find which position in the double array it is 
            
            let testtop;
            let testleft;
            let testbottom;
            let testright;
            
            //get top
            if(circleY != 0)
            {
                testtop = circleobjs[circleX][circleY - 1];
                //see if they are null and in the position 
                if(testtop == null && markerpositionx == ((circleX * 100) + 50) && markerpositiony == (((circleY - 1) * 100) + 50))
                {
                    ctx.save();
                    ctx.globalAlpha = 0.8;
                    ctx.strokeStyle = `rgb(${R},${G},${B})`;
                    ctx.beginPath();
                    ctx.arc(markerpositionx,markerpositiony,50,0,2*Math.PI*2);
                    ctx.stroke();
                    ctx.restore();
                    canPlace = true;
                    return;
                }
            }
            //get left
            if(circleX != 0)
            {
                testleft = circleobjs[circleX-1][circleY];
                if(testleft == null && markerpositionx == (((circleX - 1) * 100) + 50) && markerpositiony == ((circleY * 100) + 50))
                {
                    ctx.save();
                    ctx.globalAlpha = 0.8;
                    ctx.strokeStyle = `rgb(${R},${G},${B})`;
                    ctx.beginPath();
                    ctx.arc(markerpositionx,markerpositiony,50,0,2*Math.PI*2);
                    ctx.stroke();
                    ctx.restore();
                    canPlace = true;
                    return;
                }
            }
            //get right
            if(circleX != 5)
            {
                testright = circleobjs[circleX+1][circleY];
                if(testright == null && markerpositionx == (((circleX + 1) * 100) + 50) && markerpositiony == ((circleY * 100) + 50))
                {
                    ctx.save();
                    ctx.globalAlpha = 0.8;
                    ctx.strokeStyle = `rgb(${R},${G},${B})`;
                    ctx.beginPath();
                    ctx.arc(markerpositionx,markerpositiony,50,0,2*Math.PI*2);
                    ctx.stroke();
                    ctx.restore();
                    canPlace = true;
                    return;
                }
            }
            //get bottom
            if(circleY != 5)
            {
                testbottom = circleobjs[circleX][circleY+1];
                if(testbottom == null && markerpositionx == ((circleX * 100) + 50) && markerpositiony == (((circleY + 1) * 100) + 50))
                {
                    ctx.save();
                    ctx.globalAlpha = 0.8;
                    ctx.strokeStyle = `rgb(${R},${G},${B})`;
                    ctx.beginPath();
                    ctx.arc(markerpositionx,markerpositiony,50,0,2*Math.PI*2);
                    ctx.stroke();
                    ctx.restore();
                    canPlace = true;
                    return;
                }
            }    
        }
        


    }
    canPlace = false;
    }
};

const init = () => {
    
    socket = io.connect();
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    turnlabel = document.querySelector("#turnlabel");
   
    for(let y = 0; y < 6; y++)
        {
            circleobjs[y] = [];
        }
    for(let x =0;x<6;x++)
    {
        for(let k =0;k<6;k++)
        {
            circleobjs[x][k] = null;
        }
    }
    

    canvas.addEventListener('mousemove',(evt)=>{
        let object = getmousemove(canvas,evt);
        mouseX = object.x;
        mouseY = object.y;
        markerposition(mouseX,mouseY);
        drawPredict();
    });
    
    canvas.addEventListener('click', drawCircle);
    
    socket.on('UpdatefromServer',(data) => {
        let x = (data.circle.x - 50) / 100;
        let y = (data.circle.y - 50) / 100;

        if( x < 0)
        {
            x = 0;
        }
        if( y < 0)
        {
            y = 0;
        }

        if(circleobjs[x][y] == null)
        {
            circleobjs[x][y] = data;
        }
        
        redraw();
    });
    socket.on("Joined",(data)=>{

        R = data.R;
        G = data.G;
        B = data.B;
        circleobjs = data.circleobjs;
        roomNumber = data.Roomnumber;
        redraw();
    });
    
    socket.on("Start",(data) =>{
        play = data.bool;
        socket.emit("Setup",{R,G,B,roomNumber});
    });

    socket.on("SetupfromServer",(data) => {

        for(let x = 0;x < 6;x++)
        {
            for(let y =0;y < 6;y++)
            {
                if(data[x][y] != null)
                {
                    let circle = {
                        x:data[x][y].x,
                        y:data[x][y].y,
                        radius:50,
                        R:data[x][y].R,
                        G:data[x][y].G,
                        B:data[x][y].B
                    };

                    let object = {};
                    object.circle = circle;

                    circleobjs[x][y] = object;

                    let newposition = {x:data[x][y].x,y:data[x][y].y};
                    positions.push(newposition);
                }
            }
        }
        turnlabel.innerHTML = "Opponent's Turns"
        redraw();
    });

    socket.on("Turn", (data) => {
        yourturn = data.turn;
        turnlabel.innerHTML = "Your Turn";
    });

    socket.on("otherTurn",(data)=>{
        turnlabel.innerHTML = "Opponent's Turn";
    })
};

 //get mouse movement 
        const getmousemove = (canvas,evt) => {
           let rect = canvas.getBoundingClientRect();
            return{
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
        };

  //click and make a circle
        const drawCircle = () => {
            
            if(play == true && yourturn == true && canPlace == true)
            {
            for(let i =0; i< positions.length;i++)
            {
              let xpos = positions[i].x;   
              let ypos = positions[i].y
              
              if(markerpositionx == xpos && markerpositiony == ypos)
                {
                    return;
                }
            }
            let date = new Date().getTime();
            let circle = {
              x:markerpositionx,
              y:markerpositiony,
              radius:50,
              R:R,
              G:G,
              B:B
            };

            yourturn = false;

            turnlabel.innerHTML = "Opponent's Turn";
            socket.emit('updateCanvas',{circle:circle,roomNumber:roomNumber});
            console.log('sending circle to server');
            }
        };

        const redraw = () => {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            positions = [];
            if(play == false)
            {
                ctx.font = "30px Arial";
                ctx.fillText("Waiting for another player",canvas.width/2 - 170,canvas.height/2);
            }
            else
            {
                
            }
            for(let x =0; x < 6; x++)
            {
            for(let y =0;y<6;y++)
            {
                let object  = circleobjs[x][y];
                if(object != null)
                {
                ctx.save();
                console.log(object.circle.x);
                console.log(object.circle.y);
               
                ctx.strokeStyle = `rgb(${object.circle.R},${object.circle.G},${object.circle.B})`;
                ctx.fillStyle = `rgb(${object.circle.R},${object.circle.G},${object.circle.B})`;

                 ctx.beginPath();
                 ctx.arc(object.circle.x,object.circle.y,50,0,2*Math.PI*2);
                 ctx.fill();
                 ctx.stroke();
                ctx.restore();
                
                let newposition = {x:object.circle.x,y:object.circle.y,R:object.circle.R,G:object.circle.G,B:object.circle.B};
                positions.push(newposition);
                }
            }
            
        }};


window.onload = init;
