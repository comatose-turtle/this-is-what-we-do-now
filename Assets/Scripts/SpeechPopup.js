#pragma strict

var displayText : UnityEngine.UI.Text;

private var myText : String;
private var popupTime : float = -1;
private var myCanvasGroup : CanvasGroup;

function Start () {
	myCanvasGroup = transform.parent.GetComponent.<CanvasGroup>();
}

function Update () {
	if(popupTime > 0) {
		if(Time.time - popupTime < 0.5)
			myCanvasGroup.alpha = (Time.time - popupTime) * 2;
		else if(Time.time - popupTime < 3)
			myCanvasGroup.alpha = 1;
		else if(Time.time - popupTime >= 3)
			myCanvasGroup.alpha = Mathf.Clamp01(2 - (Time.time - (popupTime + 3))*2);
	}
	else
		myCanvasGroup.alpha = 0;
}

function PopupText(str : String) {
	popupTime = Time.time;
	//myText = str;
	displayText.text = str;
}