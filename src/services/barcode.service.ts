export class BarcodeService {
  private buffer = "";

  append(key: string) {
    if (key === "Enter") {
      const barcode = this.buffer.trim();

      this.buffer = "";

      if (barcode.length === 0) {
        return null;
      }

      return barcode;
    }

    if (key.length !== 1) {
      return null;
    }

    this.buffer += key;

    return null;
  }

  clear() {
    this.buffer = "";
  }

  getBuffer() {
    return this.buffer;
  }
}
