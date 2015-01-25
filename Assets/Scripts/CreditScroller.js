#pragma strict

var _heightStart : float = 1;
var _heightEnd : float = 10;
var _scrollTime : float = 40;
var _startDelay : float = 10;

private var _startTm : float;

function Start () {
	_startTm= Time.time;
}

function Update () {
	var tmDelta= Time.time - _startTm - _startDelay;
	var ht= Mathf.Lerp( _heightStart, _heightEnd, tmDelta/_scrollTime );
	camera.transform.position.z= ht;
}