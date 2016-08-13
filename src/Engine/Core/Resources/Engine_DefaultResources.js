"use strict";

gEngine.DefaultResources = (function()
{
  var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
  var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
  var kTexturesVS = "src/GLSLShaders/TexturesVS.glsl";
  var kTexturesFS = "src/GLSLShaders/TexturesFS.glsl";


  var mConstColorShader = null;
  var mTextureShader = null;

  var _getConstColorShader = function() { return mConstColorShader; };
  var getTextureShader = function() { return mTextureShader; };

  var _createShaders = function(callBackFunction)
  {
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTexturesVS, kTexturesFS);
    callBackFunction();
  };



  var _initialize = function(callBackFunction)
  {
    gEngine.TextFileLoader.loadTextFile(kSimpleVS,
                                         gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(kSimpleFS,
                                        gEngine.TextFileLoader.eTextFileType.eTextFile);


    //Texture shader
    gEngine.TextFileLoader.loadTextFile(kTexturesVS,
        gEngine.TextFileLoader.eTextFileType.eTextFile);

    gEngine.TextFileLoader.loadTextFile(kTextureFS,
        gEngine.TextFileLoader.eTextFileType.eTextFile);

    gEngine.ResourceMap.setLoadCompleteCallback(
      function() { _createShaders(callBackFunction);});

  };

  var mPublic =
  {
    initialize: _initialize,
    getConstColorShader: _getConstColorShader,
    getTextureShader: getTextureShader
  };
  return mPublic;
}());

