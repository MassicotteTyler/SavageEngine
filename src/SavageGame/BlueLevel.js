"use strict";

function BlueLevel()
{
	this.kSceneFile = "assets/BlueLevel.xml";
	this.mSqSet = [];
	this.mCamera = null;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function()
{
	gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
		gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

BlueLevel.prototype.initialize = function()
{
    var sceneParser = new SceneFileParser(this.kSceneFile);

    this.mCamera = sceneParser.parseCamera();

    sceneParser.parseSquares(this.mSqSet);
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
        xform.incXPosBy(deltaX);
        if (xform.getXPos() > 30)
        { 
            xform.setPosition(12, 60);
     	}
     }

	if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left))
	{
		xform.incXPosBy(-deltaX);
		if (xform.getXPos() < 11)
		{
			gEngine.GameLoop.stop();
		}
	}
};

BlueLevel.prototype.unloadScene = function()
{
	gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

	var nextLevel = new SavageGame();
	gEngine.Core.startScene(nextLevel);
};