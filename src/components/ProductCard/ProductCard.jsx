import React from 'react';
import './ProductCard.css'
import PropTypes from "prop-types";

export const ProductCard = ({product, categories}) => {

    return (
        <>
            <div
                className={'product-item-wrapper col me-3 ms-0 mb-4 d-flex flex-column align-items-center'}
                data-product-id={product.id}
            >
                <div className={'product-item'}>
                    <div className={'product-image-wrapper mb-2'}>
                        <img
                            className={'product-image'}
                            src={product.photo}
                            alt={product.title}
                        />
                        {product.isNew && <p className={'product-new-attr'}>New</p>}
                        {product.isSale && <p className={'product-sale-attr'}>Sale</p>}
                        {product.isInStock && (
                            <p className={'product-stock-attr'}>In Stock</p>
                        )}
                    </div>
                    <div className={'product-tittle '}>
                        <h5>{product.title}</h5>
                    </div>
                    <div className={'item-attr d-flex mb-1 '}>
                        {product.isNew && <p style={{margin: '0 5px 0 0'}}>New</p>}
                        {product.isInStock && (
                            <p style={{margin: '0 5px 0 0'}}>In Stock</p>
                        )}
                    </div>
                    <div className={'product-rating'}>Rating:{+product.rating}</div>

                    {!!categories.filter((item) => +item.id === +product.id).length && (
                        <div className={'item-category pt-2 mb-2 d-flex flex'}>
                            <h6 style={{margin: '0'}}>categories:</h6>
                            <div>
                                {categories
                                    .filter((category) =>
                                        product.categories.includes(category.id)
                                    )
                                    .map((item) => (
                                        <p key={item.id} className={'product-category-tittle'}>
                                            {item.name}
                                        </p>
                                    ))}
                            </div>
                        </div>
                    )}


                    <div className={'item-price  mb-2 d-flex align-items-center'}>
                        <h5 style={{display: 'inline-block'}}>
                            Price: {product.price.split('.')[0] + '$'}
                        </h5>
                    </div>
                    <div className={'product-call-btns d-flex'}>
                        <button className="product-callprimary-btn btn btn-primary  me-1">
                            Click
                        </button>
                        <button className="product-callsecondary-btn btn btn-outline-secondary">
                            Click
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

ProductCard.propTypes = {
    product:PropTypes.shape({
        categories: PropTypes.array,
        createdAt: PropTypes.string,
        description: PropTypes.string,
        id: PropTypes.string,
        isInStock: PropTypes.bool,
        isNew: PropTypes.bool,
        isSale: PropTypes.bool,
        photo: PropTypes.string,
        price: PropTypes.string,
        rating: PropTypes.number,
        title: PropTypes.string,
    }),
    categories:PropTypes.array
}
