#pragma strict


function Update () {
	if ( Input.GetButtonDown("Jump")  ) Application.LoadLevel("Maze01");
	else if ( Input.anyKey ) Application.LoadLevel("StartScene");
}