"use strict";

function SimpleShader(vertexShaderID, fragmentShaderID)
{
	this.mCompiledShader = null;
  	this.mModelTransform = null;
	this.mShaderVertexPositionAttribute = null;
	this.mPixelColor = null;
	this.mViewProjTransform = null;

	var gl = gEngine.Core.getGL();

	var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
	var fragmentShader = this._loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

	this.mCompiledShader = gl.createProgram();
	gl.attachShader(this.mCompiledShader, vertexShader);
	gl.attachShader(this.mCompiledShader, fragmentShader);
	gl.linkProgram(this.mCompiledShader);

	//Error check
	if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS))
	{
		alert("Error linking shader");
		return null;
	}

	this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader,
		"aSquareVertexPosition");

	this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
  	this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
  	this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader,	
  								"uViewProjTransform");

	gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

	gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
		3,
		gl.FLOAT,
		false,
		0,
		0);
}


SimpleShader.prototype.getShader = function () { return this.mCompiledShader; };

SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType)
{
	var shaderText, shaderSource, compiledShader;
	var gl = gEngine.Core.getGL();

	var xmlReq = new XMLHttpRequest();
	xmlReq.open('GET', filePath, false);
	try 
	{
		xmlReq.send();
	} catch (error)
	{
		alert("Failed to load shader: " + filePath);
		return null;
	}
	shaderSource = xmlReq.responseText;
	if (shaderSource === null)
	{
		alert("WARNING: Loading of: " + filePath + " Failed");
		return null;
	}

	compiledShader = gl.createShader(shaderType);

	gl.shaderSource(compiledShader, shaderSource);
	gl.compileShader(compiledShader);

	if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS))
	{
		alert("A shader compiling error occured: " + gl.getShaderInfoLog(compiledShader));
	}
	return compiledShader
};

SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix)
{
	var gl = gEngine.Core.getGL();
	gl.useProgram(this.mCompiledShader);
	gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix)
	gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
	gl.uniform4fv(this.mPixelColor, pixelColor);
};

//Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function(modelTransform)
{
  var gl = gEngine.Core.getGL();
  gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};

