import React, {useEffect, useState} from 'react';
import {categoriesDataUrl, productsDataUrl} from "../constants/dataUrl";

export const useGetCategories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch(categoriesDataUrl)
            .then((response) => response.json())
            .then((data) =>
                setCategories(data)
            );
    },[])

    return {categories}

};

