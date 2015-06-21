using UnityEngine;
using System.Collections;

public class QuadDoor : MonoBehaviour {
	private float baseZ;
	public bool Unlocked;
	public float Size;
	public float HSpeed;
	public float VSpeed;
	public GameObject DoorN;
	public GameObject DoorP;
	public GameObject DoorU;
	public GameObject DoorD;
	
	void Start () {
		baseZ = DoorN.transform.localPosition.z;
	}
	
	void OnTriggerEnter(){
		if (Unlocked) {
			StopAllCoroutines ();
			StartCoroutine (Open ());
		}
	}
	
	void OnTriggerExit(){
		StopAllCoroutines ();
		StartCoroutine (Close ());
	}
	
	private IEnumerator Open(){
		while (DoorN.transform.localPosition.z > baseZ - Size) {
			DoorN.transform.Translate(new Vector3(0f,0f,-HSpeed*Time.deltaTime));
			DoorP.transform.Translate(new Vector3(0f,0f,HSpeed*Time.deltaTime));
			DoorU.transform.Translate(new Vector3(0f,VSpeed*Time.deltaTime,0f));
			DoorD.transform.Translate(new Vector3(0f,-VSpeed*Time.deltaTime,0f));
			yield return null;
		}
	}
	
	private IEnumerator Close(){
		while (DoorN.transform.localPosition.z < baseZ) {
			DoorN.transform.Translate(new Vector3(0f,0f,HSpeed*Time.deltaTime));
			DoorP.transform.Translate(new Vector3(0f,0f,-HSpeed*Time.deltaTime));
			DoorU.transform.Translate(new Vector3(0f,-VSpeed*Time.deltaTime,0f));
			DoorD.transform.Translate(new Vector3(0f,VSpeed*Time.deltaTime,0f));
			yield return null;
		}
	}
}
