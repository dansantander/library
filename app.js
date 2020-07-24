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

function removeBook(index) {
  myLibrary.splice(index, 1)
  render()
}

function toggleBook(index) {
  myLibrary[index].toggleRead()
  render()
}

function render() {
  document.getElementById("book-container").innerHTML = "";
  myLibrary.forEach((book, index) => {
    div = document.createElement('DIV')
    div.classList.add('book')

    h1 = document.createElement('H1')
    h1.classList.add('book-title')
    h1.innerHTML = book.title
    div.appendChild(h1)

    div2 = document.createElement('DIV')
    div2.classList.add('book-info')
    div.appendChild(div2)

    sp = document.createElement('SPAN')
    sp.classList.add('span')
    sp.innerHTML = `Author: ${book.author}`
    div2.appendChild(sp)

    sp2 = document.createElement('SPAN')
    sp2.classList.add('span')
    sp2.innerHTML = `Num. Pages: ${book.numPages}`
    div2.appendChild(sp2)

    sp3 = document.createElement('SPAN')
    sp3.classList.add('span')
    sp3.innerHTML = `${book.read ? 'Already Read' : 'Not Read'}`
    div2.appendChild(sp3)

    div3 = document.createElement('DIV')
    div3.classList.add('btns')
    div.appendChild(div3)

    btn = document.createElement('BUTTON')
    btn.innerHTML = 'Remove'
    btn.classList.add('btn')
    
    btn.setAttribute('onclick', `removeBook(${index})`)

    div3.appendChild(btn)
    
    btn2 = document.createElement('BUTTON')
    btn2.innerHTML = 'Read/Unread'
    btn2.setAttribute('onClick', `toggleBook(${index})`)
    btn2.classList.add('btn')
    div3.appendChild(btn2)

    document.getElementById("book-container").appendChild(div);

  }) 
  
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function createBookWithForm(){
  let title = document.getElementById("title")
  let author = document.getElementById("author")
  let numPages = document.getElementById("numPages")
  let etitle = document.getElementById("error-title")
  let eauthor = document.getElementById("error-author")
  let enumPages = document.getElementById("error-pages")
  etitle.classList.remove('d-inline')
  eauthor.classList.remove('d-inline')
  enumPages.classList.remove('d-inline')
  etitle.classList.add('d-none')
  eauthor.classList.add('d-none')
  enumPages.classList.add('d-none')
  if (numPages.value.trim() == "") {
    numPages.value = ''
    enumPages.classList.add('d-inline')
    numPages.focus()
  }  
  if (author.value.trim() == "") {
    author.value = ''
    eauthor.classList.add('d-inline')
    author.focus()
  }
  if (title.value.trim() == "") {
    title.value = ''
    etitle.classList.add('d-inline')
    title.focus()
  }
  if (title.value.trim() == "" || author.value.trim() == "" || numPages.value.trim() == "") {
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

function checkStored() {
  if(localStorage.getItem("myLibrary")) {
      myLocalLibrary = JSON.parse((localStorage.getItem("myLibrary")));
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