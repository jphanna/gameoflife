import React from 'react';

export default function Buttons(props) {
  return (
    <div className="buttonBar">
      <button className="controlButton" onClick={props.playButton}>Play</button>
      <button className="controlButton" onClick={props.pauseButton}>Pause</button>
      <button className="controlButton" onClick={props.clearButton}>Clear</button>
      <button className="controlButton" onClick={props.seedButton}>Seed</button>
      <button className="controlButton" onClick={props.slowButton}>Slow</button>
      <button className="controlButton" onClick={props.medButton}>Medium</button>
      <button className="controlButton" onClick={props.fastButton}>Fast</button>
      <button className="controlButton" onClick={props.lightweightSpaceShip}>
        LWSS
      </button>
      <button className="controlButton" onClick={props.gosperGliderGun}>
        Gosper Glider Gun
      </button>
    </div>
  );
}
