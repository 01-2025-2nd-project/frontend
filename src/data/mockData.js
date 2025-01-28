const mockData = Array.from({ length: 20 }, (v, i) => ({
  product_id: i + 1,
  product_name: `Item ${i + 1}`,
  price: `₩${(i + 1) * 1000}`,
  image: `https://picsum.photos/200?random=${i + 1}`,
}));

export default mockData;
