import './filterJSX.css'

interface HeaderProps {
    type: string;
    setType: (type: string) => void;
    min: string;
    setMin: (min: string) => void;
    max: string;
    setMax: (max: string) => void;
    btnValue: boolean;
    valueChoice: string;
    setValueChoice: (valueChoice: string) => void;
    setBtnValue: (btnValue: boolean) => void;
}

export const FilterJsx: React.FC<HeaderProps> = ({ type, setType, min, setMin, max, setMax, setValueChoice, valueChoice, setBtnValue, btnValue }) => {
    
    return (
        <>
            <div className="positionFilter">
                <p>Тип фильма</p>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="ALL">ALL</option>
                    <option value="FILM">FILM</option>
                    <option value="TV_SHOW">TV_SHOW</option>
                    <option value="TV_SERIES">TV_SERIES</option>
                    <option value="MINI_SERIES">MINI_SERIES</option>
                </select>
                <p>Мин. рейтинг</p>
                <select value={min} onChange={(e) => setMin(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <p>Макс. рейтинг</p>
                <select value={max} onChange={(e) => setMax(e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <p>Ключевое слово</p>
                <input type="text" placeholder="Кючевое слово" value={valueChoice} onChange={(e) => setValueChoice(e.target.value)} />
                <button className='btnFilter' onClick={() => { setBtnValue(!btnValue); setValueChoice(valueChoice + ' ') }}> Применить</button>
            </div>
        </>
    )
}