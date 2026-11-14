import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useState } from "react";
import { login } from "../services/auth";

export default function LoginRHF() {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const user = login(data);

    if (user) {
      setMessage(`שלום ${user.name}! התחברת בהצלחה.`);
      reset();
      return;
    }

    setMessage("הפרטים שגויים. נסו שוב.");
  };

  return (
    <div>
      <h2>כניסה עם React Hook Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">אימייל:</label><br />
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "שדה אימייל חובה",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "כתובת אימייל לא תקינה",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">סיסמה:</label><br />
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "שדה סיסמה חובה",
              minLength: {
                value: 6,
                message: "הסיסמה חייבת להכיל לפחות 6 תווים",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">התחבר</button>
      </form>

      {message && <p>{message}</p>}
      <Link to="/">חזרה לעמוד הבית</Link>
    </div>
  );
}
