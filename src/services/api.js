
export const getQuizData = () => {
  const URL = `https://opentdb.com/api.php?amount=10`;
  return fetch(URL)
          .then((res) => res.json());
}