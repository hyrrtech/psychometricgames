class CircularBuffer {
  constructor(bufferLength) {
    this.buffer = [];
    this.pointer = 0;
    this.bufferLength = bufferLength;
  }
  r;
  push(element) {
    if (this.buffer.length === this.bufferLength) {
      this.buffer[this.pointer] = element;
    } else {
      this.buffer.push(element);
    }
    this.pointer = (this.pointer + 1) % this.bufferLength;
    return this.buffer;
  }

  getArray() {
    return this.buffer;
  }
}

export default CircularBuffer;
