export class KeplerMediaControlHandler {
  async handlePlay() {}
  async handlePause() {}
  async handleStop() {}
  async handleTogglePlayPause() {}
  async handleStartOver() {}
  async handleFastForward() {}
  async handleRewind() {}
  async handleSeek() {}
}

export const VideoPlayer = function () {
  return {
    play: () => {},
    pause: () => {},
    currentTime: 0,
    duration: 100,
    addEventListener: () => {},
    removeEventListener: () => {},
  };
};

export const KeplerVideoSurfaceView = () => {};
export const KeplerCaptionsView = () => {};
