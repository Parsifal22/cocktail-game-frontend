import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = useState();
  const [cocktail, setCocktail] = useState();

  const getCocktail = async () =>{

    try{

      const playerResponse = await fetch('http://localhost:8080/api/random-new-cocktail');
      const playerData = await playerResponse.json();
      setPlayer(playerData);
      

      const cocktailResponse = await fetch('http://localhost:8080/api/cocktail-info');
      const cocktailData = await cocktailResponse.json();

      setCocktail(cocktailData);
      

    } 
    catch(err)
    {
      console.log(err);
    }
  }


  const postAnswer = async (answer) => {
    if (!cocktail) return;
    try {
      if (answer.toLowerCase() === cocktail.strDrink.toLowerCase()) {
        if (player.currentRound + 1 <= 50) {
          const response = await fetch('http://localhost:8080/api/correct-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer }),
          });
          const newCocktailData = await response.json();
          setPlayer(newCocktailData);

          const cocktailResponse = await fetch('http://localhost:8080/api/cocktail-info');
          const cocktailData = await cocktailResponse.json();
          setCocktail(cocktailData);
        }
        else {
          const response = await fetch('http://localhost:8080/api/game-over', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer }),
          });
          const data = await response.json();
          setPlayer(data);
  
          const cocktailResponse = await fetch('http://localhost:8080/api/cocktail-info');
          const cocktailData = await cocktailResponse.json();
          setCocktail(cocktailData);
        }

      } else {

        if (player.attempts > 0) {
          const response = await fetch('http://localhost:8080/api/incorrect-answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer }),
        });
        const data = await response.json();
        setPlayer(data);
      }
      else{
        const response = await fetch('http://localhost:8080/api/game-over', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer }),
        });
        const data = await response.json();
        setPlayer(data);

        const cocktailResponse = await fetch('http://localhost:8080/api/cocktail-info');
        const cocktailData = await cocktailResponse.json();
        setCocktail(cocktailData);
      }
        }

    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
   getCocktail(); 
  }, [window.location.pathname])
  
  console.log(cocktail);
  console.log(player);

  return (
    <div className="App">
      <div className="roundsContainer">
        <div className="rounds">
          Rounds {player ? player.currentRound : 'Loading...'} / 50
        </div>
        <div className="attempts">
          Attempts: {player ? player.attempts : 'Loading...'}
        </div>
        <div className="score">
            Current Score: {player ? player.score : 'Loading...'}
        </div>
        <div className="hightScore">
            Record: {player ? player.highestScore : 'Loading...'}
        </div>
      </div>
      <div className="hintsContainer">
      {player && cocktail ? (
        cocktail.listHints.slice(0, 6 - player.attempts).map((hint, index) => (
          <div key={index}>{hint}</div>
        ))
      ) : (
        'Loading...'
      )}
      </div>
      <div className="cocktailWord">
        {player ? (
          player.hiddenCocktailName.map((char, index) => (
            char === ' ' ? ' ' : char
          )).join('')
        ) : (
          'Loading...'
        )}
      </div>
      <div className="inputContainer">
        <input type="text" placeholder="Enter your answer" id="answerInput"/>
        <button onClick={() => {
          postAnswer(" ");
        }}>Skip</button>
        <button onClick={() => {
          const answerInput = document.getElementById('answerInput');
          postAnswer(answerInput.value);
          answerInput.value = '';
        }}>Answer</button>
        
      </div>
    </div>
  );
}

export default App;
