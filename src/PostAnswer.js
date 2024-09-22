
const PostAnswer = async (answer) => {
    try {
        const response = await fetch('http://localhost:8080/api/submit-answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer }),
        });
        const data = await response.json();
  
        // Update the state with the new data
        setCocktail(data);
      } catch (err) {
        console.log(err);
      }
}

export default PostAnswer