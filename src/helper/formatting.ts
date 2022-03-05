export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatNumber = (num: number) => {
  const roundedNum = num.toFixed(2);
  return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
