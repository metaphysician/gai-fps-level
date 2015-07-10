using UnityEngine;
using System.Collections;
using UnityEngine.Audio;

public class Footsteps : MonoBehaviour {

	//FPS Footstep script - 3 surfaces (float values for parameter)
	
	private Transform playerTransform;
	public LayerMask hitLayer;
	private string colliderTag;
	public float footStepLength = 0.6f;
	public GameObject footstepHandler;
	public AudioSource footstepSource;
	public AudioClip jumpingsound;
	public AudioClip rubberLand;
	public AudioClip corridorLand;
	public AudioClip catwalkLand;
	public AudioClip[] rubberSteps;
	public AudioClip[] corridorSteps;
	public AudioClip[] catwalkSteps;
	CharacterController controller;
	private bool landing = false;
		
	void Awake(){

	StartCoroutine ("PlayStepSounds");
	playerTransform = gameObject.transform;
	controller = GetComponent<CharacterController>();
	}

	void Update () {
		if (Input.GetButtonDown ("Jump")) {
		Debug.Log("We jumped!");
		//send jump sound while jumping
		landing = true;
		}

		else if (!controller.isGrounded){
			//if we're in the air we turn on landing since we'll eventually land.
			landing = true;
		}
		
		else if (controller.isGrounded && landing==true) {
			//send landing event with tag
			footstepHandler.SendMessage("Landing",colliderTag);
			//immediately switch landing to false to prevent retriggering
			landing=false;
		}

	}
	
	IEnumerator PlayStepSounds () {
		
		while (true) {
			float vel = controller.velocity.magnitude;
			if (controller.isGrounded && vel > 5.5f) {
				landing = false;
				Debug.Log ("We Are Moving");
				yield return new WaitForSeconds(footStepLength);
				GetFootEvent ();
			} 

		}
	}
	
	void GetFootEvent() 
	{
		RaycastHit hit;
		if(Physics.Raycast(playerTransform.position + new Vector3(0.0f, 0.5f, 0.0f), -Vector3.up, out hit, Mathf.Infinity, hitLayer))
			{
				colliderTag = hit.collider.tag.ToLower();
				footstepHandler.SendMessage("FootstepHandler",colliderTag);
			}		
	}

	public void Landing(string landTag){
		Debug.Log("landing on:"+(landTag));
		switch (landTag){
			case "rubberfloor":
				footstepSource.PlayOneShot(rubberLand);
			break;
			case "corridor":
				footstepSource.PlayOneShot(corridorLand);
			break;
			case "catwalk":
				footstepSource.PlayOneShot(catwalkLand);
			break;
		}
	}

	public void FootstepHandler(string stepTag){
		Debug.Log ("Walking On" + (stepTag));
		switch (stepTag) {
			case "rubberfloor":
				footstepSource.clip = rubberSteps[Random.Range(0, rubberSteps.Length)];
			break;
			case "corridor":
				footstepSource.clip = corridorSteps[Random.Range(0, corridorSteps.Length)];
			break;
			case "catwalk":
				footstepSource.clip = catwalkSteps[Random.Range(0, catwalkSteps.Length)];
			break;
		}
		footstepSource.Play();	
	}		
}
