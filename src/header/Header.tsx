import './header.css';
import { useState, useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { StringSearchValue } from '../App'
import { FilterJsx } from '../pages/filterPage/FilterJSX';

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
    console.log(min);

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
                        </div>) : (location.pathname === '/filterPage') ? (<FilterJsx 
                        type = {type}
                        setType={setType}
                        min={min}
                        setMin={setMin}
                        setMax={setMax}
                        max={max}
                        setValueChoice={setValueChoice}
                        valueChoice={valueChoice}
                        setBtnValue={setBtnValue}
                        btnValue={btnValue}

                        />) :
                            (<Link to='/'>Home</Link>)
                    }
                    <div className='changeColorBtn'></div>
                </div>
            </header >
        </>
    );
}