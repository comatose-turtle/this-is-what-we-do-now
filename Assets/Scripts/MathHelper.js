#pragma strict

static function GetSign(num : float){
	if(num > 0)
		return 1;
	else if(num < 0)
		return -1;
	else
		return 0;
}