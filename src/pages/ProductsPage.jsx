import React, {useEffect, useMemo, useRef, useState} from 'react';

import {Categories} from "../components/Categories/Categories";
import {Filters} from "../components/Filters/Filters";
import {ProductsList} from "../components/ProductsList/ProductsList";
import {useGetProductsData} from "../hooks/useGetProductsData";
import {useGetCategories} from "../hooks/useGetCategories";

export const ProductsPage = () => {

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

    const {products} = useGetProductsData()
    const {categories} = useGetCategories()
    const [searchValue, setSearchValue] = useState(filtersDefaultState.searchValue);
    const [minProductPrice, setMinProductPrice] = useState(filtersDefaultState.minProductPrice);
    const [maxProductPrice, setMaxProductPrice] = useState(filtersDefaultState.maxProductPrice);
    const [minProductRating, setMinProductRating] = useState(filtersDefaultState.minProductRating);
    const [maxProductRating, setMaxProductRating] = useState(filtersDefaultState.maxProductRating);
    const [isNew, setIsNew] = useState(filtersDefaultState.isNew)
    const [isSale, setIsSale] = useState(filtersDefaultState.isSale)
    const [isInStock, setIsInStock] = useState(filtersDefaultState.isInStock)


    const isCheckedCategory = true
    const categoriesChecked = useMemo(() => {
        return [...categories].map((i)=>{
            return {...i,checked:isCheckedCategory}
        } )
    }, [categories])

    const [isCheckedCategories, setIsCheckedCategories] = useState([])

    useEffect(()=>{
        setIsCheckedCategories([...categoriesChecked])
    },[categoriesChecked])



    const filtersListState = {
        isNew,
        isSale,
        isInStock,
        searchValue,
        minProductPrice,
        maxProductPrice,
        minProductRating,
        maxProductRating,
    }

    const minProductPriceElement = useRef()
    const maxProductPriceElement = useRef()
    const minProductRatingElement = useRef()
    const maxProductRatingElement = useRef()

    const filtersRefElems = {
        minPriceElement:minProductPriceElement,
        maxPriceElement:maxProductPriceElement,
        minRatingElement:minProductRatingElement,
        maxRatingElement:maxProductRatingElement,
    }


    const changeRangeHandler = (e) => {

        if(e === 'minPrice') {
            const value = parseFloat(minProductPriceElement.current.value)
            if(!isNaN(value)){
                setMinProductPrice(value)
            } else {
                setMinProductPrice(filtersDefaultState.minProductPrice)
            }
        }

        if(e === 'maxPrice') {
            const value = parseFloat(maxProductPriceElement.current.value)
            if(!isNaN(value)){
                setMaxProductPrice(value)
            } else {
                setMaxProductPrice(filtersDefaultState.maxProductPrice)
            }
        }

        if(e === 'minRating') {
            const value = parseFloat(minProductRatingElement.current.value)
            if(!isNaN(value)){
                setMinProductRating(value)
            } else {
                setMinProductRating(filtersDefaultState.minProductRating)
            }
        }

        if(e === 'maxRating') {
            const value = parseFloat(maxProductRatingElement.current.value)
            if(!isNaN(value)){
                setMaxProductRating(value)
            } else {
                setMaxProductRating(filtersDefaultState.maxProductRating)
            }
        }
    };

    const searchHandle = (e) => {
        setSearchValue(e.target.value)
    };

    const onChangeMoreFilter = (arg) => {
        if(arg === 'isInStock') return setIsInStock(!isInStock)
        if(arg === 'isSale') return  setIsSale(!isSale)
        if(arg === 'isNew') return  setIsNew(!isNew)
    };

    const resetFilters = () =>{

        for(const i in filtersRefElems){
            filtersRefElems[i].current.value = ''
        }

        setSearchValue(filtersResetState.searchValue)
        setMinProductPrice(filtersResetState.minProductPrice)
        setMaxProductPrice(filtersResetState.maxProductPrice)
        setMinProductRating(filtersResetState.minProductRating)
        setMaxProductRating(filtersResetState.maxProductRating)
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
    }, [{...filtersListState},products,isCheckedCategories])


    const onCategoryChange = (categoryId)=>{
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
                            onChangeRange={changeRangeHandler}
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

                            refs={filtersRefElems}
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
