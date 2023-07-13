import svgData from './svgData';
const shapes = Object.keys(svgData);

const rotationAnimations = ['none', 'clockwise', 'anticlockwise'];
const colors = ['#6093cc', '#2fd046', '#cf392c'];
const rotationAngles = [45, 90];

const generateShapeData = (
  num_of_shapes,
  num_of_unique_styles,
  num_of_unique_colors,
  num_of_unique_shapes,
  isAnimated,
  isRotated,
  isFlippedY, //wont work for flipped shapes
) => {
  //count distribution
  const num_of_shapes_styles_excluding_unique_shape = num_of_unique_styles - 1;
  const num_of_shapes_excluding_unique_shape = num_of_shapes - 1;
  const count_distribution = Math.floor(
    num_of_shapes_excluding_unique_shape /
      num_of_shapes_styles_excluding_unique_shape,
  );
  const remainder =
    num_of_shapes_excluding_unique_shape %
    num_of_shapes_styles_excluding_unique_shape;

  const count_distribution_array = [];
  for (let i = 0; i < num_of_shapes_styles_excluding_unique_shape; i++) {
    count_distribution_array.push(count_distribution);
  }
  for (let i = 0; i < remainder; i++) {
    count_distribution_array[i] += 1;
  }

  const available_shapes = [];
  for (let i = 0; i < num_of_unique_shapes; i++) {
    let shape = shapes[Math.floor(Math.random() * shapes.length)];
    while (available_shapes.includes(shape)) {
      shape = shapes[Math.floor(Math.random() * shapes.length)];
    }
    available_shapes.push(shape);
  }

  const available_colors = [];
  for (let i = 0; i < num_of_unique_colors; i++) {
    let color = colors[Math.floor(Math.random() * colors.length)];
    while (available_colors.includes(color)) {
      color = colors[Math.floor(Math.random() * colors.length)];
    }
    available_colors.push(color);
  }

  const shape_styles = [];
  for (let i = 0; i < count_distribution_array.length; i++) {
    let shape = {
      shape:
        available_shapes[Math.floor(Math.random() * available_shapes.length)],
      color:
        available_colors[Math.floor(Math.random() * available_colors.length)],
      initialRotationAngle: isRotated
        ? rotationAngles[Math.floor(Math.random() * rotationAngles.length)]
        : 0,
      rotationAnimation: isAnimated
        ? rotationAnimations[
            Math.floor(Math.random() * rotationAnimations.length)
          ]
        : 'none',
      hasReflection: isFlippedY
        ? Math.floor(Math.random() * 2)
          ? true
          : false
        : false,
      hasPattern: Math.floor(Math.random() * 2) ? true : false,
      count: count_distribution_array[i],
    };
    shape_styles.push(shape);
  }

  const last_shape_style = {...shape_styles[shape_styles.length - 1]};
  const last_shape_style_properties = Object.keys(last_shape_style);

  if (!isAnimated) {
    last_shape_style_properties.splice(
      last_shape_style_properties.indexOf('rotationAnimation'),
      1,
    );
  }
  if (!isRotated) {
    last_shape_style_properties.splice(
      last_shape_style_properties.indexOf('initialRotationAngle'),
      1,
    );
  }
  if (!isFlippedY) {
    last_shape_style_properties.splice(
      last_shape_style_properties.indexOf('hasReflection'),
      1,
    );
  }

  const last_shape_style_property_to_modify =
    last_shape_style_properties[
      Math.floor(Math.random() * last_shape_style_properties.length)
    ];
  last_shape_style['count'] = 1;
  switch (last_shape_style_property_to_modify) {
    case 'shape':
      last_shape_style[last_shape_style_property_to_modify] =
        available_shapes[Math.floor(Math.random() * available_shapes.length)];
      break;
    case 'color':
      last_shape_style[last_shape_style_property_to_modify] =
        available_colors[Math.floor(Math.random() * available_colors.length)];
      break;
    case 'initialRotationAngle':
      last_shape_style[last_shape_style_property_to_modify] =
        rotationAngles[Math.floor(Math.random() * rotationAngles.length)];
      break;
    case 'rotationAnimation':
      last_shape_style[last_shape_style_property_to_modify] =
        rotationAnimations[
          Math.floor(Math.random() * rotationAnimations.length)
        ];
      break;
    case 'hasPattern':
      last_shape_style[last_shape_style_property_to_modify] = Math.floor(
        Math.random() * 2,
      )
        ? true
        : false;
      break;
    case 'hasReflection':
      last_shape_style[last_shape_style_property_to_modify] = Math.floor(
        Math.random() * 2,
      )
        ? true
        : false;
      break;
    default:
      break;
  }
  shape_styles.push(last_shape_style);

  return shape_styles;
};

export default generateShapeData;
