#pragma strict

var matches : GameObject;
var matchFlame : GameObject;
var campfire : GameObject;
var suspiciousWall : GameObject;
var wall : GameObject;
var statue : GameObject;
var lever : GameObject;

static var progress : int = 0;
private var switches : boolean[] = [false, false];
private var messageBuffer : float;
private var foundB : boolean = false;
private static var player1Name : String = "";
private static var player2Name : String = "";
private var Names = ["John", "Jerry", "David", "Ben", "Melissa", "Katie", "Sam", "Peter", "Jen", "Maria", "Abe"];
private var HelpNames = ["MARLON BRANDO", "DON KNOTTS", "MACGUYVER", "ZSA ZSA GABOR", "JFK", "GEORGE BUSH", "SAMUS", "FLYING SPAGHETTI MONSTER", "JENNIFER LOPEZ", "DENZEL WASHINGTON", "BRUCE WILLIS", "TINA FEY"];
private var leverPos : Vector3;
private var invisStatue : GameObject;

function Start () {
	if(player1Name == "")
		player1Name = Names[Random.Range(0,Names.length)];
	if(player2Name == "")
		do {
			player2Name = Names[Random.Range(0,Names.length)];
		} while(player1Name == player2Name);
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
//print(characterNum);
	if(characterNum == 1) {
		switch(progress) {
			case 0:
				return "...";
				break;
			case 1:
				progress++;
				return player2Name + "? Is that you?";
				break;
			case 4:
				progress++;
				return "What? Did what work?";
				break;
			case 5:
				progress++;
				return "I'm kind of freaking out over here.";
				break;
			case 6:
				progress++;
				return "What do we do now?";
				break;
			case 8:
				progress++;
				SpawnMatches();
				return "No, it's all just white.";
				break;
			case 9:
			case 10:
				progress=11;
				return "Wait... Was that always there?";
				break;
			case 12:
				return "Are these matches?";
				break;
			case 13:
				progress++;
				return "Uh, so I lit a match?";
				break;
			case 15:
				return "Wait, you have a campfire?";
				break;
			case 16:
				progress++;
				return "Uh... Did these just appear?";
				break;
			case 17:
			case 18:
				return "What's that in the corner?";
				break;
			case 19:
				progress++;
				return "Hey, listen, can we get out of here?";
				break;
			case 22:
				progress++;
				return "OH GOD IT'S MOVING";
				break;
			case 23:
				progress++;
				return "HELP ME GOD";
				break;
			case 24:
				progress++;
				return "HELP ME JESUS";
				break;
			case 25:
				progress++;
				return "HELP ME BUDDHA";
				break;
			case 26:
				return "HELP ME " + HelpNames[Random.Range(0,HelpNames.length)];
				break;
			case 27:
				progress++;
				return "Oh. Yes.";
				break;
			case 30:
				return "WHAT IS HAPPENING";
				break;
			default:
				return player2Name + "?";
				break;
		}
	}
	else if(characterNum == 2) {
		switch(progress) {
			case 0:
				progress++;
				return player1Name + "?";
				break;
			case 2:
				progress++;
				return player1Name + "? Where are we?";
				break;
			case 3:
				progress++;
				return "Did it work?";
				break;
			case 5:
			case 6:
			case 7:
				progress = 8;
				return "Uh, never mind. Do you see anything?";
				break;
			case 9:
				progress++;
				return "Keep looking.";
				break;
			case 10:
				return "Anything yet?";
				break;
			case 11:
			case 12:
				return "Did you find something?";
				break;
			case 14:
				progress++;
				return "Well, a campfire just lit up here.";
				break;
			case 15:
				return "There seems to be something next to it.";
				break;
			case 16:
				return "I found a wall.";
				break;
			case 17:
				progress++;
				return "What did you find?";
				break;
			case 19:
			case 20:
				progress++;
				return "Did you say 'a stone carving'?";
				break;
			case 23:
			case 24:
			case 25:
			case 26:
				progress=27;
				RevealLever();
				return "It moved? Is there anything behind it?";
				break;
			case 28:
				progress++;
				return "Well, go on then.";
				break;
			case 30:
				return player1Name + " Where are we now?";
				break;
			default:
				return player1Name + "?";
				break;
		}
	}
	else
		return "Line, please?";
}

