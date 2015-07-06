using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ApplicationManager : MonoBehaviour {
	public GameObject GUImaster;
	public GameObject ScreenLock;
	bool NewBtn1x=false;
	public Button ContBtn;
	public Animator Scrolltext;
	public Animator MainMenu;
	public GameObject ScrollText;
	public string[] TextBoxTexts;
	public GameObject background;
	public GameObject oxygenAlarm;
	public GameObject headBang;
	public GameObject headBangObject;
	public Color white;
	public Color faded;
	public float fadeTime;
	public GameObject floatingStars;
	float t=0.0f;
	int count=0;
	public bool startfade = false;
	public bool headbangStop = false;


	void Start()
	{
	//set up Continue Button as disabled
		ContBtn.interactable=false;
		Scrolltext.SetBool("Open",false);
	// set up Animation on headBanger character
			
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
			MainMenu.SetBool("Open", false);
			Scrolltext.SetBool("Open",true);
			NewBtn1x=true;
		}else{
			//probably some sort of popup dialog asking if you're sure you want a New Game
			//ContBtnEnable=false - until New game starts (probably on confirm of New Game)
		}	
	}

	public void NextScene(){
	
		count++;
		switch (count){
			case 1:
			//start transition of background fading out to expose ship's head environment w/ bobbing head
			startfade=true;
			//muffled background audio of assault with FPS humming and tinny music playing
			//change text box
				ScrollText.GetComponent<Text>().text = TextBoxTexts[0];
			break;
			case 2:
			//change audio to quizzical while alarm is flashing 
			//change text box
				ScrollText.GetComponent<Text>().text = TextBoxTexts[1];
				oxygenAlarm.SendMessage("OxygenAlarm", true);
				StartCoroutine("delayedHeadBangReduce");
			//reduce headbanging
			
			//trigger standup animation
			break;
			case 3:
				if (NewBtn1x){
				Application.LoadLevelAdditive("Graybox-testAI-legacy");
				StartCoroutine("delayedUI_sceneLoad");
				ContBtn.interactable=true;	
		}
				
			break;
		}
	}


	public void StartGame()
	{
		if (NewBtn1x){
			Application.LoadLevelAdditive("Graybox-testAI-legacy");
			StartCoroutine("delayedUI_sceneLoad");
			ContBtn.interactable=true;	
		}
	
	}



	public void Continue()
	{
		
		ScreenLock=GameObject.Find("Manager/StoreController");
		Debug.Log("Continue Btn Pressed!");
		ScreenLock.SendMessage("ContinueBtn");
		
	}

	void Update(){
		if(startfade)
		{
			Color fading = Color.Lerp(Color.white, faded, t);
			background.GetComponent<SpriteRenderer>().color = fading;
			if (t<1)
				t += Time.deltaTime/fadeTime;
			else
				startfade=false;
				floatingStars.SetActive(false);
			Debug.Log(fading);
		}
		
		if(headbangStop)
		{
			float reference = -560.0f;
			float fading = Mathf.SmoothDamp(10.0f, 0.0f, ref reference, fadeTime);
			headBangObject.SendMessage("bangDistCtrl", fading);
			Debug.Log ("HeadBang is now:" + (fading));
		}
			else{ headbangStop = false;}
			
		}
				

	}

	IEnumerator delayedUI_sceneLoad()
	{
		yield return new WaitForSeconds(1);
			GUImaster.SetActive(false);
	}

	IEnumerator delayedHeadBangReduce()
	{
		Animation animCtrl = headBang.GetComponent<Animation>();
		headbangStop =true;
		yield return new WaitForSeconds(5);
		animCtrl.Play("standup");
	}
}
