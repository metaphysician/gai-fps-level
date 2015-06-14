using UnityEngine;
using System.Collections;

public class ApplicationManager : MonoBehaviour {
	public GameObject SceneElements;
	public GameObject GUICamera;
	public GameObject MainGUIcanvas;

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
		SceneElements.SetActive(false);
		GUICamera.SetActive(false);
		MainGUIcanvas.SetActive(false);
	}
}
