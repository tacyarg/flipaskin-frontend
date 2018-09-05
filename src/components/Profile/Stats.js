import React, { Component } from "react";
import CountUp from "react-countup";

const Stats = ({opened, rewaraded, spent}) => {
  return (
    <div className="Profile-content-body-panel-wrapper">
      <div className="Profile-content-body-panel">
        <div className="stats">
          <div className="stat">
            <div className="stat-figure">
              <CountUp separator="," end={opened || 420} />
            </div>
            <div className="stat-label">Total Opened</div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <CountUp prefix="$" separator="," decimals={2} end={rewaraded || 4200.20} />
            </div>
            <div className="stat-label">Total Rewarded</div>
          </div>

          <div className="stat">
            <div className="stat-figure">
              <CountUp prefix="$" separator="," decimals={2} end={spent || 1234.56} />
            </div>
            <div className="stat-label">Total Spent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
