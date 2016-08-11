"use strict";

var gEngine = gEngine || { };

gEngine.ResourceMap = (function()
{
  var MapEntry = function (rName)
  {
    this.mAsset = rName;
    this.mRefCount = 1;
  };

  var mResourceMap = {};

  var mNumOutstandingLoads = 0;
  var mLoadCompleteCallback;

  var _checkForAllLoadCompleted = function()
  {
    if ((mNumOutstandingLoads === 0) && (mLoadCompleteCallback !== null))
      {
        var funToCall = mLoadCompleteCallback;
        mLoadCompleteCallback = null;
        funToCall();
      }
  };

  var incAssetRefCount = function(rName)
  {
    mResourceMap[rName].mRefCount += 1;
  };

  var setLoadCompleteCallback = function (funct)
  {
    mLoadCompleteCallback = funct;
    _checkForAllLoadCompleted();
  };

  var asyncLoadRequested = function(rName)
  {
    mResourceMap[rName] = new MapEntry(rName);
    ++mNumOutstandingLoads;
  };

  var asyncLoadCompleted = function(rName, loadedAsset)
  {
    if (!isAssetLoaded(rName))
      alert("gEngine.asyncLoadCompleted: ["+ rName + "] not in map!")
    mResourceMap[rName].mAsset = loadedAsset;
    --mNumOutstandingLoads;
    _checkForAllLoadCompleted();
  };

  var isAssetLoaded = function(rName)
  {
    return (rName in mResourceMap);
  };

  var retrieveAsset = function(rName)
  {
    var r = null;
    if (rName in mResourceMap)
      r = mResourceMap[rName].mAsset;
    return r;
  };
  var unloadAsset = function(rName)
  {
    if (rName in mResourceMap)
      delete mResourceMap[rName];
  };

  var mPublic =
  {

    incAssetRefCount: incAssetRefCount,
    
    //async resource loading
    asyncLoadRequested: asyncLoadRequested,
    asyncLoadCompleted: asyncLoadCompleted,
    setLoadCompleteCallback: setLoadCompleteCallback,

    //resource storage
    retrieveAsset: retrieveAsset,
    unloadAsset: unloadAsset,
    isAssetLoaded: isAssetLoaded,
  };
  return mPublic;
}());
