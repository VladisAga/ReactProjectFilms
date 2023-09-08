import { Film } from './Main';

export const lengthName = (film: Film) => {
    if (film.nameRu && film.nameRu.length > 36) {
        return film.nameRu.slice(0, 30) + '...';
    } else {
        return film.nameRu;
    }
};

export const rating = (film: Film) => {
    if (film.rating && film.rating.includes('%')) {
        return (+film.rating.slice(0, film.rating.length - 1) / 10);
    } else if (isNaN(+film.rating) || (+film.rating === 0)) {
        return null;
    }
    else {
        return +film.rating;
    }
};

export const ratingOnPage = (film: any) => {
    if (film.ratingKinopoisk && String(film.ratingKinopoisk).includes('%')) {
        return (+film.ratingKinopoisk.slice(0, film.rating.length - 1) / 10);
    } else if (isNaN(+film.ratingKinopoisk) || (+film.ratingKinopoisk === 0)) {
        return null;
    } else {
        return +film.ratingKinopoisk;
    }
};

export const getRatingStyle = (rating: number | null) => {
    if (rating !== null) {
        if (rating >= 8) {
            return { backgroundColor: 'rgba(6, 140, 6, 0.85)' };
        } else if (rating >= 6) {
            return { backgroundColor: 'rgba(198, 198, 40, 0.85)' };
        } else if (rating >= 4) {
            return { backgroundColor: 'rgba(198, 198, 40, 0.85)' };
        } else if (rating === 0) {
            return { backgroundColor: 'transparent' };
        }
        else {
            return { backgroundColor: 'rgba(128, 128, 128, 0.85)' };
        }
    } else {
        return { backgroundColor: 'transparent' };
    }
};