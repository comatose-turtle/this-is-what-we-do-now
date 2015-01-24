#pragma strict

var camera1 : Camera;
var char1 : WhatTheCharacterDoes;
var camera2 : Camera;
var char2 : WhatTheCharacterDoes;

function Start () {

}

function Update () {
	if(Input.GetButtonDown("Fire2")) {
		if(camera1.enabled) {
			camera1.enabled = false;
			char1.enabled = false;
			camera2.enabled = true;
			char2.enabled = true;
		}
		else {
			camera1.enabled = true;
			char1.enabled = true;
			camera2.enabled = false;
			char2.enabled = false;
		}
	}
}