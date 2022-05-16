console.log('books');

// books tik registruotiems prisijungusiems vartotojams
const token = localStorage.getItem('bookUserToken');
console.log('token ===', token);

if (!token) {
  // neregistruotas, eik is cia
  window.location.replace('login.html');
}

// gauti ir iskonsolinti visas knygas
// atvaizduoti knygas saraso pavidalu htmle
