#pragma strict
var pushAmt: float = 1;
	

function OnControllerColliderHit ( hit : ControllerColliderHit ) {
	if ( hit.gameObject.CompareTag("Push")) {
		//Debug.Log("Collision "+ hit.gameObject.name);
		transform.position += pushAmt * -hit.moveDirection;
	}
}
