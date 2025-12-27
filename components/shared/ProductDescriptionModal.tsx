'use client';

import React from 'react';
import './ProductDescriptionModal.css';

interface ProductInfo {
    name: string;
    description?: string;
    // Medicine specific
    uses?: string;
    dosage?: string;
    sideEffects?: string;
    // Lab test specific
    preparation?: string;
    resultTime?: string;
    sampleType?: string;
}

interface ProductDescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductInfo | null;
    type: 'medicine' | 'test';
}

const ProductDescriptionModal: React.FC<ProductDescriptionModalProps> = ({ isOpen, onClose, product, type }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div className="product-modal-content glass" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <h2 className="modal-title">{product.name}</h2>

                <div className="modal-body">
                    {product.description && (
                        <div className="info-section">
                            <h3 className="section-label">Description</h3>
                            <p className="section-text">{product.description}</p>
                        </div>
                    )}

                    {type === 'medicine' && (
                        <>
                            {product.uses && (
                                <div className="info-section">
                                    <h3 className="section-label">Uses</h3>
                                    <p className="section-text">{product.uses}</p>
                                </div>
                            )}
                            {product.dosage && (
                                <div className="info-section">
                                    <h3 className="section-label">Dosage</h3>
                                    <p className="section-text">{product.dosage}</p>
                                </div>
                            )}
                            {product.sideEffects && (
                                <div className="info-section">
                                    <h3 className="section-label">Side Effects</h3>
                                    <p className="section-text">{product.sideEffects}</p>
                                </div>
                            )}
                        </>
                    )}

                    {type === 'test' && (
                        <>
                            {product.preparation && (
                                <div className="info-section">
                                    <h3 className="section-label">Preparation</h3>
                                    <p className="section-text">{product.preparation}</p>
                                </div>
                            )}
                            {product.sampleType && (
                                <div className="info-section">
                                    <h3 className="section-label">Sample Type</h3>
                                    <p className="section-text">{product.sampleType}</p>
                                </div>
                            )}
                            {product.resultTime && (
                                <div className="info-section">
                                    <h3 className="section-label">Result Time</h3>
                                    <p className="section-text">{product.resultTime}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="got-it-btn" onClick={onClose}>Got It</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDescriptionModal;
