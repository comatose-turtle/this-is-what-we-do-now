#pragma strict

var Attack : boolean;
var AttackObject : Transform;
var animator : Animator;

private var _navAgent : NavMeshAgent;

function Start () {
	_navAgent= GetComponent( NavMeshAgent );
	if ( ! _navAgent ) Debug.LogError("MonsterAgent requires a NavMeshAgent component");
}

function Update () {
	if ( Attack && _navAgent.enabled ) {
		_navAgent.destination= AttackObject.position;
	}
	UpdateSprite();
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