import React, {useEffect, useMemo, useState} from 'react';

import {Categories} from "../components/Categories/Categories";
import {Filters} from "../components/Filters/Filters";
import {ProductsList} from "../components/ProductsList/ProductsList";
import {useGetProductsData} from "../hooks/useGetProductsData";
import {useGetCategories} from "../hooks/useGetCategories";


const filtersDefaultState = {
    searchValue:'',
    minProductPrice:0,
    maxProductPrice:99999,
    minProductRating:0,
    maxProductRating:100,
    isNew:true,
    isSale:true,
    isInStock:false,
}

const filtersResetState = {
    searchValue:'',
    minProductPrice:0,
    maxProductPrice:99999,
    minProductRating:0,
    maxProductRating:100,
    isNew:false,
    isSale:false,
    isInStock:false,
}


export const ProductsPage = () => {

    const {products} = useGetProductsData()
    const {categories} = useGetCategories()
    const [searchValue, setSearchValue] = useState(filtersDefaultState.searchValue);


    const [price,setPrice] = useState([
        filtersDefaultState.minProductPrice,
        filtersDefaultState.maxProductPrice
    ])
    const [rating,setRating] = useState([
        filtersDefaultState.minProductRating,
        filtersDefaultState.maxProductRating
    ])

    const minProductPrice = price[0]
    const maxProductPrice = price[1]
    const minProductRating = rating[0]
    const maxProductRating = rating[1]


    const [isNew, setIsNew] = useState(filtersDefaultState.isNew)
    const [isSale, setIsSale] = useState(filtersDefaultState.isSale)
    const [isInStock, setIsInStock] = useState(filtersDefaultState.isInStock)


    const [categoriesChecked, setCategoriesIsChecked] = useState([]);

    useEffect(() => {
        setCategoriesIsChecked(categories.map((category) => ({
            ...category,
            checked: true
        })))
    }, [categories])

    const [isCheckedCategories, setIsCheckedCategories] = useState([]);

    useEffect(()=>{
        setIsCheckedCategories([...categoriesChecked])
    },[categoriesChecked])



    const filtersListState = useMemo(() => {
        return {
            isNew,
            isSale,
            isInStock,
            searchValue,
            minProductPrice,
            maxProductPrice,
            minProductRating,
            maxProductRating,
        }
    },[isNew,
            isSale,
            isInStock,
            searchValue,
            minProductPrice,
            maxProductPrice,
            minProductRating,
            maxProductRating,])


    const searchHandle = (e) => {
        setSearchValue(e.target.value)
    };

    const onChangeMoreFilter = (arg) => {
        if(arg === 'isInStock') return setIsInStock(!isInStock)
        if(arg === 'isSale') return  setIsSale(!isSale)
        if(arg === 'isNew') return  setIsNew(!isNew)
    };

    const resetFilters = () => {

        setSearchValue(filtersResetState.searchValue)

        setPrice([filtersResetState.minProductPrice,filtersResetState.maxProductPrice])
        setRating([filtersResetState.minProductRating,filtersResetState.maxProductRating])

        setIsNew(filtersResetState.isNew)
        setIsSale(filtersResetState.isSale)
        setIsInStock(filtersResetState.isInStock)
    }

    const getFilteredProducts = () => {
        return products.filter((productItem) => {

            let isPass = true

            if (searchValue.trim() !== '') {
                isPass = isPass && (productItem.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            }

            const price = parseFloat(productItem.price)
            isPass = isPass && (price >= minProductPrice && price <= maxProductPrice)

            const rating = productItem.rating
            isPass = isPass && (rating >= minProductRating && rating <= maxProductRating)


            if (isNew) {
                isPass = isPass && productItem.isNew
            } else if (isSale) {
                isPass = isPass && productItem.isSale
            } else if (isInStock) {
                isPass = isPass && productItem.isInStock
            }

            if (isNew && isSale) {
                isPass = isPass && !!(isPass === productItem.isNew && productItem.isSale)
            } else if (isSale && isInStock) {
                isPass = isPass && !!(isPass === productItem.isSale && productItem.isInStock)
            } else if (isNew && isInStock) {
                isPass = isPass && !!(productItem.isNew && productItem.isInStock)
            }

            if (isNew && isSale && isInStock) {
                isPass = isPass && !!(productItem.isNew && productItem.isSale && productItem.isInStock)
            }


            // const byCategories = productItem.categories
            // const checked = isCheckedCategories.filter(e => e.checked === true).map( obj => obj.id )
            //
            // isPass = isPass && byCategories.includes(...checked)


            return isPass
        })
    }

    const filteredProducts = useMemo(() => {
       return  getFilteredProducts(filtersListState)
    }, [filtersListState,products,isCheckedCategories])


    const onCategoryChange = (categoryId) => {
        const category = categoriesChecked.filter(i => i.id === categoryId)[0]
        category.checked = !category.checked

        setIsCheckedCategories(categoriesChecked =>
            categoriesChecked.map(obj => {
                if (obj.id === categoryId) {
                    return {...obj, checked: category.checked,};
                }
                return obj;
            }),
        );
    }


    return (

        <div className="container">
            <div className="row">

                <div className="col-3 product-categories">
                    <Categories
                        categoriesChecked={isCheckedCategories}
                        onChange={onCategoryChange}
                    />
                </div>

                <div className="col-9">
                    <div className="row d-flex flex-column mt-4">
                        <Filters
                            onChangeMore={onChangeMoreFilter}
                            onSearch={searchHandle}
                            searchValue={searchValue}
                            isNew={isNew}
                            isSale={isSale}
                            isInStock={isInStock}

                            minPrice={minProductPrice}
                            maxPrice={maxProductPrice}
                            minRating={minProductRating}
                            maxRating={maxProductRating}

                            price={price}
                            setPrice={setPrice}

                            rating={rating}
                            setRating={setRating}
                        />
                        <ProductsList
                            products={products}
                            categories={isCheckedCategories}
                            filteredProducts={filteredProducts}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
