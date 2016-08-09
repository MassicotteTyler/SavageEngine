"use strict";

var gEngine = gEngine || { };

gEgine.ResourceMap = (function()
{
  var MapEntry = function (rName)
  {
    this.mAsset = r.Name;
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
  };
  var mPublic = { };
  return mPublic;
}());
