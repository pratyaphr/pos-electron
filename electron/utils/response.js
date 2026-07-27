function success(data = null, message = "Success") {
  return {
    success: true,
    data,
    message,
  };
}

function error(message = "Error") {
  return {
    success: false,
    data: null,
    message,
  };
}

module.exports = {
  success,
  error,
};
