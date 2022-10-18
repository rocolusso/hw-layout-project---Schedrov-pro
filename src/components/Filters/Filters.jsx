import React from 'react';
import PropTypes from "prop-types";

export const Filters = ({
                            onChangeMore,
                            onSearch,
                            isNew,
                            isSale,
                            isInStock,

                            minPrice,
                            maxPrice,
                            minRating,
                            maxRating,

                            setPrice,
                            setRating,
                            searchValue,

                        }) => {


    const filterMoreParams = [
        {
            text: 'New',
            state: 'isNew',
            id: '1',
            checked: isNew,
        },
        {
            text: 'In Sale',
            state: 'isSale',
            id: '2',
            checked: isSale,
        },
        {
            text: 'In Stock',
            state: 'isInStock',
            id: '3',
            checked: isInStock,
        },
    ]


    return (
        <div className="col products-search-toolbar  mb-5 ">
            <div className="row  flex-wrap ">

                <div className="col">
                    <h5>By price</h5>
                    <div className={'d-flex flex-column'}>

                        <label >
                            <p>min price</p>
                            <input
                                value={minPrice}
                                onChange={(e) => setPrice([
                                    !isNaN(parseFloat(e.target.value))
                                        ? parseFloat(e.target.value)
                                        : 0,
                                    maxPrice
                                ])}
                                placeholder={'Type your value'}
                            />
                        </label>

                        <label >
                            <p>max price</p>
                            <input
                                value={maxPrice}
                                onChange={(e) => setPrice([
                                    minPrice,
                                    !isNaN(parseFloat(e.target.value))
                                        ? parseFloat(e.target.value)
                                        : 0
                                ])}
                                placeholder={'Type your value'}
                            />
                        </label>



                    </div>
                </div>

                <div className="col">
                    <h5>By Rating</h5>
                    <div className={'d-flex flex-column'}>

                        <label >
                            <p>min rating</p>
                            <input
                                value={minRating}
                                onChange={(e) => setRating([
                                    !isNaN(parseFloat(e.target.value))
                                        ? parseFloat(e.target.value)
                                        : 0,
                                    maxRating
                                ])}
                                placeholder={'Type your value'}

                            />
                        </label>

                        <label >
                            <p>max rating</p>
                            <input
                                value={maxRating}
                                onChange={(e) => setRating([
                                    minRating,
                                    !isNaN(parseFloat(e.target.value))
                                        ? parseFloat(e.target.value)
                                        : 0
                                ])}
                                placeholder={'Type your value'}
                            />
                        </label>

                    </div>
                </div>

                <div className="col">
                    <h5>Search</h5>
                    <input
                        style={{width: '100%'}}
                        className={'form-control'}
                        onChange={onSearch}
                        value={searchValue}
                    />
                </div>

                <div className="col">
                    <h5>More</h5>

                    <div>
                        <ul style={{listStyle:'none'}}>
                            {filterMoreParams.map(filter =>

                                <li key={'filterMore' + filter.id}>
                                    <div>
                                        <input
                                            onChange={() => onChangeMore(filter.state)}
                                            checked={filter.checked}
                                            type="checkbox"
                                        />
                                        <label>{filter.text}</label>
                                    </div>
                                </li>)}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

Filters.propTypes = {
    onChangeMore:PropTypes.func,
    onSearch:PropTypes.func,

    isInStock: PropTypes.bool,
    isNew: PropTypes.bool,
    isSale: PropTypes.bool,

    minPrice:PropTypes.number,
    maxPrice:PropTypes.number,
    minRating:PropTypes.number,
    maxRating:PropTypes.number,

    setPrice:PropTypes.func,
    setRating:PropTypes.func,
    searchValue:PropTypes.string,
}
