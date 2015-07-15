using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using RAIN.Action;
using RAIN.Core;

[RAINAction]
public class playerNotSeen : RAINAction
{
	public playerNotSeen()
	{
		actionName = "playerNotSeen";
	}

    public override void Start(RAIN.Core.AI ai)
    {
        base.Start(ai);

		ai.WorkingMemory.SetItem ("playerWasSeen", false);
    }

    public override ActionResult Execute(RAIN.Core.AI ai)
    {
        return ActionResult.SUCCESS;
    }

    public override void Stop(RAIN.Core.AI ai)
    {
        base.Stop(ai);
    }
}