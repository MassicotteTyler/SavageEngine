"use strict";

function SpriteRenderable(nTexture)
{
  TextureRenderable.call(this, nTexture);
  SpriteRenderable.prototype._setShader.call(this,
                  gEngine.DefaultResources.getSpriteShader());


  this.mTextLeft = 0.0;
  this.mTextRight = 1.0;
  this.mTexTop = 1.0;
  this.mTextBottom = 0.0;
}

gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

SpriteRenderable.eTexCoordArray = Object.freeze(
  {
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
  });

  SpriteRenderable.prototype.setElementUVCoordinate = function(left, right,
                                                              bottom, top)
  {
    this.mTextLeft = left;
    this.mTextRight = right;
    this.mTextBottom = bottom;
    this.mTexTop = top;
  };

  SpriteRenderable.prototype.setElementPixelPositions = function(left, right,
                                                                bottom, top)
  {
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);

    var imageW = textInfo.mWidth;
    var imageH = textInfo.Height;

    this.mTextLeft = left / imageW;
    this.mTextRight = right / imageW;
    this.mTextBottom = bottom / imageH;
    this.mTextTop = top / imageH;
  };

  SpriteRenderable.prototype.getElementUVCoordinateArray = function()
  {
    return
    [
      this.mTexRight, this.mTexTop,
      this.mTexLeft, this.mTexTop,
      this.mTexRight, this.mTexbottom,
      this.mTexLeft, this.mTexBottom
    ];
  };

  SpriteRenderable.prototype.draw = function(pixelColor, vpMatrix)
  {
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, pixelColor, vpMatrix);
  };
