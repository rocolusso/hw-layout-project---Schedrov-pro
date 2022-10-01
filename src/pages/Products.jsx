import React, { Component } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { productsDataUrl, categoriesDataUrl } from '../constants/dataUrl';

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      searchValue: '',

      minProductPrice: 0,
      maxProductPrice: 9999999999,

      minRating: 0,
      maxRating: 9999999999,

      isNew: false,
      isSale: false,
      isInStock: true,
      categoryId: undefined,

      // categoriesChecked: this.categories.reduce((acc,category) => {
      //
      //   acc = [...acc,{'categoryId':category.id,'checked':true}]
      //
      //   return acc
      //
      // },[])
    };
  }

  async getProducts() {
    fetch(productsDataUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          products: data.slice(0, 12),
        })
      );
  }

  async getCategories() {
    fetch(categoriesDataUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          categories: data,
        })
      );
  }

  componentDidMount() {
    this.getProducts().finally(this.getCategories().finally(undefined));
  }

  changeRangeHandler = (e) => {
    const inputType = e.target.getAttribute('data-name');
    const inputName = e.target.getAttribute('name');

    const checkInputName = (name, type) => {
      const setRangeProperty = type === 'price' ? 'ProductPrice' : 'Rating';
      const inputStateTemplate = {};
      const setPropState = (state) => {
        return this.setState(state);
      };

      if (name === 'min') {
        if (isNaN(e.target.value) || typeof +e.target !== 'number') {
          inputStateTemplate['min' + setRangeProperty] = 0;
          setPropState(inputStateTemplate);
        } else {
          inputStateTemplate['min' + setRangeProperty] = +e.target.value;
          setPropState(inputStateTemplate);
        }
      } else if (inputName === 'max') {
        if (
          isNaN(e.target.value) ||
          +e.target.value === 0 ||
          typeof +e.target !== 'number'
        ) {
          inputStateTemplate['max' + setRangeProperty] = 99999999;
          setPropState(inputStateTemplate);
        } else {
          inputStateTemplate['max' + setRangeProperty] = +e.target.value;
          setPropState(inputStateTemplate);
        }
      }
    };

    checkInputName(inputName, inputType);

  };

  searchHandle = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  onChangeFilterHandler = (e) => {
    e.stopPropagation();
    const filterType = e.target.getAttribute('data-name');

    if (filterType === 'inStock') {
      this.setState({
        isInStock: !this.state.isInStock,
      });
    } else if (filterType === 'isSale') {
      this.setState({
        isSale: !this.state.isSale,
      });
    } else if (filterType === 'isNew') {
      this.setState({
        isNew: !this.state.isNew,
      });
    }
  };

  onChangeCategoryHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // const id = +e.target.getAttribute("data-category-id");

    // this.setState({
    //   categoryId: id,
    // });
    console.log(e.target);
  };

  render() {
    const {
      products,
      categories,
      searchValue,
      minProductPrice,
      maxProductPrice,
      minRating,
      maxRating,
      isInStock,
      isSale,
      isNew,
      categoryId,
      categoriesChecked,
    } = this.state;

    const isFilteredByName = searchValue !== '' ? true : false;
    const isFilteredByPrice = minProductPrice >= 0 || maxProductPrice <= 9999999999;
    const isFilteredByRating = minRating >= 0 || maxRating <= 9999999999;
    const byCategory = typeof categoryId === 'number' && true;

    return (
      <div className="container">
        <div className="row">
          <div className="col-3 product-categories">
            <ul className={'mt-4'} style={{ listStyle: 'none', padding: '0' }}>
              {categories.map((category) => (
                <li key={category.id} data-category-id={category.id}>
                  <div className="form-check mb-3">
                    <input
                      onChange={this.onChangeCategoryHandler}
                      data-name={'isSale'}
                      className="form-check-input"
                      checked={true}
                      type="checkbox"
                      id={`categoryCheck-${category.id}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`categoryCheck-${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-9">
            <div className="row d-flex flex-column mt-4">
              <div className="col products-search-toolbar  mb-5 ">
                <div className="row  flex-wrap ">
                  <div className="col filter-by-price">
                    <h5>By price</h5>
                    <div className={'d-flex flex-column'}>
                      <label htmlFor={'minPrice'}>
                        min Price: {minProductPrice}
                        <input
                          data-name={'price'}
                          onChange={this.changeRangeHandler}
                          className={'form-control by-price'}
                          name="min"
                          placeholder={'Type your value'}
                        />
                      </label>
                      <label htmlFor={'maxPrice'}>
                        max Price:{maxProductPrice}
                        <input
                          data-name={'price'}
                          onChange={this.changeRangeHandler}
                          className={'form-control by-price'}
                          name="max"
                          placeholder={'Type your value'}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="col filter-by-rating">
                    <h5>By Rating</h5>
                    <div className={'d-flex flex-column'}>
                      <label htmlFor={'minRating'}>
                        min rating: {minRating}
                        <input
                          data-name={'rating'}
                          onChange={this.changeRangeHandler}
                          className={'form-control by-price'}
                          name="min"
                          placeholder={'Type your value'}
                        />
                      </label>
                      <label htmlFor={'maxRating'}>
                        max rating:{maxRating}
                        <input
                          data-name={'rating'}
                          onChange={this.changeRangeHandler}
                          className={'form-control by-price'}
                          name="max"
                          placeholder={'Type your value'}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="search mb-4 me-3 col ">
                    <h5>Search</h5>
                    <input
                      style={{ width: '100%' }}
                      className={'form-control'}
                      onChange={this.searchHandle}
                    />
                  </div>

                  <div className="search mb-4 me-3 col ">
                    <h5>More</h5>
                    <div className="d-flex flex-column">
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: '0',
                        }}
                      >
                        <li>
                          <div className="form-check mb-3">
                            <input
                              onChange={this.onChangeFilterHandler}
                              data-name={'inStock'}
                              className="form-check-input"
                              checked={isInStock}
                              type="checkbox"
                              id="checkInStock"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkInStock"
                            >
                              In Stock
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check mb-3">
                            <input
                              onChange={this.onChangeFilterHandler}
                              data-name={'isSale'}
                              className="form-check-input"
                              checked={isSale}
                              type="checkbox"
                              id="checkInStock"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkInStock"
                            >
                              In Sale
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="form-check ">
                            <input
                              onChange={this.onChangeFilterHandler}
                              data-name={'isNew'}
                              className="form-check-input"
                              checked={isNew}
                              type="checkbox"
                              id="checkInStock"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="checkInStock"
                            >
                              New
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col products">
                <div className={'products-list row '}>
                  {/*{isFilteredByName*/}
                  {/*  ? products*/}
                  {/*      .filter((item) =>*/}
                  {/*        item.title*/}
                  {/*          .toLocaleLowerCase()*/}
                  {/*          .includes(searchValue.toLocaleLowerCase())*/}
                  {/*      )*/}
                  {/*      .map((item) => (*/}
                  {/*        <ProductCard*/}
                  {/*          key={Math.random().toString()}*/}
                  {/*          productData={item}*/}
                  {/*          categories={categories}*/}
                  {/*        />*/}
                  {/*      ))*/}
                  {/*  : products.map((item) => (*/}
                  {/*      <ProductCard*/}
                  {/*        key={Math.random().toString()}*/}
                  {/*        productData={item}*/}
                  {/*        categories={categories}*/}
                  {/*      />*/}
                  {/*    ))}*/}

                  {/*{isFilteredByPrice*/}
                  {/*  ? products*/}
                  {/*      .filter(*/}
                  {/*        (item) =>*/}
                  {/*          item.price <= maxProductPrice &&*/}
                  {/*          item.price >= minProductPrice*/}
                  {/*      )*/}
                  {/*      .map((item) => (*/}
                  {/*        <ProductCard*/}
                  {/*          key={Math.random().toString()}*/}
                  {/*          productData={item}*/}
                  {/*          categories={categories}*/}
                  {/*        />*/}
                  {/*      ))*/}
                  {/*  : products.map((item) => (*/}
                  {/*      <ProductCard*/}
                  {/*        key={Math.random().toString()}*/}
                  {/*        productData={item}*/}
                  {/*        categories={categories}*/}
                  {/*      />*/}
                  {/*    ))}*/}

                  {/*{isFilteredByRating*/}
                  {/*    ? products*/}
                  {/*        .filter(*/}
                  {/*            (item) =>*/}
                  {/*                item.rating <= maxRating &&*/}
                  {/*                item.rating >= minRating*/}
                  {/*        )*/}
                  {/*        .map((item) => (*/}
                  {/*            <ProductCard*/}
                  {/*                key={Math.random().toString()}*/}
                  {/*                productData={item}*/}
                  {/*                categories={categories}*/}
                  {/*            />*/}
                  {/*        ))*/}
                  {/*    : products.map((item) => (*/}
                  {/*        <ProductCard*/}
                  {/*            key={Math.random().toString()}*/}
                  {/*            productData={item}*/}
                  {/*            categories={categories}*/}
                  {/*        />*/}
                  {/*    ))}*/}

                  {/*{*/}
                  {/*  isInStock*/}
                  {/*      ?*/}
                  {/*      products.filter(item => item.isInStock === true)*/}
                  {/*          .map(item=> <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*      :*/}
                  {/*      products.map(item => <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*}*/}

                  {/*{*/}
                  {/*  isSale*/}
                  {/*      ?*/}
                  {/*      products.filter(item => item.isSale === true)*/}
                  {/*          .map(item=> <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*      :*/}
                  {/*      products.map(item => <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*}*/}

                  {/*{*/}
                  {/*  isNew*/}
                  {/*      ?*/}
                  {/*      products.filter(item => item.isNew === true)*/}
                  {/*          .map(item=> <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*      :*/}
                  {/*      products.map(item => <ProductCard key={Math.random().toString()} productData={item} categories={categories} />)*/}
                  {/*}*/}

                  {/*{byCategory*/}
                  {/*  ? products*/}
                  {/*      .filter((item) =>*/}
                  {/*        item.categories.includes(categoryId.toString())*/}
                  {/*      )*/}
                  {/*      .map((item) => (*/}
                  {/*        <ProductCard*/}
                  {/*          key={Math.random().toString()}*/}
                  {/*          productData={item}*/}
                  {/*          categories={categories}*/}
                  {/*        />*/}
                  {/*      ))*/}
                  {/*  : products.map((item) => (*/}
                  {/*      <ProductCard*/}
                  {/*        key={Math.random().toString()}*/}
                  {/*        productData={item}*/}
                  {/*        categories={categories}*/}
                  {/*      />*/}
                  {/*    ))}*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
