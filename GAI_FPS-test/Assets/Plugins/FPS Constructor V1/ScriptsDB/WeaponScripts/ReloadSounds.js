/*
 FPS Constructor - Weapons
 Copyright© Dastardly Banana Productions 2011-2012
 This script, and all others contained within the Dastardly Banana Weapons Package are licensed under the terms of the
 Unity Asset Store End User License Agreement at http://download.unity3d.com/assetstore/customer-eula.pdf 
 
  For additional information contact us info@dastardlybanana.com.
*/

var sound1 : AudioClip;
var sound2 : AudioClip;
var sound3 : AudioClip;
var sound4 : AudioClip;
var sound5 : AudioClip;
var sound6 : AudioClip;
var reloadSource : AudioSource;

function play1(){
	reloadSource.clip = sound1;
	reloadSource.Play();
}

function play2(){
	reloadSource.clip = sound2;
	reloadSource.Play();
}

function play3(){
	reloadSource.clip = sound3;
	reloadSource.Play();
}

function play4(){
	reloadSource.clip = sound4;
	reloadSource.Play();
}

function play5(){
	reloadSource.clip = sound5;
	reloadSource.Play();
}

function play6(){
	reloadSource.clip = sound6;
	reloadSource.Play();
}