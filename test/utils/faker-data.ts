import { internet, random } from 'faker/locale/pt_BR';

export function generateUser() {
  return {
    email: internet.email().toLocaleLowerCase(),
    password: random.alphaNumeric(8),
  };
}
