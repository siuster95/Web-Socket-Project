"use strict";

//variables 
var canvas = void 0;

var ctx = void 0;

var mouseX = void 0;

var mouseY = void 0;

var markerpositionx = void 0;
var markerpositiony = void 0;

var roomNumber = void 0;

var socket = void 0;

var circleobjs = [];

var positions = [];

var yourturn = false;

var R = void 0;
var G = void 0;
var B = void 0;

var play = false;

var turnlabel = void 0;

var canPlace = false;

var user = Math.floor(Math.random() * 1000);

//functions
var markerposition = function markerposition(X, Y) {
    //first row
    if (Y < 100) {
        if (X < 100) {
            markerpositionx = 50;
            markerpositiony = 50;
        } else if (X < 200) {
            markerpositionx = 150;
            markerpositiony = 50;
        } else if (X < 300) {
            markerpositionx = 250;
            markerpositiony = 50;
        } else if (X < 400) {
            markerpositionx = 350;
            markerpositiony = 50;
        } else if (X < 500) {
            markerpositionx = 450;
            markerpositiony = 50;
        } else if (X < 600) {
            markerpositionx = 550;
            markerpositiony = 50;
        }
    }
    //second row
    else if (Y < 200) {
            if (X < 100) {
                markerpositionx = 50;
                markerpositiony = 150;
            } else if (X < 200) {
                markerpositionx = 150;
                markerpositiony = 150;
            } else if (X < 300) {
                markerpositionx = 250;
                markerpositiony = 150;
            } else if (X < 400) {
                markerpositionx = 350;
                markerpositiony = 150;
            } else if (X < 500) {
                markerpositionx = 450;
                markerpositiony = 150;
            } else if (X < 600) {
                markerpositionx = 550;
                markerpositiony = 150;
            }
        }
        //third row
        else if (Y < 300) {
                if (X < 100) {
                    markerpositionx = 50;
                    markerpositiony = 250;
                } else if (X < 200) {
                    markerpositionx = 150;
                    markerpositiony = 250;
                } else if (X < 300) {
                    markerpositionx = 250;
                    markerpositiony = 250;
                } else if (X < 400) {
                    markerpositionx = 350;
                    markerpositiony = 250;
                } else if (X < 500) {
                    markerpositionx = 450;
                    markerpositiony = 250;
                } else if (X < 600) {
                    markerpositionx = 550;
                    markerpositiony = 250;
                }
            }
            //forth row
            else if (Y < 400) {
                    if (X < 100) {
                        markerpositionx = 50;
                        markerpositiony = 350;
                    } else if (X < 200) {
                        markerpositionx = 150;
                        markerpositiony = 350;
                    } else if (X < 300) {
                        markerpositionx = 250;
                        markerpositiony = 350;
                    } else if (X < 400) {
                        markerpositionx = 350;
                        markerpositiony = 350;
                    } else if (X < 500) {
                        markerpositionx = 450;
                        markerpositiony = 350;
                    } else if (X < 600) {
                        markerpositionx = 550;
                        markerpositiony = 350;
                    }
                }
                //fifth row
                else if (Y < 500) {
                        if (X < 100) {
                            markerpositionx = 50;
                            markerpositiony = 450;
                        } else if (X < 200) {
                            markerpositionx = 150;
                            markerpositiony = 450;
                        } else if (X < 300) {
                            markerpositionx = 250;
                            markerpositiony = 450;
                        } else if (X < 400) {
                            markerpositionx = 350;
                            markerpositiony = 450;
                        } else if (X < 500) {
                            markerpositionx = 450;
                            markerpositiony = 450;
                        } else if (X < 600) {
                            markerpositionx = 550;
                            markerpositiony = 450;
                        }
                    }
                    //sixth row
                    else if (Y < 600) {
                            if (X < 100) {
                                markerpositionx = 50;
                                markerpositiony = 550;
                            } else if (X < 200) {
                                markerpositionx = 150;
                                markerpositiony = 550;
                            } else if (X < 300) {
                                markerpositionx = 250;
                                markerpositiony = 550;
                            } else if (X < 400) {
                                markerpositionx = 350;
                                markerpositiony = 550;
                            } else if (X < 500) {
                                markerpositionx = 450;
                                markerpositiony = 550;
                            } else if (X < 600) {
                                markerpositionx = 550;
                                markerpositiony = 550;
                            }
                        }
};

