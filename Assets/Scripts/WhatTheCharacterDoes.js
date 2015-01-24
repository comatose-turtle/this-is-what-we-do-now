#pragma strict

var control : CharacterController;
var speed : float = 30;
var speech : SpeechPopup;

function Awake () {
	if(control == null)
		control = gameObject.GetComponent(CharacterController);
}

function Update () {
	var curSpeed : float;
	curSpeed = speed;
	var move : Vector3 = Vector3(Input.GetAxis("Horizontal") * curSpeed * Time.deltaTime, Input.GetAxis("Vertical") * curSpeed * Time.deltaTime, 0);
	control.Move(move);
	if(Input.GetButton("Fire1"))
		speech.PopupText("A man, a plan, a canal, Panama.");
}