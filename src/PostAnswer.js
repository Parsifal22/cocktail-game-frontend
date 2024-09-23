  const PostAnswer = async (answer) => {
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

  export default PostAnswer;