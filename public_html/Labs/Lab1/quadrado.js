var canvas	= null;
var gl		= null;
var shader	= null;

// ********************************************************
// ********************************************************
function initGL() {
	gl = canvas.getContext("webgl");
	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
		return (null);
		}
	gl.viewportWidth 	= canvas.width;
	gl.viewportHeight 	= canvas.height;
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

// ********************************************************
// ********************************************************
var vPosBuf;
var vColorBuf;

function initBuffers() {
var vPos = [-0.5, -0.5,  0.0,
                0.5, -0.5,  0.0,
                0.5,  0.5,  0.0,
               -0.5, -0.5,  0.0,
                0.5,  0.5,  0.0,
               -0.5,  0.5,  0.0
            ];

var vColor = [1.0, 0.0,  0.0,
                0.0, 1.0,  0.0,
                0.0, 0.0,  1.0,
                1.0, 0.0,  0.0,
                0.0, 0.0,  1.0,
                1.0, 1.0,  1.0
            ];
	
    vPosBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vPos), gl.STATIC_DRAW);
    vPosBuf.itemSize = 3;
    vPosBuf.numItems = 6;

    vColorBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vColor), gl.STATIC_DRAW);
    vColorBuf.itemSize = 3;
    vColorBuf.numItems = 6;
}

// ********************************************************
// ********************************************************
function drawScene(shader) {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.useProgram(shader);

	gl.bindBuffer(gl.ARRAY_BUFFER, vPosBuf);
	gl.enableVertexAttribArray(shader.vPosAttr);		
	gl.vertexAttribPointer(shader.vPosAttr, vPosBuf.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuf);
	gl.enableVertexAttribArray(shader.vColorAttr);	
	gl.vertexAttribPointer(shader.vColorAttr, vColorBuf.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.drawArrays(gl.TRIANGLES, 0, vPosBuf.numItems);
	
	gl.disableVertexAttribArray(shader.vPosAttr);		
	gl.disableVertexAttribArray(shader.vColorAttr);	
	gl.useProgram(null);
}

// ********************************************************
// ********************************************************
function webGLStart() {
	canvas = document.getElementById("quadrado");
	
	initGL();
	
	shader = initShaders("shader", gl);
	if (shader == null) {
            alert("Erro na inicilização do shader!!"); 
            return;
            }
		
	shader.vPosAttr = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shader.vColorAttr = gl.getAttribLocation(shaderProgram, "aVertexColor");

	if ( 	(shader.vPosAttr < 0) ||
			(shader.vColorAttr < 0) ) {
		alert("Shader attribute ou uniform não localizado!");
		return;
		}
	initBuffers();
	drawScene(shader);
}


