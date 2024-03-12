import { phoneNum } from "../../helpers/functions"

export default function Imprint() {
  return (
    <div>
      <h2>Imprint</h2>
      <h3>Website</h3>
      <p>This imprint is valid for the domain lernmausi.de and all subdomains.</p>
      <h3>Information due to § 5 TMG</h3>
      <h4>Adress</h4>
      {/* <p>Rebecca Noy<br/>
      Brentanostraße 5<br/>
      93051 Regensburg</p> */}
      <h4>Contact</h4>
      <p>For technical feedback as well as other non-spammy stuff, please bother me:</p>
      <p>Phone: <a href="tel:+1234567890">{phoneNum("+01234567890")}</a><br/>
      {/* <p>Phone: <a href="tel:+4915142337656">{phoneNum("+4915142337656")}</a><br/> */}
      E-Mail: <a href="mailto:info@lernmausi.de">info@lernmausi.de</a></p>
    </div>
  )
}