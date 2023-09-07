export const getCurrentQuestionIndex = (token) => {
  const base64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  const tokenData = JSON.parse(Buffer.from(base64, "base64"));
  let currentQuestionIndex = 0;

  for (const [
    iterIndex,
    [questionIndex, questionAnswer],
  ] of tokenData.Questions.entries()) {
    if (
      (questionIndex === -1 && questionAnswer === -1) ||
      (questionIndex !== -1 && questionAnswer === -1)
    ) {
      currentQuestionIndex = iterIndex;
      break;
    }
  }

  return currentQuestionIndex;
};
