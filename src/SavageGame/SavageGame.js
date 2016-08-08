"use strict";

function SavageGame(htmlCanvasID)
{
	gEngine.Core.initializeWebGL(htmlCanvasID);
	var gl = gEngine.Core.getGL();

	//Setup the camera
	this.mCamera = new Camera(
		vec2.fromValues(20, 60),
		20,
		[20, 40, 600, 300]
		);

	this.mConstColorShader = new SimpleShader(
	"src/GLSLShaders/SimpleVS.glsl",
	"src/GLSLShaders/SimpleFS.glsl");

	//Create renderable objects
	this.mWhiteSq = new Renderable(this.mConstColorShader);
	this.mWhiteSq.setColor([1, 1, 1, 1]);
	this.mRedSq = new Renderable(this.mConstColorShader);
	this.mRedSq.setColor([1, 0, 0, 1]);
	this.mBlueSq = new Renderable(this.mConstColorShader);
	this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
	this.mRedSq = new Renderable(this.mConstColorShader);
	this.mRedSq.setColor([1, 0.25, 0.25, 1]);
	this.mTLSq = new Renderable(this.mConstColorShader);
	this.mTLSq.setColor([0.9, 0.1, 0.1, 1]); // Top-Left shows red
	this.mTRSq = new Renderable(this.mConstColorShader);
	this.mTRSq.setColor([0.1, 0.9, 0.1, 1]); // Top-Right shows green
	this.mBRSq = new Renderable(this.mConstColorShader);
	this.mBRSq.setColor([0.1, 0.1, 0.9, 1]); // Bottom-Right shows blue
	this.mBLSq = new Renderable(this.mConstColorShader);
	this.mBLSq.setColor([0.1, 0.1, 0.1, 1]); // Bottom-Left shows dark gray
	
	gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);

	this.mCamera.setupViewProjection();
	var vpMatrix = this.mCamera.getVPMatrix();

	gl.viewport(
		20,
		40,
		600,
		300
		);

	//Setup to limit clear area
	gl.scissor(
		20,
		40,
		600,
		300
		);

	var viewMatrix = mat4.create();
	var projMatrix = mat4.create();

	mat4.lookAt(viewMatrix,
		[20, 60, 10],
		[20, 60, 0],
		[0, 1, 0]);

	mat4.ortho(projMatrix,
		-10,
		10,
		-5,
		5,
		0,
		1000
		);

	var vpMatrix = mat4.create();
	mat4.multiply(vpMatrix, projMatrix, viewMatrix);

	gl.enable(gl.SCISSOR_TEST);
	gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);
	gl.disable(gl.SCISSOR_TEST);


	this.mBlueSq.getXform().setPosition(20, 60);
	this.mBlueSq.getXform().setRotationInRad(0.2); // In Radians
	this.mBlueSq.getXform().setSize(5, 5);
	this.mBlueSq.draw(vpMatrix);


	// top left
	this.mTLSq.getXform().setPosition(10, 65);
	this.mTLSq.draw(vpMatrix);
	// top right
	this.mTRSq.getXform().setPosition(30, 65);
	this.mTRSq.draw(vpMatrix);
	// bottom right
	this.mBRSq.getXform().setPosition(30, 55);
	this.mBRSq.draw(vpMatrix);
	// bottom left
	this.mBLSq.getXform().setPosition(10, 55);
	this.mBLSq.draw(vpMatrix);
};
