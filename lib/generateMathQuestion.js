const generateMathQuestion = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  setMathQuestion({
    a,
    b,
    answer: a + b,
    persianA: toPersianNumbers(a),
    persianB: toPersianNumbers(b),
  });
  setValue("mathAnswer", "");
};

export default generateMathQuestion;
