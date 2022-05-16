import { BASE_URL } from './modules/fetch.js';

console.log('books');

// books tik registruotiems prisijungusiems vartotojams
const token = localStorage.getItem('bookUserToken');
console.log('token ===', token);

if (!token) {
  // neregistruotas, eik is cia
  window.location.replace('login.html');
}

// gauti ir iskonsolinti visas knygas
async function getBooks() {
  const resp = await fetch(`${BASE_URL}/books`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
}
getBooks();
// atvaizduoti knygas saraso pavidalu htmle
