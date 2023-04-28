import SearchBar from '../searchBar/SearchBar';
import {Link} from 'react-router-dom';
import style from './Nav.module.css'


const Nav =({ onSearch, logout })=>{
    return(
        <nav className={style.nav}>
            <button>
                <Link to='/about'>ABOUT</Link>
            </button>
            <button>
                <Link to='/home'>HOME</Link>
            </button>
            <button>
                <Link to='/favorites'>FAVORITES</Link>
            </button>
            <button onClick={logout}>
                LOGOUT
            </button>
            <SearchBar onSearch={onSearch} />
        </nav>
    )
}

export default Nav;