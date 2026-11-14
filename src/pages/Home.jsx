import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>ברוכות הבאות למתכונים</h1>
      <p>בחרו אחת מהאפשרויות:</p>
      <ul>
        <li><Link to="/recipes">לרשימת המתכונים</Link></li>
        <li><Link to="/login/controlled">כניסה מבוקרת</Link></li>
        <li><Link to="/login/uncontrolled">כניסה לא מבוקרת</Link></li>
        <li><Link to="/login/rhf">כניסה עם React Hook Form</Link></li>
      </ul>
    </div>
  );
}
