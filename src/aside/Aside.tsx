import './aside.css';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ForAside } from '../main/Main';
import { FilterJsx } from '../pages/filterPage/FilterJSX';

interface HeaderProps {
    type1: string;
    setTypeFilm1: (type1: string) => void;
    min1: string;
    setMinRating1: (min1: string) => void;
    max1: string;
    setMaxRating1: (max1: string) => void;
    btnValue1: boolean;
    value1: string;
    setValueChoice1: (value1: string) => void;
    setBtnValue1: (btnValue1:boolean) => void;
}

export const Aside: React.FC<HeaderProps> = ({value1, min1, max1, type1, btnValue1, setBtnValue1, setTypeFilm1, setMinRating1,setMaxRating1, setValueChoice1}) => {

    const { min, max, value, type, btnValue, setArrBasket, arrBasket, setMaxRating, setMinRating, setTypeFilm, setBtnValue, setValueChoice } = useContext(ForAside);
    const location = useLocation();

    let styleMain;
    let styleFilter;
    let styleBasket;

    console.log(max + 'min')

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
            <aside>
                {(location.pathname === '/filterPage') ? (<FilterJsx
                    type={type1}
                    setType={setTypeFilm1}
                    min={min1}
                    setMin={setMinRating1}
                    setMax={setMaxRating1}
                    max={max1}
                    setValueChoice={setValueChoice1}
                    valueChoice={value1}
                    setBtnValue={setBtnValue1}
                    btnValue={btnValue1}
                />) :
                    (<nav className='navigation'>
                        <Link style={styleMain} target='_blanck' to='/'>Главная</Link>
                        <Link style={styleFilter} target='_blanck' to={{
                            pathname: '/filterPage',
                            search: `?value=${value}&btnValue=${btnValue}&min=${min}&setMaxRating=${setMaxRating}&setMinRating=${setMinRating}&type=${type}&setTypeFilm=${setTypeFilm}&setBtnValue=${setBtnValue}&setValueChoice=${setValueChoice}`,
                        }}> Filter </Link>
                        <Link style={styleBasket} to={{
                            pathname: '/basket',
                        }}>Basket</Link>
                    </nav>)}
            </aside>
        </>
    )
}