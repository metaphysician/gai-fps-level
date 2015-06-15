static var canLock : boolean = true;
static var mobile;
static var unPaused : boolean = false;
private var GUImaster : GameObject;
private var WeaponCamera : GameObject;
private var MenuManager : GameObject;
public var MainMenuAnimCtrl : Animator;
public var AIpauseObject : GameObject;


function Awake () {
	#if UNITY_IPHONE
	mobile = true;
	#elif UNITY_ANDROID
	mobile = true;
	#else
	mobile = false;
	#endif
}
function Start(){
		GUImaster = GameObject.Find("GUI_Master");
		WeaponCamera = GameObject.Find("Player/Weapon Camera");
		MenuAnimator = GameObject.Find("GUI_Master/Canvas/MenuManager");

	if(!mobile){
		SetPause(true);
		canLock = true;
		PlayerWeapons.playerActive = false;
	} else {
		SetPause(false);
		canLock=false;
		PlayerWeapons.playerActive = true;
	
	}

}

function OnApplicationQuit(){
	Time.timeScale = 1;
}

static function SetPause(pause : boolean){
	var player = GameObject.FindWithTag("Player");
	if(mobile){
		return;
	}
	
	InputDB.ResetInputAxes();

	if (pause)
	{
		PlayerWeapons.playerActive = false;
		//Screen.lockCursor = false;
		//Time.timeScale = 0.01;
		player.BroadcastMessage("Freeze", SendMessageOptions.DontRequireReceiver);

	}
	else
	{
		unPaused = true;
		Time.timeScale = 1;
		Screen.lockCursor = true;
		PlayerWeapons.playerActive = true;
		player.BroadcastMessage("UnFreeze", SendMessageOptions.DontRequireReceiver);
	}
}

static function HardUnlock() {
	canLock = false;
	Screen.lockCursor = false;
}

static function HardLock() {
	canLock = false;
	Screen.lockCursor = true;
}

private var wasLocked = false;

function Update(){
	if(!canLock)
		return;
		
	if (Input.GetMouseButton(0) && Screen.lockCursor == false){
		SetPause(false);
	}
		
	if (InputDB.GetButton("Escape") && (PlayerWeapons.playerActive)){
		ActivateGUI();
		SetPause(true);
	}

//	if (InputDB.GetButton("Escape")){
//		SetPause(true);
//	}

    // Did we lose cursor locking?
    // eg. because the user pressed escape
    // or because he switched to another application
    // or because some script set Screen.lockCursor = false;
    if(!Screen.lockCursor && wasLocked){
        wasLocked = false;
        SetPause(true);
    }
    // Did we gain cursor locking?
    else if(Screen.lockCursor && !wasLocked){
        wasLocked = true;
        SetPause(false);
    }
}

function LateUpdate (){
	unPaused = false;
}

//Adding in function to activate GUI - we'll see..

function ActivateGUI()
{
	Screen.lockCursor=false;
	AIpauseObject.SetActive(false);
	GUImaster.SetActive(true);
	WeaponCamera.SetActive(false);
	MainMenuAnimCtrl.SetBool("Open",true);
}

function ContinueBtn()
{
	Screen.lockCursor=true;
	AIpauseObject.SetActive(true);
	AIpauseObject.SendMessage("Patrol");
	GUImaster.SetActive(false);
	WeaponCamera.SetActive(true);
	MainMenuAnimCtrl.SetBool("Open",false);
	SetPause(false);
}

