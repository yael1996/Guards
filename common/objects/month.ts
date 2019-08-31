export class Month {
  public month: number;
  public year: number;
  public bordId: string;

  constructor(year: number, month: number, bordId: string) {
    this.year = year;
    this.month = month;
    this.bordId = bordId;
  }
}
