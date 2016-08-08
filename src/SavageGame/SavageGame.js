"use strict";

function SavageGame(htmlCanvasID)
{
	gEngine.Core.initializeWebGL(htmlCanvasID);
	this.mConstColorShader = new SimpleShader(
		"src/GLSLShaders/SimpleVS.glsl",
		"src/GLSLShaders/SimpleFS.glsl");


	//Create renderable objects
	this.mWhiteSq = new Renderable(this.mConstColorShader);
	this.mWhiteSq.setColor([1, 1, 1, 1]);
	this.mRedSq = new Renderable(this.mConstColorShader);
	this.mRedSq.setColor([1, 0, 0, 1]);

	gEngine.Core.clearCanvas([0, 0.8, 0, 1]);

	this.mWhiteSq.draw();
	this.mRedSq.draw();
};