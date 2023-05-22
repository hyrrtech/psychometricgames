import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import {Line} from '../components/Pirate Passage';
import {generateMatrix, constants} from '../utilities/Pirate Passage';
const {pirateLineWidth} = constants;

export const PiratePassageContext = createContext();

export const PiratePassageProvider = ({children}) => {
  const initialShipIndex = [0, 0];
  const [go, setGo] = useState(false);
  const [pathIndexes, setPathIndexes] = useState({
    indexes: [initialShipIndex],
    number_of_indexes_added: [1],
  });
  const matrix = generateMatrix(7, 5);
  const piratePathsIndexes = [
    {
      pathIndexes: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 4],
        [3, 4],
        [3, 3],
        [3, 2],
        [3, 1],
        [2, 1],
        [1, 1],
      ],
      color: 'rgba(36, 180, 132,0.9)',
      initialShipLocation: [3, 3],
      moveDirection: 1,
    },
    {
      pathIndexes: [
        [6, 0],
        [6, 1],
        [5, 1],
        [5, 2],
      ],
      color: 'rgba(201, 71, 39,0.9)',
      initialShipLocation: [5, 2],
      moveDirection: -1,
    },
    {
      pathIndexes: [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
      ],
      color: 'rgba(155, 41, 81,0.9)',
      initialShipLocation: [4, 0],
      moveDirection: 1,
    },
    {
      pathIndexes: [
        [1, 3],
        [2, 3],
        [3, 3],
        [4, 3],
        [5, 3],
      ],
      color: 'blue',
      initialShipLocation: [1, 3],
      moveDirection: 1,
    },
    {
      pathIndexes: [
        [4, 2],
        [4, 3],
        [4, 4],
        [5, 4],
        [5, 3],
        [5, 2],
      ],
      color: 'green',
      initialShipLocation: [4, 2],
      moveDirection: 1,
    },

    {
      pathIndexes: [
        [0, 2],
        [0, 3],
        [1, 3],
        [2, 3],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      color: 'pink',
      initialShipLocation: [2, 2],
      moveDirection: 1,
    },
  ];
  const generatePiratePath = (piratePathIndexes, color, offset) => {
    const component = [];
    const coordinates = [];
    for (let i = 0; i < piratePathIndexes.length - 1; i++) {
      const from =
        matrix[piratePathIndexes[i][0]][piratePathIndexes[i][1]].position;
      const to =
        matrix[piratePathIndexes[i + 1][0]][piratePathIndexes[i + 1][1]]
          .position;
      const line = Line(from, to, 'pirateShip', color, offset);
      component.push(line);
      coordinates.push({x: from.x - offset, y: from.y - offset});
    }

    //push last coordinates
    const lastCoordinate =
      matrix[piratePathIndexes[piratePathIndexes.length - 1][0]][
        piratePathIndexes[piratePathIndexes.length - 1][1]
      ].position;
    coordinates.push({
      x: lastCoordinate.x - offset,
      y: lastCoordinate.y - offset,
    });

    return {component, coordinates};
  };

  const [piratePathComponents, piratePathCoordinates] = useMemo(() => {
    const piratePathComponents = [];
    const piratePathCoordinates = [];
    for (let i = 0; i < piratePathsIndexes.length; i++) {
      const pivotPoint = piratePathsIndexes.length / 2;
      const offset =
        i < pivotPoint
          ? i * pirateLineWidth * 1.1
          : -(i - pivotPoint) * pirateLineWidth * 1.1;
      const {component, coordinates} = generatePiratePath(
        piratePathsIndexes[i].pathIndexes,
        piratePathsIndexes[i].color,
        offset,
      );

      piratePathCoordinates.push({
        pathCoordinates: coordinates,
        initialShipCoordinates:
          matrix[piratePathsIndexes[i].initialShipLocation[0]][
            piratePathsIndexes[i].initialShipLocation[1]
          ].position,
        color: piratePathsIndexes[i].color,
      });
      piratePathComponents.push(component);
    }

    return [piratePathComponents, piratePathCoordinates];
  }, []);

  const [pathComponents, pathCoordinates] = useMemo(() => {
    if (pathIndexes.length === 1) {
      return [];
    }
    const pathCoordinates = [];
    const pathComponents = [];
    for (let i = 0; i < pathIndexes.indexes.length - 1; i++) {
      const from =
        matrix[pathIndexes.indexes[i][0]][pathIndexes.indexes[i][1]].position;
      const to =
        matrix[pathIndexes.indexes[i + 1][0]][pathIndexes.indexes[i + 1][1]]
          .position;
      const line = Line(from, to, 'treasureShip', 'rgba(255, 255, 255,0.6)', 0);
      pathComponents.push(line);
      pathCoordinates.push(from);
    }
    //push last coordinates
    pathCoordinates.push(
      matrix[pathIndexes.indexes[pathIndexes.indexes.length - 1][0]][
        pathIndexes.indexes[pathIndexes.indexes.length - 1][1]
      ].position,
    );

    return [pathComponents, pathCoordinates];
  }, [pathIndexes]);

  return (
    <PiratePassageContext.Provider
      value={{
        pathIndexes,
        setPathIndexes,
        pathComponents,
        pathCoordinates,
        matrix,
        piratePathComponents,
        piratePathCoordinates,
        go,
        setGo,
      }}>
      {children}
    </PiratePassageContext.Provider>
  );
};
