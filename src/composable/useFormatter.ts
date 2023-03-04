/* 
Purpose: to format the account-number in an easier readable way by adding spaces in possible indices
Responsibility: Bassam hager
*/
export const formatAccountNumber = (text: string) => {
  const textArr = text.split("");
  textArr.splice(4, 0, " ");
  textArr.splice(9, 0, " ");
  return textArr.join("");
};
