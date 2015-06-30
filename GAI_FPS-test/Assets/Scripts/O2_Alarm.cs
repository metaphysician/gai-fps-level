using UnityEngine;
using System.Collections;

public class O2_Alarm : MonoBehaviour {

	public bool FlashStart=false;
	bool FlashStartFlag=false;
	public MeshRenderer OxyAlarm;
	public float waitTime=1.0f;
	float reset = 0f;

	void Start(){
		reset = waitTime;
		Debug.Log(reset);
	}


	public void OxygenAlarm(bool state)
	{
		FlashStart=state;
	}

	void Update () { 
 
     waitTime -= Time.deltaTime;

		if (FlashStart)
		{
	 
		     if(waitTime < 0){
		         if (OxyAlarm.enabled == false){
		             OxyAlarm.enabled = true; 
		         } else if (OxyAlarm.enabled == true){
		             Debug.Log("I'm flashing you."); 
		             OxyAlarm.enabled = false; 
		         } 
		         waitTime = reset;
		     }
	
		} else if (FlashStart==false) 
			OxyAlarm.enabled = false;
	}
	
}
