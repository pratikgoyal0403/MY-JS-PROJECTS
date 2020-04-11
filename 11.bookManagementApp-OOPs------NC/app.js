// console.log('this js file is working');

// // class Books{
// //     constructor(title, author, isbn){
// //         this.title = title;
// //         this.author = author;
// //         this.isbn = isbn;
// //     }
// // }

// class BookManager{
//     bookArr = [];
//     authorFeild = document.querySelector('.author-feild');
//     titleFeild = document.querySelector('.title-feild');
//     isbnFeild = document.querySelector('.isbn-feild');

//     //add book
//     addBook = ()=>{
//         const title = this.titleFeild.value;
//         const author = this.authorFeild.value;
//         const isbn = this.isbnFeild.value;
//         const book = {
//             title: title,
//             author: author,
//             isbn: isbn
//         };
//         this.bookArr.push(book);
//         app.ui.addBookToUi();
//     }
//     //deleteBook
// }

// class UI{
//     constructor(books){
//         this.books = books;
//     }

//     container = document.querySelector('#book-list');

//     addBookToUi = ()=>{
//         console.log(this.books);
//         this.books.map(book=>{
//             const html = `
//             <td>${book.title}</td>
//             <td>${book.author}</td>
//             <td>${book.isbn}</td>
//             `;
//             console.log(book)
//             this.container.insertAdjacentHTML('beforeend', html);
//         });
//     }
// }

// class AppManager{
//     bookManager = new BookManager();

//     ui = new UI(this.bookManager.bookArr);

//     setUpListner = ()=>{
//         const btn = document.querySelector('.submit-btn');
//         btn.addEventListener('click', (event)=>{
//             event.preventDefault();
//             this.bookManager.addBook();
//         });
//     }
// }

// const app = new AppManager();
// app.setUpListner();

//using functional approach
//COMPLETED WITH 1 QUESTION LEFT
const container = document.querySelector("#book-list");
const btn = document.querySelector(".submit-btn");
const title = document.querySelector(".title-feild");
const author = document.querySelector(".author-feild");
const isbn = document.querySelector(".isbn-feild");
let removeBtn;
let books = [];

//ADD BOOK TO BOOK ARRAY
const addBook = () => {
  const book = {
    title: title.value,
    author: author.value,
    isbn: isbn.value
  };
  books.push(book);
  console.log(books);
  appendToDom();
  addToLocalStorage();
};

//GENERATES HTML TO DISPLAY BOOKS IN THE DOM
const displayBookToUi = () => {
  let html;
  books.map((book, index) => {
    html = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td data-id=${index}><i class="glyphicon glyphicon-remove-circle" /></td>`;
  });
  return html;
};

//APPEND BOOKS TO THE DOM
const appendToDom = () => {
  const html = displayBookToUi();
  if (html !== undefined) {
    container.insertAdjacentHTML("beforeend", html);
  }
  selectDynamicButton();
};

//DELETE BOOK FROM THE DOM AS WELL AS FROM BOOKS ARRAY
const deleteBook = event => {
  const target = event.target.parentElement;
  console.log("your in delte func");
  const id = target.dataset.id;
  books.splice(id, 1);
  const parentEl = target.parentElement;
  parentEl.remove();
  addToLocalStorage();
};

//SELECT x BUTTON FROM DISPLAYED LIST OF BOOKS
const selectDynamicButton = () => {
  removeBtn = Array.from(container.querySelectorAll(".glyphicon"));

  removeBtn.map(btn => {
    btn.addEventListener("click", deleteBook.bind(event));
  });
};

//ADD EVENT LISTNER TO SUBMIT BTN
btn.addEventListener("click", event => {
  event.preventDefault();
  addBook();
});

//PERSIST TO LOCAL STORAGE
const addToLocalStorage = () => {
  localStorage.setItem("books", JSON.stringify(books));
};
//RENDERING FROM LOCAL STORAGE IF ITEMS ARE PRESENT
const renderFromLocalStorage = () => {
  const localStorageItems = JSON.parse(localStorage.getItem("books"));
  if (localStorageItems) {
    books = [...localStorageItems];
  }
  //HOW TO RENDER THIS WITH DEFINED FUNCTIONS
  let html;
  books.map((book, index) => {
    html = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td data-id=${index}><i class="glyphicon glyphicon-remove-circle" /></td>`;
    container.insertAdjacentHTML("beforeend", html);
  });
};
renderFromLocalStorage();


