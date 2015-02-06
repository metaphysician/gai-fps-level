using UnityEngine;
using System.Collections;

public class importFPS_Constructor : MonoBehaviour {

	public string FPSlevel;

	// Use this for initialization
	void Start () {
		Application.LoadLevelAdditive(FPSlevel);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
