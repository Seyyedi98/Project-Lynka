import moment from "moment-jalaali";

export function dateToShamsi(miladiDate) {
  const gregorianMoment = moment(miladiDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const shamsiDate = gregorianMoment.format("jYYYY-jMM-jDDTHH:mm:ss.SSSZ");

  return shamsiDate;
}
