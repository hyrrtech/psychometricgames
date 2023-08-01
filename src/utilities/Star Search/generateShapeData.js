const shapes = ['shape2'];

const color_palette = {
  2: [
    ['#b2d5cb', '#92b9c5'],
    ['#eea888', '#e37059'],
  ],
  3: [
    ['#72adc4', '#b2d5cb', '#709a9b'],
    ['#9183b0', '#6849c0', '#8fa5d0'],
    ['#978c89', '#ab8287', '#935d6c'],
  ],
};

const rotationAnimations = ['none', 'clockwise', 'anticlockwise'];
// const colors = ['#6093cc', '#2fd046', '#cf392c', '#ffd354'];
const rotationAngles = [0, 60];

const filterShapes = num => {
  const filteredShapes = [];
  for (let i = 0; i < num; i++) {
    let shape = shapes[Math.floor(Math.random() * shapes.length)];
    while (filteredShapes.includes(shape)) {
      shape = shapes[Math.floor(Math.random() * shapes.length)];
    }
    filteredShapes.push(shape);
  }
  return filteredShapes;
};

const filterColors = num => {
  const colorSets = color_palette[num];
  return colorSets[Math.floor(Math.random() * colorSets.length)];
};

const getCountDistribution = (num_of_shapes, num_of_unique_styles) => {
  const count_distribution_array = [];

  const num_of_shapes_styles_excluding_unique_shape = num_of_unique_styles - 1;
  const num_of_shapes_excluding_unique_shape = num_of_shapes - 1;
  const count_distribution = Math.floor(
    num_of_shapes_excluding_unique_shape /
      num_of_shapes_styles_excluding_unique_shape,
  );
  const remainder =
    num_of_shapes_excluding_unique_shape %
    num_of_shapes_styles_excluding_unique_shape;

  for (let i = 0; i < num_of_shapes_styles_excluding_unique_shape; i++) {
    count_distribution_array.push(count_distribution);
  }
  for (let i = 0; i < remainder; i++) {
    count_distribution_array[i] += 1;
  }

  //push for shape with count=1
  count_distribution_array.push(1);

  return count_distribution_array;
};

const generateShapeData = (
  num_of_shapes,
  num_of_unique_styles,
  num_of_unique_colors,
  num_of_unique_shapes,
  isAnimated = false,
  isRotated = false,
  hasPattern = false,
) => {
  //calculate count for each style
  const count_distribution_array = getCountDistribution(
    num_of_shapes,
    num_of_unique_styles,
  );

  const available_shapes = filterShapes(num_of_unique_shapes);
  const available_colors = filterColors(num_of_unique_colors);

  const generateStyle = count => {
    const rotation = isRotated
      ? rotationAngles[Math.floor(Math.random() * rotationAngles.length)]
      : 0;
    let shape = {
      shape:
        available_shapes[Math.floor(Math.random() * available_shapes.length)],
      color:
        available_colors[Math.floor(Math.random() * available_colors.length)],
      initialRotationAngle: rotation,
      rotationAnimation:
        isAnimated && rotation != 0
          ? rotationAnimations[
              Math.floor(Math.random() * rotationAnimations.length)
            ]
          : 'none',
      hasPattern: hasPattern
        ? Math.floor(Math.random() * 2)
          ? true
          : false
        : false,
      count,
    };
    return shape;
  };

  const shape_styles = new Map();

  for (let i = 0; i < count_distribution_array.length; i++) {
    let shape = generateStyle(count_distribution_array[i]);
    let key = `${shape.shape},${shape.color},${shape.initialRotationAngle},${shape.rotationAnimation},${shape.hasPattern}`;

    while (shape_styles.has(key)) {
      shape = generateStyle(count_distribution_array[i]);
      key = `${shape.shape},${shape.color},${shape.initialRotationAngle},${shape.rotationAnimation},${shape.hasPattern}`;
    }

    shape_styles.set(key, shape);
  }

  return shape_styles;
};

export default generateShapeData;
