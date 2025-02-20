export function currentDate() {
  let today = new Date();
  let formattedDate = today.toLocaleDateString("fa-IR-u-nu-latn");
  let hours = today.getHours();
  let minutes = today.getMinutes();

  minutes = minutes < 10 ? "0" + minutes : minutes;

  let dateTime = `${formattedDate} ${hours}:${minutes}`;

  return dateTime;
}
