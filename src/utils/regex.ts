const regex = {
  nickname: /[A-Za-z0-9]+$/,
  password:
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,16}$/,
  phone: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
};

export default regex;
