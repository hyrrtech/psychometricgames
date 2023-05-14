export default function createInterpolator(inputRange, outputRange) {
    const inputRangeMin = inputRange[0];
    const inputRangeMax = inputRange[inputRange.length - 1];
    const outputRangeMin = outputRange[0];
    const outputRangeMax = outputRange[outputRange.length - 1];
  
    const slope = (outputRangeMax - outputRangeMin) / (inputRangeMax - inputRangeMin);
    const intercept = outputRangeMin - slope * inputRangeMin;
  
    return (value) => slope * value + intercept;
  }
  