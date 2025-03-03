import { useDispatch } from "react-redux";

import ActionForm from "app/base/components/ActionForm";
import type { EmptyObject } from "app/base/types";
import type { MachineActionFormProps } from "app/machines/types";
import { actions as machineActions } from "app/store/machine";
import type { MachineEventErrors } from "app/store/machine/types";
import type { NodeActions } from "app/store/types/node";
import { getNodeActionTitle } from "app/store/utils";
import { kebabToCamelCase } from "app/utils";

type Props = {
  action:
    | NodeActions.ABORT
    | NodeActions.ACQUIRE
    | NodeActions.EXIT_RESCUE_MODE
    | NodeActions.LOCK
    | NodeActions.MARK_BROKEN
    | NodeActions.MARK_FIXED
    | NodeActions.OFF
    | NodeActions.ON
    | NodeActions.RESCUE_MODE
    | NodeActions.UNLOCK;
} & MachineActionFormProps;

export const FieldlessForm = ({
  action,
  clearHeaderContent,
  errors,
  machines,
  processingCount,
  viewingDetails,
}: Props): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <ActionForm<EmptyObject, MachineEventErrors>
      actionName={action}
      allowUnchanged
      cleanup={machineActions.cleanup}
      errors={errors}
      initialValues={{}}
      modelName="machine"
      onCancel={clearHeaderContent}
      onSaveAnalytics={{
        action: "Submit",
        category: `Machine ${viewingDetails ? "details" : "list"} action form`,
        label: getNodeActionTitle(action),
      }}
      onSubmit={() => {
        dispatch(machineActions.cleanup());
        const actionMethod = kebabToCamelCase(action);
        // Find the method for the function.
        const [, actionFunction] =
          Object.entries(machineActions).find(
            ([key]) => key === actionMethod
          ) || [];
        if (actionFunction) {
          machines.forEach((machine) => {
            dispatch(actionFunction(machine.system_id));
          });
        }
      }}
      onSuccess={clearHeaderContent}
      processingCount={processingCount}
      selectedCount={machines.length}
    />
  );
};

export default FieldlessForm;
