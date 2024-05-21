export function getRandomPrice(min: number, max: number) {
  return String(Math.round(Math.random() * (max - min + 1) + min));
}
