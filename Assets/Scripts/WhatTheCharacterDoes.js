#pragma strict

var speed : float = 400;
var speech : SpeechPopup;
var control : CharacterController;
var holdNode : Transform;

private var animator : Animator;
private var isActivatingItem : boolean = false;
private var holdingThis : GameObject;

function Start () {
	if(!control)
		control = GetComponent.<CharacterController>();
	animator = GetComponent.<Animator>();
}

function Update () {
	isActivatingItem = false;
	
	var move : Vector3 = Vector3(Input.GetAxis("Horizontal") * speed * Time.deltaTime, 0, Input.GetAxis("Vertical") * speed * Time.deltaTime);
	control.Move(move);
	AdjustSprite(move);
	if(Input.GetButtonDown("Fire1"))
		GameMaster.instance.SendMessage("LinePlease", gameObject);
	if(Input.GetButtonDown("Fire3") && holdingThis != null)
		GameMaster.instance.SendMessage("UseItem", [gameObject, holdingThis]);
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

function HoldThis(thing : GameObject) {
	holdingThis = thing;
	thing.transform.SetParent(holdNode);
	thing.transform.localPosition = Vector3.zero;
	thing.collider.enabled = false;
}