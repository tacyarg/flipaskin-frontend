import React from "react";
import CountUp from "react-countup";

const Stats = ({ deposited, trades, value }) => {
  return (
    <div className="Profile-content-body-panel-wrapper">
      <div className="Profile-content-body-panel">
        <div className="Profile-stats">
          <div className="Profile-stat">
            <div className="Profile-stat-figure">
              <CountUp separator="," end={deposited || 0} />
            </div>
            <div className="Profile-stat-label">Items Deposited</div>
          </div>

          <div className="Profile-stat">
            <div className="Profile-stat-figure">
              <CountUp end={trades || 0} />
            </div>
            <div className="Profile-stat-label">Total Trades</div>
          </div>

          <div className="Profile-stat">
            <div className="Profile-stat-figure">
              <CountUp prefix="$" separator="," decimals={2} end={value || 0} />
            </div>
            <div className="Profile-stat-label">Value Deposited</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
