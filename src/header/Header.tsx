import './header.css';
import { useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { StringSearchValue } from '../App'

interface HeaderProps {
    type: string;
    setType: (type: string) => void;
    min: string;
    setMin: (min: string) => void;
    max: string;
    setMax: (max: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ type, setType, min, setMin, max, setMax }) => {
    const { submit, del, setValueChoice, setBtnValue, valueChoice, btnValue } = useContext(StringSearchValue);
    const location = useLocation();

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
                            <form className='headerForm' onSubmit={submit}>
                                <input
                                    className='searchInput'
                                    type="text"
                                    placeholder='Type here...'
                                    name='inputName'
                                />
                                <button onClick={del}>x</button>
                                <input type="submit" value='search' />
                            </form>
                        </div>)  :
                            (<nav className='headerNav'>
                                <Link style={styleMain} to='/'>Home</Link>
                                <Link style={styleFilter} to='/filterPage'>Filter</Link>
                                <Link style={styleBasket} to='/basket'>Basket</Link>
                            </nav>
                            )
                    }
                    <div className='changeColorBtn'></div>
                </div>
            </header >
        </>
    );
}