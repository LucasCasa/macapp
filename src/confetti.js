import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

export default class SchoolPride extends React.Component {
  constructor(props) {
    super(props);
    this.isAnimationEnabled = true;
    this.animationInstance = null;
    this.nextTickAnimation = this.nextTickAnimation.bind(this);
    this.nextTickAnimation();
  }

  makeShot = (angle, originX) => {
    this.animationInstance &&
      this.animationInstance({
        particleCount: 3,
        angle,
        spread: 55,
        origin: { x: originX },
        colors: ['#29cdff', '#78ff44', '#ff718d']
      });
  };

  nextTickAnimation = () => {
    this.makeShot(50, 0);
    this.makeShot(110, 1);
    if (this.isAnimationEnabled) requestAnimationFrame(this.nextTickAnimation);
  };

  startAnimation = () => {
    if (!this.isAnimationEnabled) {
      this.isAnimationEnabled = true;
      this.nextTickAnimation();
    }
  };

  pauseAnimation = () => {
    this.isAnimationEnabled = false;
  };

  stopAnimation = () => {
    this.isAnimationEnabled = false;
    this.animationInstance && this.animationInstance.reset();
  };

  getInstance = (instance) => {
    this.animationInstance = instance;
  };

  componentWillUnmount() {
    this.isAnimationEnabled = false;
  }

  render() {
    return (
      <>
        <div>
          <button onClick={this.startAnimation}>Start</button>
          <button onClick={this.pauseAnimation}>Pause</button>
          <button onClick={this.stopAnimation}>Stop</button>
        </div>
        <ReactCanvasConfetti
          refConfetti={this.getInstance}
          style={canvasStyles}
        />
      </>
    );
  }
}