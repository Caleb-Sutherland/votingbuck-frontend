export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatNumber = (num: number) => {
  const roundedNum = num.toFixed(2);
  return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDollarValueToString = (num: number) => {
  try {
    const suffixes = ["", "k", "m", "b", "t"];
    const suffixNum = Math.floor(("" + num).length / 3);
    const shortValue = parseFloat(
      (suffixNum != 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(2)
    );
    if (shortValue % 1 != 0) {
      const temp = shortValue.toFixed(1);
      return temp + suffixes[suffixNum];
    }
    return shortValue + suffixes[suffixNum];
  } catch {
    return num;
  }
};

export const ordinalSuffixOf = (i: number) => {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
};
