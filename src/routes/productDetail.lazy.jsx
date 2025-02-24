import { useLocation, createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getDetailProduct } from "/src/api/productApi.js"; // API to fetch data
import "/src/styling/shop.css";
import "/src/styling/loadinganimation.css";

export const Route = createLazyFileRoute("/productDetail")({
  component: productDetail,
});

export function productDetail() {
  const location = useLocation();
  const { itemId } = location.state || {}; // Retrieve itemId from state

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // State untuk keranjang belanja

  useEffect(() => {
    async function fetchProductData() {
      if (!itemId) {
        setLoading(false);
        return;
      }

      try {
        const response = await getDetailProduct(itemId);
        setProduct(response?.data || null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [itemId]);

  const handleAddToCart = () => {
    if (product) {
      setCart([...cart, product]); // Tambahkan produk ke keranjang
      alert(`${product.title} has been added to your cart!`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    ); // Tampilkan animasi loading
  }

  return (
    <div className="product-detail-container">
      {/* Image Section (Left Side) */}
      <div className="image-section">
        <img
          src={product.image_url} // Gunakan image_url dari API
          alt={product.title}
          className="product-image"
        />
      </div>

      {/* Information Section (Right Side) */}
      <div className="info-section">
        <h1 className="product-title">{product.title}</h1>
        <div
          className="product-price"
          dangerouslySetInnerHTML={{ __html: product.price_display }}
        ></div>
        <p className="product-description">
          <strong>SKU:</strong> {product.external_sku}
        </p>

        {/* Add to Cart Button */}
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.title}</li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Description Section */}
        <div className="description-section">
          <h2>Product Description</h2>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="product-description-content"
          ></div>
        </div>
        <div className="back-button-container">
          <Link to="/product" className="gallery-button">
            Back to Product
          </Link>
        </div>
      </div>
    </div>
  );
}
