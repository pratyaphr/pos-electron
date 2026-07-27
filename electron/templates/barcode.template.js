module.exports = function barcodeTemplate(products) {
  const labels = products
    .map(
      (item, index) => `
<div class="label">

  <div class="title">
    ${item.name} (฿${item.price})
  </div>

  <div class="barcode">
    <svg id="barcode-${index}"></svg>
  </div>

  <div class="number">
    ${item.barcode}
  </div>

</div>
`,
    )
    .join("");

  const scripts = products
    .map(
      (item, index) => `
JsBarcode("#barcode-${index}", "${item.barcode}", {
    format: "CODE128",
    displayValue: false,
    width: 1.5,
    height: 35,
    margin: 0
});
`,
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8">

<style>

@page{
    size:100mm 150mm;
    margin:3mm;
}

body{
    margin:0;
    padding:0;
    font-family:Arial, Helvetica, sans-serif;

    display:grid;
    grid-template-columns:repeat(2,45mm);
    grid-auto-rows:22mm;
    gap:3mm;

    justify-content:center;
}

.label{
    border:1px solid #000;
    box-sizing:border-box;
    padding:2mm;
    overflow:hidden;
}

.title{
    font-size:10px;
    font-weight:bold;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

.barcode{
    margin-top:2px;
    text-align:center;
}

.number{
    text-align:center;
    font-size:9px;
}

svg{
    width:100%;
    height:34px;
}

</style>

</head>

<body>

${labels}

<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>

<script>

${scripts}

window.onload=()=>{

    window.print();

}

</script>

</body>

</html>
`;
};
