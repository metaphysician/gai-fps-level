var speed = 3.0;
var rotationSpeed = 5.0;
var shootRange = 15.0;
var attackRange = 30.0;
var shootAngle = 4.0;
var dontComeCloserRange = 5.0;
var delayShootTime = 0.35;
var pickNextWaypointDistance = 2.0;
var target : Transform;
var targetObject : GameObject;
static var tNumber : int=0;
var taunts : AudioClip[];
var pause : int;
var musicTarget : GameObject;
var deadReplacement : Transform;
var robotAudioSource : AudioSource;
var lastTime : float;
var currpitch : float=1.0;
var pitchpercent : int=0;
var playerWeapons : PlayerWeapons = GetComponent(PlayerWeapons);

private var lastShot = -10.0;

// Make sure there is always a character controller
@script RequireComponent (CharacterController)

function Start () {
	// Auto setup player as target through tags
	if (target == null && GameObject.FindWithTag("Player")){
		target = GameObject.FindWithTag("Player").transform;
		Debug.Log("I know you're here!!");
	}
	robotAudioSource = transform.GetComponent(AudioSource);
	musicTarget = GameObject.Find("audioTest");
	Patrol();
	
}


function Patrol () {
	var curWayPoint = AutoWayPoint.FindClosest(transform.position);

	while (true) {
		var waypointPosition = curWayPoint.transform.position;
		// Are we close to a waypoint? -> pick the next one!
		if (Vector3.Distance(waypointPosition, transform.position) < pickNextWaypointDistance)
			curWayPoint = PickNextWaypoint (curWayPoint);
			
			

		// Attack the player and wait until
		// - player is killed
		// - player is out of sight		
		if (CanSeeTarget ())
		yield StartCoroutine("AttackPlayer");
			
			
		// Move towards our target
		MoveTowards(waypointPosition);
		
		yield;
	}
}


function CanSeeTarget () : boolean {
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;
	var hit : RaycastHit;
	if (Physics.Linecast (transform.position, target.position, hit))
		return hit.transform == target;

	return false;
}

function Shoot () {
	// Start shoot animation
	GetComponent.<Animation>().CrossFade("testBot_rifle_shoot", 0.3);

	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime);
	
	//Fire gun
	gameObject.BroadcastMessage("Attack");
	

	
	
	yield WaitForSeconds(GetComponent.<Animation>()["testBot_rifle_shoot"].length - delayShootTime);
	
}

function AttackPlayer () {
	tauntingStart();
	//musicTarget.SendMessage("increaseTension");
	var lastVisiblePlayerPosition = target.position;
	while (true) {
		if (CanSeeTarget ()) {
			
			
			// Target is dead - stop hunting
			if (target == null)
				return;			

			// Target is too far away - give up	
			var distance = Vector3.Distance(transform.position, target.position);
			if (distance > shootRange * 3)
				return;
			
			lastVisiblePlayerPosition = target.position;
			if (distance > dontComeCloserRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);
				
			var forward = transform.TransformDirection(Vector3.forward);
			var targetDirection = lastVisiblePlayerPosition - transform.position;
			targetDirection.y = 0;

			var angle = Vector3.Angle(targetDirection, forward);

			// Start shooting if close and play is in sight
			if (distance < shootRange && angle < shootAngle)
				yield StartCoroutine("Shoot");
		} else {
			yield StartCoroutine("SearchPlayer", lastVisiblePlayerPosition);
			// Player not visible anymore - stop attacking
			if (!CanSeeTarget ())
				return;
		}

		yield;
	}
}

//grafted on function to link up FPS constructor and older FPS AI -kludgy
function Die() 
{
	// If Player is Using a Lethal weapon we call this branch
	if (playerWeapons.selectedWeapon > 0) {
		//call the Death animation and kill the script
		GetComponent.<Animation>().CrossFade("testBot_Killed 01"); 
		// Replace ourselves with the dead body
		if (deadReplacement) {
			var dead : Transform = Instantiate(deadReplacement, transform.position, transform.rotation);
		
			// Copy position & rotation from the old hierarchy into the dead replacement
			CopyTransformsRecurse(transform, dead);
			
			// Enter code for Rally Points here. Death should alert other guards to rally at this point after a brief delay
		}
		Destroy(gameObject);
		Debug.Log("Guard has been killed with lethal weapon");
	}
	// If player is using Tranq we call this branch
	else if (playerWeapons.selectedWeapon == 0) {
		// Call death animation
		GetComponent.<Animation>().CrossFade("testBot_Killed 01"); 
		// Yield for a time and play a standing animation. Then resume patrols
		Debug.Log("Guard has been stunned");
	}
}



function SearchPlayer (position : Vector3) {
	// Run towards the player but after 3 seconds timeout and go back to Patroling
	var timeout = 3.0;
	while (timeout > 0.0) {
		MoveTowards(position);

		// We found the player
		if (CanSeeTarget ())
			return;

		timeout -= Time.deltaTime;
		yield;
	}
}

function RotateTowards (position : Vector3) {
	SendMessage("SetSpeed", 0.0);
	
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);
	

	// Move the character
	direction = forward * speed * speedModifier;
	GetComponent (CharacterController).SimpleMove(direction);
	
	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function PickNextWaypoint (currentWaypoint : AutoWayPoint) {
	// We want to find the waypoint where the character has to turn the least

	// The direction in which we are walking
	var forward = transform.TransformDirection(Vector3.forward);


	// The closer two vectors, the larger the dot product will be.
	var best = currentWaypoint;
	var bestDot = -10.0;
	for (var cur : AutoWayPoint in currentWaypoint.connected) {
		var direction = Vector3.Normalize(cur.transform.position - transform.position);
		var dot = Vector3.Dot(direction, forward);
		if (dot > bestDot && cur != currentWaypoint) {
			bestDot = dot;
			best = cur;
		}
	}

	return best;
}


function tauntingStart(){
   print ('I AM ATTACKING!');
 var currTime : float = Time.time;
   if (CanSeeTarget() == true) {

   if (currTime > (lastTime + 5.0))
   {
     print (" CanSeeTarget is now" + (CanSeeTarget()));
     for (i=1 ; i<=25 ; i++) {	    
     robotAudioSource.clip = playTaunt();
     robotAudioSource.pitch= (soundpitch());
	 robotAudioSource.Play();
	 yield WaitForSeconds ((Random.Range( 2.0,5.0)));
	 }
     lastTime = currTime;
    	}
	}   
}



function playTaunt() : AudioClip
	{ return taunts [Random.Range(0,taunts.length)];
		}

function soundpitch() : float
{ 

var pitchfloat : float = pitchpercent * .01;
return (Random.Range((currpitch - pitchfloat ), (currpitch + pitchfloat)) ); 
}

static function CopyTransformsRecurse (src : Transform,  dst : Transform) {
	dst.position = src.position;
	dst.rotation = src.rotation;
	
	for (var child : Transform in dst) {
		// Match the transform with the same name
		var curSrc = src.Find(child.name);
		if (curSrc)
			CopyTransformsRecurse(curSrc, child);
	}
}	