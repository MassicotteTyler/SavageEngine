"use strict";
var gEngine = gEngine || { };

gEngine.Core = (function()
{
	var mGL = null;
	var getGL = function() { return mGL; };
    // initialize the WebGL, the vertex buffer and compile the shaders
  var initializeWebGL = function (htmlCanvasID)
  {
      var canvas = document.getElementById(htmlCanvasID);
      // Get the standard or experimental webgl and binds to the Canvas area
      // store the results to the instance variable mGL
      mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (mGL === null) {
        document.write("<br><b>WebGL is not supported!</b>");
        return;
    }
  };

  var initializeEngineCore = function(htmlCanvasID, _Game)
  {
    initializeWebGL(htmlCanvasID);
    gEngine.VertexBuffer.initialize();
    gEngine.Input.initialize();

    gEngine.DefaultResources.initialize(function () { startScene(_Game); });
  };

  var clearCanvas = function(color)
  {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT);
  };

  var startScene = function(_Game)
  {
    _Game.initialize.call(_Game);
    gEngine.GameLoop.start(_Game);
  };

	var mPublic =
	{
		getGL: getGL,
		initializeEngineCore: initializeEngineCore,
		clearCanvas: clearCanvas
	};

	return mPublic;
}());
