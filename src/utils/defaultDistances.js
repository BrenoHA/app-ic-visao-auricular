export const defaultDistance = {
  1: 30,
  2: 90,
  3: 150,
};

export const getDefaultDistance = (distance) => {
  if (distance <= defaultDistance[1]) {
    return 1;
  }
  if (distance <= defaultDistance[2]) {
    return 2;
  }
  if (distance <= defaultDistance[3]) {
    return 3;
  }
  if (distance > defaultDistance[3]) {
    return 4;
  }
};
