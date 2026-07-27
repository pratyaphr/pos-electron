import type { Product } from "../types/product";

type Props = {
  products: Product[];
};

export default function ProductTable({ products }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>

          <th>Barcode</th>

          <th>Name</th>

          <th>Price</th>

          <th>Stock</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>

            <td>{product.barcode}</td>

            <td>{product.name}</td>

            <td>{product.price}</td>

            <td>{product.stock_qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
