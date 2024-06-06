type allType = 'uppercase' | 'lowercase' | 'number' | 'specialCharacter';

export const containsAtLeastCharacter = (ch: string, type: allType):boolean => {
  const upperCaseReg = new RegExp('[A-Z]');
  const lowerCaseReg = new RegExp('[a-z]');
  const numberReg = new RegExp('[0-9]');
  const specialReg = new RegExp(/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/);
  switch (type) {
  case 'uppercase':
    return upperCaseReg.test(ch);
  case 'lowercase':
    return lowerCaseReg.test(ch);
  case 'number':
    return numberReg.test(ch);
  case 'specialCharacter':
    return specialReg.test(ch);
  default:
    return false
  }
}