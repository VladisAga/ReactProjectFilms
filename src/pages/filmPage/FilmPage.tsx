import { useState, useEffect } from 'react';
import { Film } from '../../main/Main';
import { useParams } from 'react-router-dom';
import './filmPages.css';
import { ratingOnPage, getRatingStyle } from '../../main/function';

interface FilmPageProps {
    arrBasket: Film[];
    setArrBasket: (arr: Film[]) => void;
}

export const FilmPage: React.FC<FilmPageProps> = ({ arrBasket, setArrBasket }) => {
    const { filmId } = useParams();
    const [btnValue, setBtnValue] = useState(false);

    const [filmIdObj, setFilmIdObj] = useState<Film>({} as Film);

    useEffect(() => {
        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setFilmIdObj(json as Film))
    }, [filmId]);

    const handleAddToBasket = () => {
        const basket = [...arrBasket];
        const index = basket.findIndex((currentValue) => currentValue.kinopoiskId === filmIdObj.kinopoiskId);
        (index === -1) ? (setArrBasket([...arrBasket, filmIdObj])) : (setArrBasket([...basket]));
        console.log(arrBasket);
        console.log(index);
        console.log(filmIdObj)
    }

    const handleDelFromBasket = () => {
        const basket = [...arrBasket];
        const basket2 = basket.filter((currentValue) => currentValue.kinopoiskId !== filmIdObj.kinopoiskId);
        setArrBasket([...basket2]);
    }

    useEffect(() => {
        (btnValue) ? (handleAddToBasket()) : (handleDelFromBasket());
    }, [btnValue]);

    let btnStyle;

    (btnValue) ?
        (btnStyle = { backgroundImage: `url(data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill='%23f50'%3E%3Cpath d='M5.5 3.5h13V21L12 17.45 5.5 21V3.5Z'/%3E%3C/svg%3E)` })
        :
        (btnStyle = { backgroundImage: `url(data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill=white d='M5.5 3.5h13V21L12 17.45 5.5 21V3.5Z'/%3E%3C/svg%3E)` });

    return (
        <>
            <main className='mainFilmPage'>
                <div className='boxMain'>
                    <div className='posterAndRating'>
                        <div className='boxImg'>
                            <img src={filmIdObj?.posterUrl} alt={filmIdObj?.nameRu} style={{ borderRadius: '5px' }} width={215} height={290} />
                        </div>
                        <div className='filmPageRating' style={getRatingStyle(ratingOnPage(filmIdObj) as number | null)}>
                            <span>{ratingOnPage(filmIdObj)}</span>
                        </div>
                    </div>
                    <article className='infAboutFilm'>
                        <div>
                            <h1>{filmIdObj?.nameRu}({filmIdObj?.year})</h1>
                            <p>{filmIdObj?.nameOriginal}</p>
                        </div>
                        <div className='infFilm'>
                            <div className='infTopic'>
                                <p>О фильме </p>
                                <p>Год производства </p>
                                <p >Страна</p>
                                <p>Жанр</p>
                                <p className='filmLength'>Длительность</p>
                                <p>Узнать гораздо больше</p>
                            </div>
                            <div className='infFilmData'>
                                <p>{filmIdObj?.year}</p>
                                <div className='pWithList'>
                                    <ul className='listInFilmPage'>
                                        {filmIdObj?.countries?.map((value, id) => <li key={id}>{value.country} </li>)}
                                    </ul>
                                </div>
                                <div className='pWithList'>
                                    <ul className='listInFilmPage'>
                                        {filmIdObj?.genres?.map((value, id) => <li key={id}>{value.genre}</li>)}
                                    </ul>
                                </div>
                                <p>{filmIdObj?.filmLength + ' мин.'}</p>
                                <div><a href={filmIdObj?.webUrl}>Click</a></div>
                            </div>
                        </div>
                    </article>
                </div>
                <div className='desription'>
                    <p>Description</p>
                    <p>{filmIdObj?.description}</p>
                </div>
                <button onClick={() => { setBtnValue(!btnValue) }}> dcscs</button>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" stroke="black" stroke-width="2">
                        <path d="M5.5 3.5h13V21L12 17.45 5.5 21V3.5Z" />
                    </svg>
                </div>
            </main>
        </>
    )
}