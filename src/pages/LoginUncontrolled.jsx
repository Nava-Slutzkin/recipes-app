import { useRef, useState } from "react";
import { Link } from "react-router";
import { login } from "../services/auth";

export default function LoginUncontrolled() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    const user = login({ email, password });

    if (user) {
      setMessage(`שלום ${user.name}! התחברת בהצלחה.`);
      return;
    }

    setMessage("הפרטים שגויים. נסו שוב.");
  }

  return (
    <div>
      <h2>כניסה לא מבוקרת</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">אימייל:</label><br />
          <input id="email" type="email" ref={emailRef} defaultValue="" />
        </div>

        <div>
          <label htmlFor="password">סיסמה:</label><br />
          <input id="password" type="password" ref={passwordRef} defaultValue="" />
        </div>

        <button type="submit">התחבר</button>
      </form>

      {message && <p>{message}</p>}
      <Link to="/">חזרה לעמוד הבית</Link>
    </div>
  );
}
