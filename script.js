const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Ako je broj
    if (button.classList.contains('number')) {
      if (display.textContent === '0' || (operator && currentInput === '')) {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
      currentInput = display.textContent;
    }

    // Ako je operator (+, -, *, /)
    if (button.classList.contains('operator') && !button.classList.contains('equals')) {
      operator = button.getAttribute('data-operator');
      previousInput = currentInput;
      currentInput = '';
    }

    // Ako je jednako (=)
    if (button.classList.contains('equals')) {
      if (previousInput && currentInput && operator) {
        try {
          const result = eval(previousInput + operator + currentInput);
          display.textContent = result;
          currentInput = result.toString();
          previousInput = '';
          operator = '';
        } catch {
          display.textContent = 'Error';
        }
      }
    }

    // Ako je dugme za brisanje (C)
    if (button.classList.contains('clear')) {
      display.textContent = '0';
      currentInput = '';
      previousInput = '';
      operator = '';
    }

    // Ako je dugme za brisanje poslednje cifre (←)
    if (button.classList.contains('backspace')) {
      display.textContent = display.textContent.slice(0, -1) || '0';
      currentInput = display.textContent;
    }
  });
});
