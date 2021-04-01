interface System {
  isLoaded: boolean;
  selectedDate: Date;
  schoolPeriods: {
    first: {
      start: Date;
      end: Date;
    };
    second: {
      start: Date;
      end: Date;
    };
  };
}

export default System;