function CollisionDecision(objs : GameObject[]) {
	var playerScript : WhatTheCharacterDoes = objs[0].GetComponent.<WhatTheCharacterDoes>();
	if(objs[0].name == "Player") {
		if(objs[1].tag == "Switch")
			switches[0] = true;
		
		else if(objs[1].tag == "Matches") {
			playerScript.HoldThis(objs[1]);
			progress=12;
		}
		
		else if(objs[1].tag == "Statue" && progress < 19) {
			progress=19;
			RevealStatue();
			objs[0].GetComponent.<WhatTheCharacterDoes>().MakeMeSay("What is this stone carving?");
		}
		
		else if(objs[1].tag == "Lever") {
			progress=30;
			Application.LoadLevel("Maze01");
		}
	}
	if(objs[0].name == "Player2") {
		if(objs[1].tag == "Switch")
			switches[1] = true;
		
		else if(objs[1].tag == "SuspiciousWall" && progress>14 && progress<16) {
			progress=16;
			SpawnMoreWalls();
			SpawnStatues();
			objs[0].GetComponent.<WhatTheCharacterDoes>().MakeMeSay("Hmm...");
		}
		
		else if(objs[1].tag == "Statue" && progress>=19 && progress<=21) {
			progress=22;
			objs[1].GetComponent.<Statue>().MoveMeAwayFrom(objs[0].transform);
		}
		
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

function UseItem(objs : GameObject[]) {
	if(objs[0].name == "Player" && objs[1].tag == "Matches") {
		Instantiate(matchFlame, objs[1].transform.position, Quaternion.identity);
		Destroy(objs[1]);
		SpawnCampfire();
		//objs[1].GetComponentInChildren.<ParticleSystem>().enable = true;
		progress=13;
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

private function PromptForX(player : GameObject) {
	if(Time.time < messageBuffer + 3)
		return;
	
	player.GetComponent.<WhatTheCharacterDoes>().PromptTheB();
	
	messageBuffer = Time.time;
}

function LinePlease(player : GameObject) {
	var playnum : int = 0;
	if(player.name == "Player")
		playnum = 1;
	else if(player.name == "Player2")
		playnum = 2;
	
	var line = GetLine(playnum);
	player.GetComponent.<WhatTheCharacterDoes>().MakeMeSay(line);
}

private function MakePlayersSayAThing(str : String) {
	if(Time.time < messageBuffer + 3)
		return;
	
	var players = GameObject.FindGameObjectsWithTag("Player");
	for(var player : GameObject in players) {
		player.GetComponent.<WhatTheCharacterDoes>().MakeMeSay(str);
	}
	
	messageBuffer = Time.time;
}

private function SpawnMatches() {
	var playpos = GameObject.Find("Player").transform;
	Instantiate(matches, playpos.position + Vector3(Random.Range(-5, 6), 0, Random.Range(-5, 6)), Quaternion.LookRotation(Vector3(0, -1, 0)));
}

private function SpawnCampfire() {
	var playpos = GameObject.Find("Player2").transform;
	var fire = Instantiate(campfire, playpos.position + Vector3(Random.Range(-5, 6), 0, Random.Range(-5, 6)), Quaternion.LookRotation(Vector3(0, -1, 0)));
	Instantiate(suspiciousWall, fire.transform.position + Vector3(Random.Range(-3, 4), 0, Random.Range(-3, 4)), Quaternion.identity);
}

private function SpawnMoreWalls() {
	var playpos = GameObject.Find("Player").transform;
	for(var i=0; i<3; i++)
		Instantiate(wall, playpos.position + Vector3(Random.Range(-5, 6), 0, Random.Range(-5, 6)), Quaternion.identity);
}

private function SpawnStatues() {
	var theRot = Quaternion.identity;
	theRot.SetEulerAngles(60, 0, 0);
	var playpos = GameObject.Find("Player").transform;
	var statty = Instantiate(statue, playpos.position + Vector3(Random.Range(-5, 6), 0, Random.Range(-5, 6)), theRot);
	leverPos = statty.transform.position;
	playpos = GameObject.Find("Player2").transform;
	invisStatue = Instantiate(statue, playpos.position + Vector3(Random.Range(-5, 6), 0, Random.Range(-5, 6)), theRot);
	invisStatue.active = false;
}

private function RevealStatue() {
	invisStatue.active = true;
}

private function RevealLever() {
print("GO");
	Instantiate(lever, leverPos, Quaternion.LookRotation(Vector3(0, -1, 0)));
}

private function WinGame() {
	Application.LoadLevel("WinScene");
}

private function LoseGame() {
	Application.LoadLevel("LoseScene");
}