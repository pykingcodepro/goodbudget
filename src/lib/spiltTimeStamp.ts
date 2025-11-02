export const splitTimeStamp = (timestamp: string) => {
  // Expected Time Stamp's format - 2025-11-01T15:29:04.515Z
  // Expected Output - { year: 2025, month: 11, date: 1, hour: 15, min: 29. sec: 4.515 }
  const splitedTimeStamp = timestamp.split(/[-T:]/);
  return {
    year: parseInt(splitedTimeStamp[0]),
    month: parseInt(splitedTimeStamp[1]),
    date: parseInt(splitedTimeStamp[2]),
    hour: parseInt(splitedTimeStamp[3]),
    min: parseInt(splitedTimeStamp[4]),
    sec: parseFloat(splitedTimeStamp[5]),
  };
};
