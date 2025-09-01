import { Link } from "react-router-dom";
import "../../CSS/pages/Auth/403.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
export default function Err403({role}) {
  return (
    <div className="text-wrapper mx-auto">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, You don't have permission to access this page.
        <div className="mt-2 text-center">
        <Link className="btn btn-outline-danger text-center fs-5" style={{width: 'fit-content'}} to={role === '1996' ? '/dashboard/writer' : '/'}>
            Click here to{role === '1996' ? ' go to Writer Page ' : ' go to Home Page'}
            <FontAwesomeIcon className="ms-2" icon={faArrowPointer} />
        </Link>
        </div>
      </div>
    </div>
  );
}
