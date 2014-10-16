var canvas 	= null;
var gl		= null;
var shader	= null;
var vPos 	= new Array;
var vColor 	= new Array;
var vPosBuf;
var vColorBuf;
var vPSize;

// ********************************************************
// ********************************************************
function changePSize(v) {
	var text = document.getElementById("output");
	text.innerHTML = "Point Size = " + v;
	vPSize = v;	
	drawScene(shader);
}

// ********************************************************
// ********************************************************
function build2DGrid(nx, ny) {

var dx = 2.0/nx;
var dy = 2.0/ny;

	for(i=0 ; i <= nx ; i++) {
		for (j=0 ; j <= ny ; j++) {
			vPos.push(-1.0+i*dx);
			vPos.push(-1.0+j*dy);
			vPos.push(0.0);
	
			vColor.push(i*dx);
			vColor.push(j*dy);
			vColor.push(0.0);
			}
		}
}

// ********************************************************
// ********************************************************
function initGL() {
	
	gl = canvas.getContext("webgl");
	if (!gl) {
		return (null);
		}
	
	gl.viewportWidth 	= canvas.width;
	gl.viewportHeight 	= canvas.height;
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

// ********************************************************
// ********************************************************
function initBuffers() {
	
	vPosBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vPosBuf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vPos), gl.STATIC_DRAW);
	vPosBuf.itemSize = 3;
	vPosBuf.numItems = vPos.length/3;
	
	vColorBuf = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuf);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vColor), gl.STATIC_DRAW);
	vColorBuf.itemSize = 3;
	vColorBuf.numItems = vColor.length/3;
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
	
	gl.uniform1f(shader.uPSizeAttr, vPSize);
	
	gl.drawArrays(gl.POINTS, 0, vPosBuf.numItems);
	
	gl.useProgram(shader);
	gl.disableVertexAttribArray(shader.vPosAttr);		
	gl.disableVertexAttribArray(shader.vColorAttr);	
}

// ********************************************************
// ********************************************************
function webGLStart() {
	canvas = document.getElementById("gridPoints");
	var slider = document.getElementById("pSize");
	vPSize = slider.value;	
	
	initGL(canvas);

	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
		return;
		}

	shader = initShaders("shader", gl);
	if (shader == null) {
		alert("Erro na iniciliza��o do shader!!"); 
		return;
		}

	shader.vPosAttr 	= gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shader.vColorAttr 	= gl.getAttribLocation(shaderProgram, "aVertexColor");
	shader.uPSizeAttr	= gl.getUniformLocation(shaderProgram, "uVertexPSize");

	if ( 	(shader.vPosAttr < 0) ||
			(shader.vColorAttr < 0) ||
			(shader.uPSizeAttr < 0) ) {
		alert("Shader: attribute ou uniform n�o localizado!");
		return;
		}
	build2DGrid(30,30);
	initBuffers();
	drawScene(shader);
}


