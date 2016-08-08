"use strict";

function SavageGame(htmlCanvasID)
{
	this.mShader = null;
	gEngine.Core.initializeWebGL(htmlCanvasID);
	this.mShader = new SimpleShader("src/GLSLShaders/SimpleVS.glsl",
		"src/GLSLShaders/SimpleFS.glsl");

	gEngine.Core.clearCanvas([0, 0.8, 0, 1]);
	this.mShader.activateShader([0, 0, 1, 1]);

	var gl = gEngine.Core.getGL();
	gl.drawArrays(gl.TRIANGE_STRIP, 0, 4);
}