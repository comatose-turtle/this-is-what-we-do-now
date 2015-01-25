#pragma strict

var camera1 : Camera;
var char1 : WhatTheCharacterDoes;
var camera2 : Camera;
var char2 : WhatTheCharacterDoes;
var scrollSpeed : int = 4;
var swapStyle : int = 1;

private var audio1 : AudioListener;
private var audio2 : AudioListener;
private var camSwapStarted : float = -1;
private var swapTo1 : boolean = false;

function Start () {
	audio1 = camera1.GetComponent.<AudioListener>();
	audio2 = camera2.GetComponent.<AudioListener>();

	ToggleCam2(false);
	ToggleCam1(true);
}

function Update () {
	if(Input.GetButtonDown("Fire2") && camSwapStarted == -1) {
		swapTo1 = camera2.enabled;
		CamSwapInit();
	}
	
	if(camSwapStarted > 0) {
		CamSwap( Mathf.Min((Time.time - camSwapStarted)*scrollSpeed, 1) );
	}
}

private function ToggleCam1(yesno : boolean) {
	camera1.enabled = yesno;
	audio1.enabled = yesno;
	char1.enabled = yesno;
}

private function ToggleCam2(yesno : boolean) {
	camera2.enabled = yesno;
	audio2.enabled = yesno;
	char2.enabled = yesno;
}

private function CamSwap( ratio : float ) {
	if ( swapStyle == 1 ) {
		var swapRect= Rect( 0.5f - ratio/2, 0.5f - ratio/2, ratio, ratio);
		if ( swapTo1 ) camera1.rect= swapRect;
		else camera2.rect= swapRect;
	} else {
		camera1.rect.x = (swapTo1 ? ratio-1 : -ratio);
		camera2.rect.x = (swapTo1 ? ratio : 1-ratio);
	}
	
	if(ratio == 1) {
		CamSwapFinish();
	}
}

private function CamSwapInit() {
	audio1.enabled = audio2.enabled = false;
	char1.enabled = char2.enabled = true;
	camera1.enabled = camera2.enabled = true;
	camSwapStarted = Time.time;
}

private function CamSwapFinish() {
	audio1.enabled = swapTo1;
	audio2.enabled = !swapTo1;
	char1.enabled = swapTo1;
	char2.enabled = !swapTo1;
	camera1.enabled = swapTo1;
	camera2.enabled = !swapTo1;
	camSwapStarted = -1;
}