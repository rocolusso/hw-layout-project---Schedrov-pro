import React, { Component } from "react";

export class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectValue: this.props.option,
      onChangeFilter: this.props.changeFilter,
      resetFilters: this.props.reset,
      selectOptions: [
        {
          value: "choose",
          text: "Choose Filter",
        },
        {
          value: "byName",
          text: "Sort by Name A > Z",
        },
        {
          value: "byLowPrice",
          text: "↓ Low Price",
        },
        {
          value: "byHighPrice",
          text: "↑ High Price",
        },
        {
          value: "byStock",
          text: "In Stock",
        },
        {
          value: "byNew",
          text: "New Items",
        },
        {
          value: "bySale",
          text: "In Sale",
        },
        {
          value: "byRating",
          text: "Popular",
        },
      ],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.option !== prevProps.option) {
      this.setState({
        selectValue: this.props.option,
      });
    }
  }

  render() {
    const { selectValue, selectOptions, onChangeFilter, resetFilters } =
      this.state;
    return (
      <>
        <div className="filters col-2 ">
          <h5>Filter</h5>
          <select
            className={"form-select"}
            onChange={onChangeFilter}
            value={selectValue}
          >
            {selectOptions.map((item) => (
              <option
                key={item.text + Math.random().toString()}
                value={item.value}
              >
                {item.text}
              </option>
            ))}
          </select>
            {selectValue !== "choose" && (
                <button onClick={resetFilters} className={"btn btn-outline-danger mt-3"}>
                  Reset Filters
                </button>
            )}
        </div>
      </>
    );
  }
}
