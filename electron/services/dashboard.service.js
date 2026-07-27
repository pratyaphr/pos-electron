const repository = require("../repositories/dashboard.repository");

const response = require("../utils/response");

class DashboardService {
  get() {
    try {
      return response.success({
        summary: repository.getSummary(),

        sales7Days: repository.getSales7Days(),

        topProducts: repository.getTopProducts(),

        lowStock: repository.getLowStock(),

        recentReceipts: repository.getRecentReceipts(),

        paymentSummary: repository.getPaymentSummary(),
      });
    } catch (err) {
      return response.error(err.message);
    }
  }
}

module.exports = new DashboardService();
