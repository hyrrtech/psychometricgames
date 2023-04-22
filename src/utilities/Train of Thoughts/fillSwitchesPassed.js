const fillSwitchesPassed = switchId => {
  const switches = {
    2: [3],
    3: [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    4: [6, 7, 8, 9, 10, 11, 12, 13],
    6: [4, 5],
    7: [10, 11, 12, 13],
    10: [7, 8, 9],
    11: [12, 13],
    12: [11],
  };
  return switches[switchId] || [];
};

export default fillSwitchesPassed;
