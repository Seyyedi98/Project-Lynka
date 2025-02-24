import moment from "moment-jalaali";

export function dateToMiladi(shamsiDate) {
  const jalaliMoment = moment(
    JSON.stringify(shamsiDate),
    "jYYYY-jMM-jDDTHH:mm:ss.SSSZ",
  );
  const gregorianDate = jalaliMoment.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  return gregorianDate;
}
