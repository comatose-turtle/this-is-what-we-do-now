#pragma strict
public var animate : boolean = false;
public var rotSpeed : float = 200;
public var scaleAmt : float = 4;
public var scaleSpeed : float = 100;

private var _scaleTm : float = 0;

function OnTriggerEnter(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		animate= true;
		if(GameMaster.instance != null)
			GameMaster.instance.SendMessage("CollisionDecision", [other.gameObject, gameObject]);
	}
}

function OnTriggerExit(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		animate= false;
		
		if(GameMaster.instance != null)
			GameMaster.instance.SendMessage("UncollisionDecision", [other.gameObject, gameObject]);
	}
}

function Update () {
	if ( animate ) {
		//rotate the object
		var rot= gameObject.transform.rotation.eulerAngles;
		rot.y += rotSpeed * Time.deltaTime;
		gameObject.transform.rotation.eulerAngles= rot;
		
		//Scale the size
		if ( _scaleTm == 0 ) _scaleTm= Time.time;
		var sc= Mathf.Sin( (Time.time - _scaleTm ) * scaleSpeed );
		gameObject.transform.localScale.x= sc;
		gameObject.transform.localScale.z= sc;
	}
	else if ( _scaleTm != 0 ) {
		//reset
		_scaleTm= 0;
		gameObject.transform.localScale.x= 1;
		gameObject.transform.localScale.z= 1;
	}
}
