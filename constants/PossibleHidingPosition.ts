// Map to x y and z to tamagotchiPosition.x tamagotchiPosition.y and tamagotchiPosition.z

const tamagotchiMagPositionMap: { [key: number]: any } = {
  1: { x: 48.15, y: 3.5, z: 6.82 },
  2: { x: 11.05, y: -8.14, z: 46.79 },
  3: { x: -48.29, y: 6.7, z: 0.46 },
  4: { x: -46.53, y: 9.88, z: 10.73 }, //
  5: { x: -21.07, y: -0.38, z: 43.97 },
  6: { x: -2.71, y: 22.52, z: 43.16 },
  7: { x: -31.63, y: -35.06, z: 12.17 },
  8: { x: -26.5, y: -38.86, z: -12.84 },
};

const tamagotchiAccPositionMap: { [key: number]: any } = {
  1: { x: 0, y: 9.02, z: 3.86 },
  2: { x: 0, y: 9.38, z: 2.87 },
  3: { x: 0, y: 6.61, z: -7.24 },
  4: { x: 0, y: 9.29, z: -3.16 }, //
  5: { x: 0, y: 9.71, z: 1.4 },
  6: { x: 0, y: 9.18, z: -3.45 },
  7: { x: 0, y: 1.7, z: 9.66 },
  8: { x: 0, y: 1.7, z: -9.66 },
};

export { tamagotchiMagPositionMap, tamagotchiAccPositionMap };
