import { useState } from "react";
import { Link } from "react-router";
import { login } from "../services/auth";

export default function LoginControlled() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = login({ email, password });

    if (user) {
      setMessage(`שלום ${user.name}! התחברת בהצלחה.`);
      return;
    }

    setMessage("הפרטים שגויים. נסו שוב.");
  }

  return (
    <div>
      <h2>כניסה מבוקרת</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">אימייל:</label><br />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">סיסמה:</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">התחבר</button>
      </form>

      {message && <p>{message}</p>}
      <Link to="/">חזרה לעמוד הבית</Link>
    </div>
  );
}
