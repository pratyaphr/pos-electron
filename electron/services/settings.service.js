const { settings } = require("../repositories");

class SettingsService {
  get() {
    return settings.get();
  }

  save(data) {
    return settings.save(data);
  }
}

module.exports = new SettingsService();
