import React, { useState, useEffect } from "react";

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        image: product.image || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!editedProduct.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!editedProduct.category.trim()) {
      newErrors.category = "Category is required";
    }
    
    if (!editedProduct.price || parseFloat(editedProduct.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    
    if (!editedProduct.stock || parseInt(editedProduct.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!editedProduct.image.trim()) {
      newErrors.image = "Product image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
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
      const productData = {
        name: editedProduct.name.trim(),
        category: editedProduct.category.trim(),
        price: parseFloat(editedProduct.price),
        stock: parseInt(editedProduct.stock),
        image: editedProduct.image.trim(),
      };

      await onUpdate(product._id, productData);
    } catch (error) {
      setApiError(error.message || "An error occurred while updating the product");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Product</h3>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="modal-body-form">
          {apiError && (
            <div className="alert alert-error">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {apiError}
            </div>
          )}

          <form className="product-form-modal" onSubmit={handleSubmit}>
            <div className="form-section">
              <h4 className="section-title-small">Basic Information</h4>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="edit-name">
                    Product Name <span className="required">*</span>
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    name="name"
                    placeholder="e.g., Wireless Headphones"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="edit-category">
                    Category <span className="required">*</span>
                  </label>
                  <input
                    id="edit-category"
                    type="text"
                    name="category"
                    placeholder="e.g., Electronics"
                    value={editedProduct.category}
                    onChange={handleChange}
                    className={errors.category ? "error" : ""}
                  />
                  {errors.category && (
                    <span className="error-message">{errors.category}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="edit-price">
                    Price (USD) <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <span className="input-icon">$</span>
                    <input
                      id="edit-price"
                      type="number"
                      name="price"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={editedProduct.price}
                      onChange={handleChange}
                      className={errors.price ? "error with-icon" : "with-icon"}
                    />
                  </div>
                  {errors.price && (
                    <span className="error-message">{errors.price}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="edit-stock">
                    Stock Quantity <span className="required">*</span>
                  </label>
                  <input
                    id="edit-stock"
                    type="number"
                    name="stock"
                    placeholder="0"
                    min="0"
                    value={editedProduct.stock}
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
              <h4 className="section-title-small">Media</h4>
              
              <div className="form-group full-width">
                <label htmlFor="edit-image">
                  Product Image URL <span className="required">*</span>
                </label>
                <input
                  id="edit-image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={editedProduct.image}
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

              {editedProduct.image && (
                <div className="image-preview-modal">
                  <img 
                    src={editedProduct.image} 
                    alt="Product preview" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={onClose}
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
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;