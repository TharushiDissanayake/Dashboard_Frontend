// src/pages/CreateProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { productAPI } from "../services/api";
import "../styles/dashboard.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    
    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!newProduct.category.trim()) {
      newErrors.category = "Category is required";
    }
    
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!newProduct.image.trim()) {
      newErrors.image = "Product image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    try {
      // Convert price and stock to numbers
      const productData = {
        name: newProduct.name.trim(),
        category: newProduct.category.trim(),
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        image: newProduct.image.trim(),
      };

      const response = await productAPI.createProduct(productData);

      if (response.success) {
        alert("Product Created Successfully!");
        
        // Reset form
        setNewProduct({
          name: "",
          category: "",
          price: "",
          image: "",
          stock: "",
        });
        
        // Optional: Navigate to all products page
        // navigate("/products");
      } else {
        setApiError(response.message || "Failed to create product");
      }
    } catch (error) {
      setApiError(error.message || "An error occurred while creating the product");
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setNewProduct({
      name: "",
      category: "",
      price: "",
      image: "",
      stock: "",
    });
    setErrors({});
    setApiError("");
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        <TopBar />

        <div className="create-product-wrapper">
          <div className="page-header">
            <div>
              <h1 className="page-title">Create New Product</h1>
              <p className="page-description">
                Add a new product to your inventory with detailed information
              </p>
            </div>
          </div>

          <div className="product-form-card">
            {apiError && (
              <div className="alert alert-error">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {apiError}
              </div>
            )}

            <form className="product-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h3 className="section-title">Basic Information</h3>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      Product Name <span className="required">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="e.g., Wireless Headphones"
                      value={newProduct.name}
                      onChange={handleChange}
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">
                      Category <span className="required">*</span>
                    </label>
                    <input
                      id="category"
                      type="text"
                      name="category"
                      placeholder="e.g., Electronics"
                      value={newProduct.category}
                      onChange={handleChange}
                      className={errors.category ? "error" : ""}
                    />
                    {errors.category && (
                      <span className="error-message">{errors.category}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">
                      Price (USD) <span className="required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <span className="input-icon">$</span>
                      <input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={newProduct.price}
                        onChange={handleChange}
                        className={errors.price ? "error with-icon" : "with-icon"}
                      />
                    </div>
                    {errors.price && (
                      <span className="error-message">{errors.price}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">
                      Stock Quantity <span className="required">*</span>
                    </label>
                    <input
                      id="stock"
                      type="number"
                      name="stock"
                      placeholder="0"
                      min="0"
                      value={newProduct.stock}
                      onChange={handleChange}
                      className={errors.stock ? "error" : ""}
                    />
                    {errors.stock && (
                      <span className="error-message">{errors.stock}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="section-title">Media</h3>
                
                <div className="form-group full-width">
                  <label htmlFor="image">
                    Product Image URL <span className="required">*</span>
                  </label>
                  <input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={newProduct.image}
                    onChange={handleChange}
                    className={errors.image ? "error" : ""}
                  />
                  {errors.image && (
                    <span className="error-message">{errors.image}</span>
                  )}
                  <p className="field-hint">
                    Provide a direct link to the product image
                  </p>
                </div>

                {newProduct.image && (
                  <div className="image-preview">
                    <img 
                      src={newProduct.image} 
                      alt="Product preview" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Creating...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;