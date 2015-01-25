#pragma strict

var Attack : boolean;
var AttackObject : Transform;

private var _navAgent : NavMeshAgent;

function Start () {
	_navAgent= GetComponent( NavMeshAgent );
	if ( ! _navAgent ) Debug.LogError("MonsterAgent requires a NavMeshAgent component");
}

function Update () {
	if ( Attack && _navAgent.enabled ) {
		_navAgent.destination= AttackObject.position;
	}
}