import { Link, useLocation } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import './FooterBar.css';

function FooterBar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const isNewVideoPage = location.pathname === "/newVideo";

    return (
        <div className="footer-bar">
            {isHomePage && (
                <>
                    <Link to="/" className="footer-icon">
                        <button className="icon">
                            
                            <p>INICIO</p>
                        </button>
                    </Link>
                    <Link to="/newVideo" className="footer-icon">
                        <IoMdAddCircleOutline className="icon-add" />
                    </Link>
                </>
            )}
            {isNewVideoPage && (
                <>
                    <Link to="/" className="footer-icon">
                    </Link>
                    <Link to="/newVideo" className="footer-icon">
                        <button className="icon">
                            <IoMdAddCircleOutline className="icon-add" />
                            <p>NUEVO VIDEO</p>
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default FooterBar;
