import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  console.log('currentUser :>> ', currentUser);
  console.log('links :>> ', links);
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          to={`/Kanbas/Account/${link}`}
          className={`wd-link border border-0 list-group-item
           ${
             pathname.includes(link)
               ? "border-start border-dark border-5 text-black"
               : "text-danger"
           }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
