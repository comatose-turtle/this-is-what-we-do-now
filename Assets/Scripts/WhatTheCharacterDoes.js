#pragma strict

var speed : float = 400;
var speech : SpeechPopup;
var control : CharacterController;

function Start () {
	if(!control)
		control = GetComponent.<CharacterController>();
}

function Update () {
	var move : Vector3 = Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime);
	control.Move(move);
	if(Input.GetButton("Fire1"))
		speech.PopupText("A man, a plan, a canal, Panama.");
}