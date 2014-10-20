var canvas 	= null;
var gl		= null;
var shader	= null;
var vPos 	= new Array;
var vColor 	= new Array;
var vPosBuf;
var vColorBuf;
var vPSize;
var qtd;

// ********************************************************
function changeQtd(){
    
    qtd = (document.getElementById("pQuant").value);
    
    //gl.clearColor(0, 0, 0, 1.0);                               // Near things obscure far things
    //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    build2DGrid(qtd);
    initBuffers();
    drawScene(shader);
}
// ********************************************************
// trivial, altera o tamanho dos pontos e chama o dwawnScene pra atualizar os dados
function changePSize(v) {
	var text = document.getElementById("output");
	text.innerHTML = "Point Size = " + v;
	vPSize = v;	
	drawScene(shader);
}

// ********************************************************
// cria a grade com os pontos iniciais dispostos pelo canvas
function build2DGrid(n) {

var nx, ny;
nx = n;
ny = n;

var dx = 2.0/nx;
var dy = 2.0/ny;

    for(i=0 ; i <= n ; i++) {
        for (j=0 ; j <= n ; j++) {
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
	
        try {
            // Try to grab the standard context. If it fails, fallback to experimental.
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          }
          catch(e) {}
          
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
            alert("Erro na inicilização do shader!!"); 
            return;
	}

	shader.vPosAttr 	= gl.getAttribLocation(shaderProgram, "aVertexPosition");
	shader.vColorAttr 	= gl.getAttribLocation(shaderProgram, "aVertexColor");
	shader.uPSizeAttr	= gl.getUniformLocation(shaderProgram, "uVertexPSize");

	if ( (shader.vPosAttr < 0) || (shader.vColorAttr < 0) || (shader.uPSizeAttr < 0) ) {
            alert("Shader: attribute ou uniform não localizado!");
            return;
        }

	build2DGrid(qtd);
	initBuffers();
	drawScene(shader);
}
