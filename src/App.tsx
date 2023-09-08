import React, { createContext, FormEvent, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './header/Header';
import { Main } from './main/Main';
import { FilmPage } from './pages/filmPage/FilmPage';
import { FilterPage } from './pages/filterPage/FilterPage';
import { Basket } from './pages/basketPage/Basket';
import { Film } from './main/Main';

type Context = {
  value: string;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  del: () => void;
  valueChoice: string;
  btnValue: boolean;
  setValueChoice: React.Dispatch<React.SetStateAction<string>>;
  setBtnValue: React.Dispatch<React.SetStateAction<boolean>>;
  minRating: string;
  maxRating: string;
  typeFilm: string;
  arrBasket: any[];
  setArrBasket: React.Dispatch<React.SetStateAction<any[]>>
}

export const StringSearchValue = createContext<Context>({
  value: '',
  submit: () => { },
  del: () => { },
  valueChoice: '',
  btnValue: false,
  setValueChoice: () => { },
  setBtnValue: () => { },
  minRating: '',
  maxRating: '',
  typeFilm: '',
  arrBasket: [],
  setArrBasket: () => { }
});

function App() {
  const [filterValue, setFilterValue] = useState<string>('');
  const [typeFilm, setTypeFilm] = useState<string>('');
  const [minRating, setMinRating] = useState<string>('');
  const [maxRating, setMaxRating] = useState<string>('10');
  const [valueChoice, setValueChoice] = useState<string>('');
  const [btnValue, setBtnValue] = useState<boolean>(false);

  const [arrBasket, setArrBasket] = useState<Film[]>([]);

  const submit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const value = (form.inputName as HTMLInputElement).value;
    setFilterValue(value);
  };

  const del = () => {
    const valueInput = document.querySelector('.searchInput') as HTMLInputElement | null;

    if (valueInput) {
      valueInput.value = '';
    }
  };

  return (
    <div className="App">
      <Router>
        <StringSearchValue.Provider
          value={{
            value: filterValue,
            submit,
            del,
            valueChoice: valueChoice,
            btnValue: btnValue,
            setValueChoice,
            setBtnValue,
            minRating: minRating,
            maxRating: maxRating,
            typeFilm: typeFilm,
            arrBasket: arrBasket,
            setArrBasket
          }}
        >
          <Header
            type={typeFilm}
            setType={setTypeFilm}
            min={minRating}
            setMin={setMinRating}
            max={maxRating}
            setMax={setMaxRating}
          />
        </StringSearchValue.Provider>

        <Routes>
          <Route path="/" element={
            <StringSearchValue.Provider
              value={{
                value: filterValue,
                submit,
                del,
                setValueChoice,
                setBtnValue,
                valueChoice: valueChoice,
                btnValue: btnValue,
                minRating: minRating,
                maxRating: maxRating,
                typeFilm: typeFilm,
                arrBasket: arrBasket,
                setArrBasket
              }}
            >
              <Main
                btnValue={btnValue}
                valueChoice={valueChoice}
                minRating={minRating}
                maxRating={maxRating}
                typeFilm={typeFilm}
              />
            </StringSearchValue.Provider>
          } />
          <Route path="filmPage/:filmId" element={<FilmPage
            arrBasket={arrBasket}
            setArrBasket={setArrBasket}
          />} />
          <Route
            path='filterPage'
            element={<FilterPage
              value={valueChoice}
              btnValue={btnValue}
              min={minRating}
              max={maxRating}
              type={typeFilm}
            />}
          />
          <Route path='basket' element={<Basket
            arrBasket={arrBasket}
            setArrBasket={setArrBasket}
          />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

