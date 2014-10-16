/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function webGLStart() {
    var canvas = document.getElementById("SoCanvas");
    //var gl = initGL(canvas);
    var gl = canvas.getContext("webgl");
    var shader = initShaders("shader", gl);
    if(shader === null){
        alert("Erro na inicialização do Shader!");
        return null;
    }
    shader.vPosAttr = gl.getAttribLocation(shderProgram, "aVertexPosition");
    if(shader.vPosition < 0){
        alert("Shader: atributo não  localizado!");
        return;
    }
    initBuffers(gl);
//    if (!gl) {
//        alert("Could not initialise WebGL, sorry :-(");
//        return;
//    }
    drawScene(gl, shader);
}

function initGL(canvas) {
    gl = canvas.getContext("webgl");
    if (!gl) {
        return(null);
    }
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    //gl.clearColor(5.0, 5.0, 5.0, 9.0);
    return gl;
}
function drawScene(gl, shader) {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.useProgram(shader);
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosBuf);
    gl.enableVertexAttribArray(shader.vPosAttr);
    gl.vertexAttribPointer(shader.vPosAttr, vPosBuf.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, vPosBuf.numItems);
    gl.disableVertexAttribArray(shader.vPosAttr);
    gl.useProgram(null);
}
     
var vPosBuf;     
function initBuffers(gl){
    var vPos = [    -0.5, -0.5, 0.0,
                    0.5, -0.5 , 0.0,
                    0.0, 0.5, 0.0
                ];
    vPosBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vPosBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vPos), gl.STATIC_DRAW);
    vPosBuf.itemSize = 3;
    vPosBuf.numItems = 3;
}