document.addEventListener("DOMContentLoaded", () => {
   const display = document.querySelector("input[name='display']");
   const buttons = document.querySelectorAll(
      ".calculator input[type='button']"
   );

   function isOperator(char) {
      return ["+", "-", "*", ".", "/"].includes(char);
   }

   function addCharacter(value) {
      if (
         /[+\-*/.]$/.test(display.value[display.value.length - 1]) &&
         /[+\-*/.]$/.test(value)
      ) {
         return false;
      } else {
         return true;
      }
   }

   function isValidExpression() {
      return !/[+\-*/]$/.test(display.value);
   }

   function handleInput(action, value) {
      switch (action) {
         case "clear":
            display.value = "0";
            break;
         case "delete":
            display.value = display.value.slice(0, -1) || "0";
            break;
         case "calculate":
            if (isValidExpression()) {
               try {
                  display.value = String(eval(display.value));
               } catch (e) {
                  display.value = "Error";
               }
            }
            break;
         default:
            if (
               display.value === "0" &&
               value !== "0" &&
               value !== "00" &&
               !isOperator(value)
            ) {
               display.value = value;
            } else if (
               !(display.value === "0" && (value === "00" || value === "0"))
            ) {
               if (addCharacter(value)) {
                  display.value += value;
               }
            }

            break;
      }
   }

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         handleInput(button.dataset.action, button.dataset.value);
      });
   });

   document.addEventListener("keydown", (e) => {
      const key = e.key;
      if (key === "Enter" || key === "=") {
         handleInput("calculate");
         e.preventDefault();
      } else if (key === "Escape") {
         handleInput("clear");
      } else if (key === "Backspace") {
         handleInput("delete");
      } else if (/^[0-9]$/.test(key) || isOperator(key)) {
         handleInput(null, key);
      }
   });
});
