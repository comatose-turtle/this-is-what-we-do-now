#pragma strict

private var progress : int;
private var switches : boolean[] = [false, false];
private var messageBuffer : float;
private var foundB : boolean = false;

function Start () {

}

function Update () {
	if(!foundB) {
		if(Input.GetButtonDown("Fire2"))
			foundB = true;
		else if(Time.timeSinceLevelLoad > 5) {
			PromptForB();
		}
	}
	if(switches[0] && switches[1]) {
		WinGame();
	}
}

function GetLine(characterNum : int) {
	if(characterNum == 1) {
		switch(progress) {
			default:
				break;
		}
	}
	else if(characterNum == 2) {
		switch(progress) {
			default:
				break;
		}
	}
}

function CollisionDecision(objs : GameObject[]) {
	if(objs[0].name == "Player") {
		if(objs[1].tag == "Switch")
			switches[0] = true;
	}
	if(objs[0].name == "Player2") {
		if(objs[1].tag == "Switch")
			switches[1] = true;
	}
	
	if(objs[0].tag == "Player" && objs[1].tag == "Death") {
		LoseGame();
	}
}

function UncollisionDecision(objs : GameObject[]) {
	if(objs[0].name == "Player") {
		if(objs[1].tag == "Switch")
			switches[0] = false;
	}
	if(objs[0].name == "Player2") {
		if(objs[1].tag == "Switch")
			switches[1] = false;
	}
}

private function PromptForB() {
	if(Time.time < messageBuffer + 3)
		return;
	
	var players = GameObject.FindGameObjectsWithTag("Player");
	for(var player : GameObject in players) {
		player.GetComponent.<WhatTheCharacterDoes>().PromptTheB();
	}
	
	messageBuffer = Time.time;
}

private function WinGame() {
	if(Time.time < messageBuffer + 3)
		return;
	
	var players = GameObject.FindGameObjectsWithTag("Player");
	for(var player : GameObject in players) {
		player.GetComponent.<WhatTheCharacterDoes>().MakeMeSay("I win!!!");
	}
	
	messageBuffer = Time.time;
}

private function LoseGame() {
	if(Time.time < messageBuffer + 3)
		return;
	
	var players = GameObject.FindGameObjectsWithTag("Player");
	for(var player : GameObject in players) {
		player.GetComponent.<WhatTheCharacterDoes>().MakeMeSay("Argh!! I lose!!!");
	}
	
	messageBuffer = Time.time;
}