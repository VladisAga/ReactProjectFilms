import React, { useState, useEffect, useContext, useRef, createContext } from 'react';
import { Link } from "react-router-dom";
import { CSSProperties } from 'react';
import './main.css';
import { StringSearchValue } from '../App';
import { Aside } from '../aside/Aside';
import { PaginationBtn } from './PaginationBtn';
import { lengthName, rating, getRatingStyle } from './function';

export interface Film {
    filmLength: number;
    webUrl: string;
    description: string;
    filmId: number;
    nameRu: string;
    nameOriginal: string;
    ratingKinopoisk: string;
    nameEn: string;
    kinopoiskId: number;
    year: number;
    posterUrl: string;
    genres: { genre: string }[];
    rating: string;
    countries: { country: string }[]
}

interface MainProps {
    btnValue: boolean;
    valueChoice: string;
    minRating: string;
    maxRating: string;
    typeFilm: string;
}

interface FilmArrayContext {
    arr: Film[];
    lengthRef: number;
    pageKeyWord: number;
    pagePopular: number;
    setPageKeyWord: React.Dispatch<React.SetStateAction<number>>;
    setPagePopular: React.Dispatch<React.SetStateAction<number>>;
}

export const FilmArrLength = createContext<FilmArrayContext>({
    arr: [],
    lengthRef: 0,
    pageKeyWord: 1,
    pagePopular: 1,
    setPageKeyWord: () => { },
    setPagePopular: () => { },
});

interface ContextProps {
    btnValue: boolean;
    value: string;
    min: string;
    max: string;
    type: string;
    arrBasket: any[];
    setArrBasket: React.Dispatch<React.SetStateAction<any[]>>
    setTypeFilm: React.Dispatch<React.SetStateAction<string>>;
    setMinRating: React.Dispatch<React.SetStateAction<string>>;
    setMaxRating: React.Dispatch<React.SetStateAction<string>>;
    setValueChoice: React.Dispatch<React.SetStateAction<string>>;
    setBtnValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForAside = createContext<ContextProps>({
    btnValue: false,
    value: '',
    min: '',
    max: '',
    type: '',
    arrBasket: [],
    setArrBasket: () => { },
    setTypeFilm: () => { },
    setMaxRating: () => { },
    setMinRating: () => { },
    setValueChoice: () => { },
    setBtnValue: () => { },
});

export const Main: React.FC<MainProps> = ({ btnValue, valueChoice, minRating, maxRating, typeFilm }) => {

    const [filmArr, setFilmArr] = useState<Film[]>([]);
    const [filmArr1, setFilmArr1] = useState<Film[]>([]);
    const { value, arrBasket, setArrBasket, setMaxRating, setMinRating, setTypeFilm, setBtnValue, setValueChoice } = useContext(StringSearchValue);
    const [pageKeyWord, setPageKeyWord] = useState<number>(1);
    const [pagePopular, setPagePopular] = useState<number>(1);

    const jsonRef = useRef<number>(0);
    const urlRef = useRef<string>('');
    const urlTopRef = useRef<string>('');
    const ArrJsonRef = useRef<Film[]>([]);

    let position: CSSProperties;

    if (filmArr.length === 0 && jsonRef.current === 0) {
        position = { position: 'sticky', top: '87px' };
    } else {
        position = { position: 'relative' };
    }

    useEffect(() => {
        setFilmArr([]);
        setFilmArr1([]);

        urlTopRef.current = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pagePopular}`;

        if (value.length === 0) urlRef.current = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pagePopular}`;
        else urlRef.current = `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${value}=${pageKeyWord}`;

        (urlRef.current === urlTopRef.current) ? setPageKeyWord(1) : setPagePopular(1);

        fetch(urlRef.current, {
            method: 'GET',
            headers: {
                'X-API-KEY': '8c8e1a50-6322-4135-8875-5d40a5420d86',
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                if (value.length !== 0) {
                    setFilmArr1(json.films);
                } else {
                    setFilmArr(json.films);
                }
                jsonRef.current = json.films.length;
                ArrJsonRef.current = json.films;
            });

    }, [value, pageKeyWord, pagePopular]);

    return (
        <>
            <main className='main'>
                <ForAside.Provider value={{
                    btnValue: btnValue,
                    value: valueChoice,
                    min: minRating,
                    max: maxRating,
                    type: typeFilm,
                    arrBasket: arrBasket,
                    setArrBasket,
                    setMaxRating,
                    setMinRating,
                    setTypeFilm,
                    setValueChoice,
                    setBtnValue
                }}>
                    <Aside
                        value1={value}
                        btnValue1={btnValue}
                        min1={minRating}
                        max1={maxRating}
                        setBtnValue1={setBtnValue}
                        setMaxRating1={setMaxRating}
                        setMinRating1={setMinRating}
                        setTypeFilm1={setTypeFilm}
                        type1={typeFilm}
                        setValueChoice1={setValueChoice}
                    />
                </ForAside.Provider>
                <div className='afterAside'>
                    {urlRef.current === urlTopRef.current ? (<p style={position} className='premieres'>Popular films: top 100 </p>) : (<p style={position} className='premieres'>Your search: {value}</p>)}
                    <ul className='posterList'>
                        {filmArr && filmArr.map((film, id) => (
                            <li className='poster' key={id}>
                                <div className='posterRating'>
                                    <img src={film.posterUrl} alt={film.nameRu} style={{ borderRadius: '5px' }} width={215} height={290} />
                                    <p className='rating' style={getRatingStyle(rating(film) as number)}>
                                        <span>{rating(film)}</span>
                                    </p>
                                    <Link to={`/filmPage/${film.filmId}`} />
                                    <div className='learnMore'>
                                        <span>Learn more</span>
                                    </div>
                                </div>
                                <p >{lengthName(film)}</p>
                                <p >{film.genres.length > 0 ? film.genres[0].genre : 'Unknown Genre'}, {film.year}</p>
                            </li>
                        ))}
                        {filmArr.length === 0 && jsonRef.current === 0 && <p className='zeroResponse'>Nothing was found for your query&#9785;&#65039;</p>}
                        {filmArr.length === 0 && filmArr1.map((film, id) => (
                            <li className='poster' key={id} >
                                <div className='posterRating'>
                                    <img src={film.posterUrl} alt={film.nameRu} style={{ borderRadius: '5px' }} width={215} height={290} />
                                    <p className='rating' style={getRatingStyle(rating(film) as number)}>
                                        <span>{rating(film)}</span>
                                    </p>
                                    <Link to={`/filmPage/${film.filmId}`} />
                                    <div className='learnMore'>
                                        <span>Learn more</span>
                                    </div>
                                </div>
                                <p >{lengthName(film)}</p>
                                <p >{film.genres.length > 0 ? film.genres[0].genre : 'Unknown Genre'}, {film.year}</p>
                            </li>
                        ))}
                    </ul>
                    <FilmArrLength.Provider value={{
                        arr: filmArr,
                        lengthRef: jsonRef.current,
                        pageKeyWord,
                        pagePopular,
                        setPageKeyWord,
                        setPagePopular,
                    }} >
                        <PaginationBtn />
                    </FilmArrLength.Provider>
                </div>
            </main >

        </>
    );
}
