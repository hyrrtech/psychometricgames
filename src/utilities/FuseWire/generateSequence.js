const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateSequence(difficulty, sequence_size, min = 10, max = 100) {
  let sequence = [];
  let pattern = [];
  switch (difficulty) {
    case 'easy':
      const problems_easy = {
        1: () => {
          var initial_number = generateRandomNumber(min, max);
          var addition_weight = generateRandomNumber(min, max);
          sequence.push(initial_number);
          pattern.push('');
          for (let i = 1; i < sequence_size; i++) {
            sequence.push(sequence[i - 1] + addition_weight);
            pattern.push(`${sequence[i - 1]} + ${addition_weight} = `);
          }
          return {sequence, pattern};
        },
        2: () => {
          var initial_number = generateRandomNumber(min, max);
          for (let i = 1; i <= sequence_size; i++) {
            sequence.push(initial_number * i);
            pattern.push(`${initial_number} x ${i} = `);
          }
          return {sequence, pattern};
        },
      };
      return problems_easy[
        generateRandomNumber(1, Object.keys(problems_easy).length)
      ]();

    case 'medium':
      const problems_medium = {
        1: () => {
          sequence.push(generateRandomNumber(max - 2 * min, max));
          pattern.push('');
          var subtraction_weight = generateRandomNumber(4, 10);
          for (let i = 1; i < sequence_size; i++) {
            sequence.push(sequence[i - 1] - subtraction_weight);
            pattern.push(`${sequence[i - 1]} - ${subtraction_weight} = `);
            subtraction_weight += 1;
          }
          return {sequence, pattern};
        },
      };
      return problems_medium[
        generateRandomNumber(1, Object.keys(problems_medium).length)
      ]();

    case 'hard':
      const problems_hard = {
        1: () => {
          sequence.push(
            generateRandomNumber(max - 1 * min, max),
            generateRandomNumber(max - 2 * min, max),
          );
          pattern.push('', '');
          let j = 0;
          var subtraction_weight = generateRandomNumber(4, 10);
          for (let i = 2; i < sequence_size; i++) {
            sequence.push(sequence[j] / 2 - subtraction_weight);
            pattern.push(`${sequence[j]} / ${2} - ${subtraction_weight} = `);
            subtraction_weight += 2;
            j++;
          }
          return {sequence, pattern};
        },
        2: () => {
          var addition_weight = generateRandomNumber(1, min);
          sequence.push(
            generateRandomNumber(min, max),
            generateRandomNumber(min, max),
          );
          pattern.push('', '');

          for (let i = 2; i < sequence_size; i++) {
            sequence.push(sequence[i - 2] - sequence[i - 1] + addition_weight);
            pattern.push(
              `${sequence[i - 2]} - ${sequence[i - 1]} + ${addition_weight} = `,
            );
          }
          return {sequence, pattern};
        },
      };
      return problems_hard[
        generateRandomNumber(1, Object.keys(problems_hard).length)
      ]();
  }
}

export default generateSequence;
