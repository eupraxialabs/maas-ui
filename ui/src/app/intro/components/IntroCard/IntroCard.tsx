import type { ReactNode } from "react";

import type { CardProps, PropsWithSpread } from "@canonical/react-components";
import { Card, Icon } from "@canonical/react-components";

type Props = PropsWithSpread<
  {
    children: ReactNode;
    complete?: boolean;
    hasErrors?: boolean;
    title: ReactNode;
    titleLink?: ReactNode;
  },
  CardProps
>;

const IntroCard = ({
  children,
  complete,
  hasErrors,
  title,
  titleLink,
  ...props
}: Props): JSX.Element => {
  let icon = "success-grey";
  if (hasErrors) {
    icon = "error";
  } else if (complete) {
    icon = "success";
  }
  return (
    <Card
      className="maas-intro__card"
      highlighted
      title={
        <>
          <span className="u-flex--between">
            <span className="p-heading--4">
              <Icon name={icon} />
              &ensp;{title}
            </span>
            {titleLink ? (
              <span className="p-text--default u-text--default-size">
                {titleLink}
              </span>
            ) : null}
          </span>
          <hr />
        </>
      }
      {...props}
    >
      {children}
    </Card>
  );
};

export default IntroCard;
