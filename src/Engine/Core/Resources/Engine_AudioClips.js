"use strict";

var gEngine = gEngine || { };

gEngine.AudioClips = (function()
{
	var mAudioContext = null;
	var mBgAudioNode = null;

	var InitAudioContext = function()
	{
		try
		{
			var AudioContext = window.AudioContext || audio.webkitAudioContext;
			mAudioContext = new AudioContext();
		}
		catch(e)
		{
			alert("Web Audio is not supported");
		}
	};

	var loadAudio = function(clipName)
	{
		if (!(gEngine.ResourceMap.isAssetLoaded(clipName)))
		{
			gEngine.ResourceMap.asyncLoadRequested(clipName);

			var req = new XMLHttpRequest();
			req.onreadystatechange = function()
			{
				if ((req.readyState === 4) && (req.status !== 200))
				{
					alert(clipName + ": loading failed
						Make sure to load files from a web server");
				}
			};

			req.open('GET', clipName, true);
			req.responseTyper = 'arraybuffer';

			req.onload = function()
			{
				mAudioContext.decodeAudioData(req.response,
					function(buffer)
					{
						gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
					}
				);
			};
			req.send();
		} else
		{
			gEngine.ResourceMap.incAssetRefCount(clipName);
		}
	};

	var unloadAudio = function(clipName)
	{
		gEngine.ResourceMap.unloadAudio(clipName);
	};

	var playACue = function(clipName)
	{
		var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
		if (clipInfo !== null)
		{
			var sourceNode = mAudioContext.createBufferSource();
			sourceNode.buffer = clipInfo;
			sourceNode.connect(mAudioContext.destination);
			sourceNode.start(0);
		}
	};

	var playBackgroundAudio = function(clipName)
	{
		var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);
		if (clipInfo !== null)
		{
			stopBackGroundAudio();
			mBgAudioNode = mAudioContext.createBufferSource();
			mBgAudioNode.buffer = clipInfo;
			mBgAudioNode.connect(mAudioContext.destination);
			mBgAudioNode.loop = true;
			mBgAudioNode.start(0);
		}
	};

	var stopBackGroundAudio = function()
	{
		if(mBgAudioNode !== null)
		{
			mBgAudioNode.stop(0);
			mBgAudioNode = null;
		}
	};

	var isBackgroundAudioPlayer = function()
	{
		return (mBgAudioNode !== null);
	};

	var mPublic =
	{
		InitAudioContext: InitAudioContext,
		loadAudio: loadAudio,
		unloadAudio: unloadAudio,
		playACue: playACue,
		playBackgroundAudio: playBackgroundAudio,
		stopBackGroundAudio: stopBackGroundAudio,
		isBackgroundAudioPlayer: isBackgroundAudioPlayer
	};
	return mPublic;
}());