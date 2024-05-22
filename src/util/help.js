import Cookies from "js-cookie";
import validator from "validator";

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
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}
export function extractDate(isoString) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Get the year, month, and day
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, "0");

  // Format as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function extractAndConvertDataProfile(information) {
  const data = [];

  const gender = {
    name: information.gender==='male'?'Male':'Female',
    icon: "FaTransgender",
    title: "Basic info",
    desc: "Gender",
    validator: (value) => {
      return value !== "0";
    },
    textError: "Just male or female",
  };

  const birthday = {
    name: extractDate(information.birthDay),
    icon: "FaBirthdayCake",
    title: "Basic info",
    desc: "Date of birth",
    validator: (value) => {
      const birthday = new Date(value);
      const currentDate = new Date();

      // Calculate age
      const age = Math.floor(
        (currentDate - birthday) / (365.25 * 24 * 60 * 60 * 1000)
      );

      // Check if age is 8 or older
      if (age >= 8) {
        return true;
      }
      return false;
    },
    textError: "Minimum age: 8 years old",
  };

  const college =
    information.education &&
    information.education.college &&
    information.education.college.length > 0
      ? {
          name: information.education.college[0].name,
          graduated: information.education.college[0].graduated?'Yes':'No',
          _id: information.education.college[0]._id,
          icon: "FaUniversity",
          title: "Education",
          desc: "University",
          validator: (value) => validator.isLength(value, { min: 1 }),
          validator2: (value) => value === 'Yes'|| value === 'No',
          textError: "University should not be empty",
          textError2: "graduate should be: Yes or Not Yes",
        }
      : {
          replacement: "Add college",
          name: "",
          graduated: "",
          _id: "",
          icon: "FaUniversity",
          title: "Education",
          desc: "University",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "University should not be empty",
        };

  const highSchool =
    information.education &&
    information.education.highSchool &&
    information.education.highSchool.length > 0
      ? {
          name: information.education.highSchool[0].name,
          year: information.education.highSchool[0].year,
          _id: information.education.highSchool[0]._id,
          icon: "FaSchool",
          title: "Education",
          desc: "School",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "Highschool should not be empty",
          validator2: (value) => value > 1950 && value <= 2024,
          textError2: "Yeart should be between 1950 and 2024",
        }
      : {
          replacement: "Add school",
          name: "",
          year: "",
          _id: "",
          icon: "FaSchool",
          title: "Education",
          desc: "School",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "Highschool should not be empty",
        };

  const phoneNumber = information.phoneNumber
    ? {
        name: information.phoneNumber,
        icon: "MdContactPhone",
        title: "Contact",
        desc: "Phone",
        validator: (value) => validator.matches(value, /^9639[3-689]\d{7}$/),
        textError:
          "Invalid phone number. Must start with 9639 and have a valid fifth digit.",
      }
    : {
        replacement: "Add phone number",
        name: "",
        icon: "MdContactPhone",
        title: "Contact",
        desc: "Phone",

        validator: (value) => validator.matches(value, /^9639[3-689]\d{7}$/),
        textError:
          "Invalid phone number. Must start with 9639 and have a valid fifth digit.",
      };

  const email = {
    name: information.email,
    icon: "MdOutlineAlternateEmail",
    title: "Contact",
    desc: "Email",
    validator: (value) => {
      return value;
    },
    textError: "Invalid email",
  };

  const currentCity =
    information.placesLived && information.placesLived.currentCity
      ? {
          name: information.placesLived.currentCity,
          icon: "FaCity",
          title: "Places lived",
          desc: "City",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "City should not be empty",
        }
      : {
          replacement: "Add city",
          name: "",
          icon: "FaCity",
          title: "Places lived",
          desc: "City",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "City should not be empty",
        };
  const homeTown =
    information.placesLived && information.placesLived.homeTown
      ? {
          name: information.placesLived.homeTown,
          icon: "FaHome",
          title: "Places lived",
          desc: "Home town",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "Home town should not be empty",
        }
      : {
          replacement: "Add Home town",
          name: "",
          icon: "FaHome",
          title: "Places lived",
          desc: "Home town",
          validator: (value) => validator.isLength(value, { min: 1 }),
          textError: "Home town should not be empty",
        };

  data.push(
    gender,
    birthday,
    college,
    highSchool,
    phoneNumber,
    email,
    currentCity,
    homeTown
  );

  return data;
}
