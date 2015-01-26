#pragma strict

var targetPos : Vector3;

function Start () {
	targetPos = transform.position;
}

function Update () {
	if(transform.position != targetPos) {
		if((transform.position - targetPos).magnitude < 0.01)
			transform.position = targetPos;
		else
			transform.position = (transform.position*9 + targetPos)/10;
	}
}

function MoveMeAwayFrom(plyr : Transform) {
	var movedir = Vector3.Scale((transform.position - plyr.position).normalized, Vector3(1,0,1));
	for(var stat : GameObject in GameObject.FindGameObjectsWithTag("Statue")) {
		stat.GetComponent.<Statue>().targetPos = stat.transform.position + movedir;
	}
}