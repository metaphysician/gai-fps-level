var minimumRunSpeed = 1.0;
private var robotAnimAudioSource : AudioSource;
var steps : AudioClip;
var currpitch : float=1.0;
var pitchpercent : int;




function Awake()
{
robotAnimAudioSource = transform.Find("Body").GetComponent(AudioSource);
}



function Start () {
	// Set all animations to loop
	GetComponent.<Animation>()["testBot_Killed 010"].wrapMode = WrapMode.PingPong;
	GetComponent.<Animation>()["testBot_Killed 01"].wrapMode = WrapMode.Once;
	GetComponent.<Animation>()["testBot_walkforward"].wrapMode = WrapMode.Loop;
	GetComponent.<Animation>()["testBot_runinplace"].wrapMode = WrapMode.PingPong;
	GetComponent.<Animation>().cullingType = AnimationCullingType.AlwaysAnimate;
	

	// Except our action animations, Dont loop those
	GetComponent.<Animation>()["testBot_rifle_shoot"].wrapMode = WrapMode.Once;
	
	// Put idle and run in a lower layer. They will only animate if our action animations are not playing
	GetComponent.<Animation>()["testBot_Killed 010"].layer = -1;
	GetComponent.<Animation>()["testBot_walkforward"].layer = -1;
	GetComponent.<Animation>()["testBot_runinplace"].layer = -1;
	
	GetComponent.<Animation>().Stop();
}

function SetSpeed (speed : float) {
	if (speed > minimumRunSpeed)
		GetComponent.<Animation>().CrossFade("testBot_runinplace");
	else
		GetComponent.<Animation>().CrossFade("testBot_Killed 010");
}


function footsounds (){
//Debug.Log("Playing My Sound!");
robotAnimAudioSource.pitch = soundpitch();
robotAnimAudioSource.PlayOneShot(steps);
}

function soundpitch() : float
{ 
var pitchfloat : float = pitchpercent * .01;
return (Random.Range((currpitch - pitchfloat ), (currpitch + pitchfloat)) ); 
}