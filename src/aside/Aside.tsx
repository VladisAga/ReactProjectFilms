import './aside.css';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ForAside } from '../main/Main';



export const Aside = () => {

    const { min, max, value, type, btnValue, setArrBasket, arrBasket } = useContext(ForAside);
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
            <aside>
                    <nav className='navigation'>
                        <Link style={styleMain} target='_blanck' to='/'>Главная</Link>
                        <Link style={styleFilter} target='_blanck' to={{
                            pathname: '/filterPage',
                            search: `?value=${value}&btnValue=${btnValue}&min=${min}&max=${max}&type=${type}`,
                        }}> Filter </Link>
                        <Link style={styleBasket} to={{
                            pathname: '/basket',
                        }}>Basket</Link>
                    </nav>
            </aside>
        </>
    )
}