export const fetchBinaryFile = async (fileUrl: string) => {
  const fileRes = await fetch(fileUrl);
  const dataBlob = await fileRes.blob();
  const dataBuffer = await dataBlob.arrayBuffer();
  return dataBuffer;
};

export const getCardAssetSrcFromValue = (value: number) => {
  const path = `../assets/images/playcards/${value}.svg`;
  const modules = import.meta.glob('../assets/images/playcards/*', {
    eager: true,
  });
  const mod = modules[path] as { default: string };
  return mod.default;
};

export const getRandomNumberInRange = (from: number, to: number) =>
  Math.floor(from + Math.random() * to);

export const truncateAddress = (address: string, beforeLenght?: number) =>
  !address?.length || address?.length <= 10
    ? address
    : `${address.slice(0, beforeLenght || 6)}...${address.slice(-4)}`;

export const setItemLocalstorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error: any) {
    console.log('Error Set Local Storage key ', key, ' :', error);
    //Clear 0x item
    const currentLength = localStorage.length;
    let keysOxArray: string[] = [];
    for (let index = 0; index < currentLength; index += 1) {
      const keyItem = localStorage.key(index);
      if (keyItem?.startsWith('0x')) {
        keysOxArray = [...keysOxArray, keyItem];
      }
    }
    for (let keyIndex = 0; keyIndex < keysOxArray.length; keyIndex += 1) {
      localStorage.removeItem(keysOxArray[keyIndex]);
    }
  }
};
