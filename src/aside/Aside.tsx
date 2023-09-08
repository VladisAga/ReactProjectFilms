import './aside.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ForAside } from '../main/Main';



export const Aside = () => {

    const { min, max, value, type, btnValue, setArrBasket, arrBasket } = useContext(ForAside);

    return (
        <>
            <aside>
                <Link target='_blanck' to={{
                    pathname: '/filterPage',
                    search: `?value=${value}&btnValue=${btnValue}&min=${min}&max=${max}&type=${type}`,
                }}> Filter </Link>
                <Link to={{
                    pathname: '/basket',
                    }}>Basket</Link>
            </aside>
        </>
    )
}