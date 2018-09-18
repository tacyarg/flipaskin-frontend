import React from "react";

import CountUp from "react-countup";
import { Classes } from "@blueprintjs/core";
import ClassNames from "classnames";

const LabeledTotal = ({ label, total, money }) => {
  return (
    <div
      className={ClassNames(
        Classes.CARD,
        Classes.ELEVATION_1,
        "Trade-content-total"
      )}
    >
      <div className="Trade-content-total-value">
        {money ? (
          <CountUp
            duration={1}
            prefix="$"
            separator=","
            decimals={2}
            end={total}
          />
        ) : (
          <CountUp duration={1} end={total} />
        )}
      </div>
      <div className="Trade-content-total-label">{label}</div>
    </div>
  );
};

export default LabeledTotal;
