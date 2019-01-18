
interface timeRange {
  nameDay:   string,
  timeStart: string,
  timeEnd:   string,
  isAllTime: boolean,
  isWeekend: boolean
}

export class Calendar {
  name: string | '';
  ownerEst: string | null;
  timeRange1: timeRange;
  timeRange2: timeRange;
  timeRange3: timeRange;
  timeRange4: timeRange;
  timeRange5: timeRange;
  timeRange6: timeRange;
  timeRange7: timeRange;
  constructor() {
    this.name = '';
    this.ownerEst = null;
    // this.timeRange1 = {timeStart: "9:00", timeEnd: "20:00"};
  }
}
