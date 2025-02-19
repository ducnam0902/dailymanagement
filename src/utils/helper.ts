type allType = "uppercase" | "lowercase" | "number" | "specialCharacter";

export const containsAtLeastCharacter = (
  ch: string,
  type: allType
): boolean => {
  const upperCaseReg = new RegExp("[A-Z]");
  const lowerCaseReg = new RegExp("[a-z]");
  const numberReg = new RegExp("[0-9]");
  const specialReg = new RegExp(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/);
  switch (type) {
    case "uppercase":
      return upperCaseReg.test(ch);
    case "lowercase":
      return lowerCaseReg.test(ch);
    case "number":
      return numberReg.test(ch);
    case "specialCharacter":
      return specialReg.test(ch);
    default:
      return false;
  }
};

export const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const REPEAT_TYPE = {
  Daily: "Daily",
  Weekly: "Weekly",
  Monthly: "Monthly",
  Off: "Off",
};

export const WEEKDAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
