"use strict";

var gEngine = gEngine || { };

gEngine.GameLoop = (function()
                    {
                      var mPublic = { };
                      return mPublic;
                    } ());

var kFPS = 60;
var kMPF = 1000 / kFPS;

//timing gameloop
var mPreviousTime;
var mLagTime;
var mCurrentTime;
var mElaspedTime;

var mIsLoopRunning = false;

var mMyGame = null;

var _runLoop = function()
{
  if (mIsLoopRunning)
    {
      requestAnimationFrame(function() { _runLoop.call(mMyGame); } );
      mCurrentTime = Date.now();
      mElaspedTime = mCurrentTime - mPreviousTime;
      mPreviousTime = mCurrentTime;
      mLagTime += mElaspedTime;

      while ((mLagTime >= kMPF) && mIsLoopRunning)
      {
          this.update();
          mLagTime -= kMPF;
      }

      this.draw();
    }
}

var start = function(_Game)
{
  mGame = _Game;

  mPreviousTime = Date.now();
  mLagTime = 0.0;
  mIsLoopRunning = true;

  requestAnimationFrame(function(){_runLoop.call(mMyGame); });
};

var mPublic =
{
  start: start
};
return mPublic;
