import './filterJSX.css'
import { useEffect, useState, useRef, createContext } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../main/Main';
import { lengthName, rating, getRatingStyle, ratingOnPage } from '../../main/function';
import '../../main/main.css';
import { PaginationBtn } from '../../main/PaginationBtn';
import { Aside } from '../../aside/Aside';

interface FilterProps {
    btnValue: boolean;
    value: string;
    min: string;
    max: string;
    type: string;
    pageColor: {};
    setTypeFilm: React.Dispatch<React.SetStateAction<string>>,
    setMaxRating: React.Dispatch<React.SetStateAction<string>>,
    setMinRating: React.Dispatch<React.SetStateAction<string>>,
    setValueChoice: React.Dispatch<React.SetStateAction<string>>,
    setBtnValue: React.Dispatch<React.SetStateAction<boolean>>,
}

interface FilterContext {
    filterLength: number;
    filterPagination: number;
    setFilterPagination: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterDataPagination = createContext<FilterContext>({
    filterLength: 0,
    filterPagination: 1,
    setFilterPagination: () => { },
});

export const FilterPage: React.FC<FilterProps> = ({ value, btnValue, min, max, type, setBtnValue, setMaxRating, setMinRating, setTypeFilm, setValueChoice, pageColor }) => {

    const [filterPagination, setFilterPagination] = useState(1);
    const filterLengthRef = useRef(0);

    const [arr, setArr] = useState<Film[]>([]);

    useEffect(() => {
        setArr([]);
        let url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=${type}&ratingFrom=${min}&ratingTo=${max}&keyword=${value}&page=${filterPagination}`;
        if (value.length === 0) {
            url = ''
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => { setArr(json.items); filterLengthRef.current = json.items.length; })
    }, [btnValue, filterPagination]);

    return (
        <>
            <main style={pageColor} className='main '>
                <Aside
                    value1={value}
                    btnValue1={btnValue}
                    min1={min}
                    max1={max}
                    type1={type}
                    setBtnValue1={setBtnValue}
                    setMinRating1={setMinRating}
                    setMaxRating1={setMaxRating}
                    setTypeFilm1={setTypeFilm}
                    setValueChoice1={setValueChoice}
                />
                <div className='afterAside filterMain'>
                    {filterLengthRef.current === 0 ? (<p className='zeroResponse filterZero' >Здесь будет отображаться список фильмов по вашим предпочтениям</p>) : (<p className='premieres'>Список на основе ваших предпочтений</p>)}
                    <ul className='posterList '>
                        {arr && arr.map((film, id) => (
                            <li className='poster' key={id}>
                                <div className='posterRating'>
                                    <img src={film.posterUrl} alt={film.nameRu} style={{ borderRadius: '5px' }} width={215} height={290} />
                                    <p className='rating' style={getRatingStyle(ratingOnPage(film) as number)}>
                                        <span>{ratingOnPage(film)}</span>
                                    </p>
                                    <Link to={`/filmPage/${film.kinopoiskId}`} />
                                    <div className='learnMore'>
                                        <span>Learn more</span>
                                    </div>
                                </div>
                                <p >{lengthName(film)}</p>
                                <p >{film.genres.length > 0 ? film.genres[0].genre : 'Unknown Genre'}, {film.year}</p>
                            </li>
                        ))}
                    </ul>
                    <FilterDataPagination.Provider value={{
                        filterLength: filterLengthRef.current,
                        filterPagination,
                        setFilterPagination
                    }} >
                        <PaginationBtn />
                    </FilterDataPagination.Provider>
                </div>
            </main>
        </>
    )
}