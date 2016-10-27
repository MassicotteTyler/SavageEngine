"use strict";

function SavageGame()
{
  this.mHero = null;
  this.mPortal = null;
  this.mCollector = null;
	this.mRightMinion = null;
  this.mLeftMinion = null;

  this.kSceneFile = "assets/scene.xml";
  this.kFontImage = "assets/Consolas-72.png";
  this.kMinionSprite = "assets/minion_sprite.png";

  this.mSqSet = new Array();
  this.mCamera = null;


  this.kBgClip = "assets/sounds/BGClip.mp3";
  this.kCue = "assets/sounds/MyGame_cue.wav";
};


gEngine.Core.inheritPrototype(SavageGame, Scene);

SavageGame.prototype.initialize = function()
{
  var sceneParser = new SceneFileParser(this.kSceneFile);
  this.mCamera = new Camera(
    vec2.fromValues(20, 60),
    20,
    [20, 40, 600, 300]
  );

  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  //Create game objects
  this.mPortal = new SpriteRenderable(this.kMinionSprite);
  this.mPortal.setColor([1, 0, 0, 0.2]);
  this.mPortal.getXform().setPosition(25, 60);
  this.mPortal.getXform().setSize(3, 3);
  this.mPortal.setElementPixelPositions(130, 310, 0, 180);

  this.mCollector = new SpriteRenderable(this.kMinionSprite);
  this.mCollector.setColor([0, 0, 0, 0]);
  this.mPortal.getXform().setPosition(15, 60);
  this.mPortal.getXform().setSize(3, 3);
  this.mPortal.setElementPixelPositions(315, 495, 0, 180);

  this.mFontImage = new SpriteRenderable(this.kFontImage);
  this.mFontImage.setColor([1, 1, 1, 0]);
  this.mFontImage.getXform().setPosition(13, 62);
  this.mFontImage.getXform().setSize(4, 4);

	this.mRightMinion= new SpriteAnimateRenderable(this.kMinionSprite);
	this.mRightMinion.setColor([1, 1, 1, 0]);
	this.mRightMinion.getXform().setPosition(26, 56.5);
	this.mRightMinion.getXform().setSize(4, 3.2);
	this.mRightMinion.setSpriteSequence(512, 0,     // first element pixel position: top-left 512 is top of image, 0 is left of image
																	204, 164,       // widthxheight in pixels
																	5,              // number of elements in this sequence
																	0);             // horizontal padding in between
	this.mRightMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
	this.mRightMinion.setAnimationSpeed(50);

  this.mHero = new SpriteRenderable(this.kMinionSprite);
  this.mHero.setColor([1, 1, 1, 0]);
  this.mHero.getXform().setPosition(20, 60);
  this.mHero.getXform().setSize(2, 3);
  this.mHero.setElementPixelPositions(0, 120, 0, 180);

	this.mLeftMinion = new SpriteAnimateRenderable(this.kMinionSprite);
	this.mLeftMinion.setColor([1, 1, 1, 0]);
	this.mLeftMinion.getXform().setPosition(15, 56.5);
	this.mLeftMinion.getXform().setSize(4, 3.2);
	this.mLeftMinion.setSpriteSequence(348, 0,      // first element pixel position: top-right 164 from 512 is top of image, 0 is right of image
																	204, 164,       // widthxheight in pixels
																	5,              // number of elements in this sequence
																	0);             // horizontal padding in between
	this.mLeftMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
	this.mLeftMinion.setAnimationSpeed(50);

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

  var c = this.mSqSet[2].getColor();
  var ca = c[3] + deltaX;
  if (ca > 1)
  {
    ca = 0;
  }
  c[3] = ca;

  var deltaT = 0.001;

  var texCoord = this.mFontImage.getElementUVCoordinateArray();
  var b = texCoord[SpriteRenderable.eTexCoordArray.eBottom] + deltaT;
  var r = texCoord[SpriteRenderable.eTexCoordArray.eRight] - deltaT;

  if (b > 1.0)
  {
      b = 0;
  }
  if (r < 0)
  {
      r = 1.0;
  }

  this.mFontImage.setElementUVCoordinate(
    texCoord[SpriteRenderable.eTexCoordArray.eLeft],
    r,
    b,
    texCoord[SpriteRenderable.eTexCoordArray.eTop]
  );

  this.mRightMinion.updateAnimation();
  this.mLeftMinion.updateAnimation();

};

SavageGame.prototype.draw = function()
{
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

  this.mCamera.setupViewProjection();
  var matrix = this.mCamera.getVPMatrix();

  this.mPortal.draw(matrix);
  this.mCollector.draw(matrix);
  this.mHero.draw(matrix);
  this.mLeftMinion.draw(matrix);
  this.mRightMinion(matrix);
  this.mFontImage.draw(matrix);
};

SavageGame.prototype.loadScene = function()
{
  gEngine.Textures.loadTexture(this.kFontImage);
  gEngine.Textures.loadTexture(this.kMinionSprite);
};

SavageGame.prototype.unloadScene = function()
{
  gEngine.Textures.unloadTexture(this.kFontImage);
  gEngine.Textures.unloadTexture(this.kMinionSprite);

};


