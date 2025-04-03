
import { useState } from 'react'


function Search () {
    
    const [newInput, setNewInput] = useState<string>("Furret");
    //const [cardData, setCardData] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        /* try {
          // Use the input value to fetch the card
          const card:any = await tcgdex.fetch('cards', 'swsh3-136');
          
          if (!card) {
            throw new Error('Card not found');
          }
    
          console.log('Fetched card:', card);
        } catch (err) {
          console.error('Fetch error:', err);
        } */
    };

    
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