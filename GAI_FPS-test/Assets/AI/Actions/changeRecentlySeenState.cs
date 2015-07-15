using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using RAIN.Core;
using RAIN.Action;
[RAINAction]

public class StopPatrolling : RAINAction
{
	public StopPatrolling()
	{
		actionName = "playerWasSeen";
	}
	public override void Start(AI ai)
	{
		base.Start(ai);
		ai.WorkingMemory.SetItem("playerWasSeen", false);
	}
	public override ActionResult Execute(AI ai)
	{
		return ActionResult.SUCCESS;
	}
	public override void Stop(AI ai)
	{
		base.Stop(ai);
	}
}
