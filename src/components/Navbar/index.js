import './styles.scss';
import { FiMoon, FiSun } from "react-icons/fi";

export const Navbar = ({ onClick, theme }) => {
    return (
        <header className="header row">
        <div className="col-12 col-md-5">
          <p className="header__title ml-2">
            Github Search
          </p>
        </div>
        <div className="col-12 col-md-7 d-flex justify-content-end">
          <p className="header__item" onClick={onClick} id="mode">{theme ? <FiSun /> : <FiMoon />}</p>
        </div>
      </header>
    )
}
