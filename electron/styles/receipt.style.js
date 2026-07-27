function getReceiptStyle(paperSize = "80mm") {
  switch (paperSize) {
    case "58mm":
      return {
        width: "48mm",
        fontSize: "10px",
      };

    case "80mm":
      return {
        width: "72mm",
        fontSize: "12px",
      };

    case "A4":
      return {
        width: "190mm",
        fontSize: "14px",
      };

    default:
      return {
        width: "72mm",
        fontSize: "12px",
      };
  }
}

module.exports = getReceiptStyle;
