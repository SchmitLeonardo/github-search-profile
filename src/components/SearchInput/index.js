import { SearchButton } from '../SearchButton';
import './styles.scss';

export const SearchInput = ({ userInfo, getUser, search }) => {
  return (
    <div className="search mt-3 mb-5">
      <input type="text" className="search__input" name="search" onChange={userInfo} onKeyPress={getUser} placeholder="Search User..." />
      <SearchButton search={search} />
    </div>
  )
}
