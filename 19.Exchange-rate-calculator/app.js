const SelectedCurrency_one = document.querySelector('#currency-one');
const SelectedCurrency_two = document.querySelector('#currency-two');
const input_one = document.querySelector('.input-feild-one');
const input_two = document.querySelector('.input-feild-two');
const currentRate = document.querySelector('.curr-rate');
const key = 'b2fb7f8d184203cf9e701f51';

const render = (rate)=>{
    const enteredValue = parseInt(input_one.value);
    if(!isNaN(enteredValue)){
        const calculatedValue = enteredValue * rate;
        input_two.value = calculatedValue;
        
    }
}


const getCurrencyRates = ()=>{
    const currencyOne = SelectedCurrency_one.value;
    const currencyTwo = SelectedCurrency_two.value;

    fetch(`https://prime.exchangerate-api.com/v5/${key}/latest/${currencyOne}`)
    .then(response=>{
        return response.json()
    }).then(data=>{
            const rate =  data.conversion_rates[currencyTwo];
            render(rate);
            currentRate.innerHTML = `<span>1${currencyOne} = ${rate} ${currencyTwo}</span>`
    });
}



SelectedCurrency_one.addEventListener('change', getCurrencyRates);
SelectedCurrency_two.addEventListener('change', getCurrencyRates);
input_one.addEventListener('input', getCurrencyRates);
getCurrencyRates();