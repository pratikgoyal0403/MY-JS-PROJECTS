//completed

const totalseats = Array.from(document.querySelectorAll(".row .seat"));
const movieSelector = document.querySelector(".movie-list");
const seatContainer = document.querySelector(".seat-container");
const order = document.querySelector(".text");
const movieList = [
  { title: "baghi", price: 180 },
  { title: "thappad", price: 150 },
  { title: "suryavanshi", price: 180 }
];
const state = {
  perSeatPrice: 0,
  Selectedseats: 0,
  totalPrice: 0
};
const selectedMovie = () => {
  let price;
  const selectedMovie = movieSelector.value;
  movieList.map(movie => {
    if (movie.title === selectedMovie) {
      price = movie.price;
    }
  });
  state.perSeatPrice = price;
  orderSummary();
};
const seatSelectorHandler = event => {
  const target = event.target;
  console.log(target);
  target.classList.toggle("selected");
  orderSummary();
};

const orderSummary = () => {
  const Selectedseats = totalseats.filter(seat => {
    return seat.classList.contains("selected");
  });
  const totalPrice = Selectedseats.length * state.perSeatPrice;
  order.innerHTML = `You have selected <span>${Selectedseats.length}</span> seats for a price of ₹<span>${totalPrice}</span>`;
};

const availableSeats = totalseats.filter(el => {
  return !el.classList.contains("occupied");
});

availableSeats.map((el, index) => {
  el.dataset.seatnumber = index;
  el.addEventListener("click", seatSelectorHandler.bind(event));
});
movieSelector.addEventListener("change", selectedMovie);
selectedMovie();
// this is working incorrectly
// const filteredSeats = totalseats.filter((el, index) =>{
//     if(el.classList.contains('occupied')){
//         totalseats.splice(index, 1);
//     }
// })

//INCOMPLETE
