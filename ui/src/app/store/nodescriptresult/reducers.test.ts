import { actions as scriptResultActions } from "../scriptresult/slice";

import reducers from "./slice";

import {
  scriptResult as scriptResultFactory,
  nodeScriptResultState as nodeScriptResultStateFactory,
} from "testing/factories";

describe("nodescriptresult reducer", () => {
  it("reduces getByMachineIdSuccess", () => {
    const nodeScriptResultState = nodeScriptResultStateFactory();

    const scriptResults = [
      scriptResultFactory({ id: 1 }),
      scriptResultFactory({ id: 2 }),
    ];

    expect(
      reducers(
        nodeScriptResultState,
        scriptResultActions.getByMachineIdSuccess("abc123", scriptResults)
      )
    ).toEqual({
      items: {
        abc123: [1, 2],
      },
    });
  });
});
