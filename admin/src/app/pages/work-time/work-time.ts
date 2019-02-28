
interface timeRange {
  nameDay:   string,
  timeStart: string,
  timeEnd:   string,
  isTimeRange?: boolean | true,
  isAllTime?: boolean | false,
  isWeekend?: boolean | false
}

export class Calendar {
  name: string | '';
  label: string | '';
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
    this.label = '';
    this.ownerEst = null;
    this.timeRange1 = {
      nameDay: 'Понеділок',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange2 = {
      nameDay: 'Вівторок',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange3 = {
      nameDay: 'Середа',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange4 = {
      nameDay: 'Четвер',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange5 = {
      nameDay: 'П\'ятниця',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange6 = {
      nameDay: 'Субота',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
    this.timeRange7 = {
      nameDay: 'Неділя',
      timeStart: "9:00",
      timeEnd: "20:00",
      isTimeRange: true
    };
  }
}
