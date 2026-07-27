import type { InputMode, InputModeListener } from "./input-mode.types";

class InputModeManager {
  private mode: InputMode = "BARCODE";

  private listeners = new Set<InputModeListener>();

  getMode(): InputMode {
    return this.mode;
  }

  setMode(mode: InputMode) {
    if (this.mode === mode) return;

    this.mode = mode;

    console.log("[InputMode]", mode);

    this.listeners.forEach((listener) => {
      listener(mode);
    });
  }

  is(mode: InputMode) {
    return this.mode === mode;
  }

  subscribe(listener: InputModeListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const inputModeManager = new InputModeManager();
