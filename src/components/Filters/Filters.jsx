import React from 'react';

export const Filters = ({
                            onChangeMore,
                            onChangeRange,
                            onSearch,
                            isNew,
                            isSale,
                            isInStock,
                            minPrice,
                            maxPrice,
                            minRating,
                            maxRating,
                            searchValue,
                            refs
                        }) => {

    const {
              minPriceElement,
              maxPriceElement,
              minRatingElement,
              maxRatingElement,
          } = refs

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
    const filterRatingParams = [
        {
            state: 'minRating',
            id: '1',
            ref: minRatingElement,
            value: minRating,
            label: `min rating: ${minRating}`,
        },
        {
            state: 'maxRating',
            id: '2',
            ref: maxRatingElement,
            value: maxRating,
            label: `max rating: ${maxRating}`,
        },
    ]
    const filterPriceParams = [
        {
            state: 'minPrice',
            id: '1',
            ref: minPriceElement,
            value: minPrice,
            label: `min price: ${minPrice}`,
        },
        {
            state: 'maxPrice',
            id: '2',
            ref: maxPriceElement,
            value: maxPrice,
            label: `max price: ${maxPrice}`,
        },
    ]

    return (
        <div className="col products-search-toolbar  mb-5 ">
            <div className="row  flex-wrap ">

                <div className="col">
                    <h5>By price</h5>
                    <div className={'d-flex flex-column'}>

                        {filterPriceParams.map(filter =>
                            <label key={filter.state + filter.id}>
                                {filter.label}
                                <input
                                    ref={filter.ref}
                                    onChange={() => onChangeRange(filter.state)}
                                    placeholder={'Type your value'}
                                />
                            </label>
                        )}

                    </div>
                </div>

                <div className="col">
                    <h5>By Rating</h5>
                    <div className={'d-flex flex-column'}>


                        {filterRatingParams.map(filter =>
                            <label key={filter.state + filter.id}>
                                {filter.label}
                                <input
                                    ref={filter.ref}
                                    onChange={() => onChangeRange(filter.state)}
                                    placeholder={'Type your value'}
                                />
                            </label>
                        )}

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
