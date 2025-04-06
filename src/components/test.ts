import { writeFileSync } from 'node:fs';

const response = await fetch(`https://api.pokemontcg.io/v2/cards`, {
    headers: {
        'X-Api-Key': `${import.meta.env.REACT_APP_API_KEY}`,
    },
});

const res: any = await response.json();

writeFileSync('data.json', res);
