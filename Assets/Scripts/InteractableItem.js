#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerStay(other : Collider) {
	if(other.tag == "Player" && Input.GetButtonDown("Fire3")) {
		GameMaster.instance.SendMessage("CollisionDecision", [other.gameObject, gameObject]);
	}
}