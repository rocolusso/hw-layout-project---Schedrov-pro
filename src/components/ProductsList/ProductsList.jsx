import React from 'react';
import {ProductCard} from "../ProductCard/ProductCard";

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

