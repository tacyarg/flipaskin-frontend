import React from "react";
import CountUp from "react-countup";
import { Classes } from "@blueprintjs/core";
import ClassNames from "classnames";

const Stats = ({ sold, trades, exchanged }) => {
  return (
    <div className="stats">
      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={sold || 420420} />
        </div>
        <div className="stat-label">Items Deposited</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp separator="," end={trades || 422424.2} />
        </div>
        <div className="stat-label">Total Trades</div>
      </div>

      <div className={ClassNames(Classes.CARD, "stat")}>
        <div className="stat-figure">
          <CountUp
            prefix="$"
            separator=","
            decimals={2}
            end={exchanged || 12341234.56}
          />
        </div>
        <div className="stat-label">Value Deposited</div>
      </div>
    </div>
  );
};

export default Stats;
