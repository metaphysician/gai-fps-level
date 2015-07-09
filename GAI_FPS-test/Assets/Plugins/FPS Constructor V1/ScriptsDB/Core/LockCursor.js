static var canLock : boolean = true;
static var mobile;
static var unPaused : boolean = false;
private var GUImaster : GameObject;
private var WeaponCamera : GameObject;
private var MenuManager : GameObject;
private var ScrollTextControl : GameObject;
public var MainMenuAnim : Animator;
public var BackgroundImage : GameObject;
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
		MenuManager = GameObject.Find("GUI_Master/Canvas/MainMenu");
		ScrollTextControl = GameObject.Find("GUI_Master/Canvas/ScrollTextControl");
		BackgroundImage = GameObject.Find("GUI_Master/SF Scene Elements/Background");
		MainMenuAnim = MenuManager.GetComponent.<Animator>();
		

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

	if (InputDB.GetButton("Menu") )
	{ 
		ActivateGUI();
		SetPause(true);
	}


	if (InputDB.GetButton("Escape")){
		SetPause(true);
		Screen.lockCursor=false;
	}

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
	GUImaster.SetActive(true);
	BackgroundImage.GetComponent.<SpriteRenderer>().color = Color.white;
	WeaponCamera.SetActive(false);
	MainMenuAnim.SetBool("Open",true);


	if(AIpauseObject == null){
		Debug.Log("Nothing To See Here!");		
	} else { 
		AIpauseObject.SetActive(false);
		}
}

function ContinueBtn()
{
	Screen.lockCursor=true;
	GUImaster.SetActive(false);
	WeaponCamera.SetActive(true);
	MainMenuAnim.SetBool("Open",false);
	SetPause(false);
	//temp code to check if robot is in level - need revision
	if(AIpauseObject == null){
		Debug.Log("Nothing To See Here!");	
	} else { 
		AIpauseObject.SetActive(true);
		AIpauseObject.SendMessage("Patrol");

	}
}

