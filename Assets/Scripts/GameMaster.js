#pragma strict

public class GameMaster extends MonoBehaviour {
	static var instance : GameMaster;
	
	function Awake () {
		instance = this;
	}
}