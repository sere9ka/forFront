// объявление переменных
// общий body
const body = document.querySelector('body')
// кнопка корзина и логотип
const btnCart = document.getElementById('cart')
const logo = body.querySelector('.logo-link')
// модальное окно
const modal = document.querySelector('.modal')
const btnClose = document.querySelector('.btn-close')
const total = modal.querySelector('.modal-sum')
// разные мэйны
const mainIndex = document.getElementById('index')
const mainProduct = document.getElementById('restourant')
// карточки в разных мэйнах
const cardsRestBlock = mainIndex.querySelector('#index .cards')
const cardsRest = cardsRestBlock.querySelectorAll('.card')
const cardsProductBlock = mainProduct.querySelector('#restourant .cards')
const cardsProduct = cardsProductBlock.querySelectorAll('.card')
// строки в модальном окне
let rowsBlock = modal.querySelector('.modal-main')
let rows = rowsBlock.querySelectorAll('.row')
// массив для проверки имён строк
let nameArr = []


// объявление функций
const modalOpen = () => {
    modal.classList.toggle('modal--close')   
}
const getFullPrice = () => {
    rows = rowsBlock.querySelectorAll('.row')
    let fullPrice = 0;
    rows.forEach(row => {
        let priceBlock = row.querySelector('.price')
        let price = +priceBlock.textContent
        fullPrice += price;
    })
    total.textContent = fullPrice
}
const getNewPrice = (count, price, priceBlock) => {
    let newPrice = 0;
    newPrice = count * price
    priceBlock.textContent = newPrice
    getFullPrice()
}
const getProductModal = (nameProduct, priceProduct, newPriceProduct) => {
    // получаем строку заново
    rows = rowsBlock.querySelectorAll('.row')
    // создаём копию пустой строки
    let copyRow = rows[0].cloneNode(true)
    let blockForName = copyRow.querySelector('.product-name')
    let blockForPrice = copyRow.querySelector('.price')
    // записываем данные в имя и цену
    blockForName.textContent = nameProduct
    blockForPrice.textContent = +newPriceProduct
    // включаем отображение строки
    copyRow.style.display = ''
    // записываем в конец блока
    rowsBlock.append(copyRow)
    // получаем новый список строк в блоке
    rowsBlock = document.querySelector('.modal-main')
    rows = rowsBlock.querySelectorAll('.row')
    // проверяем в массиве уже выбранных продуктов повторение нового
    // если повторяется - не добавляем
    if (nameArr.includes(nameProduct)) {
        copyRow.remove()
    }
    // если повторяется - увеличиваем счётчик позиции
    rows.forEach((row) => {
        let blockForName = row.querySelector('.product-name')
        let name = blockForName.textContent
        // проверка на совпдание в строке массива, тогда можем увеличить счётчик
        if (name == nameProduct) {
            console.log(row);
            let countBlock = row.querySelector('.count')
            let count = countBlock.textContent
            let priceBlock = row.querySelector('.price')
            count++
            countBlock.textContent = count
            getNewPrice(count, priceProduct, priceBlock)
        }
        // отправляем в массив имя, что бы потом проверить на совпадение
        nameArr.push(name)
    })
    // функция кликов по + и - и вызов пересчёта суммы
    rows.forEach(row => {
        let priceBlock = row.querySelector('.price')
        let countBlock = row.querySelector('.count')
        let count = countBlock.textContent
        const btnMinus = row.querySelector('.minus')
        const btnPlus = row.querySelector('.plus')
        btnMinus.addEventListener('click', () => {
            if (count > 0) {
                count--
                countBlock.textContent = count
                getNewPrice(count, priceProduct, priceBlock)
            }
        })
        btnPlus.addEventListener('click', () => {
            count++
            countBlock.textContent = count
            getNewPrice(count, priceProduct, priceBlock)
        })
    })
    // пересчитываем ценник каждый вызов
    getFullPrice()
}
const getInfoProduct = (cards) => {
    // получаем данные из карточек позиций
    cards.forEach((card, index) => {
        let nameProductBlock = card.querySelector('.cart-title')
        let priceProductBlock = card.querySelector('.product-price')
        let nameProduct = nameProductBlock.textContent
        let priceProduct = +priceProductBlock.textContent.slice(0, 3)
        let btnProduct = card.querySelector('button')
        let newPriceProduct = priceProduct
        btnProduct.addEventListener('click', () => {
            getProductModal(nameProduct, priceProduct, newPriceProduct)
        })
    })
}
const getToMain = () => {
    mainIndex.classList.toggle('not--active')
    mainProduct.classList.toggle('not--active')
}

// вызов функций

btnCart.addEventListener('click', modalOpen);
btnClose.addEventListener('click', modalOpen);
logo.addEventListener('click', (e) => {
    e.preventDefault()
    if (mainIndex.classList.contains('not--active')) {
        getToMain()
    }
})
modal.addEventListener('click', (event) => {
    if (event.target == modal) {
        modalOpen()
    }
})
cardsRest.forEach(card => {
    card.addEventListener('click', () => {
        getToMain()
    })
})

getInfoProduct(cardsProduct)
getFullPrice()
// логеры

