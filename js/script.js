// const calculator = document.querySelector(".main-content");
// const keys = document.querySelector(".calculator");
// keys.addEventListener('click', (ev) => {
//     const key = ev.target;
//     const action = key.dataset.action;
//     const display = document.querySelector(".result");
//     const keyContent = key.textContent;
//     const displayedNum = display.textContent;
//     // keys.dataset.previousKeyType = "operator"
//     // const previousKeyType = keys.dataset.previousKeyType;


//      if(ev.target.matches("button")){
//          console.log("button");
//      }
    // if(!action){
    //     console.log("number key");
    // }
    // if(action === "add" || action === "subtract" || action === "multiply" || action === "divide"){
    // console.log("operator");
    // }
    // if(action === "decimal"){
    //     console.log("decimal-key")
    // }
    // if(action === "clear"){
    //     console.log("clear-key")
    // }
    // if(action === "calculate"){
    //     console.log("equal-key")
    // }

//     if(!action){
//         if(displayedNum === "0" || previousKeyType === "operator"){
//             display.textContent = keyContent;
//         }
//         else{
//             display.textContent = displayedNum + keyContent;
//         }
//     }
//     if(action === "decimal"){
//         display.textContent = displayedNum + ".";
//     }
//     if(action === "add" || action === "subtract" || action === "multiply" || action === "divide"){
//         key.classList.add("is-depressed");
//     }
//     Array.from(key.parentNode.children).forEach(k => k.classList.remove("is-depressed"));
    
// })


const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
      result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
      result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
      result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
      result = parseFloat(n1) / parseFloat(n2)
    }
  
    return result
  }
  
  const calculator = document.querySelector('.main-content')
  const display = calculator.querySelector('.result')
  const keys = calculator.querySelector('.calculator')
  
  keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target
      const action = key.dataset.action
      const keyContent = key.textContent
      const displayedNum = display.textContent
      const previousKeyType = calculator.dataset.previousKeyType
  
      Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
  
      if (!action) {
        if (
          displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = keyContent
        } else {
          display.textContent = displayedNum + keyContent
        }
        calculator.dataset.previousKeyType = 'number'
      }
  
      if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
          display.textContent = displayedNum + '.'
        } else if (
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate'
        ) {
          display.textContent = '0.'
        }
  
        calculator.dataset.previousKeyType = 'decimal'
      }
  
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        const secondValue = displayedNum
  
        if (
          firstValue &&
          operator &&
          previousKeyType !== 'operator' &&
          previousKeyType !== 'calculate'
        ) {
          const calcValue = calculate(firstValue, operator, secondValue)
          display.textContent = calcValue
          calculator.dataset.firstValue = calcValue
        } else {
          calculator.dataset.firstValue = displayedNum
        }
  
        key.classList.add('is-depressed')
        calculator.dataset.previousKeyType = 'operator'
        calculator.dataset.operator = action
      }
  
      if (action === 'clear') {
        if (key.textContent === 'AC') {
          calculator.dataset.firstValue = ''
          calculator.dataset.modValue = ''
          calculator.dataset.operator = ''
          calculator.dataset.previousKeyType = ''
        } else {
          key.textContent = 'AC'
        }
  
        display.textContent = 0
        calculator.dataset.previousKeyType = 'clear'
      }
  
      if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
      }
  
      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue
        const operator = calculator.dataset.operator
        let secondValue = displayedNum
  
        if (firstValue) {
          if (previousKeyType === 'calculate') {
            firstValue = displayedNum
            secondValue = calculator.dataset.modValue
          }
  
          display.textContent = calculate(firstValue, operator, secondValue)
        }
  
        calculator.dataset.modValue = secondValue
        calculator.dataset.previousKeyType = 'calculate'
      }
    }
  })
  