#pragma strict

var Attack : boolean;
var AttackObject : Transform;
var animator : Animator;
var switcher : CamSwitcher;
var world : int = 1;

private var _navAgent : NavMeshAgent;

function Start () {
	_navAgent= GetComponent( NavMeshAgent );
	if ( ! _navAgent ) Debug.LogError("MonsterAgent requires a NavMeshAgent component");
	switcher = FindObjectOfType(CamSwitcher);
}

function Update () {
	if ( Attack && _navAgent.enabled ) {
		_navAgent.destination= AttackObject.position;
	}
	UpdateSprite();
	if(world == 1){
		if(!switcher.camera1.enabled)
			_navAgent.speed = 3;
		else
			_navAgent.speed = 5;
	}
	else if(world == 2){
		if(!switcher.camera2.enabled)
			_navAgent.speed = 3;
		else
			_navAgent.speed = 5;
	}
}

function OnTriggerEnter(other : Collider) {
	if(other.tag == "Player")
		GameMaster.instance.SendMessage("CollisionDecision", [other.gameObject, gameObject]);
}

private function UpdateSprite() {
	var angle : float = Vector3.Angle(_navAgent.velocity.normalized, Vector3.forward);
	if(Vector3.Cross(_navAgent.velocity.normalized, Vector3.forward).y > 0)
		angle = 360 - angle;
	animator.SetInteger("dir", Mathf.Round(angle / 90) % 4);
	animator.transform.position = transform.position;
}