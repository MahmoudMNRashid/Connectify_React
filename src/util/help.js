import Cookies from "js-cookie";

export const host = "https://connectify-eosin.vercel.app";

export const getToken = () => {
  return Cookies.get("Jto__Uid").split("__&")[0];
};

export const getUserId = () => {
  return Cookies.get("Jto__Uid").split("__&")[1];
};

export function convertDateFormat(dateTimeString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateTimeString);
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const month = months[monthIndex];
  const formattedDate = `${day} ${month} ${year}, at ${hours % 12 || 12}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hours >= 12 ? "PM" : "AM"}`;
  return formattedDate;
}
