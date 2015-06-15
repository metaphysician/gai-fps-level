using UnityEngine;
using System.Collections;

public class ApplicationManager : MonoBehaviour {
	public GameObject GUImaster;
	public GameObject ScreenLock;

	void Start()
	{
		
	}

	public void Quit () 
	{
		#if UNITY_EDITOR
		UnityEditor.EditorApplication.isPlaying = false;
		#else
		Application.Quit();
		#endif
	}


	public void NewGame ()
	{
		Application.LoadLevelAdditive("Graybox-testAI-legacy");
		StartCoroutine("delayedUI_sceneLoad");
	}

	public void Continue()
	{
		ScreenLock=GameObject.Find("Manager/StoreController");
		Debug.Log("Continue Btn Pressed!");
		ScreenLock.SendMessage("ContinueBtn");
		
	}

	IEnumerator delayedUI_sceneLoad()
	{
		yield return new WaitForSeconds(1);
			GUImaster.SetActive(false);
	}
}
