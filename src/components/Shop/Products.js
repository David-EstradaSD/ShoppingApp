import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 8.99,
    title: "David's Autobiography: An Exceptional Journey",
    description: "This is a fake book that Dave didn't write",
  },
  {
    id: "p2",
    price: 10.99,
    title: "David's Quide to Success",
    description: "Some other book that I didn't actually write",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
