var canvas	= null;
var gl		= null;
var shader	= null;
var vPos 	= new Array;
var vColor 	= new Array;
var vIndex 	= new Array;
var vPosBuf;
var vColorBuf;
var vIndexBuf;

// ********************************************************
// ********************************************************
function build2DGrid(nx, ny) {

var dx = 2.0/nx;
var dy = 2.0/ny;

	for(i=0 ; i < nx ; i++) {
		for (j=0 ; j < ny ; j++) {
			vPos.push(-1.0+i*dx);
			vPos.push(-1.0+j*dy);
			vPos.push(0.0);
	
			vColor.push(i*dx);
			vColor.push(j*dy);
			vColor.push(0.0);			

			vPos.push(-1.0+(i+1)*dx);
			vPos.push(-1.0+j*dy);
			vPos.push(0.0);
	
			vColor.push((i+1)*dx);
			vColor.push(j*dy);
			vColor.push(0.0);			

			vPos.push(-1.0+(i+1)*dx);
			vPos.push(-1.0+(j+1)*dy);
			vPos.push(0.0);
	
			vColor.push((i+1)*dx);
			vColor.push((j+1)*dy);
			vColor.push(0.0);			

			vPos.push(-1.0+i*dx);
			vPos.push(-1.0+(j+1)*dy);
			vPos.push(0.0);
	
			vColor.push(i*dx);
			vColor.push((j+1)*dy);
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
	gl.enableVertexAttribArray(shader.vColorAttr);	
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vColorBuf);
	gl.vertexAttribPointer(shader.vColorAttr, vColorBuf.itemSize, gl.FLOAT, false, 0, 0);

	for (i=0 ; i < vPosBuf.numItems/4 ; i++) {
		gl.drawArrays(gl.LINE_STRIP, i*4, 4);
		}
}

// ********************************************************
// ********************************************************
function webGLStart() {
	canvas = document.getElementById("gridLinhas");
	
	initGL(canvas);
	if(!gl) {
		alert("Could not initialise WebGL, sorry :-(");
		return;
		}
	
	shader = initShaders("shader", gl);
	if (shader == null) {
		alert("Erro na inicilizacao do shader!!"); 
		return;
		}

	shader.vPosAttr 	= gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shader.vColorAttr 	= gl.getAttribLocation(shaderProgram, "aVertexColor");

	if ( 	(shader.vPosAttr < 0) ||
			(shader.vColorAttr < 0) ) {
		alert("Shader attribute ou uniform nao localizado!");
		return;
		}
	build2DGrid(30,30);
	initBuffers();
	drawScene(shader);
}
