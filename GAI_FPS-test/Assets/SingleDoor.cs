using UnityEngine;
using System.Collections;

public class SingleDoor : MonoBehaviour {
	private float baseZ;
	public float Size;
	public float Speed;
	public GameObject Door;
	public AudioClip OpenSound;
	public AudioClip CloseSound;
	public AudioSource doorSource;
	public bool isAmbienceChanger=false;
	public string areaTag;

	void Start () {
		baseZ = Door.transform.localPosition.z;
	}
	
	void OnTriggerEnter(){
		StopAllCoroutines ();
		StartCoroutine (Open ());
		doorSource.clip = OpenSound;
		doorSource.Play();
	}
	
	void OnTriggerExit(Collider other){
		StopAllCoroutines ();
		StartCoroutine (Close ());
		doorSource.clip = CloseSound;
		doorSource.Play();
		
		// if Player is closing the doors and Ambience should change, send message
		// this might be too late and needs OnTriggerEnter?
//		if (isAmbienceChanger && other.gameObject.CompareTag ("Player"))
			//Broadcast("ChangeAmbience",areaTag);
	}
	
	private IEnumerator Open(){
		while (Door.transform.localPosition.z > baseZ - Size) {
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
