"use strict";

function SpriteAnimateRenderable(nTexture)
{
  SpriteRenderable.call(this, nTexture);
  Renderable.prototype._setShader.call(this,
    gEngine.DefaultResources.getSpriteShader());
  
}
