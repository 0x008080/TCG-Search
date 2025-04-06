import { useState } from 'react'
import { PokeCard } from './Card';

let Cards: PokeCard[];
let count: number = 0;

function parseResponse(res: any) {
    const dataLength = res.data.length;

    for (let i = 0; i < dataLength; i++) {
        let card: PokeCard = {
            name: res.data[i].name,
            id: res.data[i].id,
            imageURL: res.data[i].images.large,
            setName: res.data[i].set.name
        }

        Cards.push(card);
    }
}

function Search() {

    const [newInput, setNewInput] = useState<string>('Giratina');
    const [imageUrl, setImageUrl] = useState<string>('src/assets/giratina.png');
    const [cardData, setCardData] = useState<string>('Lost Origin');
    const [Results, setResults] = useState<string>('Search');
    const [Counter, setCounter] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        Cards = [];
        e.preventDefault();
        console.log('searching');

        try {
            const response: Response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${newInput}`, {
                headers: {
                    'X-Api-Key': `${import.meta.env.REACT_APP_API_KEY}`,
                },
            });

            if (response.status == 200) {
                const res: any = await response.json();

                parseResponse(res);

                count = Math.floor(Math.random() * Cards.length);
                setImageUrl(res.data[count].images.large);
                setCounter(`${count + 1} / ${Cards.length}`);
                setResults(res.data[count].name.toString());
                setCardData(`${res.data[count].set.name}`);
            } else {
                console.log(response.status);
                setResults(`Check spelling and try again.`);
            }

        } catch (err) {
            console.log(err);
            setResults(`Check spelling and try again.`);
        }
    }

    function updateNext() {
        if (Cards == undefined) {
            console.log('Card array empty');
            return;
        }

        count += 1;

        if (count >= Cards.length) {
            count = 0;
        }

        setImageUrl(Cards[count].imageURL);
        setCounter(`${count + 1} / ${Cards.length}`);
        setResults(Cards[count].name.toString());
        setCardData(`${Cards[count].setName}`);
    }

    function updatePrevious() {
        if (Cards == undefined) {
            console.log('Card array empty');
            return;
        }

        count -= 1;

        if (count < 0) {
            count = Cards.length - 1;
        }

        setImageUrl(Cards[count].imageURL);
        setCounter(`${count + 1} / ${Cards.length}`);
        setResults(Cards[count].name.toString());
        setCardData(`${Cards[count].setName}`);
    }

    function clearInput() {
        setNewInput('');
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
                    <a className='row'>{cardData}</a>
                
                    <form onSubmit={handleSubmit} className="bottom">
                        <input
                        value={newInput}
                        className="input"
                        onChange={e => setNewInput(e.target.value)}
                        id="item"
                        ></input>
                        <button className="button" type="submit">Submit</button>
                    </form>
                    
                    <button className="button" onClick={updateNext}>Next</button>
                    <button className="button" onClick={updatePrevious}>Previous</button>
                    <button className="button" onClick={clearInput}>Clear</button>
                    
                </div>
                
            </div>
            <p itemID='counter'>{Counter}</p>
            
        </>
    )
}

export default Search;