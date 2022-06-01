class Random {
  constructor(seed) {
    this.seed = seed;
    this.originalSeed = seed;
  }
  randDec() {
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000;
  }
  randNum(a, b) {
    return a + (b - a) * this.randDec();
  }
  randInt(a, b) {
    return Math.floor(this.randNum(a, b + 1));
  }

  reset() {
    this.seed = this.originalSeed;
  }
}
