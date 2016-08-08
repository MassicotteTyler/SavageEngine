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

  var xform = mat4.create();
  mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
  mat4.rotateZ(xform, xform, 0.2);
  mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0));

	this.mWhiteSq.draw(xform);

  mat4.identity(xform);
  mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0));
  mat4.rotateZ(xform, xform, -0.785);
  mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0));

	this.mRedSq.draw(xform);
};
