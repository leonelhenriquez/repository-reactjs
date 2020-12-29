var passwordValidator = require("password-validator");

// create scheme
var schema = new passwordValidator();

// Black list
var backlistPassword = [
  "Passw0rd",
  "Password123",
  "abc123",
  "password1",
  "123abc",
  "a1b2c3",
  "ncc1701",
  "trustno1",
];
// Properties
schema
  .is().min(8)
  .is().max(100)
  .has().letters(2)
  .has().digits(2)
  .is().not()
  .oneOf(backlistPassword);

const validatePassword = (password, showList = false) => {
  return schema.validate(password, { list: showList });
};

const validateEmail = (email) => {
  return /^([\w\-\\.\\+]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\\-]+\.)+)([a-zA-Z]{1,10}))$/i.test(
    email
  );
};

export { validatePassword, validateEmail };
