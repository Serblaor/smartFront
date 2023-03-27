import { Button } from "react-bootstrap"
import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <Button style={{
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#003580",
                }}>Subscribe</Button>
      </div>
    </div>
  )
}

export default MailList