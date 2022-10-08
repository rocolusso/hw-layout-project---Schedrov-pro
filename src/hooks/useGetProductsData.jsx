import React, {useEffect, useMemo, useState} from 'react';
import {productsDataUrl} from "../constants/dataUrl";

export const useGetProductsData = () => {

    const [products, setProducts] = useState([]);

    // useEffect(()=>{
    //     fetch(productsDataUrl)
    //         .then((response) => response.json())
    //         .then((data) =>
    //             setProducts(data)
    //         );
    // },[])


    const fetchedProducts = useMemo(()=>{
        fetch(productsDataUrl)
            .then((response) => response.json())
            .then((data) =>
                setProducts(data)
            );
        },[])


    // console.log(fetchedProducts)

    return {products}

};

