import React, { Component } from "react";
import { Filters } from "../components/Filters";
import { ProductCard } from "../components/ProductCard/ProductCard";

export class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      getDataUrl: this.props.dataUrl,
      fetchedData: [],
      itemsToRender: [],
      inputValue: "",
      selectValue: "choose",
    };
  }

  componentDidMount() {


    fetch(this.state.getDataUrl)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          fetchedData: data.slice(0, 12),
          itemsToRender: data.slice(0, 12),
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inputValue !== prevState.inputValue) {
      this.setState({
        itemsToRender: this.state.fetchedData.filter((item) =>
          item.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
        ),
      });
    }

    if (this.state.selectValue !== prevState.selectValue) {
      if (this.state.selectValue === "byLowPrice") {
        this.setState({
          itemsToRender: structuredClone(this.state.fetchedData).sort(
            (a, b) => {
              const A = +a.price;
              const B = +b.price;
              if (A < B) return -1;
              if (A > B) return 1;
              return 0;
            }
          ),
        });
      } else if (this.state.selectValue === "byHighPrice") {
        this.setState({
          itemsToRender: structuredClone(this.state.fetchedData).sort(
            (a, b) => {
              const A = +a.price;
              const B = +b.price;
              if (A < B) return 1;
              if (A > B) return -1;
              return 0;
            }
          ),
        });
      } else if (this.state.selectValue === "byRating") {
        this.setState({
          itemsToRender: structuredClone(this.state.fetchedData).sort(
            (a, b) => {
              const A = +a.rating;
              const B = +b.rating;
              if (A < B) return 1;
              if (A > B) return -1;
              return 0;
            }
          ),
        });
      } else if (this.state.selectValue === "byName") {
        const dataSortedByTittle = structuredClone(this.state.fetchedData).sort(
          (a, b) => {
            const A = a.title.charAt(0);
            const B = b.title.charAt(0);
            if (A < B) return -1;
            if (A > B) return 1;
            return 0;
          }
        );

        this.setState({
          itemsToRender: dataSortedByTittle,
        });
      } else if (this.state.selectValue === "byNew") {
        this.setState({
          itemsToRender: this.state.fetchedData.filter(
            (item) => item.isNew === true
          ),
        });
      } else if (this.state.selectValue === "byStock") {
        this.setState({
          itemsToRender: this.state.fetchedData.filter(
            (item) => item.isInStock === true
          ),
        });
      } else if (this.state.selectValue === "bySale") {
        this.setState({
          itemsToRender: this.state.fetchedData.filter(
            (item) => item.isSale === true
          ),
        });
      } else {
        this.setState({
          itemsToRender: this.state.fetchedData,
        });
      }
    }
  }

  searchHandle = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  changeFilter = (e) => {
    return this.setState({ selectValue: e.target.value });
  };

  resetFilter = () => {
    return this.setState({ selectValue: "choose" });
  };

  render() {
    const { itemsToRender, selectValue } = this.state;
    return (
      <div className="container">
        <div className="row d-flex flex-column mt-4">
          <div className="col products-search-toolbar  mb-5 ">
            <div className="row  flex-wrap " style={{height:'130px'}}>
              <Filters
                changeFilter={this.changeFilter}
                option={selectValue}
                reset={this.resetFilter}
              />
              <div className="search mb-4 me-3 col ">
                <h5>Search</h5>
                <input
                  style={{ width: "100%" }}
                  className={"form-control"}
                  onChange={this.searchHandle}
                />
              </div>
            </div>
            {itemsToRender && <h5>Products quantity:{itemsToRender.length}</h5>}
          </div>
          <div className="col products">
            <div className={"products-list row "}>
              {itemsToRender.map((item) => (
                <ProductCard key={Math.random().toString()} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
