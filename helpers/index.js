import Validator from "validatorjs";

const validator = async (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

/**
 *
 * @param {*} rules
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateRequest = async (rules, req, res, next) => {
  await validator(req.body, rules, {}, (err, status) => {
    if (!status) {
      res.status(401).send({
        success: false,
        status: status,
        message: "Validation failed",
        data: err,
        errors: err.errors,
      });
    } else {
      next();
    }
  }).catch((err) => {
    res.status(500).send({
      success: false,
      message: "Something Went Wrong!",
      data: err,
      errors: err.message,
      status: false,
    });
  });
};

const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/**
 * Handle Internal Server Error
 * @param {*} error
 * @param {*} _req
 * @param {*} res
 * @param {*} _next
 */
const errorResponse = (error, _req, res, _next) => {
  console.error({ error, log: error?.stack });
  res.status(500).send({
    success: false,
    status: false,
    message: "Something Went Wrong!",
    errors: [error.message] || [error] || [
        Object?.values(error?.errors)[0]?.message,
      ],
  });
};

export { validator, validateEmail, validateRequest, errorResponse };
