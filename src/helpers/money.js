export const roundMoney = (num, digits = 2) => {
  const multiplier = Math.pow(10, digits);
  const _num = parseFloat((num * multiplier).toFixed(11));
  const _num2 = Math.round(_num) / multiplier;
  return +_num2.toFixed(digits);
};
