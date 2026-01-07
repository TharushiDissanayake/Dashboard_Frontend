import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import EditProductModal from "../components/EditProduct";
import { productAPI } from "../services/api";
import "../styles/dashboard.css";

const AllProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, productId: null, productName: "" });
  const [editModal, setEditModal] = useState({ show: false, product: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("An error occurred while fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = () => {
    navigate("/products/create");
  };

  const handleUpdateProduct = (product) => {
    setEditModal({ show: true, product });
  };

  const handleUpdateConfirm = async (productId, productData) => {
    try {
      const response = await productAPI.updateProduct(productId, productData);
      if (response.success) {
        // Update the product in the state
        setProducts(products.map(p => 
          p._id === productId ? response.data : p
        ));
        setEditModal({ show: false, product: null });
        alert("Product updated successfully!");
      } else {
        throw new Error(response.message || "Failed to update product");
      }
    } catch (err) {
      alert("An error occurred while updating the product");
      console.error("Error updating product:", err);
      throw err;
    }
  };

  const handleEditCancel = () => {
    setEditModal({ show: false, product: null });
  };

  const handleDeleteClick = (productId, productName) => {
    setDeleteModal({ show: true, productId, productName });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await productAPI.deleteProduct(deleteModal.productId);
      if (response.success) {
        setProducts(products.filter(p => p._id !== deleteModal.productId));
        setDeleteModal({ show: false, productId: null, productName: "" });
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("An error occurred while deleting the product");
      console.error("Error deleting product:", err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, productId: null, productName: "" });
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="all-products-wrapper">
          <div className="page-header">
            <div>
              <h1 className="page-title">All Products</h1>
              <p className="page-description">
                Manage and view all your products ({products.length} items)
              </p>
            </div>
            <button className="btn-create-product" onClick={handleCreateProduct}>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M10 4V16M4 10H16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
              Create Product
            </button>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="48" height="40" rx="4" stroke="#9ca3af" strokeWidth="2" fill="none"/>
                <path d="M8 24h48M24 16v-4a4 4 0 018 0v4" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>No products yet</h3>
              <p>Start by creating your first product</p>
              {/* <button className="btn-primary" onClick={handleCreateProduct}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Create Product
              </button> */}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="%239ca3af"%3ENo Image Available%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="product-badge">
                      {product.stock > 0 ? (
                        <span className="badge-in-stock">In Stock</span>
                      ) : (
                        <span className="badge-out-stock">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="product-content">
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                    
                    <div className="product-info">
                      <div className="product-price">
                        <span className="price-label">Price:</span>
                        <span className="price-value">${product.price.toFixed(2)}</span>
                      </div>
                      <div className="product-stock">
                        <span className="stock-label">Stock:</span>
                        <span className="stock-value">{product.stock} units</span>
                      </div>
                    </div>

                    <div className="product-actions">
                      <button 
                        className="btn-update"
                        onClick={() => handleUpdateProduct(product)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11.333 2A1.886 1.886 0 0114 4.667l-9 9-3.667.333.334-3.666 9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteClick(product._id, product.name)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Product Modal */}
        {editModal.show && (
          <EditProductModal
            product={editModal.product}
            onClose={handleEditCancel}
            onUpdate={handleUpdateConfirm}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <div className="modal-overlay" onClick={handleDeleteCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Delete Product</h3>
                <button className="modal-close" onClick={handleDeleteCancel}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-icon-warning">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20z" fill="#fee2e2"/>
                    <path d="M24 16v8M24 32h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <p>Are you sure you want to delete <strong>{deleteModal.productName}</strong>?</p>
                <p className="modal-warning">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleDeleteCancel}>
                  Cancel
                </button>
                <button className="btn-danger" onClick={handleDeleteConfirm}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllProduct;