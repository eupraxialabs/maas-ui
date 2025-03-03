import { useRef } from "react";
import type { ReactNode } from "react";

import type { InputProps, PropsWithSpread } from "@canonical/react-components";
import { Input } from "@canonical/react-components";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import { someInArray, someNotAll } from "app/utils";
import type { CheckboxHandlers } from "app/utils/generateCheckboxHandlers";

type Props<S> = PropsWithSpread<
  {
    checkAllSelected?: CheckboxHandlers<S>["checkAllSelected"] | null;
    checkSelected?: CheckboxHandlers<S>["checkSelected"] | null;
    disabled?: boolean;
    handleGroupCheckbox: CheckboxHandlers<S>["handleGroupCheckbox"];
    inRow?: boolean;
    items: S[];
    // This needs to be something other than `label` to prevent conflicts with the
    // HTMLInputElement type.
    inputLabel?: ReactNode;
    selectedItems: S[];
  },
  InputProps
>;

const GroupCheckbox = <S,>({
  checkAllSelected,
  checkSelected,
  disabled,
  handleGroupCheckbox,
  inRow,
  items,
  inputLabel,
  selectedItems,
  ...props
}: Props<S>): JSX.Element => {
  const id = useRef(nanoid());
  const notAllSelected = checkAllSelected
    ? !checkAllSelected(items, selectedItems)
    : someNotAll(items, selectedItems);
  return (
    <Input
      checked={
        checkSelected
          ? checkSelected(items, selectedItems)
          : someInArray(items, selectedItems)
      }
      className={classNames({
        "p-checkbox--mixed": selectedItems.length > 0 && notAllSelected,
      })}
      disabled={items.length === 0 || disabled}
      id={id.current}
      label={inputLabel ? inputLabel : " "}
      labelClassName="is-inline-label"
      onChange={() => handleGroupCheckbox(items, selectedItems)}
      type="checkbox"
      wrapperClassName={classNames("u-no-margin--bottom u-nudge--checkbox", {
        "u-align-header-checkbox": !inRow,
      })}
      {...props}
    />
  );
};

export default GroupCheckbox;
