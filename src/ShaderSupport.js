"use strict";
var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType)
{
	var shaderText, shaderSource, compiledShader;
	shaderText = document.getElementById(id);
	shaderSource = shaderText.firstChild.textContent;

	compiledShader = gGL.createShader(shaderType);

	gGL.shaderSource(compiledShader, shaderSource);
	gGL.compileShader(compiledShader);

	//Error check
	if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS))
	{
		alert("A shader compiling error occured: " + gGL.getShaderInfoLog(compiledShader));
	}
	return compiledShader;
}

function initSimpleShader(vertexShaderID, fragmentShaderID)
{
	//load and compile the vertex and fragment shaders
	var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
	var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

	//Create and link shaders into program
	gSimpleShader = gGL.createProgram();
	gGL.attachShader(gSimpleShader, vertexShader);
	gGL.attachShader(gSimpleShader, fragmentShader);
	gGL.linkProgram(gSimpleShader);

	//Error check
	if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS))
		alert("Error linking shader");

	//Get a reference to the aSquareVertexPosition attribute
	gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, 
		"aSquareVertexPosition");

	//Activate the vertex buffer loaded in VertexBuffer.js
	gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquareVertexBuffer);

	gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
		3,
		gGL.FLOAT,
		false,
		0,
		0);

}