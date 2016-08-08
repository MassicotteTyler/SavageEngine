function Transform()
{
  this.mPosition = vec2.fromValues(0, 0);
  this,mScale = vec2.fromValues(1, 1);
  this.mRotationInRad = 0.0;
};

Transform.prototype.setPosition = function(xPos, yPos)
{
  this.setXPos(xPos);
  this.setYPos(yPos);
};

Transform.prototype.getPosition = function() { return this.mPosition; };

Transform.prototype.setSize = function(width, height)
{
  this.setWidth(width);
  this.setHeight(height);
};

Transform.prototype.setRotationInRad = function(rotationInRadians)
{
  this.mRotationInRad = rotationInRadians;
  while (this.mRotationInRad > (2*Math.PI))
    this.mRotationInRad -= (2*Math.PI);
};

Transform.prototype.setRotationInDegree = function(rotationInDegree)
{
  this.setRotationInRad(setRotationInDegree * Math.PI/180.0);
}

Transform.prototype.getXform = function()
{
  var matrix = mat4.create();

  mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
  mat4.rotateZ(matrix, matrix, this.getRotationInRad());
  mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
  return matrix;
};
