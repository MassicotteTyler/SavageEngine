"use strict";

function SceneFileParser(sceneFilePath)
{
  this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElm = function(tagElm)
{
  var theElm = this.mSceneXml.getElementsByTagName(tagElm);
  if (theElm.length === 0)
    console.error("Warning: Level element:["+ tagElm + "]: is not found");
  return theElm;
};

SceneFileParser.prototype.parseCamera = function()
{
  var camElm = this._getElm("Camera");
  var cx = Number(camElm[0].getAttribute("CenterX"));
  var cy = Number(camElm[0].getAttribute("CenterY"));
  var w = camElm[0].getAttribute("Width");
  var viewport= camElm[0].getAttribute("Viewport").split(" ");
  var bgColor = camElm[0].getAttribute("BgColor").split(" ");

  for (var i = 0; i<4; i++)
  {
    bgColor[i] = Number(bgColor[i]);
    viewport[i] = Number(viewport[i]);
  }

  var cam = new Camera(
  vec2.fromValues(cx, cy),
  w,
  viewport
  );

  cam.setBackgroundColor(bgColor);
  return cam;
};

SceneFileParser.prototype.parseSquares = function(sqSet)
{
  var elm = this._getElm("Square");
  var i, j, x, y, w, h, r, c, sq;
  for (i = 0; i < elm.length; i++)
  {
    x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
    y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
    w = Number(elm.item(i).attributes.getNamedItem("Width").value);
    h = Number(elm.item(i).attributes.getNamedItem("Height").value);
    r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
    c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
    sq = new Renderable(gEngine.DefaultResources.getConstColorShader());

    for (j = 0; j < 3; j++)
      c[j] = Number(c[j]);
    sq.setColor(c);
    sq.getXform().setPosition(x, y);
    sq.getXform().setRotationInDegree(r);
    sq.getXform().setSize(w, h);

    sqSet.push(sq);
  }
	SceneFileParser.prototype.parseTextureSquares = function (sqSet) {
			var elm = this._getElm("TextureSquare");
			var i, j, x, y, w, h, r, c, t, sq, i;
			for (i = 0; i < elm.length; i++) {
					x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
					y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
					w = Number(elm.item(i).attributes.getNamedItem("Width").value);
					h = Number(elm.item(i).attributes.getNamedItem("Height").value);
					r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
					c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
					t = elm.item(i).attributes.getNamedItem("Texture").value;
					sq = new TextureRenderable(t);
					// make sure color array contains numbers
					for (j = 0; j < 4; j++)
							c[j] = Number(c[j]);
					sq.setColor(c);
					sq.getXform().setPosition(x, y);
					sq.getXform().setRotationInDegree(r); // In Degree
					sq.getXform().setSize(w, h);
					sqSet.push(sq);
			}
	};
};
