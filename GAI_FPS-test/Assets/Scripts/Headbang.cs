using UnityEngine;
using System.Collections;
using System;

public class Headbang : MonoBehaviour {
	public double BPM;
	public double bangDist;
	public double whiplash;
	private double phase;
	private double twoPi;
	private double w1;
	private double w2;
	public float Yrot;
	public GameObject headBangerObj;

	void Start () {
		twoPi = 2 * Math.PI;
		if (whiplash > 1) {
			whiplash = 1;
		} else if (whiplash < 0) {
			whiplash = 0;
		}
		w1 = Math.PI + (Math.PI * whiplash);
		w2 = Math.PI - (Math.PI * whiplash);
	}

	public void bangDistCtrl(float bang_distance){
		bangDist = System.Convert.ToDouble(bang_distance);
	}
	
	// Update is called once per frame
	void Update () {
		headBangerObj.transform.rotation = Quaternion.Euler((float)((1-AsyncCos (phase))*bangDist), Yrot, 0f);
		phase += BPM/60*twoPi*Time.deltaTime;
		if (phase >= twoPi) {
			phase -= twoPi;
		}
	}
	
	double AsyncCos(double xp){
		if (xp <= w1) {
			return (-Math.Cos(xp*Math.PI/w1)+1)/2;
		} else {
			return (-Math.Cos(xp*Math.PI/w2)+1)/2;
		}
	}
}
