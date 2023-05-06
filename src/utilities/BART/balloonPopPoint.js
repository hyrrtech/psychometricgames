const balloonPopPoint = (min, max) => {
  const pop_start_point = Math.floor(Math.random() * (max - min - 1)) + min;
  const pop_end_point = pop_start_point + 2;
  return (
    Math.floor(Math.random() * (pop_end_point - pop_start_point)) +
    pop_start_point
  );
};

export default balloonPopPoint;
