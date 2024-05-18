import Cookies from "js-cookie";

export const host = "https://connectify-eosin.vercel.app";

export const getToken = () => {
  return Cookies.get("Jto__Uid")?.split("__&")[0];
};

export const getUserId = () => {
  return Cookies.get("Jto__Uid").split("__&")[1];
};
export const getFullName = () => {
  return {
    firstName: Cookies.get("Jto__Uid").split("__&")[2],
    lastName: Cookies.get("Jto__Uid").split("__&")[3],
  };
};
export const getLogo = () => {
  return Cookies.get("Jto__Uid").split("__&")[4];
};

export function convertDateFormat(dateTimeString) {
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  const date = new Date(dateTimeString);
  // const year = date.getFullYear();
  // const monthIndex = date.getMonth();
  // const day = date.getDate();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const month = months[monthIndex];

  // Convert UTC time to local time zone
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}
