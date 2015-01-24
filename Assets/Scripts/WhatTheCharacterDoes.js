#pragma strict

var speed : float = 400;
var speech : SpeechPopup;

function FixedUpdate () {
	var move : Vector3 = Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime);
	rigidbody.velocity = move;
	if(Input.GetButton("Fire1"))
		speech.PopupText("A man, a plan, a canal, Panama.");
}