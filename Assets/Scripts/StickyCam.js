#pragma strict

var target : Transform;
var followDistance : float = 20;
@System.NonSerialized
var relative : Vector3;

function Start () {
	relative = transform.position - target.position;
}

function FixedUpdate () {
	if(Vector3.Distance(transform.position, target.position) > followDistance){
		transform.position = Vector3.MoveTowards(transform.position, target.position + relative, Vector3.Distance(transform.position, target.position) - followDistance);
	}
}