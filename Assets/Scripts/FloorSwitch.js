#pragma strict

function OnTriggerEnter(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		if(GameMaster.instance != null)
			GameMaster.instance.SendMessage("CollisionDecision", [other.gameObject, gameObject]);
	}
}

function OnTriggerExit(other : Collider){
	if(other.gameObject.CompareTag("Player")){
		if(GameMaster.instance != null)
			GameMaster.instance.SendMessage("UncollisionDecision", [other.gameObject, gameObject]);
	}
}