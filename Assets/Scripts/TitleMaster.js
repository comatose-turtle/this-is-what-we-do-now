#pragma strict


function Update () {
	if ( Input.GetKeyDown("l")  ) {
		ScriptScript.progress = 30;
		Application.LoadLevel("Maze01");
	}
	else if ( Input.anyKey )
		Application.LoadLevel("StartScene");
}