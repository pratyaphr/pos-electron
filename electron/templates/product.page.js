const { generateBarcode } = require("../utils/barcode");

const {
  formatDateTime,
  truncateText,
  formatNumber,
} = require("../utils/format");

module.exports = function productPage(products, page, totalPage) {
  const totalStock = products.reduce((sum, item) => sum + item.stock_qty, 0);

  const rows = products
    .map(
      (item, index) => `
<tr>

<td class="center">

${index + 1}

</td>

<td class="barcode center">

<img
src="${generateBarcode(item.barcode)}"
/>

</td>

<td>

${truncateText(item.name)}

</td>

<td>

${item.category ?? "-"}

</td>

<td class="right">

${formatNumber(item.price)}

</td>

<td class="right">

${formatNumber(item.stock_qty)}

</td>

</tr>
`,
    )
    .join("");

  return `

<div class="page">

<div class="header">

<h1>

PRODUCT CATALOG

</h1>

<div class="info">

<div>

Export :

${formatDateTime()}

</div>

<div>

Items :

${formatNumber(products.length)}

</div>

<div>

Stock :

${formatNumber(totalStock)}

</div>

</div>

</div>

<table>

<thead>

<tr>

<th width="40">

#

</th>



<th width="180">

Barcode Image

</th>

<th>

Product

</th>

<th width="120">

Category

</th>

<th width="90">

Price

</th>

<th width="80">

Stock

</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

<div class="footer">

<div>

Product Report

</div>

<div>

Page

${page}

/

${totalPage}

</div>

</div>

</div>

`;
};
