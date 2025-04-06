import { useState } from 'react'
import { PokeCard } from './Card';

/* 
export interface PokeCard {

    name: string;
    id: string;
    imageURL: string;
    setName: string;
};
 */


let Cards: PokeCard[] = [];

function parseResponse(res: any) {
    const dataLength = res.data.length;

    for(let i = 0; i < dataLength; i++) {
        let card: PokeCard = {
            name: res.data[i].name,
            id: res.data[i].id,
            imageURL: res.data[i].images.large,
            setName: res.data[i].set.name
        }

        Cards.push(card);
    }
}

function Search () {
    
    const [newInput, setNewInput] = useState<string>('Furret');
    const [imageUrl, setImageUrl] = useState<string>('src/assets/test.jpg');
    //const [cardData, setCardData] = useState<any>(null);
    const [Results, setResults] = useState<string>('Search');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('searching');

    
    try {
        const response:Response = await fetch(`https://api.pokemontcg.io/v2/cards?q=!name:${newInput}`, {
            headers: {
                'X-Api-Key': `${import.meta.env.REACT_APP_API_KEY}`,
            },
        });
        
        if(response.status == 200) {
            const res: any = await response.json();
    
            const url:string = res.data[0].images.large;
            setImageUrl(url);
            setResults(res.data[0].name.toString())
            parseResponse(res);

            console.log(Cards);
        } else {
            console.log(response.status);
            setResults(`Check spelling and try again.`);
        }

    } catch (err) {
        console.log(err);
        setResults(`Check spelling and try again.`);
    } 
}

    
    return (
        <>
            <div className="row">
                <div className="column">
                    <h2>Pokémon</h2>
                    <img className="pokemon-img" itemID="pokemon-img" src={imageUrl}></img>
                </div>
                <div className="column">
                <h3 itemID="results">{Results}</h3>
                </div>
            </div>
            <p itemID='counter'></p>
            <form onSubmit={handleSubmit} className="bottom">
                    <input 
                    value={newInput} 
                    className="input" 
                    onChange={e => setNewInput(e.target.value)} 
                    id="item"
                    ></input>
                    <button className="button" type="submit">Submit</button>
            </form>
            <button className="button">Next</button>
            <button className="button">Previous</button>
            <button className="button">Clear</button>
        </>
    )
}

export default Search;