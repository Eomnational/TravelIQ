import "../CSS/VideoStytles.css";
function Video(props) {
  return (
    <>
      <div className={props.cName}>
        {/* <img alt="Hero" src={props.heroImg} /> */}
        {/* poster={props.poster} */}
        <video id="video1" autoPlay loop muted playsInline src={props.src}  ></video>
        <div className="hero-text">
          <h1>{props.title}</h1>
          <p>{props.text}</p>
          <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
        </div>
      </div>
    </>
  );
}

export default Video;