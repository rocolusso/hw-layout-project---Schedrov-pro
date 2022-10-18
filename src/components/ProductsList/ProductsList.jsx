import React from 'react';
import {ProductCard} from "../ProductCard/ProductCard";
import PropTypes from "prop-types";

export const ProductsList = ({products, categories, filteredProducts, resetFilters}) => {
    const isLoaded = !!products.length

    return (
        <div className="col products">
            {!!filteredProducts.length
                ?
                <div className={'mb-5'}>
                    <h3>Products available:{filteredProducts.length}</h3>
                </div>
                :
                <div className={'mb-5'}>
                    <h3>Products available:{filteredProducts.length}</h3>
                </div>
            }

            {!isLoaded && <span>Loading...</span>}

            {isLoaded && !filteredProducts.length &&
                <div>
                    <h6>Sorry... No products of your choice</h6>
                    <button onClick={resetFilters} className={'btn btn-success'}>Reset filters</button>
                </div>

            }

            {isLoaded && <div className={'products-list row '}>

                {
                    filteredProducts.map((productItem) => (
                        <ProductCard
                            key={productItem.id}
                            product={productItem}
                            categories={categories}
                        />
                    ))
                }

            </div>
            }

        </div>
    );
}

ProductsList.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    categories:PropTypes.array,
    filteredProducts:PropTypes.array,
    resetFilters:PropTypes.func,
}
