const { success, failure } = require("../utils/response");

function createHandler(callback) {
  return async (event, ...args) => {
    try {
      const result = await callback(...args);

      return success(result);
    } catch (err) {
      console.error(err);

      return failure(err);
    }
  };
}

module.exports = createHandler;
