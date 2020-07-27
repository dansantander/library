function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

/* eslint-disable */
function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function toggleBook(index) {
  myLibrary[index].toggleRead();
  render();
}
/* eslint-enable */
function checkStored() {
  if (localStorage.getItem('myLibrary')) {
    const myLocalLibrary = JSON.parse((localStorage.getItem('myLibrary')));
    myLocalLibrary.forEach((book) => {
      const t = book.title;
      const a = book.author;
      const p = book.numPages;
      const r = book.read;
      const book2 = new Book(t, a, p, r);
      addBookToLibrary(book2);
    });
    render();
  }
}

checkStored();