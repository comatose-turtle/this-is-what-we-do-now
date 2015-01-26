#pragma strict
public var animate : boolean = false;
public var rotSpeed : float = 1;

function Update () {
	if ( animate ) {
		var rot= gameObject.transform.rotation.eulerAngles;
		rot.y += rotSpeed * Time.deltaTime;
		gameObject.transform.rotation.eulerAngles= rot;
	}

}