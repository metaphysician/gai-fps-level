using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ApplicationManager : MonoBehaviour {
	public GameObject GUImaster;
	public GameObject ScreenLock;
	bool NewBtn1x=false;
	public Button ContBtn;

	void Start()
	{
	//set up Continue Button as disabled
		ContBtn.interactable=false;	
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
		if (NewBtn1x==false){
			Application.LoadLevelAdditive("Graybox-testAI-legacy");
			StartCoroutine("delayedUI_sceneLoad");
			ContBtn.interactable=true;
			NewBtn1x=true;
		}else{
			//probably some sort of popup dialog asking if you're sure you want a New Game
			//ContBtnEnable=false - until New game starts (probably on confirm of New Game)
		}	
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
