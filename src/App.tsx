import React, { createContext, FormEvent, useState, useEffect } from 'react';
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
  setMinRating: React.Dispatch<React.SetStateAction<string>>;
  setMaxRating: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilm: React.Dispatch<React.SetStateAction<string>>;
  setBtnValue: React.Dispatch<React.SetStateAction<boolean>>;
  minRating: string;
  maxRating: string;
  typeFilm: string;
  arrBasket: any[];
  setArrBasket: React.Dispatch<React.SetStateAction<any[]>>
}

type PageColorContext = {
  colorState: boolean;
  setColorState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StringSearchValue = createContext<Context>({
  value: '',
  submit: () => { },
  setTypeFilm: () => { },
  setMaxRating: () => { },
  setMinRating: () => { },
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

export const SetColor = createContext<PageColorContext>({ colorState: true, setColorState: () => { } });

function App() {
  const [filterValue, setFilterValue] = useState<string>('');
  const [typeFilm, setTypeFilm] = useState<string>('');
  const [minRating, setMinRating] = useState<string>('');
  const [maxRating, setMaxRating] = useState<string>('10');
  const [valueChoice, setValueChoice] = useState<string>('');
  const [btnValue, setBtnValue] = useState<boolean>(false);

  const [colorState, setColorState] = useState(true);
  let pageColor;
  if (colorState) {
    pageColor = {
      backgroundColor: 'white',
      color: 'black'
    }
  } else {
    pageColor = {
      backgroundColor: 'black',
      color: 'white'
    }
  }


  const [arrBasket, setArrBasket] = useState<Film[]>(() => {
    const savedArrBasket = localStorage.getItem('arrBasket');
    return savedArrBasket ? JSON.parse(savedArrBasket) : [];
  });

  // Сохраняйте arrBasket в localStorage при каждом его обновлении
  useEffect(() => {
    localStorage.setItem('arrBasket', JSON.stringify(arrBasket));
  }, [arrBasket]);


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
      <SetColor.Provider value={{ colorState: colorState, setColorState }}>
        <StringSearchValue.Provider
          value={{
            value: filterValue,
            submit,
            del,
            valueChoice: valueChoice,
            btnValue: btnValue,
            setValueChoice,
            setBtnValue,
            setMaxRating,
            setMinRating,
            setTypeFilm,
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
        </SetColor.Provider>

        <Routes>
          <Route path="/" element={          
              <StringSearchValue.Provider
                value={{
                  value: filterValue,
                  submit,
                  del,
                  setMaxRating,
                  setMinRating,
                  setTypeFilm,
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
                  pageColor={pageColor}
                />
              </StringSearchValue.Provider>
          } />
          <Route path="filmPage/:filmId" element={<FilmPage
            arrBasket={arrBasket}
            setArrBasket={setArrBasket}
            pageColor={pageColor}
          />} />
          <Route
            path='filterPage'
            element={<FilterPage
              value={valueChoice}
              btnValue={btnValue}
              min={minRating}
              max={maxRating}
              type={typeFilm}
              pageColor={pageColor}
              setBtnValue={setBtnValue}
              setMaxRating={setMaxRating}
              setMinRating={setMinRating}
              setTypeFilm={setTypeFilm}
              setValueChoice={setValueChoice}
            />}
          />
          <Route path='basket' element={
              <Basket
                arrBasket={arrBasket}
                setArrBasket={setArrBasket}
                pageColor={pageColor}
              />
          } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

