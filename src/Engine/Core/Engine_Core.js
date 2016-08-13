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
    mGL = canvas.getContext("webgl", {alpha: false}) ||
        canvas.getContext("experimental-webgl", {alpha: false});

    mGl.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
    mGL.enable(mGL.BLEND);

    //Set images to flip the y axis to match the texture coordinate space
    mGl.pixelStorei(mGl.UNPACK_FLIP_Y_WEBGL, true);

    
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

  var inheritPrototype = function(subClass, superClass)
  {
    var prototype = Object.create(superClass.prototype);
    prototype.constructor = subClass;
    subClass.prototype = prototype;
  };

  var clearCanvas = function(color)
  {
    mGL.clearColor(color[0], color[1], color[2], color[3]);
    mGL.clear(mGL.COLOR_BUFFER_BIT);
  };

  var startScene = function(_Game)
  {
    _Game.loadScene.call(_Game);
    gEngine.GameLoop.start(_Game);
  };

	var mPublic =
	{
		getGL: getGL,
		initializeEngineCore: initializeEngineCore,
    inheritPrototype: inheritPrototype,
		clearCanvas: clearCanvas,
    startScene: startScene
	};

	return mPublic;
}());
