function Book(title, author, numPages, read) {
  this.title = title
  this.author = author
  this.numPages = numPages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.numPages}, ${this.read ? 'Read' : 'Not Read'}`
  }
}

Book.prototype.toggleRead = function () {
  if(this.read) {
    this.read = false
  } else {
    this.read = true
  }
}

let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  document.getElementById("book-container").innerHTML = "";
  myLibrary.forEach((book, index) => {
    div = document.createElement('DIV');
    div.innerHTML = book.info()
    btn = document.createElement('BUTTON')
    btn.innerHTML = 'Remove'
    btn.setAttribute('onclick', `removeBook(${index})`);
    div.appendChild(btn)
    btn2 = document.createElement('BUTTON')
    btn2.innerHTML = 'Read/Unread'
    btn2.setAttribute('onclick', `toggleBook(${index})`);
    div.appendChild(btn2)
    document.getElementById("book-container").appendChild(div);
  }) 
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

/* const book1 = new Book('Game Of Thrones', 'George Martin', 789, 'already read' );
addBookToLibrary(book1)
render() */

function createBookWithForm(){
  if (document.getElementById("title").value.trim() == "") {
    alert('Fill Title')
    document.getElementById("title").value = ''
    document.getElementById("title").focus()
    return
  }
  if (document.getElementById("author").value.trim() == "") {
    alert('Fill Author')
    document.getElementById("author").value = ''
    document.getElementById("author").focus()
    return
  }
  if (document.getElementById("numPages").value.trim() == "") {
    alert('Fill Number of Pages')
    document.getElementById("numPages").value = ''
    document.getElementById("numPages").focus()
    return
  }

  t = document.getElementById("title").value
  a = document.getElementById("author").value
  p = document.getElementById("numPages").value
  r = document.getElementById("read").checked

  const book = new Book(t, a, p, r );

  addBookToLibrary(book)
  render()
  
}

function removeBook(index) {
  myLibrary.splice(index, 1)
  render()
}


function toggleBook(index) {
  myLibrary[index].toggleRead()
  render()
}

function checkStored() {
  if(localStorage.getItem("myLibrary")) {
      myLocalLibrary = JSON.parse((localStorage.getItem("myLibrary")));
      console.log(myLocalLibrary);
      myLocalLibrary.forEach((book, index) => {
        t = book.title
        a = book.author
        p = book.numPages
        r = book.read
        const book2 = new Book(t, a, p, r );
        addBookToLibrary(book2)
      })
      render();
  }
}

checkStored();