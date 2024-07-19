
import Cookies from "js-cookie";
import validator from "validator";

export const host = "https://connectify-eosin.vercel.app";
export const localHost = "http://localhost:8080";

export const getToken = () => {
  return Cookies.get("Jto__Uid")?.split("__&")[0];
};

export const getUserId = () => {
  return Cookies.get("Jto__Uid").split("__&")[1];
};
export const getFullName = () => {
  const firstName = Cookies.get("Jto__Uid").split("__&")[2];
  const lastName = Cookies.get("Jto__Uid").split("__&")[3];
  return firstName + "   " + lastName;
};
export const getLogo = () => {
  const public_id = Cookies.get("Jto__Uid").split("__&")[4];
  const link = Cookies.get("Jto__Uid").split("__&")[5];
  const logo = {
    asset: { public_id, link, resource_type: "image" },
  };

  return logo;
};

export const clearCookies = ()=>{

  Cookies.remove('Jto__Uid')
}
export const getExpireDate = () => {
  const date = Cookies.get("Jto__Uid").split("__&")[6];


  return date;
};

export function convertDateFormat(dateTimeString) {


  const date = new Date(dateTimeString);
  

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

  const gender = information.gender
    ? {
        name: information.gender === "male" ? "Male" : "Female",
        icon: "FaTransgender",
        title: "Basic info",
        desc: "Gender",
        validator: (value) => {
          return value !== "0";
        },
        textError: "Just male or female",
      }
    : {
        replacement: "Add Gender",
        name: "",
        icon: "FaTransgender",
        title: "Basic info",
        desc: "Gender",
        validator: (value) => {
          return value !== "0";
        },
        textError: "Just male or female",
      };

  const birthday = information.birthDay
    ? {
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
      }
    : {
        replacement: "Add BirthDay",
        name: "",
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
          graduated: information.education.college[0].graduated ? "Yes" : "No",
          _id: information.education.college[0]._id,
          icon: "FaUniversity",
          title: "Education",
          desc: "University",
          validator: (value) => validator.isLength(value, { min: 1 }),
          validator2: (value) => value === "Yes" || value === "No",
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

  const email = information.email
    ? {
        name: information.email,
        icon: "MdOutlineAlternateEmail",
        title: "Contact",
        desc: "Email",
        validator: (value) => {
          return validator.isEmail(value);
        },
        textError: "Invalid email",
      }
    : {
        replacement: "Add Email",
        name: "",
        icon: "MdOutlineAlternateEmail",
        title: "Contact",
        desc: "Email",
        validator: (value) => {
          return validator.isEmail(value);
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
export const pageCategories = [
  {
    label: "Abortion Service",
    value: "Abortion Service",
  },
  {
    label: "Abruzzo Restaurant",
    value: "Abruzzo Restaurant",
  },
  {
    label: "Academic Camp",
    value: "Academic Camp",
  },
  {
    label: "Accessories",
    value: "Accessories",
  },
  {
    label: "Accountant",
    value: "Accountant",
  },
  {
    label: "Acehnese Restaurant",
    value: "Acehnese Restaurant",
  },
  {
    label: "Actor",
    value: "Actor",
  },
  {
    label: "Acupuncturist",
    value: "Acupuncturist",
  },
  {
    label: "Addiction Resources Center",
    value: "Addiction Resources Center",
  },
  {
    label: "Addiction Service",
    value: "Addiction Service",
  },
  {
    label: "Addiction Treatment Center",
    value: "Addiction Treatment Center",
  },
  {
    label: "Adoption Service",
    value: "Adoption Service",
  },
  {
    label: "Adult Entertainment Service",
    value: "Adult Entertainment Service",
  },
  {
    label: "Aerospace Company",
    value: "Aerospace Company",
  },
  {
    label: "Afghan Restaurant",
    value: "Afghan Restaurant",
  },
  {
    label: "African Methodist Episcopal Church",
    value: "African Methodist Episcopal Church",
  },
  {
    label: "African Restaurant",
    value: "African Restaurant",
  },
  {
    label: "AIDS Resource Center",
    value: "AIDS Resource Center",
  },
  {
    label: "Aircraft Manufacturer",
    value: "Aircraft Manufacturer",
  },
  {
    label: "Airline Company",
    value: "Airline Company",
  },
  {
    label: "Airline Industry Service",
    value: "Airline Industry Service",
  },
  {
    label: "Airport",
    value: "Airport",
  },
  {
    label: "Airport Gate",
    value: "Airport Gate",
  },
  {
    label: "Airport Lounge",
    value: "Airport Lounge",
  },
  {
    label: "Airport Shuttle Service",
    value: "Airport Shuttle Service",
  },
  {
    label: "Airport Terminal",
    value: "Airport Terminal",
  },
  {
    label: "Album",
    value: "Album",
  },
  {
    label: "Alcohol Addiction Treatment Center",
    value: "Alcohol Addiction Treatment Center",
  },
  {
    label: "Allergist",
    value: "Allergist",
  },
  {
    label: "Alternative & Holistic Health Service",
    value: "Alternative & Holistic Health Service",
  },
  {
    label: "Amateur Photographer",
    value: "Amateur Photographer",
  },
  {
    label: "Amateur Sports League",
    value: "Amateur Sports League",
  },
  {
    label: "Amateur Sports Team",
    value: "Amateur Sports Team",
  },
  {
    label: "American Restaurant",
    value: "American Restaurant",
  },
  {
    label: "Andhra Restaurant",
    value: "Andhra Restaurant",
  },
  {
    label: "Anesthesiologist",
    value: "Anesthesiologist",
  },
  {
    label: "Anglican Church",
    value: "Anglican Church",
  },
  {
    label: "Anhui Restaurant",
    value: "Anhui Restaurant",
  },
  {
    label: "Animal Rescue Service",
    value: "Animal Rescue Service",
  },
  {
    label: "Animal Shelter",
    value: "Animal Shelter",
  },
  {
    label: "Animation Studio",
    value: "Animation Studio",
  },
  {
    label: "Antique Store",
    value: "Antique Store",
  },
  {
    label: "Aosta Restaurant",
    value: "Aosta Restaurant",
  },
  {
    label: "Apartment & Condo Building",
    value: "Apartment & Condo Building",
  },
  {
    label: "Apostolic Church",
    value: "Apostolic Church",
  },
  {
    label: "App Page",
    value: "App Page",
  },
  {
    label: "Apparel & Clothing",
    value: "Apparel & Clothing",
  },
  {
    label: "Apparel Distributor",
    value: "Apparel Distributor",
  },
  {
    label: "Appliance Manufacturer",
    value: "Appliance Manufacturer",
  },
  {
    label: "Appliance Repair Service",
    value: "Appliance Repair Service",
  },
  {
    label: "Appliance Store",
    value: "Appliance Store",
  },
  {
    label: "Appliances",
    value: "Appliances",
  },
  {
    label: "Aquatic Pet Store",
    value: "Aquatic Pet Store",
  },
  {
    label: "Arabian Restaurant",
    value: "Arabian Restaurant",
  },
  {
    label: "Arboretum",
    value: "Arboretum",
  },
  {
    label: "Archaeological Service",
    value: "Archaeological Service",
  },
  {
    label: "Archery Range",
    value: "Archery Range",
  },
  {
    label: "Archery Shop",
    value: "Archery Shop",
  },
  {
    label: "Architectural Designer",
    value: "Architectural Designer",
  },
  {
    label: "Architectural Tour Agency",
    value: "Architectural Tour Agency",
  },
  {
    label: "Argentinian Restaurant",
    value: "Argentinian Restaurant",
  },
  {
    label: "Armed Forces",
    value: "Armed Forces",
  },
  {
    label: "Armenian Restaurant",
    value: "Armenian Restaurant",
  },
  {
    label: "Aromatherapy Service",
    value: "Aromatherapy Service",
  },
  {
    label: "Art",
    value: "Art",
  },
  {
    label: "Art Restoration Service",
    value: "Art Restoration Service",
  },
  {
    label: "Art School",
    value: "Art School",
  },
  {
    label: "Art Tour Agency",
    value: "Art Tour Agency",
  },
  {
    label: "Article",
    value: "Article",
  },
  {
    label: "Artist",
    value: "Artist",
  },
  {
    label: "Arts & Crafts Store",
    value: "Arts & Crafts Store",
  },
  {
    label: "Arts & Humanities Website",
    value: "Arts & Humanities Website",
  },
  {
    label: "Asian Fusion Restaurant",
    value: "Asian Fusion Restaurant",
  },
  {
    label: "Asian Restaurant",
    value: "Asian Restaurant",
  },
  {
    label: "Assemblies of God",
    value: "Assemblies of God",
  },
  {
    label: "Astrologist",
    value: "Astrologist",
  },
  {
    label: "Astrologist & Psychic",
    value: "Astrologist & Psychic",
  },
  {
    label: "Athlete",
    value: "Athlete",
  },
  {
    label: "ATV Recreation Park",
    value: "ATV Recreation Park",
  },
  {
    label: "ATV Rental",
    value: "ATV Rental",
  },
  {
    label: "Auction House",
    value: "Auction House",
  },
  {
    label: "Audio Visual Equipment Store",
    value: "Audio Visual Equipment Store",
  },
  {
    label: "Audiologist",
    value: "Audiologist",
  },
  {
    label: "Australian Restaurant",
    value: "Australian Restaurant",
  },
  {
    label: "Austrian Restaurant",
    value: "Austrian Restaurant",
  },
  {
    label: "Author",
    value: "Author",
  },
  {
    label: "Auto Detailing Service",
    value: "Auto Detailing Service",
  },
  {
    label: "Automated Teller Machine (ATM)",
    value: "Automated Teller Machine (ATM)",
  },
  {
    label: "Automation Service",
    value: "Automation Service",
  },
  {
    label: "Automotive Body Shop",
    value: "Automotive Body Shop",
  },
  {
    label: "Automotive Consultant",
    value: "Automotive Consultant",
  },
  {
    label: "Automotive Customization Shop",
    value: "Automotive Customization Shop",
  },
  {
    label: "Automotive Glass Service",
    value: "Automotive Glass Service",
  },
  {
    label: "Automotive Leasing Service",
    value: "Automotive Leasing Service",
  },
  {
    label: "Automotive Manufacturer",
    value: "Automotive Manufacturer",
  },
  {
    label: "Automotive Parts Store",
    value: "Automotive Parts Store",
  },
  {
    label: "Automotive Registration Center",
    value: "Automotive Registration Center",
  },
  {
    label: "Automotive Repair Shop",
    value: "Automotive Repair Shop",
  },
  {
    label: "Automotive Restoration Service",
    value: "Automotive Restoration Service",
  },
  {
    label: "Automotive Service",
    value: "Automotive Service",
  },
  {
    label: "Automotive Shipping Service",
    value: "Automotive Shipping Service",
  },
  {
    label: "Automotive Storage Facility",
    value: "Automotive Storage Facility",
  },
  {
    label: "Automotive Store",
    value: "Automotive Store",
  },
  {
    label: "Automotive Wheel Polishing Service",
    value: "Automotive Wheel Polishing Service",
  },
  {
    label: "Automotive Window Tinting Service",
    value: "Automotive Window Tinting Service",
  },
  {
    label: "Aviation Repair Station",
    value: "Aviation Repair Station",
  },
  {
    label: "Aviation School",
    value: "Aviation School",
  },
  {
    label: "Avionics Shop",
    value: "Avionics Shop",
  },
  {
    label: "Awadhi Restaurant",
    value: "Awadhi Restaurant",
  },
  {
    label: "Awning Supplier",
    value: "Awning Supplier",
  },
  {
    label: "Azerbaijani Restaurant",
    value: "Azerbaijani Restaurant",
  },
  {
    label: "Baby & Children’s Clothing Store",
    value: "Baby & Children’s Clothing Store",
  },
  {
    label: "Baby Goods/Kids Goods",
    value: "Baby Goods/Kids Goods",
  },
  {
    label: "Babysitter",
    value: "Babysitter",
  },
  {
    label: "Baden Restaurant",
    value: "Baden Restaurant",
  },
  {
    label: "Badminton Court",
    value: "Badminton Court",
  },
  {
    label: "Bagel Shop",
    value: "Bagel Shop",
  },
  {
    label: "Bags & Luggage Company",
    value: "Bags & Luggage Company",
  },
  {
    label: "Bags & Luggage Store",
    value: "Bags & Luggage Store",
  },
  {
    label: "Bags/Luggage",
    value: "Bags/Luggage",
  },
  {
    label: "Bail Bondsmen",
    value: "Bail Bondsmen",
  },
  {
    label: "Bakery",
    value: "Bakery",
  },
  {
    label: "Balinese Restaurant",
    value: "Balinese Restaurant",
  },
  {
    label: "Balloonport",
    value: "Balloonport",
  },
  {
    label: "Ballroom",
    value: "Ballroom",
  },
  {
    label: "Band",
    value: "Band",
  },
  {
    label: "Bank",
    value: "Bank",
  },
  {
    label: "Bank Equipment & Service",
    value: "Bank Equipment & Service",
  },
  {
    label: "Bankruptcy Lawyer",
    value: "Bankruptcy Lawyer",
  },
  {
    label: "Baptist Church",
    value: "Baptist Church",
  },
  {
    label: "Bar",
    value: "Bar",
  },
  {
    label: "Bar & Grill",
    value: "Bar & Grill",
  },
  {
    label: "Barbecue Restaurant",
    value: "Barbecue Restaurant",
  },
  {
    label: "Barber Shop",
    value: "Barber Shop",
  },
  {
    label: "Bartending School",
    value: "Bartending School",
  },
  {
    label: "Bartending Service",
    value: "Bartending Service",
  },
  {
    label: "Baseball Field",
    value: "Baseball Field",
  },
  {
    label: "Baseball Stadium",
    value: "Baseball Stadium",
  },
  {
    label: "Basilicata Restaurant",
    value: "Basilicata Restaurant",
  },
  {
    label: "Basketball Court",
    value: "Basketball Court",
  },
  {
    label: "Basketball Stadium",
    value: "Basketball Stadium",
  },
  {
    label: "Basque Restaurant",
    value: "Basque Restaurant",
  },
  {
    label: "Batting Cage",
    value: "Batting Cage",
  },
  {
    label: "Bavarian Restaurant",
    value: "Bavarian Restaurant",
  },
  {
    label: "Bay",
    value: "Bay",
  },
  {
    label: "Beach",
    value: "Beach",
  },
  {
    label: "Beach Resort",
    value: "Beach Resort",
  },
  {
    label: "Beauty Salon",
    value: "Beauty Salon",
  },
  {
    label: "Beauty Store",
    value: "Beauty Store",
  },
  {
    label: "Beauty Supplier",
    value: "Beauty Supplier",
  },
  {
    label: "Beauty Supply Store",
    value: "Beauty Supply Store",
  },
  {
    label: "Beauty, Cosmetic & Personal Care",
    value: "Beauty, Cosmetic & Personal Care",
  },
  {
    label: "Bed and Breakfast",
    value: "Bed and Breakfast",
  },
  {
    label: "Beer Bar",
    value: "Beer Bar",
  },
  {
    label: "Beer Garden",
    value: "Beer Garden",
  },
  {
    label: "Beijing Restaurant",
    value: "Beijing Restaurant",
  },
  {
    label: "Belarusian Restaurant",
    value: "Belarusian Restaurant",
  },
  {
    label: "Belgian Restaurant",
    value: "Belgian Restaurant",
  },
  {
    label: "Belizean Restaurant",
    value: "Belizean Restaurant",
  },
  {
    label: "Bengali/Bangladeshi Restaurant",
    value: "Bengali/Bangladeshi Restaurant",
  },
  {
    label: "Betawinese Restaurant",
    value: "Betawinese Restaurant",
  },
  {
    label: "Bicycle Repair Service",
    value: "Bicycle Repair Service",
  },
  {
    label: "Bicycle Shop",
    value: "Bicycle Shop",
  },
  {
    label: "Big Box Retailer",
    value: "Big Box Retailer",
  },
  {
    label: "Bike Rental",
    value: "Bike Rental",
  },
  {
    label: "Bike Trail",
    value: "Bike Trail",
  },
  {
    label: "Biotechnology Company",
    value: "Biotechnology Company",
  },
  {
    label: "Blinds & Curtains Store",
    value: "Blinds & Curtains Store",
  },
  {
    label: "Blogger",
    value: "Blogger",
  },
  {
    label: "Blood Bank",
    value: "Blood Bank",
  },
  {
    label: "Board Game",
    value: "Board Game",
  },
  {
    label: "Boat / Sailing Instructor",
    value: "Boat / Sailing Instructor",
  },
  {
    label: "Boat Rental",
    value: "Boat Rental",
  },
  {
    label: "Boat Service",
    value: "Boat Service",
  },
  {
    label: "Boat Tour Agency",
    value: "Boat Tour Agency",
  },
  {
    label: "Boat/Ferry Company",
    value: "Boat/Ferry Company",
  },
  {
    label: "Bolivian Restaurant",
    value: "Bolivian Restaurant",
  },
  {
    label: "Book",
    value: "Book",
  },
  {
    label: "Book & Magazine Distributor",
    value: "Book & Magazine Distributor",
  },
  {
    label: "Book Genre",
    value: "Book Genre",
  },
  {
    label: "Book Series",
    value: "Book Series",
  },
  {
    label: "Books & Magazines",
    value: "Books & Magazines",
  },
  {
    label: "Bookstore",
    value: "Bookstore",
  },
  {
    label: "Borough",
    value: "Borough",
  },
  {
    label: "Bossam/Jokbal Restaurant",
    value: "Bossam/Jokbal Restaurant",
  },
  {
    label: "Botanical Garden",
    value: "Botanical Garden",
  },
  {
    label: "Bottled Water Company",
    value: "Bottled Water Company",
  },
  {
    label: "Bottled Water Supplier",
    value: "Bottled Water Supplier",
  },
  {
    label: "Boutique Store",
    value: "Boutique Store",
  },
  {
    label: "Bowling Alley",
    value: "Bowling Alley",
  },
  {
    label: "Boxing Studio",
    value: "Boxing Studio",
  },
  {
    label: "Brand",
    value: "Brand",
  },
  {
    label: "Brand/Company Type",
    value: "Brand/Company Type",
  },
  {
    label: "Brazilian Restaurant",
    value: "Brazilian Restaurant",
  },
  {
    label: "Breakfast & Brunch Restaurant",
    value: "Breakfast & Brunch Restaurant",
  },
  {
    label: "Brewery",
    value: "Brewery",
  },
  {
    label: "Bridal Shop",
    value: "Bridal Shop",
  },
  {
    label: "Bridge",
    value: "Bridge",
  },
  {
    label: "British Restaurant",
    value: "British Restaurant",
  },
  {
    label: "Broadcasting & Media Production Company",
    value: "Broadcasting & Media Production Company",
  },
  {
    label: "Brokerage Firm",
    value: "Brokerage Firm",
  },
  {
    label: "Bubble Tea Shop",
    value: "Bubble Tea Shop",
  },
  {
    label: "Buddhist Temple",
    value: "Buddhist Temple",
  },
  {
    label: "Buffet Restaurant",
    value: "Buffet Restaurant",
  },
  {
    label: "Building Material Store",
    value: "Building Material Store",
  },
  {
    label: "Building Materials",
    value: "Building Materials",
  },
  {
    label: "Bulgarian Restaurant",
    value: "Bulgarian Restaurant",
  },
  {
    label: "Bunsik Restaurant",
    value: "Bunsik Restaurant",
  },
  {
    label: "Burger Restaurant",
    value: "Burger Restaurant",
  },
  {
    label: "Burmese Restaurant",
    value: "Burmese Restaurant",
  },
  {
    label: "Bus Line",
    value: "Bus Line",
  },
  {
    label: "Bus Station",
    value: "Bus Station",
  },
  {
    label: "Bus Tour Agency",
    value: "Bus Tour Agency",
  },
  {
    label: "Business & Economy Website",
    value: "Business & Economy Website",
  },
  {
    label: "Business Center",
    value: "Business Center",
  },
  {
    label: "Business Consultant",
    value: "Business Consultant",
  },
  {
    label: "Business Service",
    value: "Business Service",
  },
  {
    label: "Business Supply Service",
    value: "Business Supply Service",
  },
  {
    label: "Butcher Shop",
    value: "Butcher Shop",
  },
  {
    label: "Cabin",
    value: "Cabin",
  },
  {
    label: "Cabinet & Countertop Store",
    value: "Cabinet & Countertop Store",
  },
  {
    label: "Cable & Satellite Company",
    value: "Cable & Satellite Company",
  },
  {
    label: "Cafe",
    value: "Cafe",
  },
  {
    label: "Cafeteria",
    value: "Cafeteria",
  },
  {
    label: "Cajun & Creole Restaurant",
    value: "Cajun & Creole Restaurant",
  },
  {
    label: "Calabrian Restaurant",
    value: "Calabrian Restaurant",
  },
  {
    label: "Cambodian Restaurant",
    value: "Cambodian Restaurant",
  },
  {
    label: "Camera Store",
    value: "Camera Store",
  },
  {
    label: "Camera/Photo",
    value: "Camera/Photo",
  },
  {
    label: "Campground",
    value: "Campground",
  },
  {
    label: "Campus Building",
    value: "Campus Building",
  },
  {
    label: "Canadian Restaurant",
    value: "Canadian Restaurant",
  },
  {
    label: "Canal",
    value: "Canal",
  },
  {
    label: "Candy Store",
    value: "Candy Store",
  },
  {
    label: "Canoe & Kayak Rental",
    value: "Canoe & Kayak Rental",
  },
  {
    label: "Cantonese Restaurant",
    value: "Cantonese Restaurant",
  },
  {
    label: "Cape Verdean Restaurant",
    value: "Cape Verdean Restaurant",
  },
  {
    label: "Capital",
    value: "Capital",
  },
  {
    label: "Capitol Building",
    value: "Capitol Building",
  },
  {
    label: "Car Dealership",
    value: "Car Dealership",
  },
  {
    label: "Car Rental",
    value: "Car Rental",
  },
  {
    label: "Car Wash",
    value: "Car Wash",
  },
  {
    label: "Cargo & Freight Company",
    value: "Cargo & Freight Company",
  },
  {
    label: "Caribbean Restaurant",
    value: "Caribbean Restaurant",
  },
  {
    label: "Carnival Supply Store",
    value: "Carnival Supply Store",
  },
  {
    label: "Carpenter",
    value: "Carpenter",
  },
  {
    label: "Carpet & Flooring Store",
    value: "Carpet & Flooring Store",
  },
  {
    label: "Carpet Cleaner",
    value: "Carpet Cleaner",
  },
  {
    label: "Cash Advance Service",
    value: "Cash Advance Service",
  },
  {
    label: "Cash Register Services",
    value: "Cash Register Services",
  },
  {
    label: "Casino",
    value: "Casino",
  },
  {
    label: "Castilian Restaurant",
    value: "Castilian Restaurant",
  },
  {
    label: "Caterer",
    value: "Caterer",
  },
  {
    label: "Catholic Church",
    value: "Catholic Church",
  },
  {
    label: "Cattle Ranch",
    value: "Cattle Ranch",
  },
  {
    label: "Caucasian Restaurant",
    value: "Caucasian Restaurant",
  },
  {
    label: "Cave",
    value: "Cave",
  },
  {
    label: "Cemetery",
    value: "Cemetery",
  },
  {
    label: "Champagne Bar",
    value: "Champagne Bar",
  },
  {
    label: "Changhua Restaurant",
    value: "Changhua Restaurant",
  },
  {
    label: "Charity Organization",
    value: "Charity Organization",
  },
  {
    label: "Charter Bus Service",
    value: "Charter Bus Service",
  },
  {
    label: "Cheese Shop",
    value: "Cheese Shop",
  },
  {
    label: "Chemical Company",
    value: "Chemical Company",
  },
  {
    label: "Chemical Company Service",
    value: "Chemical Company Service",
  },
  {
    label: "Chicken Joint",
    value: "Chicken Joint",
  },
  {
    label: "Chicken Wings Restaurant",
    value: "Chicken Wings Restaurant",
  },
  {
    label: "Chimney Sweeper",
    value: "Chimney Sweeper",
  },
  {
    label: "Chinese Restaurant",
    value: "Chinese Restaurant",
  },
  {
    label: "Chiropractor",
    value: "Chiropractor",
  },
  {
    label: "Chocolate Shop",
    value: "Chocolate Shop",
  },
  {
    label: "Choir",
    value: "Choir",
  },
  {
    label: "Christian Church",
    value: "Christian Church",
  },
  {
    label: "Church",
    value: "Church",
  },
  {
    label: "Church of Christ",
    value: "Church of Christ",
  },
  {
    label: "Church of God",
    value: "Church of God",
  },
  {
    label: "Church of Jesus Christ of Latter-day Saints",
    value: "Church of Jesus Christ of Latter-day Saints",
  },
  {
    label: "Church of the Nazarene",
    value: "Church of the Nazarene",
  },
  {
    label: "Cigar Lounge",
    value: "Cigar Lounge",
  },
  {
    label: "Cinema",
    value: "Cinema",
  },
  {
    label: "Circus",
    value: "Circus",
  },
  {
    label: "City",
    value: "City",
  },
  {
    label: "City Infrastructure",
    value: "City Infrastructure",
  },
  {
    label: "City Tour Agency",
    value: "City Tour Agency",
  },
  {
    label: "Civic",
    value: "Civic",
  },
  {
    label: "Climbing Gym",
    value: "Climbing Gym",
  },
  {
    label: "Clinic",
    value: "Clinic",
  },
  {
    label: "Clothing (Brand)",
    value: "Clothing (Brand)",
  },
  {
    label: "Clothing Store",
    value: "Clothing Store",
  },
  {
    label: "Club",
    value: "Club",
  },
  {
    label: "Clubhouse",
    value: "Clubhouse",
  },
  {
    label: "Cluster of Excellence",
    value: "Cluster of Excellence",
  },
  {
    label: "Coach",
    value: "Coach",
  },
  {
    label: "Cocktail Bar",
    value: "Cocktail Bar",
  },
  {
    label: "Coffee Roasters",
    value: "Coffee Roasters",
  },
  {
    label: "Coffee Shop",
    value: "Coffee Shop",
  },
  {
    label: "Collectibles Store",
    value: "Collectibles Store",
  },
  {
    label: "College & University",
    value: "College & University",
  },
  {
    label: "Colombian Restaurant",
    value: "Colombian Restaurant",
  },
  {
    label: "Colorado Restaurant",
    value: "Colorado Restaurant",
  },
  {
    label: "Comedy Club",
    value: "Comedy Club",
  },
  {
    label: "Comic Bookstore",
    value: "Comic Bookstore",
  },
  {
    label: "Commercial & Industrial",
    value: "Commercial & Industrial",
  },
  {
    label: "Commercial & Industrial Equipment Supplier",
    value: "Commercial & Industrial Equipment Supplier",
  },
  {
    label: "Commercial & Industrial Equipment Supplier",
    value: "Commercial & Industrial Equipment Supplier",
  },
  {
    label: "Commercial Bank",
    value: "Commercial Bank",
  },
  {
    label: "Commercial Equipment",
    value: "Commercial Equipment",
  },
  {
    label: "Commercial Real Estate Agency",
    value: "Commercial Real Estate Agency",
  },
  {
    label: "Community",
    value: "Community",
  },
  {
    label: "Community Center",
    value: "Community Center",
  },
  {
    label: "Community College",
    value: "Community College",
  },
  {
    label: "Community Museum",
    value: "Community Museum",
  },
  {
    label: "Community Organization",
    value: "Community Organization",
  },
  {
    label: "Community Service",
    value: "Community Service",
  },
  {
    label: "Company",
    value: "Company",
  },
  {
    label: "Competition",
    value: "Competition",
  },
  {
    label: "Comprehensive & Industrial",
    value: "Comprehensive & Industrial",
  },
  {
    label: "Computer Company",
    value: "Computer Company",
  },
  {
    label: "Computer Repair Service",
    value: "Computer Repair Service",
  },
  {
    label: "Computer Store",
    value: "Computer Store",
  },
  {
    label: "Computer Training School",
    value: "Computer Training School",
  },
  {
    label: "Computers & Internet Website",
    value: "Computers & Internet Website",
  },
  {
    label: "Concert Tour",
    value: "Concert Tour",
  },
  {
    label: "Concrete Contractor",
    value: "Concrete Contractor",
  },
  {
    label: "Congregational Church",
    value: "Congregational Church",
  },
  {
    label: "Construction Company",
    value: "Construction Company",
  },
  {
    label: "Construction Service & Supply",
    value: "Construction Service & Supply",
  },
  {
    label: "Consulate & Embassy",
    value: "Consulate & Embassy",
  },
  {
    label: "Consulting Agency",
    value: "Consulting Agency",
  },
  {
    label: "Contemporary Art Museum",
    value: "Contemporary Art Museum",
  },
  {
    label: "Continental Restaurant",
    value: "Continental Restaurant",
  },
  {
    label: "Contractor",
    value: "Contractor",
  },
  {
    label: "Convention Center",
    value: "Convention Center",
  },
  {
    label: "Cooking School",
    value: "Cooking School",
  },
  {
    label: "Copywriting Service",
    value: "Copywriting Service",
  },
  {
    label: "Corporate Lawyer",
    value: "Corporate Lawyer",
  },
  {
    label: "Corporate Office",
    value: "Corporate Office",
  },
  {
    label: "Cottage",
    value: "Cottage",
  },
  {
    label: "County",
    value: "County",
  },
  {
    label: "Court",
    value: "Court",
  },
  {
    label: "Crane Service",
    value: "Crane Service",
  },
  {
    label: "Cricket Ground",
    value: "Cricket Ground",
  },
  {
    label: "Cricket Pitch",
    value: "Cricket Pitch",
  },
  {
    label: "Criminal Lawyer",
    value: "Criminal Lawyer",
  },
  {
    label: "Crisis Intervention Service",
    value: "Crisis Intervention Service",
  },
  {
    label: "Cruise Agency",
    value: "Cruise Agency",
  },
  {
    label: "Cruise Line",
    value: "Cruise Line",
  },
  {
    label: "Cuban Restaurant",
    value: "Cuban Restaurant",
  },
  {
    label: "Culinary School",
    value: "Culinary School",
  },
  {
    label: "Cultural Center",
    value: "Cultural Center",
  },
  {
    label: "Cupcake Shop",
    value: "Cupcake Shop",
  },
  {
    label: "Currency Exchange",
    value: "Currency Exchange",
  },
  {
    label: "Curtain & Blinds Store",
    value: "Curtain & Blinds Store",
  },
  {
    label: "Czech Restaurant",
    value: "Czech Restaurant",
  },
  {
    label: "Dairy Farm",
    value: "Dairy Farm",
  },
  {
    label: "Damage Restoration Service",
    value: "Damage Restoration Service",
  },
  {
    label: "Dance & Night Club",
    value: "Dance & Night Club",
  },
  {
    label: "Dance School",
    value: "Dance School",
  },
  {
    label: "Dance Studio",
    value: "Dance Studio",
  },
  {
    label: "Dancer",
    value: "Dancer",
  },
  {
    label: "Danish Restaurant",
    value: "Danish Restaurant",
  },
  {
    label: "Dating Service",
    value: "Dating Service",
  },
  {
    label: "Day Care",
    value: "Day Care",
  },
  {
    label: "Debt Collector",
    value: "Debt Collector",
  },
  {
    label: "Defense Company",
    value: "Defense Company",
  },
  {
    label: "Delicatessen",
    value: "Delicatessen",
  },
  {
    label: "Dentist & Dental Office",
    value: "Dentist & Dental Office",
  },
  {
    label: "Department Store",
    value: "Department Store",
  },
  {
    label: "Dermatologist",
    value: "Dermatologist",
  },
  {
    label: "Desert",
    value: "Desert",
  },
  {
    label: "Design & Fashion",
    value: "Design & Fashion",
  },
  {
    label: "Designer",
    value: "Designer",
  },
  {
    label: "Dessert Shop",
    value: "Dessert Shop",
  },
  {
    label: "Dim Sum Restaurant",
    value: "Dim Sum Restaurant",
  },
  {
    label: "Diner",
    value: "Diner",
  },
  {
    label: "Disc Golf Course",
    value: "Disc Golf Course",
  },
  {
    label: "Discount Store",
    value: "Discount Store",
  },
  {
    label: "Dive Bar",
    value: "Dive Bar",
  },
  {
    label: "Dive Instructor",
    value: "Dive Instructor",
  },
  {
    label: "Dive Spot",
    value: "Dive Spot",
  },
  {
    label: "Divorce & Family Lawyer",
    value: "Divorce & Family Lawyer",
  },
  {
    label: "DJ",
    value: "DJ",
  },
  {
    label: "Doctor",
    value: "Doctor",
  },
  {
    label: "Documentary",
    value: "Documentary",
  },
  {
    label: "Dog Day Care Center",
    value: "Dog Day Care Center",
  },
  {
    label: "Dog Park",
    value: "Dog Park",
  },
  {
    label: "Dog Trainer",
    value: "Dog Trainer",
  },
  {
    label: "Dog Walker",
    value: "Dog Walker",
  },
  {
    label: "Dogsled Tour Agency",
    value: "Dogsled Tour Agency",
  },
  {
    label: "Donut Shop",
    value: "Donut Shop",
  },
  {
    label: "Drafting Service",
    value: "Drafting Service",
  },
  {
    label: "Drama School",
    value: "Drama School",
  },
  {
    label: "Dress Shop",
    value: "Dress Shop",
  },
  {
    label: "Driving School",
    value: "Driving School",
  },
  {
    label: "DUI Lawyer",
    value: "DUI Lawyer",
  },
  {
    label: "E-cigarette Store",
    value: "E-cigarette Store",
  },
  {
    label: "Eastern European Restaurant",
    value: "Eastern European Restaurant",
  },
  {
    label: "Eco Tour Agency",
    value: "Eco Tour Agency",
  },
  {
    label: "E-commerce Website",
    value: "E-commerce Website",
  },
  {
    label: "Editor",
    value: "Editor",
  },
  {
    label: "Education",
    value: "Education",
  },
  {
    label: "Education Company",
    value: "Education Company",
  },
  {
    label: "Education Website",
    value: "Education Website",
  },
  {
    label: "Educational Consultant",
    value: "Educational Consultant",
  },
  {
    label: "Educational Research Center",
    value: "Educational Research Center",
  },
  {
    label: "Educational Supply Store",
    value: "Educational Supply Store",
  },
  {
    label: "Elevator Service",
    value: "Elevator Service",
  },
  {
    label: "Emergency Rescue Service",
    value: "Emergency Rescue Service",
  },
  {
    label: "Emergency Roadside Service",
    value: "Emergency Roadside Service",
  },
  {
    label: "Emergency Veterinarian",
    value: "Emergency Veterinarian",
  },
  {
    label: "Employment Agency",
    value: "Employment Agency",
  },
  {
    label: "Endocrinologist",
    value: "Endocrinologist",
  },
  {
    label: "Endodontist",
    value: "Endodontist",
  },
  {
    label: "Engineering Service",
    value: "Engineering Service",
  },
  {
    label: "Entertainer",
    value: "Entertainer",
  },
  {
    label: "Entertainment",
    value: "Entertainment",
  },
  {
    label: "Entertainment Website",
    value: "Entertainment Website",
  },
  {
    label: "Entrepreneur",
    value: "Entrepreneur",
  },
  {
    label: "Environmental Conservation Organization",
    value: "Environmental Conservation Organization",
  },
  {
    label: "Environmental Engineer",
    value: "Environmental Engineer",
  },
  {
    label: "Environmental Service",
    value: "Environmental Service",
  },
  {
    label: "Episode",
    value: "Episode",
  },
  {
    label: "Equestrian Center",
    value: "Equestrian Center",
  },
  {
    label: "Escape Game Room",
    value: "Escape Game Room",
  },
  {
    label: "Espresso Bar",
    value: "Espresso Bar",
  },
  {
    label: "Estate Planning Lawyer",
    value: "Estate Planning Lawyer",
  },
  {
    label: "Ethiopian Restaurant",
    value: "Ethiopian Restaurant",
  },
  {
    label: "Ethnic Grocery Store",
    value: "Ethnic Grocery Store",
  },
  {
    label: "European Restaurant",
    value: "European Restaurant",
  },
  {
    label: "Evangelical Church",
    value: "Evangelical Church",
  },
  {
    label: "Event",
    value: "Event",
  },
  {
    label: "Event Videographer",
    value: "Event Videographer",
  },
  {
    label: "Exotic Car Rental",
    value: "Exotic Car Rental",
  },
  {
    label: "Expat",
    value: "Expat",
  },
  {
    label: "Eye Doctor",
    value: "Eye Doctor",
  },
  {
    label: "Eyewear",
    value: "Eyewear",
  },
  {
    label: "Fabric Store",
    value: "Fabric Store",
  },
  {
    label: "Face Painting",
    value: "Face Painting",
  },
  {
    label: "Factory",
    value: "Factory",
  },
  {
    label: "Family Doctor",
    value: "Family Doctor",
  },
  {
    label: "Family Medicine Practice",
    value: "Family Medicine Practice",
  },
  {
    label: "Family Style Restaurant",
    value: "Family Style Restaurant",
  },
  {
    label: "Farm",
    value: "Farm",
  },
  {
    label: "Farmers Market",
    value: "Farmers Market",
  },
  {
    label: "Farmers' Market",
    value: "Farmers' Market",
  },
  {
    label: "Fashion",
    value: "Fashion",
  },
  {
    label: "Fashion Company",
    value: "Fashion Company",
  },
  {
    label: "Fashion Designer",
    value: "Fashion Designer",
  },
  {
    label: "Fashion Model",
    value: "Fashion Model",
  },
  {
    label: "Fast Food Restaurant",
    value: "Fast Food Restaurant",
  },
  {
    label: "Ferry & Boat",
    value: "Ferry & Boat",
  },
  {
    label: "Festival",
    value: "Festival",
  },
  {
    label: "Field of Study",
    value: "Field of Study",
  },
  {
    label: "Filipino Restaurant",
    value: "Filipino Restaurant",
  },
  {
    label: "Film",
    value: "Film",
  },
  {
    label: "Film Director",
    value: "Film Director",
  },
  {
    label: "Film/Television studio",
    value: "Film/Television studio",
  },
  {
    label: "Finance",
    value: "Finance",
  },
  {
    label: "Finance Company",
    value: "Finance Company",
  },
  {
    label: "Finance Website",
    value: "Finance Website",
  },
  {
    label: "Financial Aid Service",
    value: "Financial Aid Service",
  },
  {
    label: "Financial Consultant",
    value: "Financial Consultant",
  },
  {
    label: "Financial Planner",
    value: "Financial Planner",
  },
  {
    label: "Financial Service",
    value: "Financial Service",
  },
  {
    label: "Fire Protection Service",
    value: "Fire Protection Service",
  },
  {
    label: "Fireplace Store",
    value: "Fireplace Store",
  },
  {
    label: "Fish & Chips Restaurant",
    value: "Fish & Chips Restaurant",
  },
  {
    label: "Fish Market",
    value: "Fish Market",
  },
  {
    label: "Fishing Spot",
    value: "Fishing Spot",
  },
  {
    label: "Fishing Store",
    value: "Fishing Store",
  },
  {
    label: "Fitness Boot Camp",
    value: "Fitness Boot Camp",
  },
  {
    label: "Fitness Model",
    value: "Fitness Model",
  },
  {
    label: "Fitness Trainer",
    value: "Fitness Trainer",
  },
  {
    label: "Fjord/Loch",
    value: "Fjord/Loch",
  },
  {
    label: "Flea Market",
    value: "Flea Market",
  },
  {
    label: "Flight School",
    value: "Flight School",
  },
  {
    label: "Float Spa",
    value: "Float Spa",
  },
  {
    label: "Floodplain",
    value: "Floodplain",
  },
  {
    label: "Flooring Store",
    value: "Flooring Store",
  },
  {
    label: "Florist",
    value: "Florist",
  },
  {
    label: "Food & Beverage",
    value: "Food & Beverage",
  },
  {
    label: "Food & Beverage Company",
    value: "Food & Beverage Company",
  },
  {
    label: "Food Consultant",
    value: "Food Consultant",
  },
  {
    label: "Food Delivery Service",
    value: "Food Delivery Service",
  },
  {
    label: "Food Stand",
    value: "Food Stand",
  },
  {
    label: "Food Tour Agency",
    value: "Food Tour Agency",
  },
  {
    label: "Food Truck",
    value: "Food Truck",
  },
  {
    label: "Footwear Store",
    value: "Footwear Store",
  },
  {
    label: "Forestry & Logging",
    value: "Forestry & Logging",
  },
  {
    label: "Forestry Service",
    value: "Forestry Service",
  },
  {
    label: "Forklifts & Excavators",
    value: "Forklifts & Excavators",
  },
  {
    label: "Formal Wear Store",
    value: "Formal Wear Store",
  },
  {
    label: "Franchising Service",
    value: "Franchising Service",
  },
  {
    label: "French Restaurant",
    value: "French Restaurant",
  },
  {
    label: "Freestyle Rap",
    value: "Freestyle Rap",
  },
  {
    label: "Freight Forwarding Service",
    value: "Freight Forwarding Service",
  },
  {
    label: "French Restaurant",
    value: "French Restaurant",
  },
  {
    label: "Friuli Venezia Giulia Restaurant",
    value: "Friuli Venezia Giulia Restaurant",
  },
  {
    label: "Frozen Yogurt Shop",
    value: "Frozen Yogurt Shop",
  },
  {
    label: "Fruit & Vegetable Store",
    value: "Fruit & Vegetable Store",
  },
  {
    label: "Fujian Restaurant",
    value: "Fujian Restaurant",
  },
  {
    label: "Full Gospel Church",
    value: "Full Gospel Church",
  },
  {
    label: "Funeral Service & Cemetery",
    value: "Funeral Service & Cemetery",
  },
  {
    label: "Furniture",
    value: "Furniture",
  },
  {
    label: "Furniture Repair & Upholstery Service",
    value: "Furniture Repair & Upholstery Service",
  },
  {
    label: "Furniture Store",
    value: "Furniture Store",
  },
  {
    label: "Game Publisher",
    value: "Game Publisher",
  },
  {
    label: "Gamer",
    value: "Gamer",
  },
  {
    label: "Games/Toys",
    value: "Games/Toys",
  },
  {
    label: "Gaming Video Creator",
    value: "Gaming Video Creator",
  },
  {
    label: "Garage Door Service",
    value: "Garage Door Service",
  },
  {
    label: "Garden Center",
    value: "Garden Center",
  },
  {
    label: "Gardener",
    value: "Gardener",
  },
  {
    label: "Gas & Chemical Service",
    value: "Gas & Chemical Service",
  },
  {
    label: "Gas Station",
    value: "Gas Station",
  },
  {
    label: "Gastroenterologist",
    value: "Gastroenterologist",
  },
  {
    label: "Gastropub",
    value: "Gastropub",
  },
  {
    label: "Gay Bar",
    value: "Gay Bar",
  },
  {
    label: "Gelato Shop",
    value: "Gelato Shop",
  },
  {
    label: "Genealogist",
    value: "Genealogist",
  },
  {
    label: "General Dentist",
    value: "General Dentist",
  },
  {
    label: "General Litigation",
    value: "General Litigation",
  },
  {
    label: "Geo Entity",
    value: "Geo Entity",
  },
  {
    label: "Geographical Place",
    value: "Geographical Place",
  },
  {
    label: "Geologic Service",
    value: "Geologic Service",
  },
  {
    label: "Georgian Restaurant",
    value: "Georgian Restaurant",
  },
  {
    label: "German Restaurant",
    value: "German Restaurant",
  },
  {
    label: "Gerontologist",
    value: "Gerontologist",
  },
  {
    label: "Gift Shop",
    value: "Gift Shop",
  },
  {
    label: "Glacier",
    value: "Glacier",
  },
  {
    label: "Glass & Mirror Shop",
    value: "Glass & Mirror Shop",
  },
  {
    label: "Glass Blower",
    value: "Glass Blower",
  },
  {
    label: "Glass Manufacturer",
    value: "Glass Manufacturer",
  },
  {
    label: "Glass Service",
    value: "Glass Service",
  },
  {
    label: "Gluten-Free Restaurant",
    value: "Gluten-Free Restaurant",
  },
  {
    label: "Goan Restaurant",
    value: "Goan Restaurant",
  },
  {
    label: "Go-Kart Track",
    value: "Go-Kart Track",
  },
  {
    label: "Golf Course & Country Club",
    value: "Golf Course & Country Club",
  },
  {
    label: "Golf Instructor",
    value: "Golf Instructor",
  },
  {
    label: "Granite & Marble Supplier",
    value: "Granite & Marble Supplier",
  },
  {
    label: "Graphic Designer",
    value: "Graphic Designer",
  },
  {
    label: "Greek Restaurant",
    value: "Greek Restaurant",
  },
  {
    label: "Grocery Store",
    value: "Grocery Store",
  },
  {
    label: "Guatemalan Restaurant",
    value: "Guatemalan Restaurant",
  },
  {
    label: "Guizhou Restaurant",
    value: "Guizhou Restaurant",
  },
  {
    label: "Gujarati Restaurant",
    value: "Gujarati Restaurant",
  },
  {
    label: "Gukbap Restaurant",
    value: "Gukbap Restaurant",
  },
  {
    label: "Gun Range",
    value: "Gun Range",
  },
  {
    label: "Gun Store",
    value: "Gun Store",
  },
  {
    label: "Gutter Cleaning Service",
    value: "Gutter Cleaning Service",
  },
  {
    label: "Gym/Physical Fitness Center",
    value: "Gym/Physical Fitness Center",
  },
  {
    label: "Gymnastics Center",
    value: "Gymnastics Center",
  },
  {
    label: "Hainan Restaurant",
    value: "Hainan Restaurant",
  },
  {
    label: "Hair Extensions Service",
    value: "Hair Extensions Service",
  },
  {
    label: "Hair Removal Service",
    value: "Hair Removal Service",
  },
  {
    label: "Hair Replacement Service",
    value: "Hair Replacement Service",
  },
  {
    label: "Hair Salon",
    value: "Hair Salon",
  },
  {
    label: "Haitian Restaurant",
    value: "Haitian Restaurant",
  },
  {
    label: "Halal Restaurant",
    value: "Halal Restaurant",
  },
  {
    label: "Halfway House",
    value: "Halfway House",
  },
  {
    label: "Handyman",
    value: "Handyman",
  },
  {
    label: "Hang Gliding Center",
    value: "Hang Gliding Center",
  },
  {
    label: "Harbor",
    value: "Harbor",
  },
  {
    label: "Hardware Store",
    value: "Hardware Store",
  },
  {
    label: "Harmonized Page",
    value: "Harmonized Page",
  },
  {
    label: "Hat Store",
    value: "Hat Store",
  },
  {
    label: "Hawaiian Restaurant",
    value: "Hawaiian Restaurant",
  },
  {
    label: "Health & Wellness Website",
    value: "Health & Wellness Website",
  },
  {
    label: "Health Food Restaurant",
    value: "Health Food Restaurant",
  },
  {
    label: "Health Food Store",
    value: "Health Food Store",
  },
  {
    label: "Health Spa",
    value: "Health Spa",
  },
  {
    label: "Health/Beauty",
    value: "Health/Beauty",
  },
  {
    label: "Healthcare Administrator",
    value: "Healthcare Administrator",
  },
  {
    label: "Heating, Ventilating & Air Conditioning Service",
    value: "Heating, Ventilating & Air Conditioning Service",
  },
  {
    label: "Hedge Fund",
    value: "Hedge Fund",
  },
  {
    label: "Heliport",
    value: "Heliport",
  },
  {
    label: "Henan Restaurant",
    value: "Henan Restaurant",
  },
  {
    label: "Hessian Restaurant",
    value: "Hessian Restaurant",
  },
  {
    label: "High School",
    value: "High School",
  },
  {
    label: "Highway",
    value: "Highway",
  },
  {
    label: "Hiking Trail",
    value: "Hiking Trail",
  },
  {
    label: "Himalayan Restaurant",
    value: "Himalayan Restaurant",
  },
  {
    label: "Hindu Temple",
    value: "Hindu Temple",
  },
  {
    label: "Historical Tour Agency",
    value: "Historical Tour Agency",
  },
  {
    label: "Hobby Store",
    value: "Hobby Store",
  },
  {
    label: "Hockey Arena",
    value: "Hockey Arena",
  },
  {
    label: "Hockey Field / Rink",
    value: "Hockey Field / Rink",
  },
  {
    label: "Holiness Church",
    value: "Holiness Church",
  },
  {
    label: "Home",
    value: "Home",
  },
  {
    label: "Home & Garden Store",
    value: "Home & Garden Store",
  },
  {
    label: "Home & Garden Website",
    value: "Home & Garden Website",
  },
  {
    label: "Home Decor",
    value: "Home Decor",
  },
  {
    label: "Home Goods Store",
    value: "Home Goods Store",
  },
  {
    label: "Home Health Care Service",
    value: "Home Health Care Service",
  },
  {
    label: "Home Improvement",
    value: "Home Improvement",
  },
  {
    label: "Home Inspector",
    value: "Home Inspector",
  },
  {
    label: "Home Mover",
    value: "Home Mover",
  },
  {
    label: "Home Security Company",
    value: "Home Security Company",
  },
  {
    label: "Home Staging Service",
    value: "Home Staging Service",
  },
  {
    label: "Home Theater Store",
    value: "Home Theater Store",
  },
  {
    label: "Home Window Service",
    value: "Home Window Service",
  },
  {
    label: "Homebrew Supply Store",
    value: "Homebrew Supply Store",
  },
  {
    label: "Honduran Restaurant",
    value: "Honduran Restaurant",
  },
  {
    label: "Hong Kong Restaurant",
    value: "Hong Kong Restaurant",
  },
  {
    label: "Hookah Lounge",
    value: "Hookah Lounge",
  },
  {
    label: "Horse Riding School",
    value: "Horse Riding School",
  },
  {
    label: "Horse Trainer",
    value: "Horse Trainer",
  },
  {
    label: "Horseback Riding Center",
    value: "Horseback Riding Center",
  },
  {
    label: "Horse-Drawn Carriage Service",
    value: "Horse-Drawn Carriage Service",
  },
  {
    label: "Hospice",
    value: "Hospice",
  },
  {
    label: "Hospital",
    value: "Hospital",
  },
  {
    label: "Hospitality Service",
    value: "Hospitality Service",
  },
  {
    label: "Hostel",
    value: "Hostel",
  },
  {
    label: "Hot Air Balloon Tour Agency",
    value: "Hot Air Balloon Tour Agency",
  },
  {
    label: "Hot Dog Joint",
    value: "Hot Dog Joint",
  },
  {
    label: "Hot Pot Restaurant",
    value: "Hot Pot Restaurant",
  },
  {
    label: "Hot Spring",
    value: "Hot Spring",
  },
  {
    label: "Hotel",
    value: "Hotel",
  },
  {
    label: "Hotel & Lodging",
    value: "Hotel & Lodging",
  },
  {
    label: "Hotel Bar",
    value: "Hotel Bar",
  },
  {
    label: "Hotel Resort",
    value: "Hotel Resort",
  },
  {
    label: "Hotel Services Company",
    value: "Hotel Services Company",
  },
  {
    label: "House Painting",
    value: "House Painting",
  },
  {
    label: "House Sitter",
    value: "House Sitter",
  },
  {
    label: "Household Supplies",
    value: "Household Supplies",
  },
  {
    label: "Housing & Homeless Shelter",
    value: "Housing & Homeless Shelter",
  },
  {
    label: "Housing Assistance Service",
    value: "Housing Assistance Service",
  },
  {
    label: "Huaiyang Restaurant",
    value: "Huaiyang Restaurant",
  },
  {
    label: "Hubei Restaurant",
    value: "Hubei Restaurant",
  },
  {
    label: "Hunan Restaurant",
    value: "Hunan Restaurant",
  },
  {
    label: "Hungarian Restaurant",
    value: "Hungarian Restaurant",
  },
  {
    label: "Hyderabadi Restaurant",
    value: "Hyderabadi Restaurant",
  },
  {
    label: "Iberian Restaurant",
    value: "Iberian Restaurant",
  },
  {
    label: "Ice Cream Shop",
    value: "Ice Cream Shop",
  },
  {
    label: "Ice Skating Rink",
    value: "Ice Skating Rink",
  },
  {
    label: "Image Consultant",
    value: "Image Consultant",
  },
  {
    label: "Immigration Lawyer",
    value: "Immigration Lawyer",
  },
  {
    label: "Imperial Restaurant",
    value: "Imperial Restaurant",
  },
  {
    label: "Independent Bookstore",
    value: "Independent Bookstore",
  },
  {
    label: "Independent Church",
    value: "Independent Church",
  },
  {
    label: "Indian Chinese Restaurant",
    value: "Indian Chinese Restaurant",
  },
  {
    label: "Indian Restaurant",
    value: "Indian Restaurant",
  },
  {
    label: "Indo Chinese Restaurant",
    value: "Indo Chinese Restaurant",
  },
  {
    label: "Indonesian Restaurant",
    value: "Indonesian Restaurant",
  },
  {
    label: "Industrial Company",
    value: "Industrial Company",
  },
  {
    label: "Information Technology Company",
    value: "Information Technology Company",
  },
  {
    label: "In-Home Service",
    value: "In-Home Service",
  },
  {
    label: "Inn",
    value: "Inn",
  },
  {
    label: "Insurance Agent",
    value: "Insurance Agent",
  },
  {
    label: "Insurance Broker",
    value: "Insurance Broker",
  },
  {
    label: "Insurance Company",
    value: "Insurance Company",
  },
  {
    label: "Intellectual Property Lawyer",
    value: "Intellectual Property Lawyer",
  },
  {
    label: "Interdenominational Church",
    value: "Interdenominational Church",
  },
  {
    label: "Interest",
    value: "Interest",
  },
  {
    label: "Intergovernmental Organization",
    value: "Intergovernmental Organization",
  },
  {
    label: "Interior Design Studio",
    value: "Interior Design Studio",
  },
  {
    label: "Internet Cafe",
    value: "Internet Cafe",
  },
  {
    label: "Internet Company",
    value: "Internet Company",
  },
  {
    label: "Internet Lawyer",
    value: "Internet Lawyer",
  },
  {
    label: "Internet Service Provider",
    value: "Internet Service Provider",
  },
  {
    label: "Internist (Internal Medicine)",
    value: "Internist (Internal Medicine)",
  },
  {
    label: "Inventory Control Service",
    value: "Inventory Control Service",
  },
  {
    label: "Investing Service",
    value: "Investing Service",
  },
  {
    label: "Investment Bank",
    value: "Investment Bank",
  },
  {
    label: "Investment Management Company",
    value: "Investment Management Company",
  },
  {
    label: "Irani Restaurant",
    value: "Irani Restaurant",
  },
  {
    label: "Irish Pub",
    value: "Irish Pub",
  },
  {
    label: "Irish Restaurant",
    value: "Irish Restaurant",
  },
  {
    label: "Island",
    value: "Island",
  },
  {
    label: "Israeli Restaurant",
    value: "Israeli Restaurant",
  },
  {
    label: "Italian Restaurant",
    value: "Italian Restaurant",
  },
  {
    label: "Jain Restaurant",
    value: "Jain Restaurant",
  },
  {
    label: "Jamaican Restaurant",
    value: "Jamaican Restaurant",
  },
  {
    label: "Janguh Restaurant",
    value: "Janguh Restaurant",
  },
  {
    label: "Janitorial Service",
    value: "Janitorial Service",
  },
  {
    label: "Japanese Restaurant",
    value: "Japanese Restaurant",
  },
  {
    label: "Javanese Restaurant",
    value: "Javanese Restaurant",
  },
  {
    label: "Jet Ski Rental",
    value: "Jet Ski Rental",
  },
  {
    label: "Jewelry & Watches Company",
    value: "Jewelry & Watches Company",
  },
  {
    label: "Jewelry & Watches Store",
    value: "Jewelry & Watches Store",
  },
  {
    label: "Jewelry Wholesaler",
    value: "Jewelry Wholesaler",
  },
  {
    label: "Jewelry/Watches",
    value: "Jewelry/Watches",
  },
  {
    label: "Jiangsu Restaurant",
    value: "Jiangsu Restaurant",
  },
  {
    label: "Jiangxi Restaurant",
    value: "Jiangxi Restaurant",
  },
  {
    label: "Journalist",
    value: "Journalist",
  },
  {
    label: "Junior High School",
    value: "Junior High School",
  },
  {
    label: "Junkyard",
    value: "Junkyard",
  },
  {
    label: "Just For Fun",
    value: "Just For Fun",
  },
  {
    label: "Juvenile Lawyer",
    value: "Juvenile Lawyer",
  },
  {
    label: "Kaiseki Restaurant",
    value: "Kaiseki Restaurant",
  },
  {
    label: "Karnataka Restaurant",
    value: "Karnataka Restaurant",
  },
  {
    label: "Kashmiri Restaurant",
    value: "Kashmiri Restaurant",
  },
  {
    label: "Kebab Shop",
    value: "Kebab Shop",
  },
  {
    label: "Kennel",
    value: "Kennel",
  },
  {
    label: "Kerala Restaurant",
    value: "Kerala Restaurant",
  },
  {
    label: "Kids Entertainment Service",
    value: "Kids Entertainment Service",
  },
  {
    label: "Kingdom Hall",
    value: "Kingdom Hall",
  },
  {
    label: "Kitchen & Bath Contractor",
    value: "Kitchen & Bath Contractor",
  },
  {
    label: "Kitchen/Cooking",
    value: "Kitchen/Cooking",
  },
  {
    label: "Kiteboarding Center",
    value: "Kiteboarding Center",
  },
  {
    label: "Korean Restaurant",
    value: "Korean Restaurant",
  },
  {
    label: "Kosher Restaurant",
    value: "Kosher Restaurant",
  },
  {
    label: "Kurdish Restaurant",
    value: "Kurdish Restaurant",
  },
  {
    label: "Kushikatsu Restaurant",
    value: "Kushikatsu Restaurant",
  },
  {
    label: "Labor & Employment Lawyer",
    value: "Labor & Employment Lawyer",
  },
  {
    label: "Labor Union",
    value: "Labor Union",
  },
  {
    label: "Lake",
    value: "Lake",
  },
  {
    label: "Landlord & Tenant Lawyer",
    value: "Landlord & Tenant Lawyer",
  },
  {
    label: "Landmark & Historical Place",
    value: "Landmark & Historical Place",
  },
  {
    label: "Landscape Company",
    value: "Landscape Company",
  },
  {
    label: "Language",
    value: "Language",
  },
  {
    label: "Language School",
    value: "Language School",
  },
  {
    label: "Large Geo Area",
    value: "Large Geo Area",
  },
  {
    label: "Laser Hair Removal Service",
    value: "Laser Hair Removal Service",
  },
  {
    label: "Laser Tag Center",
    value: "Laser Tag Center",
  },
  {
    label: "Lasik/Laser Eye Surgeon",
    value: "Lasik/Laser Eye Surgeon",
  },
  {
    label: "Latin American Restaurant",
    value: "Latin American Restaurant",
  },
  {
    label: "Laundromat",
    value: "Laundromat",
  },
  {
    label: "Law Enforcement Agency",
    value: "Law Enforcement Agency",
  },
  {
    label: "Lawyer & Law Firm",
    value: "Lawyer & Law Firm",
  },
  {
    label: "Lebanese Restaurant",
    value: "Lebanese Restaurant",
  },
  {
    label: "Legal",
    value: "Legal",
  },
  {
    label: "Legal Service",
    value: "Legal Service",
  },
  {
    label: "Library",
    value: "Library",
  },
  {
    label: "Light Rail Station",
    value: "Light Rail Station",
  },
  {
    label: "Lighthouse",
    value: "Lighthouse",
  },
  {
    label: "Lighting Store",
    value: "Lighting Store",
  },
  {
    label: "Ligurian Restaurant",
    value: "Ligurian Restaurant",
  },
  {
    label: "Limo Service",
    value: "Limo Service",
  },
  {
    label: "Lingerie & Underwear Store",
    value: "Lingerie & Underwear Store",
  },
  {
    label: "Literary Arts",
    value: "Literary Arts",
  },
  {
    label: "Live & Raw Food Restaurant",
    value: "Live & Raw Food Restaurant",
  },
  {
    label: "Livery Stable",
    value: "Livery Stable",
  },
  {
    label: "Loan Service",
    value: "Loan Service",
  },
  {
    label: "Lobbyist",
    value: "Lobbyist",
  },
  {
    label: "Local & Travel Website",
    value: "Local & Travel Website",
  },
  {
    label: "Local Service",
    value: "Local Service",
  },
  {
    label: "Locality",
    value: "Locality",
  },
  {
    label: "Locksmith",
    value: "Locksmith",
  },
  {
    label: "Lodge",
    value: "Lodge",
  },
  {
    label: "Logging Contractor",
    value: "Logging Contractor",
  },
  {
    label: "Lombard Restaurant",
    value: "Lombard Restaurant",
  },
  {
    label: "Lottery Retailer",
    value: "Lottery Retailer",
  },
  {
    label: "Lounge",
    value: "Lounge",
  },
  {
    label: "Luggage Service",
    value: "Luggage Service",
  },
  {
    label: "Lumber Yard",
    value: "Lumber Yard",
  },
  {
    label: "Lutheran Church",
    value: "Lutheran Church",
  },
  {
    label: "Macanese Restaurant",
    value: "Macanese Restaurant",
  },
  {
    label: "Machine Shop",
    value: "Machine Shop",
  },
  {
    label: "Magazine",
    value: "Magazine",
  },
  {
    label: "Magician",
    value: "Magician",
  },
  {
    label: "Maharashtrian Restaurant",
    value: "Maharashtrian Restaurant",
  },
  {
    label: "Maid & Butler",
    value: "Maid & Butler",
  },
  {
    label: "Makeup Artist",
    value: "Makeup Artist",
  },
  {
    label: "Malaysian Restaurant",
    value: "Malaysian Restaurant",
  },
  {
    label: "Malpractice Lawyer",
    value: "Malpractice Lawyer",
  },
  {
    label: "Manadonese Restaurant",
    value: "Manadonese Restaurant",
  },
  {
    label: "Management Service",
    value: "Management Service",
  },
  {
    label: "Manchu Restaurant",
    value: "Manchu Restaurant",
  },
  {
    label: "Manufacturer/Supplier",
    value: "Manufacturer/Supplier",
  },
  {
    label: "Marche Restaurant",
    value: "Marche Restaurant",
  },
  {
    label: "Marina",
    value: "Marina",
  },
  {
    label: "Marine Service Station",
    value: "Marine Service Station",
  },
  {
    label: "Marine Supply Store",
    value: "Marine Supply Store",
  },
  {
    label: "Marriage Therapist",
    value: "Marriage Therapist",
  },
  {
    label: "Martial Arts School",
    value: "Martial Arts School",
  },
  {
    label: "Masonry Contractor",
    value: "Masonry Contractor",
  },
  {
    label: "Massage School",
    value: "Massage School",
  },
  {
    label: "Massage Service",
    value: "Massage Service",
  },
  {
    label: "Massage Therapist",
    value: "Massage Therapist",
  },
  {
    label: "Maternity & Nursing Clothing Store",
    value: "Maternity & Nursing Clothing Store",
  },
  {
    label: "Maternity Clinic",
    value: "Maternity Clinic",
  },
  {
    label: "Mattress Manufacturer",
    value: "Mattress Manufacturer",
  },
  {
    label: "Mattress Store",
    value: "Mattress Store",
  },
  {
    label: "Mattress Wholesaler",
    value: "Mattress Wholesaler",
  },
  {
    label: "Meat Wholesaler",
    value: "Meat Wholesaler",
  },
  {
    label: "Media",
    value: "Media",
  },
  {
    label: "Media Restoration Service",
    value: "Media Restoration Service",
  },
  {
    label: "Media/News Company",
    value: "Media/News Company",
  },
  {
    label: "Medical & Health",
    value: "Medical & Health",
  },
  {
    label: "Medical Cannabis Dispensary",
    value: "Medical Cannabis Dispensary",
  },
  {
    label: "Medical Center",
    value: "Medical Center",
  },
  {
    label: "Medical Device Company",
    value: "Medical Device Company",
  },
  {
    label: "Medical Equipment Manufacturer",
    value: "Medical Equipment Manufacturer",
  },
  {
    label: "Medical Equipment Supplier",
    value: "Medical Equipment Supplier",
  },
  {
    label: "Medical Lab",
    value: "Medical Lab",
  },
  {
    label: "Medical Lawyer",
    value: "Medical Lawyer",
  },
  {
    label: "Medical Research Center",
    value: "Medical Research Center",
  },
  {
    label: "Medical School",
    value: "Medical School",
  },
  {
    label: "Medical Service",
    value: "Medical Service",
  },
  {
    label: "Medical Spa",
    value: "Medical Spa",
  },
  {
    label: "Medical Supply Store",
    value: "Medical Supply Store",
  },
  {
    label: "Meditation Center",
    value: "Meditation Center",
  },
  {
    label: "Mediterranean Restaurant",
    value: "Mediterranean Restaurant",
  },
  {
    label: "Medium Geo Area",
    value: "Medium Geo Area",
  },
  {
    label: "Meeting Room",
    value: "Meeting Room",
  },
  {
    label: "Mennonite Church",
    value: "Mennonite Church",
  },
  {
    label: "Men’s Clothing Store",
    value: "Men’s Clothing Store",
  },
  {
    label: "Mental Health Service",
    value: "Mental Health Service",
  },
  {
    label: "Metal & Steel Company",
    value: "Metal & Steel Company",
  },
  {
    label: "Metal Fabricator",
    value: "Metal Fabricator",
  },
  {
    label: "Metal Plating Service Company",
    value: "Metal Plating Service Company",
  },
  {
    label: "Metal Supplier",
    value: "Metal Supplier",
  },
  {
    label: "Methodist Church",
    value: "Methodist Church",
  },
  {
    label: "Metro Area",
    value: "Metro Area",
  },
  {
    label: "Mexican Restaurant",
    value: "Mexican Restaurant",
  },
  {
    label: "Middle Eastern Restaurant",
    value: "Middle Eastern Restaurant",
  },
  {
    label: "Middle School",
    value: "Middle School",
  },
  {
    label: "Military Lawyer",
    value: "Military Lawyer",
  },
  {
    label: "Miniature Golf Course",
    value: "Miniature Golf Course",
  },
  {
    label: "Mining Company",
    value: "Mining Company",
  },
  {
    label: "Mission",
    value: "Mission",
  },
  {
    label: "Mobile Home Dealer",
    value: "Mobile Home Dealer",
  },
  {
    label: "Mobile Home Park",
    value: "Mobile Home Park",
  },
  {
    label: "Mobile Phone Shop",
    value: "Mobile Phone Shop",
  },
  {
    label: "Modeling Agency",
    value: "Modeling Agency",
  },
  {
    label: "Modern European Restaurant",
    value: "Modern European Restaurant",
  },
  {
    label: "Molecular Gastronomy Restaurant",
    value: "Molecular Gastronomy Restaurant",
  },
  {
    label: "Molise Restaurant",
    value: "Molise Restaurant",
  },
  {
    label: "Mongolian Restaurant",
    value: "Mongolian Restaurant",
  },
  {
    label: "Monjayaki Restaurant",
    value: "Monjayaki Restaurant",
  },
  {
    label: "Monument",
    value: "Monument",
  },
  {
    label: "Mood",
    value: "Mood",
  },
  {
    label: "Moroccan Restaurant",
    value: "Moroccan Restaurant",
  },
  {
    label: "Mortgage Brokers",
    value: "Mortgage Brokers",
  },
  {
    label: "Mosque",
    value: "Mosque",
  },
  {
    label: "Motel",
    value: "Motel",
  },
  {
    label: "Motivational Speaker",
    value: "Motivational Speaker",
  },
  {
    label: "Motor Vehicle Company",
    value: "Motor Vehicle Company",
  },
  {
    label: "Motorcycle Manufacturer",
    value: "Motorcycle Manufacturer",
  },
  {
    label: "Motorcycle Repair Shop",
    value: "Motorcycle Repair Shop",
  },
  {
    label: "Motorsports Store",
    value: "Motorsports Store",
  },
  {
    label: "Mountain",
    value: "Mountain",
  },
  {
    label: "Mountain Biking Shop",
    value: "Mountain Biking Shop",
  },
  {
    label: "Movie",
    value: "Movie",
  },
  {
    label: "Movie & Music Store",
    value: "Movie & Music Store",
  },
  {
    label: "Movie Character",
    value: "Movie Character",
  },
  {
    label: "Movie Genre",
    value: "Movie Genre",
  },
  {
    label: "Movie/Television Studio",
    value: "Movie/Television Studio",
  },
  {
    label: "Moving & Storage Service",
    value: "Moving & Storage Service",
  },
  {
    label: "Moving Supply Store",
    value: "Moving Supply Store",
  },
  {
    label: "Mughalai Restaurant",
    value: "Mughalai Restaurant",
  },
  {
    label: "Music",
    value: "Music",
  },
  {
    label: "Music Award",
    value: "Music Award",
  },
  {
    label: "Music Chart",
    value: "Music Chart",
  },
  {
    label: "Music Lessons & Instruction School",
    value: "Music Lessons & Instruction School",
  },
  {
    label: "Music Production Studio",
    value: "Music Production Studio",
  },
  {
    label: "Music Video",
    value: "Music Video",
  },
  {
    label: "Musical Genre",
    value: "Musical Genre",
  },
  {
    label: "Musical Instrument",
    value: "Musical Instrument",
  },
  {
    label: "Musical Instrument Store",
    value: "Musical Instrument Store",
  },
  {
    label: "Musician",
    value: "Musician",
  },
  {
    label: "Musician/Band",
    value: "Musician/Band",
  },
  {
    label: "Nabe Restaurant",
    value: "Nabe Restaurant",
  },
  {
    label: "Nail Salon",
    value: "Nail Salon",
  },
  {
    label: "Nanny",
    value: "Nanny",
  },
  {
    label: "National Forest",
    value: "National Forest",
  },
  {
    label: "National Park",
    value: "National Park",
  },
  {
    label: "Nationality",
    value: "Nationality",
  },
  {
    label: "Nature Preserve",
    value: "Nature Preserve",
  },
  {
    label: "Naturopath",
    value: "Naturopath",
  },
  {
    label: "Nazarene Church",
    value: "Nazarene Church",
  },
  {
    label: "Neapolitan Restaurant",
    value: "Neapolitan Restaurant",
  },
  {
    label: "Neighborhood",
    value: "Neighborhood",
  },
  {
    label: "Nepalese Restaurant",
    value: "Nepalese Restaurant",
  },
  {
    label: "Nephrologist",
    value: "Nephrologist",
  },
  {
    label: "Neurologist",
    value: "Neurologist",
  },
  {
    label: "Neurosurgeon",
    value: "Neurosurgeon",
  },
  {
    label: "New American Restaurant",
    value: "New American Restaurant",
  },
  {
    label: "News & Media Website",
    value: "News & Media Website",
  },
  {
    label: "News Personality",
    value: "News Personality",
  },
  {
    label: "Newspaper",
    value: "Newspaper",
  },
  {
    label: "Newsstand",
    value: "Newsstand",
  },
  {
    label: "Nicaraguan Restaurant",
    value: "Nicaraguan Restaurant",
  },
  {
    label: "Nigerian Restaurant",
    value: "Nigerian Restaurant",
  },
  {
    label: "Night Market",
    value: "Night Market",
  },
  {
    label: "Non-Business Places",
    value: "Non-Business Places",
  },
  {
    label: "Nondenominational Church",
    value: "Nondenominational Church",
  },
  {
    label: "Non-Governmental Organization (NGO)",
    value: "Non-Governmental Organization (NGO)",
  },
  {
    label: "Nonprofit Organization",
    value: "Nonprofit Organization",
  },
  {
    label: "Noodle House",
    value: "Noodle House",
  },
  {
    label: "North Indian Restaurant",
    value: "North Indian Restaurant",
  },
  {
    label: "Not a Business",
    value: "Not a Business",
  },
  {
    label: "Notary Public",
    value: "Notary Public",
  },
  {
    label: "Nurseries & Gardening Store",
    value: "Nurseries & Gardening Store",
  },
  {
    label: "Nursing Agency",
    value: "Nursing Agency",
  },
  {
    label: "Nursing Home",
    value: "Nursing Home",
  },
  {
    label: "Nursing School",
    value: "Nursing School",
  },
  {
    label: "Nutritionist",
    value: "Nutritionist",
  },
  {
    label: "Obstetrician-Gynecologist (OBGYN)",
    value: "Obstetrician-Gynecologist (OBGYN)",
  },
  {
    label: "Occupational Safety and Health Service",
    value: "Occupational Safety and Health Service",
  },
  {
    label: "Occupational Therapist",
    value: "Occupational Therapist",
  },
  {
    label: "Ocean",
    value: "Ocean",
  },
  {
    label: "Office Equipment Store",
    value: "Office Equipment Store",
  },
  {
    label: "Office Supplies",
    value: "Office Supplies",
  },
  {
    label: "Oil Lube & Filter Service",
    value: "Oil Lube & Filter Service",
  },
  {
    label: "Okonomiyaki Restaurant",
    value: "Okonomiyaki Restaurant",
  },
  {
    label: "Oncologist",
    value: "Oncologist",
  },
  {
    label: "One-Time TV Program",
    value: "One-Time TV Program",
  },
  {
    label: "Onsen",
    value: "Onsen",
  },
  {
    label: "Ophthalmologist",
    value: "Ophthalmologist",
  },
  {
    label: "Optician",
    value: "Optician",
  },
  {
    label: "Optometrist",
    value: "Optometrist",
  },
  {
    label: "Oral Surgeon",
    value: "Oral Surgeon",
  },
  {
    label: "Orchestra",
    value: "Orchestra",
  },
  {
    label: "Organic Grocery Store",
    value: "Organic Grocery Store",
  },
  {
    label: "Orthodontist",
    value: "Orthodontist",
  },
  {
    label: "Orthopedist",
    value: "Orthopedist",
  },
  {
    label: "Orthotics & Prosthetics Service",
    value: "Orthotics & Prosthetics Service",
  },
  {
    label: "Osteopathic Doctor",
    value: "Osteopathic Doctor",
  },
  {
    label: "Other",
    value: "Other",
  },
  {
    label: "Otolaryngologist (ENT)",
    value: "Otolaryngologist (ENT)",
  },
  {
    label: "Outdoor & Sporting Goods Company",
    value: "Outdoor & Sporting Goods Company",
  },
  {
    label: "Outdoor Equipment Store",
    value: "Outdoor Equipment Store",
  },
  {
    label: "Outdoor Recreation",
    value: "Outdoor Recreation",
  },
  {
    label: "Outlet Store",
    value: "Outlet Store",
  },
  {
    label: "Padangnese Restaurant",
    value: "Padangnese Restaurant",
  },
  {
    label: "Paddleboarding Center",
    value: "Paddleboarding Center",
  },
  {
    label: "Paintball Center",
    value: "Paintball Center",
  },
  {
    label: "Painting Lessons",
    value: "Painting Lessons",
  },
  {
    label: "Pakistani Restaurant",
    value: "Pakistani Restaurant",
  },
  {
    label: "Palace",
    value: "Palace",
  },
  {
    label: "Palatine Restaurant",
    value: "Palatine Restaurant",
  },
  {
    label: "Panamanian Restaurant",
    value: "Panamanian Restaurant",
  },
  {
    label: "Paraguayan Restaurant",
    value: "Paraguayan Restaurant",
  },
  {
    label: "Park",
    value: "Park",
  },
  {
    label: "Parking Garage / Lot",
    value: "Parking Garage / Lot",
  },
  {
    label: "Parsi Restaurant",
    value: "Parsi Restaurant",
  },
  {
    label: "Party & Entertainment Service",
    value: "Party & Entertainment Service",
  },
  {
    label: "Party Entertainment Service",
    value: "Party Entertainment Service",
  },
  {
    label: "Party Supply & Rental Shop",
    value: "Party Supply & Rental Shop",
  },
  {
    label: "Passport & Visa Service",
    value: "Passport & Visa Service",
  },
  {
    label: "Patio/Garden",
    value: "Patio/Garden",
  },
  {
    label: "Paving & Asphalt Service",
    value: "Paving & Asphalt Service",
  },
  {
    label: "Pawn Shop",
    value: "Pawn Shop",
  },
  {
    label: "Pediatric Dentist",
    value: "Pediatric Dentist",
  },
  {
    label: "Pediatrician",
    value: "Pediatrician",
  },
  {
    label: "Pedicab Service",
    value: "Pedicab Service",
  },
  {
    label: "Pentecostal Church",
    value: "Pentecostal Church",
  },
  {
    label: "Performance Art",
    value: "Performance Art",
  },
  {
    label: "Performing Arts",
    value: "Performing Arts",
  },
  {
    label: "Performing Arts School",
    value: "Performing Arts School",
  },
  {
    label: "Periodontist",
    value: "Periodontist",
  },
  {
    label: "Persian/Iranian Restaurant",
    value: "Persian/Iranian Restaurant",
  },
  {
    label: "Personal Assistant",
    value: "Personal Assistant",
  },
  {
    label: "Personal Blog",
    value: "Personal Blog",
  },
  {
    label: "Personal Chef",
    value: "Personal Chef",
  },
  {
    label: "Personal Coach",
    value: "Personal Coach",
  },
  {
    label: "Personal Injury Lawyer",
    value: "Personal Injury Lawyer",
  },
  {
    label: "Peruvian Restaurant",
    value: "Peruvian Restaurant",
  },
  {
    label: "Pest Control Service",
    value: "Pest Control Service",
  },
  {
    label: "Pet Adoption Service",
    value: "Pet Adoption Service",
  },
  {
    label: "Pet Breeder",
    value: "Pet Breeder",
  },
  {
    label: "Pet Cafe",
    value: "Pet Cafe",
  },
  {
    label: "Pet Cemetery",
    value: "Pet Cemetery",
  },
  {
    label: "Pet Groomer",
    value: "Pet Groomer",
  },
  {
    label: "Pet Service",
    value: "Pet Service",
  },
  {
    label: "Pet Sitter",
    value: "Pet Sitter",
  },
  {
    label: "Pet Store",
    value: "Pet Store",
  },
  {
    label: "Pet Supplies",
    value: "Pet Supplies",
  },
  {
    label: "Petroleum Service",
    value: "Petroleum Service",
  },
  {
    label: "Pharmaceutical Company",
    value: "Pharmaceutical Company",
  },
  {
    label: "Pharmaceuticals",
    value: "Pharmaceuticals",
  },
  {
    label: "Pharmacy / Drugstore",
    value: "Pharmacy / Drugstore",
  },
  {
    label: "Pho Restaurant",
    value: "Pho Restaurant",
  },
  {
    label: "Phone/Tablet",
    value: "Phone/Tablet",
  },
  {
    label: "Photo Booth Service",
    value: "Photo Booth Service",
  },
  {
    label: "Photographer",
    value: "Photographer",
  },
  {
    label: "Photography Videography",
    value: "Photography Videography",
  },
  {
    label: "Physical Therapist",
    value: "Physical Therapist",
  },
  {
    label: "Picnic Ground",
    value: "Picnic Ground",
  },
  {
    label: "Piedmont Restaurant",
    value: "Piedmont Restaurant",
  },
  {
    label: "Pier",
    value: "Pier",
  },
  {
    label: "Pilates Studio",
    value: "Pilates Studio",
  },
  {
    label: "Pizza Place",
    value: "Pizza Place",
  },
  {
    label: "Plastic Company",
    value: "Plastic Company",
  },
  {
    label: "Plastic Fabricator",
    value: "Plastic Fabricator",
  },
  {
    label: "Plastic Manufacturer",
    value: "Plastic Manufacturer",
  },
  {
    label: "Plastic Surgeon",
    value: "Plastic Surgeon",
  },
  {
    label: "Playground",
    value: "Playground",
  },
  {
    label: "Playlist",
    value: "Playlist",
  },
  {
    label: "Plumbing Service",
    value: "Plumbing Service",
  },
  {
    label: "Podcast",
    value: "Podcast",
  },
  {
    label: "Podiatrist",
    value: "Podiatrist",
  },
  {
    label: "Poke Restaurant",
    value: "Poke Restaurant",
  },
  {
    label: "Polish Restaurant",
    value: "Polish Restaurant",
  },
  {
    label: "Polynesian Restaurant",
    value: "Polynesian Restaurant",
  },
  {
    label: "Pond",
    value: "Pond",
  },
  {
    label: "Pop-Up Shop",
    value: "Pop-Up Shop",
  },
  {
    label: "Port",
    value: "Port",
  },
  {
    label: "Portable Building Service",
    value: "Portable Building Service",
  },
  {
    label: "Portable Toilet Rentals",
    value: "Portable Toilet Rentals",
  },
  {
    label: "Portuguese Restaurant",
    value: "Portuguese Restaurant",
  },
  {
    label: "Postal Code",
    value: "Postal Code",
  },
  {
    label: "Powder Coating Service",
    value: "Powder Coating Service",
  },
  {
    label: "Pregnancy Care Center",
    value: "Pregnancy Care Center",
  },
  {
    label: "Presbyterian Church",
    value: "Presbyterian Church",
  },
  {
    label: "Preschool",
    value: "Preschool",
  },
  {
    label: "Printing Service",
    value: "Printing Service",
  },
  {
    label: "Private Investigator",
    value: "Private Investigator",
  },
  {
    label: "Private Members Club",
    value: "Private Members Club",
  },
  {
    label: "Private Plane Charter",
    value: "Private Plane Charter",
  },
  {
    label: "Private School",
    value: "Private School",
  },
  {
    label: "Process Service",
    value: "Process Service",
  },
  {
    label: "Proctologist",
    value: "Proctologist",
  },
  {
    label: "Producer",
    value: "Producer",
  },
  {
    label: "Product Type",
    value: "Product Type",
  },
  {
    label: "Product/Service",
    value: "Product/Service",
  },
  {
    label: "Professional Sports League",
    value: "Professional Sports League",
  },
  {
    label: "Professional Sports Team",
    value: "Professional Sports Team",
  },
  {
    label: "Profile",
    value: "Profile",
  },
  {
    label: "Promenade",
    value: "Promenade",
  },
  {
    label: "Property Lawyer",
    value: "Property Lawyer",
  },
  {
    label: "Property Management Company",
    value: "Property Management Company",
  },
  {
    label: "Prosthodontist",
    value: "Prosthodontist",
  },
  {
    label: "Province",
    value: "Province",
  },
  {
    label: "Psychiatrist",
    value: "Psychiatrist",
  },
  {
    label: "Psychologist",
    value: "Psychologist",
  },
  {
    label: "Psychotherapist",
    value: "Psychotherapist",
  },
  {
    label: "Pub",
    value: "Pub",
  },
  {
    label: "Public & Government Service",
    value: "Public & Government Service",
  },
  {
    label: "Public Figure",
    value: "Public Figure",
  },
  {
    label: "Public Garden",
    value: "Public Garden",
  },
  {
    label: "Public School",
    value: "Public School",
  },
  {
    label: "Public Service",
    value: "Public Service",
  },
  {
    label: "Public Square / Plaza",
    value: "Public Square / Plaza",
  },
  {
    label: "Public Swimming Pool",
    value: "Public Swimming Pool",
  },
  {
    label: "Public Toilet",
    value: "Public Toilet",
  },
  {
    label: "Public Utility Company",
    value: "Public Utility Company",
  },
  {
    label: "Publisher",
    value: "Publisher",
  },
  {
    label: "Puerto Rican Restaurant",
    value: "Puerto Rican Restaurant",
  },
  {
    label: "Puglia Restaurant",
    value: "Puglia Restaurant",
  },
  {
    label: "Pulmonologist",
    value: "Pulmonologist",
  },
  {
    label: "Punjabi Restaurant",
    value: "Punjabi Restaurant",
  },
  {
    label: "Quay",
    value: "Quay",
  },
  {
    label: "Racquetball Court",
    value: "Racquetball Court",
  },
  {
    label: "Radio Station",
    value: "Radio Station",
  },
  {
    label: "Radiologist",
    value: "Radiologist",
  },
  {
    label: "Rafting/Kayaking Center",
    value: "Rafting/Kayaking Center",
  },
  {
    label: "Railroad Company",
    value: "Railroad Company",
  },
  {
    label: "Railway Station",
    value: "Railway Station",
  },
  {
    label: "Rajasthani Restaurant",
    value: "Rajasthani Restaurant",
  },
  {
    label: "Ramen Restaurant",
    value: "Ramen Restaurant",
  },
  {
    label: "Real Estate",
    value: "Real Estate",
  },
  {
    label: "Real Estate Agent",
    value: "Real Estate Agent",
  },
  {
    label: "Real Estate Appraiser",
    value: "Real Estate Appraiser",
  },
  {
    label: "Real Estate Company",
    value: "Real Estate Company",
  },
  {
    label: "Real Estate Developer",
    value: "Real Estate Developer",
  },
  {
    label: "Real Estate Investment Firm",
    value: "Real Estate Investment Firm",
  },
  {
    label: "Real Estate Lawyer",
    value: "Real Estate Lawyer",
  },
  {
    label: "Real Estate Service",
    value: "Real Estate Service",
  },
  {
    label: "Real Estate Title & Development",
    value: "Real Estate Title & Development",
  },
  {
    label: "Record Label",
    value: "Record Label",
  },
  {
    label: "Recreation & Sports Website",
    value: "Recreation & Sports Website",
  },
  {
    label: "Recreation Center",
    value: "Recreation Center",
  },
  {
    label: "Recreation Spot",
    value: "Recreation Spot",
  },
  {
    label: "Recruiter",
    value: "Recruiter",
  },
  {
    label: "Recycling Center",
    value: "Recycling Center",
  },
  {
    label: "Reference Website",
    value: "Reference Website",
  },
  {
    label: "Reflexologist",
    value: "Reflexologist",
  },
  {
    label: "Refrigeration Service",
    value: "Refrigeration Service",
  },
  {
    label: "Region",
    value: "Region",
  },
  {
    label: "Regional Website",
    value: "Regional Website",
  },
  {
    label: "Religious Bookstore",
    value: "Religious Bookstore",
  },
  {
    label: "Religious Center",
    value: "Religious Center",
  },
  {
    label: "Religious Organization",
    value: "Religious Organization",
  },
  {
    label: "Religious Place of Worship",
    value: "Religious Place of Worship",
  },
  {
    label: "Religious School",
    value: "Religious School",
  },
  {
    label: "Rent to Own Store",
    value: "Rent to Own Store",
  },
  {
    label: "Rental Shop",
    value: "Rental Shop",
  },
  {
    label: "Reproductive Service",
    value: "Reproductive Service",
  },
  {
    label: "Reptile Pet Store",
    value: "Reptile Pet Store",
  },
  {
    label: "Reservoir",
    value: "Reservoir",
  },
  {
    label: "Residence",
    value: "Residence",
  },
  {
    label: "Restaurant",
    value: "Restaurant",
  },
  {
    label: "Restaurant Supply Store",
    value: "Restaurant Supply Store",
  },
  {
    label: "Restaurant Wholesaler",
    value: "Restaurant Wholesaler",
  },
  {
    label: "Retail Bank",
    value: "Retail Bank",
  },
  {
    label: "Retail Company",
    value: "Retail Company",
  },
  {
    label: "Retirement & Assisted Living Facility",
    value: "Retirement & Assisted Living Facility",
  },
  {
    label: "Rheumatologist",
    value: "Rheumatologist",
  },
  {
    label: "Rideshare Service",
    value: "Rideshare Service",
  },
  {
    label: "River",
    value: "River",
  },
  {
    label: "Robotics Company",
    value: "Robotics Company",
  },
  {
    label: "Rock Climbing Gym",
    value: "Rock Climbing Gym",
  },
  {
    label: "Rock Climbing Spot",
    value: "Rock Climbing Spot",
  },
  {
    label: "Rodeo",
    value: "Rodeo",
  },
  {
    label: "Roller Skating Rink",
    value: "Roller Skating Rink",
  },
  {
    label: "Roman Restaurant",
    value: "Roman Restaurant",
  },
  {
    label: "Romanian Restaurant",
    value: "Romanian Restaurant",
  },
  {
    label: "Roofing Service",
    value: "Roofing Service",
  },
  {
    label: "Rose Garden",
    value: "Rose Garden",
  },
  {
    label: "Rugby Pitch",
    value: "Rugby Pitch",
  },
  {
    label: "Rugby Stadium",
    value: "Rugby Stadium",
  },
  {
    label: "Russian Restaurant",
    value: "Russian Restaurant",
  },
  {
    label: "RV Park",
    value: "RV Park",
  },
  {
    label: "RV Rental",
    value: "RV Rental",
  },
  {
    label: "RV Repair Shop",
    value: "RV Repair Shop",
  },
  {
    label: "Safety & First Aid Service",
    value: "Safety & First Aid Service",
  },
  {
    label: "Sake Bar",
    value: "Sake Bar",
  },
  {
    label: "Salad Bar",
    value: "Salad Bar",
  },
  {
    label: "Salvadoran Restaurant",
    value: "Salvadoran Restaurant",
  },
  {
    label: "Samgyetang Restaurant",
    value: "Samgyetang Restaurant",
  },
  {
    label: "Sandblasting Service",
    value: "Sandblasting Service",
  },
  {
    label: "Sandwich Shop",
    value: "Sandwich Shop",
  },
  {
    label: "Sardinian Restaurant",
    value: "Sardinian Restaurant",
  },
  {
    label: "Satire/Parody",
    value: "Satire/Parody",
  },
  {
    label: "Saxon Restaurant",
    value: "Saxon Restaurant",
  },
  {
    label: "Scandinavian Restaurant",
    value: "Scandinavian Restaurant",
  },
  {
    label: "School",
    value: "School",
  },
  {
    label: "School Fundraiser",
    value: "School Fundraiser",
  },
  {
    label: "School Sports League",
    value: "School Sports League",
  },
  {
    label: "School Sports Team",
    value: "School Sports Team",
  },
  {
    label: "School Transportation Service",
    value: "School Transportation Service",
  },
  {
    label: "Science",
    value: "Science",
  },
  {
    label: "Science Website",
    value: "Science Website",
  },
  {
    label: "Science, Technology & Engineering",
    value: "Science, Technology & Engineering",
  },
  {
    label: "Scientist",
    value: "Scientist",
  },
  {
    label: "Scooter Rental",
    value: "Scooter Rental",
  },
  {
    label: "Scottish Restaurant",
    value: "Scottish Restaurant",
  },
  {
    label: "Screen Printing & Embroidery",
    value: "Screen Printing & Embroidery",
  },
  {
    label: "Scuba Diving Center",
    value: "Scuba Diving Center",
  },
  {
    label: "Scuba Instructor",
    value: "Scuba Instructor",
  },
  {
    label: "Sculpture Garden",
    value: "Sculpture Garden",
  },
  {
    label: "Seafood Restaurant",
    value: "Seafood Restaurant",
  },
  {
    label: "Seaplane Base",
    value: "Seaplane Base",
  },
  {
    label: "Seasonal Store",
    value: "Seasonal Store",
  },
  {
    label: "Secretarial Service",
    value: "Secretarial Service",
  },
  {
    label: "Security Guard Service",
    value: "Security Guard Service",
  },
  {
    label: "Self-Storage Facility",
    value: "Self-Storage Facility",
  },
  {
    label: "Senegalese Restaurant",
    value: "Senegalese Restaurant",
  },
  {
    label: "Senior Center",
    value: "Senior Center",
  },
  {
    label: "Septic Tank Service",
    value: "Septic Tank Service",
  },
  {
    label: "Service Apartments",
    value: "Service Apartments",
  },
  {
    label: "Seventh Day Adventist Church",
    value: "Seventh Day Adventist Church",
  },
  {
    label: "Sewer Service",
    value: "Sewer Service",
  },
  {
    label: "Sewing & Alterations",
    value: "Sewing & Alterations",
  },
  {
    label: "Sex Therapist",
    value: "Sex Therapist",
  },
  {
    label: "Shaanxi Restaurant",
    value: "Shaanxi Restaurant",
  },
  {
    label: "Shabu Shabu Restaurant",
    value: "Shabu Shabu Restaurant",
  },
  {
    label: "Shandong Restaurant",
    value: "Shandong Restaurant",
  },
  {
    label: "Shanghainese Restaurant",
    value: "Shanghainese Restaurant",
  },
  {
    label: "Shanxi Restaurant",
    value: "Shanxi Restaurant",
  },
  {
    label: "Shaved Ice Shop",
    value: "Shaved Ice Shop",
  },
  {
    label: "Shipping Supply & Service",
    value: "Shipping Supply & Service",
  },
  {
    label: "Shoe Repair Shop",
    value: "Shoe Repair Shop",
  },
  {
    label: "Shooting/Hunting Range",
    value: "Shooting/Hunting Range",
  },
  {
    label: "Shopping & Retail",
    value: "Shopping & Retail",
  },
  {
    label: "Shopping District",
    value: "Shopping District",
  },
  {
    label: "Shopping Mall",
    value: "Shopping Mall",
  },
  {
    label: "Shopping Service",
    value: "Shopping Service",
  },
  {
    label: "Show",
    value: "Show",
  },
  {
    label: "Shredding Service",
    value: "Shredding Service",
  },
  {
    label: "Sicilian Restaurant",
    value: "Sicilian Restaurant",
  },
  {
    label: "Sightseeing Tour Agency",
    value: "Sightseeing Tour Agency",
  },
  {
    label: "Signs & Banner Service",
    value: "Signs & Banner Service",
  },
  {
    label: "Sikh Temple",
    value: "Sikh Temple",
  },
  {
    label: "Singaporean Restaurant",
    value: "Singaporean Restaurant",
  },
  {
    label: "Skate Shop",
    value: "Skate Shop",
  },
  {
    label: "Skateboard Park",
    value: "Skateboard Park",
  },
  {
    label: "Ski & Snowboard School",
    value: "Ski & Snowboard School",
  },
  {
    label: "Ski & Snowboard Shop",
    value: "Ski & Snowboard Shop",
  },
  {
    label: "Ski Resort",
    value: "Ski Resort",
  },
  {
    label: "Skin Care Service",
    value: "Skin Care Service",
  },
  {
    label: "Skydiving Center",
    value: "Skydiving Center",
  },
  {
    label: "Slovakian Restaurant",
    value: "Slovakian Restaurant",
  },
  {
    label: "Small Geo Area",
    value: "Small Geo Area",
  },
  {
    label: "Smog Emissions Check Station",
    value: "Smog Emissions Check Station",
  },
  {
    label: "Smoothie & Juice Bar",
    value: "Smoothie & Juice Bar",
  },
  {
    label: "Snorkeling Spot",
    value: "Snorkeling Spot",
  },
  {
    label: "Soba Restaurant",
    value: "Soba Restaurant",
  },
  {
    label: "Soccer Field",
    value: "Soccer Field",
  },
  {
    label: "Soccer Stadium",
    value: "Soccer Stadium",
  },
  {
    label: "Social Club",
    value: "Social Club",
  },
  {
    label: "Social Media Company",
    value: "Social Media Company",
  },
  {
    label: "Social Service",
    value: "Social Service",
  },
  {
    label: "Society & Culture Website",
    value: "Society & Culture Website",
  },
  {
    label: "Software",
    value: "Software",
  },
  {
    label: "Software Company",
    value: "Software Company",
  },
  {
    label: "Solar Energy Company",
    value: "Solar Energy Company",
  },
  {
    label: "Solar Energy Service",
    value: "Solar Energy Service",
  },
  {
    label: "Song",
    value: "Song",
  },
  {
    label: "Sorority & Fraternity",
    value: "Sorority & Fraternity",
  },
  {
    label: "Soul Food Restaurant",
    value: "Soul Food Restaurant",
  },
  {
    label: "Soup Restaurant",
    value: "Soup Restaurant",
  },
  {
    label: "South African Restaurant",
    value: "South African Restaurant",
  },
  {
    label: "South Indian Restaurant",
    value: "South Indian Restaurant",
  },
  {
    label: "South Tyrolean Restaurant",
    value: "South Tyrolean Restaurant",
  },
  {
    label: "Southern Restaurant",
    value: "Southern Restaurant",
  },
  {
    label: "Southwestern Restaurant",
    value: "Southwestern Restaurant",
  },
  {
    label: "Souvenir Shop",
    value: "Souvenir Shop",
  },
  {
    label: "Spa",
    value: "Spa",
  },
  {
    label: "Spanish Restaurant",
    value: "Spanish Restaurant",
  },
  {
    label: "Speakeasy",
    value: "Speakeasy",
  },
  {
    label: "Specialty Grocery Store",
    value: "Specialty Grocery Store",
  },
  {
    label: "Specialty School",
    value: "Specialty School",
  },
  {
    label: "Speech Pathologist",
    value: "Speech Pathologist",
  },
  {
    label: "Speech Therapist",
    value: "Speech Therapist",
  },
  {
    label: "Spiritual Leader",
    value: "Spiritual Leader",
  },
  {
    label: "Sport Psychologist",
    value: "Sport Psychologist",
  },
  {
    label: "Sporting Goods Store",
    value: "Sporting Goods Store",
  },
  {
    label: "Sports",
    value: "Sports",
  },
  {
    label: "Sports & Fitness Instruction",
    value: "Sports & Fitness Instruction",
  },
  {
    label: "Sports & Recreation",
    value: "Sports & Recreation",
  },
  {
    label: "Sports & Recreation Venue",
    value: "Sports & Recreation Venue",
  },
  {
    label: "Sports Bar",
    value: "Sports Bar",
  },
  {
    label: "Sports Club",
    value: "Sports Club",
  },
  {
    label: "Sports Event",
    value: "Sports Event",
  },
  {
    label: "Sports League",
    value: "Sports League",
  },
  {
    label: "Sports Promoter",
    value: "Sports Promoter",
  },
  {
    label: "Sports Season",
    value: "Sports Season",
  },
  {
    label: "Sports Team",
    value: "Sports Team",
  },
  {
    label: "Sportswear Store",
    value: "Sportswear Store",
  },
  {
    label: "Squash Court",
    value: "Squash Court",
  },
  {
    label: "Sri Lankan Restaurant",
    value: "Sri Lankan Restaurant",
  },
  {
    label: "Stadium, Arena & Sports Venue",
    value: "Stadium, Arena & Sports Venue",
  },
  {
    label: "State",
    value: "State",
  },
  {
    label: "State Park",
    value: "State Park",
  },
  {
    label: "Stately Home",
    value: "Stately Home",
  },
  {
    label: "Statue & Fountain",
    value: "Statue & Fountain",
  },
  {
    label: "STD Testing Center",
    value: "STD Testing Center",
  },
  {
    label: "Steakhouse",
    value: "Steakhouse",
  },
  {
    label: "Storage Facility",
    value: "Storage Facility",
  },
  {
    label: "Street",
    value: "Street",
  },
  {
    label: "Structural Engineer",
    value: "Structural Engineer",
  },
  {
    label: "Subcity",
    value: "Subcity",
  },
  {
    label: "Subneighborhood",
    value: "Subneighborhood",
  },
  {
    label: "Subway Station",
    value: "Subway Station",
  },
  {
    label: "Sugaring Service",
    value: "Sugaring Service",
  },
  {
    label: "Sukiyaki Restaurant",
    value: "Sukiyaki Restaurant",
  },
  {
    label: "Sundanese Restaurant",
    value: "Sundanese Restaurant",
  },
  {
    label: "Sunglasses & Eyewear Store",
    value: "Sunglasses & Eyewear Store",
  },
  {
    label: "Supermarket",
    value: "Supermarket",
  },
  {
    label: "Surf Shop",
    value: "Surf Shop",
  },
  {
    label: "Surfing Spot",
    value: "Surfing Spot",
  },
  {
    label: "Surgeon",
    value: "Surgeon",
  },
  {
    label: "Surgeries",
    value: "Surgeries",
  },
  {
    label: "Surgical Center",
    value: "Surgical Center",
  },
  {
    label: "Surveyor",
    value: "Surveyor",
  },
  {
    label: "Sushi Restaurant",
    value: "Sushi Restaurant",
  },
  {
    label: "Swabian Restaurant",
    value: "Swabian Restaurant",
  },
  {
    label: "Swimming Instructor",
    value: "Swimming Instructor",
  },
  {
    label: "Swimming Pool & Hot Tub Service",
    value: "Swimming Pool & Hot Tub Service",
  },
  {
    label: "Swimming Pool Cleaner",
    value: "Swimming Pool Cleaner",
  },
  {
    label: "Swimwear Store",
    value: "Swimwear Store",
  },
  {
    label: "Swiss Restaurant",
    value: "Swiss Restaurant",
  },
  {
    label: "Symphony",
    value: "Symphony",
  },
  {
    label: "Synagogue",
    value: "Synagogue",
  },
  {
    label: "Syrian Restaurant",
    value: "Syrian Restaurant",
  },
  {
    label: "Szechuan/Sichuan Restaurant",
    value: "Szechuan/Sichuan Restaurant",
  },
  {
    label: "Taco Restaurant",
    value: "Taco Restaurant",
  },
  {
    label: "Tai Chi Studio",
    value: "Tai Chi Studio",
  },
  {
    label: "Taiwanese Restaurant",
    value: "Taiwanese Restaurant",
  },
  {
    label: "Takoyaki Restaurant",
    value: "Takoyaki Restaurant",
  },
  {
    label: "Talent Agent",
    value: "Talent Agent",
  },
  {
    label: "Tamilian Restaurant",
    value: "Tamilian Restaurant",
  },
  {
    label: "Tanning Salon",
    value: "Tanning Salon",
  },
  {
    label: "Tapas Bar & Restaurant",
    value: "Tapas Bar & Restaurant",
  },
  {
    label: "Tatar Restaurant",
    value: "Tatar Restaurant",
  },
  {
    label: "Tattoo & Piercing Shop",
    value: "Tattoo & Piercing Shop",
  },
  {
    label: "Tax Lawyer",
    value: "Tax Lawyer",
  },
  {
    label: "Tax Preparation Service",
    value: "Tax Preparation Service",
  },
  {
    label: "Taxi Service",
    value: "Taxi Service",
  },
  {
    label: "Taxidermist",
    value: "Taxidermist",
  },
  {
    label: "Tea Room",
    value: "Tea Room",
  },
  {
    label: "Teens & Kids Website",
    value: "Teens & Kids Website",
  },
  {
    label: "Teeth Whitening Service",
    value: "Teeth Whitening Service",
  },
  {
    label: "Telecommunication Company",
    value: "Telecommunication Company",
  },
  {
    label: "Television Repair Service",
    value: "Television Repair Service",
  },
  {
    label: "Television Service Provider",
    value: "Television Service Provider",
  },
  {
    label: "Tempura Restaurant",
    value: "Tempura Restaurant",
  },
  {
    label: "Tennis Court",
    value: "Tennis Court",
  },
  {
    label: "Tennis Stadium",
    value: "Tennis Stadium",
  },
  {
    label: "Teppanyaki Restaurant",
    value: "Teppanyaki Restaurant",
  },
  {
    label: "Test Preparation Center",
    value: "Test Preparation Center",
  },
  {
    label: "Tex-Mex Restaurant",
    value: "Tex-Mex Restaurant",
  },
  {
    label: "Textile Company",
    value: "Textile Company",
  },
  {
    label: "Thai Restaurant",
    value: "Thai Restaurant",
  },
  {
    label: "Theatrical Play",
    value: "Theatrical Play",
  },
  {
    label: "Theatrical Productions",
    value: "Theatrical Productions",
  },
  {
    label: "Theme Restaurant",
    value: "Theme Restaurant",
  },
  {
    label: "Therapist",
    value: "Therapist",
  },
  {
    label: "Threading Service",
    value: "Threading Service",
  },
  {
    label: "Thrift & Consignment Store",
    value: "Thrift & Consignment Store",
  },
  {
    label: "Tianjin Restaurant",
    value: "Tianjin Restaurant",
  },
  {
    label: "Ticket Sales",
    value: "Ticket Sales",
  },
  {
    label: "Tiki Bar",
    value: "Tiki Bar",
  },
  {
    label: "Tiling Service",
    value: "Tiling Service",
  },
  {
    label: "Time zone",
    value: "Time zone",
  },
  {
    label: "Tire Dealer & Repair Shop",
    value: "Tire Dealer & Repair Shop",
  },
  {
    label: "Tobacco Cessation Treatment Center",
    value: "Tobacco Cessation Treatment Center",
  },
  {
    label: "Tobacco Company",
    value: "Tobacco Company",
  },
  {
    label: "Tobacco Store",
    value: "Tobacco Store",
  },
  {
    label: "Tonkatsu Restaurant",
    value: "Tonkatsu Restaurant",
  },
  {
    label: "Tools/Equipment",
    value: "Tools/Equipment",
  },
  {
    label: "Topic",
    value: "Topic",
  },
  {
    label: "Tour Agency",
    value: "Tour Agency",
  },
  {
    label: "Tour Guide",
    value: "Tour Guide",
  },
  {
    label: "Tourist Information Center",
    value: "Tourist Information Center",
  },
  {
    label: "Towing Service",
    value: "Towing Service",
  },
  {
    label: "Township",
    value: "Township",
  },
  {
    label: "Toy Store",
    value: "Toy Store",
  },
  {
    label: "Track Stadium",
    value: "Track Stadium",
  },
  {
    label: "Trade School",
    value: "Trade School",
  },
  {
    label: "Traffic School",
    value: "Traffic School",
  },
  {
    label: "Trailer Rental",
    value: "Trailer Rental",
  },
  {
    label: "Train Station",
    value: "Train Station",
  },
  {
    label: "Transit Hub",
    value: "Transit Hub",
  },
  {
    label: "Transit Stop",
    value: "Transit Stop",
  },
  {
    label: "Transit System",
    value: "Transit System",
  },
  {
    label: "Translator",
    value: "Translator",
  },
  {
    label: "Transportation Service",
    value: "Transportation Service",
  },
  {
    label: "Travel & Transportation",
    value: "Travel & Transportation",
  },
  {
    label: "Travel Agency",
    value: "Travel Agency",
  },
  {
    label: "Travel Company",
    value: "Travel Company",
  },
  {
    label: "Travel Service",
    value: "Travel Service",
  },
  {
    label: "Tree Cutting Service",
    value: "Tree Cutting Service",
  },
  {
    label: "Trentino Alto Adige Restaurant",
    value: "Trentino Alto Adige Restaurant",
  },
  {
    label: "Trinidadian Restaurant",
    value: "Trinidadian Restaurant",
  },
  {
    label: "Trophies & Engraving Shop",
    value: "Trophies & Engraving Shop",
  },
  {
    label: "Truck Rental",
    value: "Truck Rental",
  },
  {
    label: "Truck Repair Shop",
    value: "Truck Repair Shop",
  },
  {
    label: "Turkish Restaurant",
    value: "Turkish Restaurant",
  },
  {
    label: "Tuscan Restaurant",
    value: "Tuscan Restaurant",
  },
  {
    label: "Tutor/Teacher",
    value: "Tutor/Teacher",
  },
  {
    label: "TV",
    value: "TV",
  },
  {
    label: "TV & Movies",
    value: "TV & Movies",
  },
  {
    label: "TV Channel",
    value: "TV Channel",
  },
  {
    label: "TV Genre",
    value: "TV Genre",
  },
  {
    label: "TV Network",
    value: "TV Network",
  },
  {
    label: "TV Season",
    value: "TV Season",
  },
  {
    label: "TV Show",
    value: "TV Show",
  },
  {
    label: "TV/Movie Award",
    value: "TV/Movie Award",
  },
  {
    label: "Udon Restaurant",
    value: "Udon Restaurant",
  },
  {
    label: "Udupi Restaurant",
    value: "Udupi Restaurant",
  },
  {
    label: "Ukrainian Restaurant",
    value: "Ukrainian Restaurant",
  },
  {
    label: "Umbrian Restaurant",
    value: "Umbrian Restaurant",
  },
  {
    label: "Unagi Restaurant",
    value: "Unagi Restaurant",
  },
  {
    label: "Uniform Supplier",
    value: "Uniform Supplier",
  },
  {
    label: "University (NCES)",
    value: "University (NCES)",
  },
  {
    label: "University Status",
    value: "University Status",
  },
  {
    label: "Urologist",
    value: "Urologist",
  },
  {
    label: "Uruguayan Restaurant",
    value: "Uruguayan Restaurant",
  },
  {
    label: "Uttar Pradesh Restaurant",
    value: "Uttar Pradesh Restaurant",
  },
  {
    label: "Uzbek Restaurant",
    value: "Uzbek Restaurant",
  },
  {
    label: "Vacation Home Rental",
    value: "Vacation Home Rental",
  },
  {
    label: "Vegetarian/Vegan Restaurant",
    value: "Vegetarian/Vegan Restaurant",
  },
  {
    label: "Vending Machine Sales & Service",
    value: "Vending Machine Sales & Service",
  },
  {
    label: "Venetian Restaurant",
    value: "Venetian Restaurant",
  },
  {
    label: "Venezuelan Restaurant",
    value: "Venezuelan Restaurant",
  },
  {
    label: "Veterinarian",
    value: "Veterinarian",
  },
  {
    label: "Video",
    value: "Video",
  },
  {
    label: "Video Creator",
    value: "Video Creator",
  },
  {
    label: "Video Game",
    value: "Video Game",
  },
  {
    label: "Video Game Store",
    value: "Video Game Store",
  },
  {
    label: "Vietnamese Restaurant",
    value: "Vietnamese Restaurant",
  },
  {
    label: "Village",
    value: "Village",
  },
  {
    label: "Vintage Store",
    value: "Vintage Store",
  },
  {
    label: "Vinyl Siding Company",
    value: "Vinyl Siding Company",
  },
  {
    label: "Visual Arts",
    value: "Visual Arts",
  },
  {
    label: "Vitamin Supplement Shop",
    value: "Vitamin Supplement Shop",
  },
  {
    label: "Vitamins/Supplements",
    value: "Vitamins/Supplements",
  },
  {
    label: "Volcano",
    value: "Volcano",
  },
  {
    label: "Volleyball Court",
    value: "Volleyball Court",
  },
  {
    label: "Wagashi Restaurant",
    value: "Wagashi Restaurant",
  },
  {
    label: "Waste Management Company",
    value: "Waste Management Company",
  },
  {
    label: "Water Heater Installation & Repair Service",
    value: "Water Heater Installation & Repair Service",
  },
  {
    label: "Water Treatment Service",
    value: "Water Treatment Service",
  },
  {
    label: "Water Utility Company",
    value: "Water Utility Company",
  },
  {
    label: "Waterfall",
    value: "Waterfall",
  },
  {
    label: "Waxing Service",
    value: "Waxing Service",
  },
  {
    label: "Weather Station",
    value: "Weather Station",
  },
  {
    label: "Web Designer",
    value: "Web Designer",
  },
  {
    label: "Website",
    value: "Website",
  },
  {
    label: "Wedding Planning Service",
    value: "Wedding Planning Service",
  },
  {
    label: "Wedding Venue",
    value: "Wedding Venue",
  },
  {
    label: "Weight Loss Center",
    value: "Weight Loss Center",
  },
  {
    label: "Well Water Drilling Service",
    value: "Well Water Drilling Service",
  },
  {
    label: "Wheel & Rim Repair Service",
    value: "Wheel & Rim Repair Service",
  },
  {
    label: "Whisky Bar",
    value: "Whisky Bar",
  },
  {
    label: "Wholesale & Supply Store",
    value: "Wholesale & Supply Store",
  },
  {
    label: "Wholesale Bakery",
    value: "Wholesale Bakery",
  },
  {
    label: "Wholesale Grocer",
    value: "Wholesale Grocer",
  },
  {
    label: "Wig Store",
    value: "Wig Store",
  },
  {
    label: "Window Installation Service",
    value: "Window Installation Service",
  },
  {
    label: "Wine Bar",
    value: "Wine Bar",
  },
  {
    label: "Wine, Beer & Spirits Store",
    value: "Wine, Beer & Spirits Store",
  },
  {
    label: "Wine/Spirits",
    value: "Wine/Spirits",
  },
  {
    label: "Winery/Vineyard",
    value: "Winery/Vineyard",
  },
  {
    label: "Women’s Clothing Store",
    value: "Women’s Clothing Store",
  },
  {
    label: "Women’s Health Clinic",
    value: "Women’s Health Clinic",
  },
  {
    label: "Work Position",
    value: "Work Position",
  },
  {
    label: "Work Project",
    value: "Work Project",
  },
  {
    label: "Work Status",
    value: "Work Status",
  },
  {
    label: "Writer",
    value: "Writer",
  },
  {
    label: "Writing Service",
    value: "Writing Service",
  },
  {
    label: "Xinjiang Restaurant",
    value: "Xinjiang Restaurant",
  },
  {
    label: "Yakiniku Restaurant",
    value: "Yakiniku Restaurant",
  },
  {
    label: "Yakitori Restaurant",
    value: "Yakitori Restaurant",
  },
  {
    label: "Yoga Studio",
    value: "Yoga Studio",
  },
  {
    label: "Yoshoku Restaurant",
    value: "Yoshoku Restaurant",
  },
  {
    label: "Youth Organization",
    value: "Youth Organization",
  },
  {
    label: "Yunnan Restaurant",
    value: "Yunnan Restaurant",
  },
  {
    label: "Zhejiang Restaurant",
    value: "Zhejiang Restaurant",
  },
];