"use strict";

gEngine.DefaultResources = (function()
{
  var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
  var kSimpleFS = "src/GLSLSahders/SimpleFS.glsl";

  var mConstColorShader = null;
  var _getConstColorShader = function() { return mConstColorShader; };

  var _createShaders = function(callBackFunction)
  {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    callBackFunction();
  };

  var _initialize = function(callBackFunction)
  {
    gEngine.TextFilerLoader.loadTextFile(kSimpleVS,
                                         gEngine.TextFilerLoader.eTextFileType.eTextFile);
    gEngine.TextFilerLoader.loadTextFile(kSimpleFS,
                                        gEngine.TextFilerLoader.eTextFileType.eTextFile);

    gEngine.ResourceMap.setLoadCompleteCallback(
      function() { _createShaders(callBackFunction);});

  };

  var mPublic =
  {
    initialize: _initialize,
    getConstColorShader: _getConstColorShader
  };
  return mPublic;
}());

