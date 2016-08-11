"use strict";

function BlueLevel()
{
	this.kSceneFile = "assets/BlueLevel.xml";
	this.kBgClip = "assets/sounds/BGClip.mp3";
	this.kCue = "assets/sounds/BlueLevel_cue.wav";
	this.mSqSet = [];
	this.mCamera = null;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function()
{
	//Load Scene file
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
		gEngine.TextFileLoader.eTextFileType.eXMLFile);
	//Load audio
	gEngine.AudioClips.loadAudio(this.kBgClip);
	gEngine.AudioClips.loadAudio(this.kCue);
};

BlueLevel.prototype.initialize = function()
{
    var sceneParser = new SceneFileParser(this.kSceneFile);

    this.mCamera = sceneParser.parseCamera();

    sceneParser.parseSquares(this.mSqSet);
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};

BlueLevel.prototype.draw = function()
{
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.mCamera.setupViewProjection();

    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

BlueLevel.prototype.update = function()
{
	var xform = this.mSqSet[1].getXform();
    var deltaX = 0.05;

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right))
    {
    	gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30)
        { 
            xform.setPosition(12, 60);
     	}
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

BlueLevel.prototype.unloadScene = function()
{
	gEngine.AudioClips.stopBackgroundAudio();

	gEngine.AudioClips.unloadAudio(this.kBgClip);
	gEngine.AudioClips.unloadAudio(this.kCue);
	gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

	var nextLevel = new SavageGame();
	gEngine.Core.startScene(nextLevel);
};