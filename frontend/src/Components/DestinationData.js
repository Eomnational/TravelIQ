import { Component } from "react";
import "../CSS/DestinationStyles.css";


class DestinationData extends Component {
  render() {
    return (
      <div className={this.props.className}>
      <div className="des-text">
        <h2>{this.props.heading}</h2>
        <p>{this.props.text}</p>
        <ul>
          <li ><strong>{this.props.str1}</strong>{this.props.text1}
          </li>
          <li ><strong>{this.props.str2}</strong>{this.props.text2}
          </li>
          <li ><strong>{this.props.str3}</strong>{this.props.text3}</li>
          </ul>
      </div>

      <div className="image">
        <img alt="img"  src={this.props.img1} />
        {/* <img alt="img"  src={this.props.img2} /> */}
      </div>
    </div>
    );
  }
}

export default DestinationData;