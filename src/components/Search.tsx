import { useState } from 'react'
import { PokemonCard } from './Card';
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

let Card: PokemonCard = {
    name: '',
    id: '',
    imageURL: ''
}

function Search () {
    
    const [newInput, setNewInput] = useState<string>("Furret");
    //const [cardData, setCardData] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('searching');

    try {
        const response = await fetch(`https://api.pokemontcg.io/v2/cards/xy1-4`, {
            headers: {
                'X-Api-Key': `${import.meta.env.REACT_APP_API_KEY}`,
            },
        });

       const res: any = await response.json();
       
       Card.name = res.data.name;
       Card.id = res.data.id;
       Card.imageURL = res.data.images.large;

       console.log(Card);
       
        
    } catch (err) {
        console.log(err);
    }
}

    
    return (
        <>
            <div className="row">
                <div className="column">
                    <h2>
                        {newInput}
                    </h2>
                    <img className="pokemon-img" itemID="pokemon-img" src="src/assets/test.jpg"></img>
                    <h3 itemID="results">

                    </h3>
                </div>
                <div className="column">
                    <h2 itemID="pokemon-list">
                        test
                    </h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bottom">
                    <input 
                    value={newInput} 
                    className="input" 
                    onChange={e => setNewInput(e.target.value)} 
                    id="item"
                    ></input>
                    <button className="button" type="submit">Submit</button>
                    <button className="button">Next</button>
                    <button className="button">Previous</button>
                    <button className="button">Clear</button>
            </form>
        </>
    )
}

export default Search;