import React, { Component } from "react";
import ratingIcon from "../assets/rating.svg";

export class Rating extends Component {
  generateRatingTag(number) {
    if (number < 20) {
      return ["i"];
    } else if (number < 40) {
      return ["i", "i"];
    } else if (number < 60) {
      return ["i", "i", "i"];
    } else if (number < 80) {
      return ["i", "i", "i", "i"];
    } else if (number < 100) {
      return ["i", "i", "i", "i", "i"];
    }
  }

  render() {
    const { rating } = this.props;
    return (
      <div className={"rating-block"} style={{ display: "flex" }}>
        {rating &&
          this.generateRatingTag(rating).map((item) => (
            <img
              key={Math.random()}
              style={{ maxWidth: "30px" }}
              src={ratingIcon}
              alt={item}
            />
          ))}
      </div>
    );
  }
}
