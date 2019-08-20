class Month {
  // build array for the month - without filling people
  constructor(bord) {
    this.bord = bord;
    
  }
  build_month(month, year) {
    this.month_shifts = new Array();

    this.curr_month = month;
    this.curr_year = year;
    
    this.special_dates = new Array();
    this.special_days = new Array();
    this.regular_days = new Array();

    this.dates_by_type();
  }

  fill_month_shifts(){
    this.fill_spacial_dates_shifts(this.special_dates,
      this.bord.special_dates_shift_description,special_dates);

    this.fill_spacial_dates_shifts(this.special_days,
      this.bord.special_days_shift_description,special_days);

    this.fill_spacial_dates_shifts(this.regular_days,
      this.bord.regular_days_shift_description,regular_days);
    
  }

  fill_shifts(days,settings,type){
    for (var i = 1; i <= days; i++) {
      var start_shift = settings.start_time_in_day;
      for(var i = 1; i <=settings.num_shifts_in_day ; i++){
        var shift = {
          from_time:start_shift,
          to_time:start_shift.addHours(settings.shift_length_in_houers),
          type:type
        }
        this.month_shifts.push(shift);
        start_shift = shift.to_time;
      }
    }
  }

  dates_by_type(month, year) {
    for (var i = 1; i <= this.num_total_days_in_month(); i++) {
      var currDate = new Date(this.curr_year, this.curr_month, i);

      if(this.bord.special_dates.any(=> d.getTime() === currDate.getTime()))
      this.special_dates.push(currDate);
      else if (this.bord.special_days_in_week.includes(newDate.getDay()))
        this.special_days.push(currDate);
      else this.regular_days.push(currDate);
    }
  }

  num_total_days_in_month() {
    return new Date(this.curr_year, this.curr_month, 0).getDate();
  }
}
