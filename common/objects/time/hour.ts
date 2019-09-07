export class Hour {
  public hour: number; // 0-23
  public min: number; //0-59

  constructor(hour, min = 0) {
    this.hour = hour;
    this.min = min;
  }
}
