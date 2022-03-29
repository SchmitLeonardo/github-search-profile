import './styles.scss';
import { FaSearch } from "react-icons/fa";

export const SearchButton = ({search}) => {
    return (
        <div className="button" onClick={search}>
            <FaSearch />
        </div>
    )
}
