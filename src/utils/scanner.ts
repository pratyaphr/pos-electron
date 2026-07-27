export class ScannerDetector {
  private buffer = "";

  private lastTime = 0;

  private timeout: ReturnType<typeof setTimeout> | null = null;

  private readonly MAX_INTERVAL = 35;

  private readonly MIN_LENGTH = 5;

  onScan?: (barcode: string) => void;

  handleKey(key: string) {
    const now = performance.now();

    if (now - this.lastTime > this.MAX_INTERVAL) {
      this.buffer = "";
    }

    this.lastTime = now;

    if (key === "Enter") {
      if (this.buffer.length >= this.MIN_LENGTH) {
        this.onScan?.(this.buffer);
      }

      this.buffer = "";

      return;
    }

    if (key.length === 1) {
      this.buffer += key;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.buffer = "";
    }, 100);
  }
}
