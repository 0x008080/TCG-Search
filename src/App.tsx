import Title from './components/Title'
import { useState } from 'react'
import { PokeCard } from './components/Card';
import defaultPNG from '/assets/giratina.png'
import Gallery from './components/Gallery';
import About from './components/About'


let Cards: PokeCard[];
let count: number = 0;
let urls: string[];

function parseResponse(res: any) {
  const dataLength = res.data.length;

  for (let i = 0; i < dataLength; i++) {
    let card: PokeCard = {
      name: res.data[i].name,
      id: res.data[i].id,
      imageURL: res.data[i].images.large,
      setName: res.data[i].set.name
    }
    urls.push(res.data[i].images.large)
    Cards.push(card);
  }
}

function App() {

  const [newInput, setNewInput] = useState<string>('Giratina');
  const [imageUrl, setImageUrl] = useState<string>(defaultPNG);
  const [cardData, setCardData] = useState<string>('Lost Origin');
  const [Results, setResults] = useState<string>('Search');
  const [Counter, setCounter] = useState<string>('');
  const [Feedback, setFeedback] = useState<string>('Enter a Pokémon TCG card to search')

  const handleSubmit = async (e: React.FormEvent) => {
    Cards = [];
    urls = [];
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
        setFeedback(`Check spelling and try again.`);
      }

    } catch (err) {
      console.log(err);
      setFeedback(`Check spelling and try again.`);
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
      <div>
        <Title></Title>
        <div className="max-w-sm mx-auto">
          <form onSubmit={handleSubmit} className="">
            <label className="px- 10 block mb-2 text-sm font-medium text-gray-900 dark:text-white">{Results}</label>
            <input aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={newInput}
              onChange={e => setNewInput(e.target.value)}
              id="item">
            </input>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{Feedback}</p><br></br>
            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black-600  to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Submit
              </span>
            </button>
            <button onClick={updateNext} type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black-600  to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Next
              </span>
            </button>
            <button onClick={updatePrevious} type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Previous
              </span>
            </button>
            <button onClick={clearInput} type="button" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-black-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                Clear
              </span>
            </button>
          </form>
        </div>
        <div className="max-w-sm mx-auto">
            <br></br>
            <img itemID="pokemon-img" src={imageUrl} className='pokemon-img'></img>
            <p className="px-0 py-10 relative inline-flex items-center">{Counter}<br></br>{cardData}</p>
        </div>
        <Gallery imageUrls={urls} />
      </div>
      <About></About>
    </>
  )
}

export default App
