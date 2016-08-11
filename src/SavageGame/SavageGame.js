"use strict";

function SavageGame()
{
  this.kSceneFile = "assets/scene.xml";
  this.mSqSet = new Array();
  this.mCamera = null;

  this.kBgClip = "assets/sounds/BGClip.mp3";
  this.kCue = "assets/sounds/MyGame_cue.wav";
};


gEngine.Core.inheritPrototype(SavageGame, Scene);

SavageGame.prototype.initialize = function()
{
  var sceneParser = new SceneFileParser(this.kSceneFile);
  this.mCamera = sceneParser.parseCamera();
  sceneParser.parseSquares(this.mSqSet);
  gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

SavageGame.prototype.update = function()
{
  var deltaX = 0.05;
  var xform = this.mSqSet[0].getXform();

  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
  {
    gEngine.AudioClips.playACue(this.kCue);
    if (xform.getXPos() > 30)
      xform.setPosition(10, 60);
    xform.incXPosBy(deltaX);
  }

  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
    xform.incRotationByDegree(1);

  xform = this.mSqSet[1].getXform();

  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down))
  {
    if (xform.getWidth() > 5)
      xform.setSize(2, 2);
    xform.incSizeBy(0.05);
  }

  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
  {
    gEngine.AudioClips.playACue(this.kCue);
    xform.incXPosBy(-deltaX);
    if (xform.getXPos() < 11)
    {
      gEngine.GameLoop.stop();
    }
  }

};

SavageGame.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  this.mCamera.setupViewProjection();

  for (var i = 0; i < this.mSqSet.length; i++)
  {
    this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }
};

SavageGame.prototype.loadScene = function()
{
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
                               gEngine.TextFileLoader.eTextFileType.eXMLFile);

  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
};

SavageGame.prototype.unloadScene = function()
{
  //stop the background audio before unloading it
  gEngine.AudioClips.stopBackgroundAudio();

  gEngine.AudioClips.unloadAudio(this.kCue);
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
  var nextLevel = new BlueLevel();
  gEngine.Core.startScene(nextLevel);



};