var drawPredict = function drawPredict() {

    if (play == true && yourturn == true) {
        redraw();
        var positionsAllowed = [];
        for (var x = 0; x < positions.length; x++) {
            //if a circle exist there, don't draw
            if (markerpositionx == positions[x].x && markerpositiony == positions[x].y) {
                return;
            }
            //find whether or not this color is the same as users
            if (positions[x].R != R && positions[x].G != G && positions[x].B != B) {
                //get the x and y
                var circleX = (positions[x].x - 50) / 100;
                var circleY = (positions[x].y - 50) / 100;
                //find which position in the double array it is 

                var testtop = void 0;
                var testleft = void 0;
                var testbottom = void 0;
                var testright = void 0;

                //get top
                if (circleY != 0) {
                    testtop = circleobjs[circleX][circleY - 1];
                    //see if they are null and in the position 
                    if (testtop == null && markerpositionx == circleX * 100 + 50 && markerpositiony == (circleY - 1) * 100 + 50) {
                        ctx.save();
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = "rgb(" + R + "," + G + "," + B + ")";
                        ctx.beginPath();
                        ctx.arc(markerpositionx, markerpositiony, 50, 0, 2 * Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                        canPlace = true;
                        return;
                    }
                }
                //get left
                if (circleX != 0) {
                    testleft = circleobjs[circleX - 1][circleY];
                    if (testleft == null && markerpositionx == (circleX - 1) * 100 + 50 && markerpositiony == circleY * 100 + 50) {
                        ctx.save();
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = "rgb(" + R + "," + G + "," + B + ")";
                        ctx.beginPath();
                        ctx.arc(markerpositionx, markerpositiony, 50, 0, 2 * Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                        canPlace = true;
                        return;
                    }
                }
                //get right
                if (circleX != 5) {
                    testright = circleobjs[circleX + 1][circleY];
                    if (testright == null && markerpositionx == (circleX + 1) * 100 + 50 && markerpositiony == circleY * 100 + 50) {
                        ctx.save();
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = "rgb(" + R + "," + G + "," + B + ")";
                        ctx.beginPath();
                        ctx.arc(markerpositionx, markerpositiony, 50, 0, 2 * Math.PI * 2);
                        ctx.stroke();
                        ctx.restore();
                        canPlace = true;
                        return;
                    }
                }
                //get bottom
                if (circleY != 5) {
                    testbottom = circleobjs[circleX][circleY + 1];
                    if (testbottom == null && markerpositionx == circleX * 100 + 50 && markerpositiony == (circleY + 1) * 100 + 50) {
                        ctx.save();
                        ctx.globalAlpha = 0.8;
                        ctx.strokeStyle = "rgb(" + R + "," + G + "," + B + ")";
                        ctx.beginPath();
                        ctx.arc(markerpositionx, markerpositiony, 50, 0, 2 * Math.PI * 2);
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

var init = function init() {

    socket = io.connect();
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    turnlabel = document.querySelector("#turnlabel");

    for (var y = 0; y < 6; y++) {
        circleobjs[y] = [];
    }
    for (var x = 0; x < 6; x++) {
        for (var k = 0; k < 6; k++) {
            circleobjs[x][k] = null;
        }
    }

    canvas.addEventListener('mousemove', function (evt) {
        var object = getmousemove(canvas, evt);
        mouseX = object.x;
        mouseY = object.y;
        markerposition(mouseX, mouseY);
        drawPredict();
    });

    canvas.addEventListener('click', drawCircle);

    socket.on('UpdatefromServer', function (data) {
        var x = (data.circle.x - 50) / 100;
        var y = (data.circle.y - 50) / 100;

        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }

        if (circleobjs[x][y] == null) {
            circleobjs[x][y] = data;
        }

        redraw();
    });
    socket.on("Joined", function (data) {

        R = data.R;
        G = data.G;
        B = data.B;
        circleobjs = data.circleobjs;
        roomNumber = data.Roomnumber;
        redraw();
    });

    socket.on("Start", function (data) {
        play = data.bool;
        socket.emit("Setup", { R: R, G: G, B: B, roomNumber: roomNumber });
    });

    socket.on("SetupfromServer", function (data) {

        for (var _x = 0; _x < 6; _x++) {
            for (var _y = 0; _y < 6; _y++) {
                if (data[_x][_y] != null) {
                    var circle = {
                        x: data[_x][_y].x,
                        y: data[_x][_y].y,
                        radius: 50,
                        R: data[_x][_y].R,
                        G: data[_x][_y].G,
                        B: data[_x][_y].B
                    };

                    var object = {};
                    object.circle = circle;

                    circleobjs[_x][_y] = object;

                    var newposition = { x: data[_x][_y].x, y: data[_x][_y].y };
                    positions.push(newposition);
                }
            }
        }
        turnlabel.innerHTML = "Opponent's Turns";
        redraw();
    });

    socket.on("Turn", function (data) {
        yourturn = data.turn;
        turnlabel.innerHTML = "Your Turn";
    });

    socket.on("otherTurn", function (data) {
        turnlabel.innerHTML = "Opponent's Turn";
    });
};

//get mouse movement 
var getmousemove = function getmousemove(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

//click and make a circle
var drawCircle = function drawCircle() {

    if (play == true && yourturn == true && canPlace == true) {
        for (var i = 0; i < positions.length; i++) {
            var xpos = positions[i].x;
            var ypos = positions[i].y;

            if (markerpositionx == xpos && markerpositiony == ypos) {
                return;
            }
        }
        var date = new Date().getTime();
        var circle = {
            x: markerpositionx,
            y: markerpositiony,
            radius: 50,
            R: R,
            G: G,
            B: B
        };

        yourturn = false;

        turnlabel.innerHTML = "Opponent's Turn";
        socket.emit('updateCanvas', { circle: circle, roomNumber: roomNumber });
        console.log('sending circle to server');
    }
};

var redraw = function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    positions = [];
    if (play == false) {
        ctx.font = "30px Arial";
        ctx.fillText("Waiting for another player", canvas.width / 2 - 170, canvas.height / 2);
    } else {}
    for (var x = 0; x < 6; x++) {
        for (var y = 0; y < 6; y++) {
            var object = circleobjs[x][y];
            if (object != null) {
                ctx.save();
                console.log(object.circle.x);
                console.log(object.circle.y);

                ctx.strokeStyle = "rgb(" + object.circle.R + "," + object.circle.G + "," + object.circle.B + ")";
                ctx.fillStyle = "rgb(" + object.circle.R + "," + object.circle.G + "," + object.circle.B + ")";

                ctx.beginPath();
                ctx.arc(object.circle.x, object.circle.y, 50, 0, 2 * Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                var newposition = { x: object.circle.x, y: object.circle.y, R: object.circle.R, G: object.circle.G, B: object.circle.B };
                positions.push(newposition);
            }
        }
    }
};

window.onload = init;
