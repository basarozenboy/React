import { useState } from 'react';

function ProductCategoryRow({ category } : {category: string}) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }: {product: any}) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }: {products: any, filterText: string, inStockOnly: boolean }) {
  const rows: React.ReactNode[] = [];
  let lastCategory: string | null = null;

  products.forEach((product: { category: string, name: string, stocked: boolean }) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>İsim</th>
          <th>Fiyat</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange,
  onInStockOnlyChange }: {filterText: string, inStockOnly: boolean, onFilterTextChange: (e: string)=> void, onInStockOnlyChange: (e: boolean)=> void }){
  return (
    <form>
      <input type="text" value={filterText}  placeholder="Ara..." onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '}
       Sadece stokta olan ürünleri göster
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: {products: any}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS = [
  { category: "Meyveler", price: "₺10", stocked: true, name: "Elma" },
  { category: "Meyveler", price: "₺10", stocked: true, name: "Mandalina" },
  { category: "Meyveler", price: "₺20", stocked: false, name: "Portakal" },
  { category: "Sebzeler", price: "₺20", stocked: true, name: "Ispanak" },
  { category: "Sebzeler", price: "₺40", stocked: false, name: "Kabak" },
  { category: "Sebzeler", price: "₺10", stocked: true, name: "Börülce" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
