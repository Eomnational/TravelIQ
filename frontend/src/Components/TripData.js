import "../CSS/TripStyles.css";

function TripData(props) {
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props.image} alt="image" />
      </div>
        <h4>{props.heading}</h4>
        {/* <p>{props.text}</p> */}
        <p style={{ whiteSpace: 'pre-line' }}>{props.text}</p> {/* 允许文本换行 */}
    </div>
  );
}

export default TripData;