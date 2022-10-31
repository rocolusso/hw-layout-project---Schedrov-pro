import React, {useEffect, useState} from 'react';
import {productsDataUrl} from "../constants/dataUrl";

export const useGetProductsData = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const resp = await fetch(productsDataUrl);
            if (resp.ok) {
                const products = await resp.json()

                setProducts(products)
            }

        } catch (error)  {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProducts()
    },[])


    return {products}

};

