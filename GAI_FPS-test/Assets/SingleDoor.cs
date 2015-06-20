using UnityEngine;
using System.Collections;

public class SingleDoor : MonoBehaviour {
	private float baseZ;
	public float Size;
	public float Speed;
	public GameObject Door;

	void Start () {
		baseZ = Door.transform.localPosition.z;
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
		while (Door.transform.localPosition.z > -Size) {
			Door.transform.Translate(new Vector3(0f,0f,-Speed*Time.deltaTime));
			yield return null;
		}
	}
	
	private IEnumerator Close(){
		while (Door.transform.localPosition.z < baseZ) {
			Door.transform.Translate(new Vector3(0f,0f,Speed*Time.deltaTime));
			yield return null;
		}
	}
}
