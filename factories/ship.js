export default class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.sunked = false
  }

  hit() {
    this.timesHit++;
  }

  isSunk() {
    if (this.timesHit === this.length) {
      this.sunked = true
      return this.sunked
    } else {
      this.sunked = false
      return this.sunked
    }
  }
}
