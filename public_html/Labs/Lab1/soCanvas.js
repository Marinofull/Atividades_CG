var canvas	= null;
var gl		= null;

// ********************************************************
// ********************************************************
function initGL() {
	gl = canvas.getContext("webgl");
	if (!gl) {
		return(null);
		}
	gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

// ********************************************************
// ********************************************************
function drawScene() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}

// ********************************************************
// ********************************************************
function webGLStart() {
	canvas = document.getElementById("SoCanvas");
	initGL();

	if (!gl) {
		alert("Could not initialise WebGL, sorry :-(");
		return;
		}
		
	drawScene();
}


