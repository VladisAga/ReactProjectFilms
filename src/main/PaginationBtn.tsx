import './paginationBtn.css';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilmArrLength } from './Main';
import { FilterDataPagination } from '../pages/filterPage/FilterPage';


export const PaginationBtn = () => {
    const { arr, lengthRef, pagePopular, pageKeyWord, setPageKeyWord, setPagePopular } = useContext(FilmArrLength);
    const { filterLength, filterPagination, setFilterPagination } = useContext(FilterDataPagination);
    const location = useLocation();

    let empty = {};

    (arr.length === 0) ? (empty = {display: 'none'}) : (empty = {display: 'flex'});

    return (
        <>
            {arr.length !== 0 ? (<div style={empty} className='pagination'>
                <button onClick={() => pagePopular > 1 && setPagePopular(pagePopular - 1)}>
                    <span className='pagePagination'>&lsaquo; Previous</span>
                </button>
                <p><span>{pagePopular}</span></p>
                <button onClick={() => pagePopular < 5 && setPagePopular(pagePopular + 1)}>
                    <span className='pagePagination'> Next &rsaquo;</span>
                </button>
            </div>) : (location.pathname === '/filterPage') ? (<div style={empty} className='pagination'>
                <button onClick={() => filterPagination > 1 && setFilterPagination(filterPagination - 1)}>
                    <span className='pagePagination'>&lsaquo; Previous</span>
                </button>
                <p><span>{filterPagination}</span></p>
                <button onClick={() => filterLength >= 20 && setFilterPagination(filterPagination + 1)}>
                    <span className='pagePagination'> Next &rsaquo;</span>
                </button>
            </div>) : (<div style={empty} className='pagination'>
                <button onClick={() => pageKeyWord > 1 && setPageKeyWord(pageKeyWord - 1)}>
                    <span className='pagePagination'>&lsaquo; Previous</span>
                </button>
                <p><span>{pageKeyWord}</span></p>
                <button onClick={() => lengthRef >= 20 && setPageKeyWord(pageKeyWord + 1)}>
                    <span className='pagePagination'> Next &rsaquo;</span>
                </button>
            </div>)}
        </>
    );
}