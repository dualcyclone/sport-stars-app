import { from } from 'rxjs'
import { map, flatMap, startWith, publishReplay } from 'rxjs/operators'

export const sportStars$ = from(
    fetch('https://gist.githubusercontent.com/ldabiralai/cf1588cd80fed41661adecb2e3ca9704/raw/8df6831c33c1b0c178a533e8953a61d11434f220/headtohead.json')
).pipe(
    flatMap(response => response.json()),
    map(response => response.players),
    startWith([])
);

export const countryISO$ = from(
    fetch('https://raw.githubusercontent.com/mledoze/countries/2daadd0d5f26ada44f31e61a39bbf9b8fc8f3fa0/countries.json')
).pipe(
    flatMap(response => response.json()),
    map(countries => countries.reduce((a, { name: { common }, cioc: code }) => ({ ...a, [code]: common }), {})),
    startWith({}),
    publishReplay(1)
);
countryISO$.connect();
