const pumpkins: { key: string; path: string }[] = [];

for (let i = 0; i < 14; i++) {
  const keyNum = i + 1;
  const paddedNumber = keyNum.toString().padStart(2, "0");

  const obj = { key: "", path: "" };

  if (keyNum === 1) obj.path = `Halloween pack/halloweenpumpkin.png`;
  else obj.path = `Halloween pack/halloweenpumpkin${paddedNumber}.png`;

  obj.key = `pumpkin-${keyNum}`;

  pumpkins.push(obj);
}

export const pickRandomPumpkin = () => {
  const randomIndex = Math.floor(Math.random() * pumpkins.length);
  return pumpkins[randomIndex].key;
};

export default pumpkins;
