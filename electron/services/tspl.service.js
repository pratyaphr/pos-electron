class TSPLService {
  createLabel(product) {
    return `
SIZE 100 mm,150 mm
GAP 2 mm,0

DIRECTION 1

CLS

TEXT 30,20,"0",0,1,1,"${product.name} (฿${product.price})"

BARCODE 30,60,"128",60,1,0,2,2,"${product.barcode}"

TEXT 30,130,"0",0,1,1,"${product.barcode}"

PRINT ${product.copies || 1}
`;
  }
}

module.exports = new TSPLService();
