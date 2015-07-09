#pragma strict
var deadPickup : GameObject;

function Start () {
yield WaitForSeconds(2);
gameObject.SendMessage("equipDead");
}

