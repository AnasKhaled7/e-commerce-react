import product1 from "./product-1.png";
import product2 from "./product-2.png";
import product3 from "./product-3.png";
import product4 from "./product-4.png";
import product5 from "./product-5.png";
import product6 from "./product-6.png";
import product7 from "./product-7.png";
import product8 from "./product-8.png";

const products = [
  {
    _id: "1",
    img: product1,
    name: "Short 1",
    price: 150,
    rating: 5,
    numReviews: 2,
    description: "High quality product 1 description 1",
    countInStock: 6,
  },
  {
    _id: "2",
    img: product2,
    name: "Short 2",
    price: 120,
    rating: 4.0,
    numReviews: 11,
    description: "High quality product 2 description 2",
    countInStock: 2,
  },
  {
    _id: "3",
    img: product3,
    name: "T-shirt 1",
    price: 170,
    rating: 3.5,
    numReviews: 10,
    description: "High quality product 3 description 3",
    countInStock: 0,
  },
  {
    _id: "4",
    img: product4,
    name: "T-shirt 2",
    price: 160,
    rating: 5,
    numReviews: 8,
    description: "High quality product 4 description 4",
    countInStock: 5,
  },
  {
    _id: "5",
    img: product5,
    name: "Sweat pants Sweat pants Sweat pants Sweat pants",
    price: 160,
    rating: 4,
    numReviews: 5,
    description: "High quality product 5 description 5",
    countInStock: 4,
  },
  {
    _id: "6",
    img: product6,
    name: "Bag 1",
    price: 210,
    rating: 3.5,
    numReviews: 2,
    description: "High quality product 6 description 6",
    countInStock: 3,
  },
  {
    _id: "7",
    img: product7,
    name: "Bag 2",
    price: 160,
    rating: 4,
    numReviews: 5,
    description: "High quality product 7 description 7",
    countInStock: 1,
  },
  {
    _id: "8",
    img: product8,
    name: "Bag 3",
    price: 300,
    rating: 5,
    numReviews: 2,
    description: "High quality product 8 description 8",
    countInStock: 0,
  },
];

export default products;
