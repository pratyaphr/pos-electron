const getReceiptStyle = require("../styles/receipt.style");

function money(number) {
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function row(item) {
  return `
    <tr>
    <td class="qty">
        ${item.quantity}
      </td>

      <td class="name">
        ${item.name}
      </td>

      <td class="price">
        ${money(item.price)}
      </td>
    </tr>
  `;
}

module.exports = function receiptTemplate(receipt, paperSize = "80mm") {
  const style = getReceiptStyle(paperSize);
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="utf-8">

<style>

body{

    font-family: Arial, Helvetica, sans-serif;

    width:${style.width};

    margin:auto;

    color:#000;

    font-size:${style.fontSize};

}

h2{

    margin:0;

    text-align:center;

}

.center{

    text-align:center;

}

table{

    width:100%;

    border-collapse:collapse;

}

th{

    border-bottom:1px dashed #000;
}

td{

    padding:3px 0;

}

.name{

    width:45%;
    text-align:start;

}

.qty{
    width:15%;
    text-align:start;

}

.price{
    width:40%;
    text-align:right;

}

.total{

    text-align:right;

}

.line{

    border-top:1px dashed black;

    margin:8px 0;

}

.summary{

    display:flex;

    justify-content:space-between;

    margin-top:4px;

}

.footer{

    text-align:center;

    margin-top:20px;

}

.desciption{
    background-color: #f3f4f6;
    height: 6rem; /* 96px */
    margin-top: 0.5rem; /* 8px */ 
}

.header{
    display: flex;
    justify-content: space-between;
    margin:20px 0;
}

.left-header{
    display: flex;
    flex-direction:column;
    justify-content: start;
    text-align:start;
    width: 50%;
    overflow-wrap: break-word;
    word-break: break-word;
}

.right-header{
    display: flex;
    flex-direction:column;
    justify-content: end;
    width: 50%;
    overflow-wrap: break-word;
    word-break: break-word;
    text-align:end;

}
</style>

</head>

<body>
<h2>ใบเสร็จรับเงิน</h2>
<div class="header">
    <div class="left-header">
    <span>${receipt.store_name}</span>
    <span>13 หมู่10 ต.ผักแว่น อ.จังหาร จ.ร้อยเอ็ด 45000</span>
    <span>โทร. 084-7598675</span>
    </div>
    <div class="right-header">
    <span>รายละเอียด</span>
    <span>รหัส  : ${receipt.receipt_no}</span>
    <span>วันที่  : ${receipt.created_at}</span>
    </div>
</div>


<div class="line"></div>

<table>

<thead>

<tr>
<th class="qty">จำนวน</th>
<th class="name">รายการสินค้า</th>



<th class="price">ราคา</th>

</tr>

</thead>

<tbody>

${receipt.items.map(row).join("")}

</tbody>

</table>

<div class="line"></div>

<div class="summary">

<span>รวมราคาสุทธิ</span>

<b>${money(receipt.total_amount)}</b>

</div>



<div class="line"></div>

<div class="footer">

<span>หมายเหตุ</span>
<div class="desciption"></div>
</div>

</body>

</html>
`;
};
