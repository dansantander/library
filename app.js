function Book(title, author, numPages, read) {
  this.title = title
  this.author = author
  this.numPages = numPages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages}, ${this.read}`
  }
}

let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  myLibrary.forEach((book, index) => {
    div = document.createElement('DIV');
    div.innerHTML = book.info()
    document.getElementById("book-container").appendChild(div);
  }) 
}

/* const book1 = new Book('Game Of Thrones', 'George Martin', 789, 'already read' );
addBookToLibrary(book1)
render() */

function createBookWithForm(){

  t = document.getElementById("title").value
  a = document.getElementById("author").value
  p = document.getElementById("numPages").value
  r = document.getElementById("read").value

  const book = new Book(t, a, p, r );

  addBookToLibrary(book)
  render()
  
}