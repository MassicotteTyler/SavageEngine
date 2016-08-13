attribute vec3 aSquareVertexPosition;
attribute vec2 aTextureCoordinate;

varying vec2 vTextCoord;

uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void)
{
	gl_position = uViewProjTransform * uModelTransform *
		vec4(aSquareVertexPosition, 1.0);

	vTexCoord = aTextureCoordinate;
}