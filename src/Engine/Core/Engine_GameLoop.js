"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.GameLoop = (function () {
    var kFPS = 60;          // Frames per second
    var kMPF = 1000 / kFPS; // Milliseconds per frame.

    // Variables for timing gameloop.
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    var mMyGame = null;

    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            requestAnimationFrame(function () { _runLoop.call(mMyGame); });

            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                this.update();      // call MyGame.update()
                mLagTime -= kMPF;
            }

            this.draw();    // Call MyGame.draw()
        }
    };

    var start = function (myGame) {
        mMyGame = myGame;

        mPreviousTime = Date.now();
        mLagTime = 0.0;

        mIsLoopRunning = true;

        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };


    var mPublic = {
        start: start
    };
    return mPublic;

}());
