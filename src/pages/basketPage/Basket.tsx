import { Film } from "../../main/Main";
import { Link } from "react-router-dom";
import './basket.css';
import { lengthName, getRatingStyle, ratingOnPage } from '../../main/function';

interface BasketProps {
    arrBasket: Film[];
    setArrBasket: (arr: Film[]) => void;
}

export const Basket: React.FC<BasketProps> = ({ setArrBasket, arrBasket }) => {

    const handleDelFromBasket = (id: number) => {
        const basket = [...arrBasket];
        basket.splice(id, 1);
        setArrBasket(basket);
    }

    return (
        <>
            <main style={{ maxWidth: '1500px' }} className="main mainBasket">
                {arrBasket.length === 0 ? (<p className='premieres basketP'>Список предпочтений пуст</p>) : (<p className='premieres basketP' >Избранный список предпочтений</p>)}
                <ul className='posterList ulBasket'>
                    {arrBasket.map((value, id) => (
                        <li className='poster' key={id}>
                            <div className='posterRating'>
                                <img src={value.posterUrl} alt={value.nameRu} style={{ borderRadius: '5px' }} width={215} height={290} />
                                <p className='rating' style={getRatingStyle(ratingOnPage(value) as number)}>
                                    <span>{ratingOnPage(value)}</span>
                                </p>
                                <Link to={`/filmPage/${value.kinopoiskId}`} />
                                <div className='learnMore'>
                                    <span>Learn more</span>
                                </div>
                            </div>
                            <p >{lengthName(value)}</p>
                            <p >{value.genres.length > 0 ? value.genres[0].genre : 'Unknown Genre'}, {value.year}</p>
                            <button onClick={() => handleDelFromBasket(id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}
