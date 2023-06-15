const fillSwitchesPassed = switchId => {
  const switches = {
    4: [5],
    5: [4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    6: [8, 9, 10, 11, 12, 13, 14, 15],
    8: [6, 7],
    9: [12, 13, 14, 15],
    12: [9, 10, 11],
    13: [14, 15],
    14: [13],
  };
  return switches[switchId] ? switches[switchId] : [];
};

export default fillSwitchesPassed;
