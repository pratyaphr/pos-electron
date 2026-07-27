const productPage = require("./product.page");

const { chunk } = require("../utils/pagination");

module.exports = function productTemplate(products) {
  // จำนวนรายการต่อหน้า
  const pageSize = 30;

  //   const categories = [
  //     "เครื่องดื่ม",
  //     "ขนม",
  //     "บะหมี่กึ่งสำเร็จรูป",
  //     "ของใช้",
  //     "อาหารแห้ง",
  //     "นม",
  //     "กาแฟ",
  //     "เครื่องปรุง",
  //   ];

  //   function randomBarcode(index) {
  //     return `885${String(index).padStart(10, "0")}`;
  //   }

  //   function randomPrice() {
  //     return Number((Math.random() * 250 + 5).toFixed(2));
  //   }

  //   function randomStock() {
  //     return Math.floor(Math.random() * 500);
  //   }

  //   function randomCategory(index) {
  //     return categories[index % categories.length];
  //   }

  //   function createProducts(total = 500) {
  //     return Array.from({ length: total }, (_, i) => ({
  //       id: i + 1,
  //       barcode: randomBarcode(i + 1),
  //       name: `สินค้า Demo ${String(i + 1).padStart(4, "0")}`,
  //       category: randomCategory(i),
  //       price: randomPrice(),
  //       stock_qty: randomStock(),
  //     }));
  //   }
  // const Mockproducts = createProducts(100);
  const pages = chunk(products, pageSize);

  const htmlPages = pages
    .map((page, index) => {
      return productPage(page, index + 1, pages.length);
    })
    .join("");

  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8"/>

<style>

@page{

    size:A4;

    margin:10mm;

}

body{

    font-family:Arial,Helvetica,sans-serif;

    margin:0;

    padding:0;

    color:#000;

    font-size:12px;

}

.page{

    page-break-after:always;

}

.page:last-child{

    page-break-after:auto;

}

table{

    width:100%;

    border-collapse:collapse;

    margin-top:15px;

}

thead{

    display:table-header-group;

}

tfoot{

    display:table-footer-group;

}

th{

    background:#efefef;

}

th,
td{

    border:1px solid #888;

    padding:6px;

}

.right{

    text-align:right;

}

.center{

    text-align:center;

}

.barcode img{

    width:160px;

}

.header{

    border-bottom:2px solid #000;

    padding-bottom:10px;

}

.header h1{

    margin:0;

}

.header h2{

    margin:5px 0;

}

.info{

    display:flex;

    justify-content:space-between;

    font-size:11px;

    margin-top: 20px;

}

.footer{

    margin-top:15px;

    border-top:1px solid #ccc;

    padding-top:10px;

    display:flex;

    justify-content:space-between;

    font-size:11px;

}

tr{

    page-break-inside:avoid;

}

</style>

</head>

<body>

${htmlPages}

</body>

</html>

`;
};
