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

export const hasLost = (token) => {
  const base64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  const tokenData = JSON.parse(Buffer.from(base64, "base64"));
  for (const [questionIndex, questionAnswer] of tokenData.Questions) {
    if (questionIndex !== -1 && questionAnswer === 0) {
      return true;
    }
  }

  return false;
};

export const hasWon = (token) => {
  const base64 = token.split(".")[1].replace("-", "+").replace("_", "/");
  const tokenData = JSON.parse(Buffer.from(base64, "base64"));
  if (
    tokenData.Questions[tokenData.Questions.length - 1][0] !== -1 &&
    tokenData.Questions[tokenData.Questions.length - 1][1] === 1
  ) {
    return true;
  }

  return false;
};
