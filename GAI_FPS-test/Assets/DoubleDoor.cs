using UnityEngine;
using System.Collections;

public class DoubleDoor : MonoBehaviour {
	private float baseZ;
	public float Size;
	public float Speed;
	public GameObject DoorN;
	public GameObject DoorP;

	void Start () {
		baseZ = DoorN.transform.localPosition.z;
	}
	
	void OnTriggerEnter(){
		StopAllCoroutines ();
		StartCoroutine (Open ());
	}
	
	void OnTriggerExit(){
		StopAllCoroutines ();
		StartCoroutine (Close ());
	}
	
	private IEnumerator Open(){
		while (DoorN.transform.localPosition.z > baseZ - Size) {
			DoorN.transform.Translate(new Vector3(0f,0f,-Speed*Time.deltaTime));
			DoorP.transform.Translate(new Vector3(0f,0f,Speed*Time.deltaTime));
			yield return null;
		}
	}
	
	private IEnumerator Close(){
		while (DoorN.transform.localPosition.z < baseZ) {
			DoorN.transform.Translate(new Vector3(0f,0f,Speed*Time.deltaTime));
			DoorP.transform.Translate(new Vector3(0f,0f,-Speed*Time.deltaTime));
			yield return null;
		}
	}
}
