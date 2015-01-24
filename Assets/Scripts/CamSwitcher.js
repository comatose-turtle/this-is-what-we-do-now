#pragma strict

var camera1 : Camera;
var char1 : WhatTheCharacterDoes;
var camera2 : Camera;
var char2 : WhatTheCharacterDoes;

private var audio1 : AudioListener;
private var audio2 : AudioListener;

function Start () {
	audio1 = camera1.GetComponent.<AudioListener>();
	audio2 = camera2.GetComponent.<AudioListener>();

	ToggleCam2(false);
	ToggleCam1(true);
}

function Update () {
	if(Input.GetButtonDown("Fire2")) {
		if(camera1.enabled) {
			ToggleCam1(false);
			ToggleCam2(true);
		}
		else {
			ToggleCam2(false);
			ToggleCam1(true);
		}
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