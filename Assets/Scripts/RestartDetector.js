#pragma strict

function Start () {

}

function Update () {
	DetectRestart();
}

private function DetectRestart() {
	if(Input.GetButtonDown("Restart"))
		Application.LoadLevel(0);
}