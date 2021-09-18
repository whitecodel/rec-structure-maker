const _ = require("lodash");

const GREETINGS = {
  en: "Good Morning",
  de: "Guten Morgen",
  fr: "Bonjour",
  ru: "Dobre Utra",
  kr: "Annyeonghaseyo",
};

// greet by the language code
exports.rec_structure_maker = function (code) {
  try {
    code();
    return "structure created succcessfully";
  } catch (error) {
    return "something went wrong";
  }
};
