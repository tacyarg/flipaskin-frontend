import React, { Component } from "react";
import CountUp from "react-countup";

const Stats = ({ deposited, trades, value }) => {
  return (
    <div className="Profile-content-body-panel-wrapper">
      <div className="Profile-content-body-panel">
        <div className="stats">
          <div className="stat">
            <div className="stat-figure">
              <CountUp separator="," end={deposited || 420} />
            </div>
            <div className="stat-label">Items Deposited</div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <CountUp end={trades || 4200.2} />
            </div>
            <div className="stat-label">Total Trades</div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <CountUp
                prefix="$"
                separator=","
                decimals={2}
                end={value || 1234.56}
              />
            </div>
            <div className="stat-label">Value Deposited</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
