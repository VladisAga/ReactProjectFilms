import './header.css';
import { useState, useContext, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SetColor, StringSearchValue } from '../App'

interface HeaderProps {
    type: string;
    setType: (type: string) => void;
    min: string;
    setMin: (min: string) => void;
    max: string;
    setMax: (max: string) => void;
}

export const Header: React.FC<HeaderProps> = () => {
    const { submit, del } = useContext(StringSearchValue);
    const { colorState, setColorState } = useContext(SetColor);
    const location = useLocation();
    const formRef = useRef(null); // Здесь инициализируем formRef
    const inputRef = useRef(null);

    let path;

    (colorState) ? (path = "./images/sun.png") : (path = "./images/moon.png");

    let styleMain;
    let styleFilter;
    let styleBasket;

    switch (location.pathname) {
        case ('/'):
            styleMain = { color: 'yellow' };
            break;
        case ('/filterPage'):
            styleFilter = { color: 'yellow' };
            break;
        case ('/basket'):
            styleBasket = { color: 'yellow' };
            break;
    }

    return (
        <>
            <header>
                <div className='headContent'>
                    <h2 className='logo'><span>MOVIE</span>SEARCHER</h2>
                    {location.pathname === '/' ?
                        (<div className='searchBox'>
                            <form className='headerForm' onSubmit={submit} ref={formRef}>
                                <input
                                    className='searchInput'
                                    type="text"
                                    placeholder='Type here...'
                                    name='inputName'
                                    ref={inputRef}
                                />
                                <button type="button" onClick={del}>x</button>
                                <button className='searchBtn' type="submit">search</button>
                            </form>

                        </div>) :
                        (<nav className='headerNav'>
                            <Link style={styleMain} to='/'>Home</Link>
                            <Link style={styleFilter} to='/filterPage'>Filter</Link>
                            <Link style={styleBasket} to='/basket'>Favourites</Link>
                        </nav>
                        )
                    }
                    <div className='changeColorBtn' onClick={() => { setColorState(!colorState) }}>
                        <img src={path} alt="sun_or_moon" />
                    </div>
                </div>
            </header >
        </>
    );
}