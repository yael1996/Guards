class Bord {
  constructor() {
    this.regular_days = [0, 1, 2, 3, 4];
    this.regular_shift_description;
    // like weekend
    this.special_days_in_week = [5, 6];
    this.special_days_shift_description;
    // like holidays
    this.special_dates = [new Date(), new Date()];
    this.special_dates_shift_description;
  }
}
