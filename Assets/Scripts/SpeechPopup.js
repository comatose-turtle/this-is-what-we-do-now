#pragma strict

var displayText : UnityEngine.UI.Text;
var bPromptGroup : CanvasGroup;

private var popupTime : float = -1;
private var myCanvasGroup : CanvasGroup;
private var selectedGroup : CanvasGroup;

function Start () {
	myCanvasGroup = GetComponent.<CanvasGroup>();
	selectedGroup = myCanvasGroup;
}

function Update () {
	if(Input.GetButtonDown("Fire2") && selectedGroup == bPromptGroup) {
		selectedGroup = myCanvasGroup;
		popupTime = -1;
	}

	myCanvasGroup.alpha = 0;
	bPromptGroup.alpha = 0;
	
	if(popupTime > 0) {
		if(Time.time - popupTime < 0.5)
			selectedGroup.alpha = (Time.time - popupTime) * 2;
		else if(Time.time - popupTime < 3)
			selectedGroup.alpha = 1;
		else if(Time.time - popupTime >= 3)
			selectedGroup.alpha = Mathf.Clamp01(2 - (Time.time - (popupTime + 3))*2);
	}
}

function PopupText(str : String) {
	popupTime = Time.time;
	displayText.text = str;
	selectedGroup = myCanvasGroup;
}

function PromptB() {
	popupTime = Time.time;
	selectedGroup = bPromptGroup;
}