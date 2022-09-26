import React, { Component } from "react";
import { Rating } from "../Rating";
import './ProductCard.css'

export class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = { item: this.props.data };
  }

  render() {
    const { item } = this.state;
    return (
      <>
        <div className={"product-item-wrapper col me-3 ms-0 mb-4 d-flex flex-column align-items-center"}>
          <div className={'product-item'}>
            <div className={"product-image-wrapper mb-2"}>
              <img
                  className={'product-image'}
                  src={item.photo}
                  alt={item.title}
              />
              {item.isNew && (<p className={'product-new-attr'}>New</p>)}
              {item.isSale && (<p className={'product-sale-attr'}>Sale</p>)}
              {item.isInStock && (<p className={'product-stock-attr'}>In Stock</p>)}
            </div>
            <div className={"product-tittle "}>
              <h5>{item.title}</h5>
            </div>
            <div className={"item-attr d-flex mb-1 "}>
              {item.isNew && <p style={{ margin: "0 5px 0 0" }}>New</p>}
              {item.isInStock && (<p style={{ margin: "0 5px 0 0" }}>In Stock</p>)}
              <Rating rating={+item.rating} />
            </div>
            <div className={"item-price  mb-2 d-flex align-items-center"}>
              <h5 style={{ display: "inline-block" }}>
                Price: {item.price.split(".")[0] + "$"}
              </h5>
            </div>
            <div className={"product-call-btns d-flex"}>
              <button className="product-callprimary-btn btn btn-primary  me-1">Click</button>
              <button className="product-callsecondary-btn btn btn-outline-secondary">Click</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
