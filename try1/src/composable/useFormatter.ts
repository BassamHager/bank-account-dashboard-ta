export const formatAccountNumber = (text: string) => {
  const textArr = text.split("");
  textArr.splice(4, 0, " ");
  textArr.splice(9, 0, " ");
  return textArr.join("");
};
