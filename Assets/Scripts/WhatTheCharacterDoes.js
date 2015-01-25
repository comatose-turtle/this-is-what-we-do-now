#pragma strict

var speed : float = 400;
var speech : SpeechPopup;
var control : CharacterController;

private var animator : Animator;

function Start () {
	if(!control)
		control = GetComponent.<CharacterController>();
	animator = GetComponent.<Animator>();
}

function Update () {
	var move : Vector3 = Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime);
	control.Move(move);
	AdjustSprite(move);
	if(Input.GetButton("Fire1"))
		speech.PopupText("A man, a plan, a canal, Panama.");
}

function MakeMeSay(str : String) {
	speech.PopupText(str);
}

function PromptTheB() {
	speech.PromptB();
}

private function AdjustSprite(moveVec : Vector3) {
	var angle : float;
	var angel : float;
	
	if(moveVec == Vector3.zero)
		angel = -1;
	else {
		angle = Vector3.Angle(moveVec, Vector3.forward);
		if(Vector3.Cross(moveVec, Vector3.forward).y > 0)
			angle = 360 - angle;
		angel = Mathf.Round(angle / 90) % 4;
		if(angel == 2)
			angel = 0;
	}
	
	animator.SetInteger("dir", angel);
}
