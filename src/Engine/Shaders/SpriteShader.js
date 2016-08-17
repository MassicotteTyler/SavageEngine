"use strict";

function SpriteShader(vertexShaderPath, fragmentShaderPath)
{
  TextureShader.call(this, vertexShaderPath, fragmentShaderPath);

  this.mTexCoordBuffer = null;
  var initTexCoord =
  [
    1.0, 1.0,
    0.0, 0.0,
    1.0, 0.0,
    0.0, 0.0
  ];

  var gl = gEngine.Core.getGL();
  this.mTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord),
               gl.DYNAMIC_DRAW);
}

gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

SpriteShader.prototype.setTextureCoordinate = function(texCoord)
{
  var gl = gEngine.Core.getGL();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};

SpriteShader.prototype.activateShader = function(pixelColor, vpMatrix)
{
  SpriteShader.prototype.activateShader(this, pixelColor, vpMatrix);

  var gl = gEngine.Core.getGL();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
  gl.vertexAttribPointer(this.mShaderTextureCoordAttribute, 2, gl.FLOAT,
                        false, 0, 0);
  gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
};
