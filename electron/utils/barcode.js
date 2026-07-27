const { createCanvas } = require("canvas");
const JsBarcode = require("jsbarcode");

function generateBarcode(barcode) {
  const canvas = createCanvas();

  JsBarcode(canvas, barcode, {
    format: "CODE128",

    width: 2,

    height: 60,

    displayValue: true,

    margin: 5,

    fontSize: 18,

    background: "#ffffff",

    lineColor: "#000000",
  });

  return canvas.toDataURL("image/png");
}

module.exports = {
  generateBarcode,
};
