"use strict";

gEngine.DefaultResources = (function()
{
  var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
  var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
  var kTextureVS = "src/GLSLShaders/TextureVS.glsl";
  var kTextureFS = "src/GLSLShaders/TextureFS.glsl";


  var mConstColorShader = null;
  var mTextureShader = null;
  var mSpriteShader = null;

  var _getConstColorShader = function() { return mConstColorShader; };
  var getTextureShader = function() { return mTextureShader; };
  var getSpriteShader = function() { return mSpriteShader; };

  var _createShaders = function(callBackFunction)
  {
    gEngine.ResourceMap.setLoadCompleteCallback(null);
    mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
    mTextureShader = new TextureShader(kTextureVS, kTextureFS);
    mSpriteShader = new SpriteShader(kTextureVS, kTextureFS);
    callBackFunction();
  };



  var _initialize = function(callBackFunction)
  {
    gEngine.TextFileLoader.loadTextFile(kSimpleVS,
                                         gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.TextFileLoader.loadTextFile(kSimpleFS,
                                        gEngine.TextFileLoader.eTextFileType.eTextFile);


    //Texture shader
    gEngine.TextFileLoader.loadTextFile(kTextureVS,
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
    getTextureShader: getTextureShader,
    getSpriteShader: getSpriteShader
  };
  return mPublic;
}());

