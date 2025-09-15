document.addEventListener("DOMContentLoaded", () => {
   const display = document.querySelector("input[name='display']");
   const buttons = document.querySelectorAll(
      ".calculator input[type='button']"
   );

   function calculate() {
      let arrayValues = display.value.split("");
      if (
         arrayValues[arrayValues.length - 1] === "." ||
         arrayValues[arrayValues.length - 1] === "+" ||
         arrayValues[arrayValues.length - 1] === "-" ||
         arrayValues[arrayValues.length - 1] === "*" ||
         arrayValues[arrayValues.length - 1] === "/"
      ) {
         return false;
      } else {
         return true;
      }
   }

   function zero() {
      let arrayValues = display.value.split("");
      const arrayNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      let secondPositionNumber = false;
      let firstPositionNumber = false;

      if (arrayValues.length === 0) {
         display.value = "0";
         return;
      }

      if (arrayValues.length > 1 && arrayValues[0] === "0") {
         if (
            arrayValues[1] === "+" ||
            arrayValues[1] === "-" ||
            arrayValues[1] === "*" ||
            arrayValues[1] === "/" ||
            arrayValues[1] === "." ||
            arrayValues[1] === "0"
         ) {
            display.value = "0";
            return;
         } else {
            display.value = display.value.slice(1);
            return;
         }
      }

      arrayNumbers.forEach((number) => {
         if (arrayValues[arrayValues.length - 2] === number) {
            secondPositionNumber = true;
         }
         if (arrayValues[arrayValues.length - 1] === number) {
            firstPositionNumber = true;
         }
      });

      if (
         arrayValues[arrayValues.length - 1] ===
            arrayValues[arrayValues.length - 2] &&
         !secondPositionNumber
      ) {
         display.value = display.value.slice(0, -1);
         return;
      }

      if (!firstPositionNumber && !secondPositionNumber) {
         display.value = display.value.slice(0, -2) + display.value.slice(-1);
         firstPositionNumber = false;
         secondPositionNumber = false;
      }
   }

   zero();

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         const action = button.dataset.action;
         const value = button.dataset.value;

         switch (action) {
            case "clear":
               display.value = "0";
               break;
            case "delete":
               display.value = display.value.slice(0, -1);
               zero();
               break;
            case "calculate":
               try {
                  const isCalculate = calculate();
                  if (isCalculate) {
                     display.value = eval(display.value);
                  }
               } catch (e) {
                  display.value = "Error";
               }
               break;

            default:
               display.value += value;
               zero();
               break;
         }
      });
   });
});
