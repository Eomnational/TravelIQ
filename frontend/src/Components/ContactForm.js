import "../CSS/ContactFormStyles.css";


function ContactForm() {
  return (
    <div className="form-container">
      <h1>Send a message to us</h1>
      <form>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Subject" />
        <textarea placeholder="Messsage" rows="4"></textarea>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;