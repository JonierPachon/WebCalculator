document.addEventListener("DOMContentLoaded", () => {
   const display = document.querySelector("input[name='display']");
   const buttons = document.querySelectorAll(
      ".calculator input[type='button']"
   );

   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         const action = button.dataset.action;
         const value = button.dataset.value;

         switch (action) {
            case "clear":
               display.value = "";
               break;
            case "delete":
               display.value = display.value.slice(0, -1);
               break;
            case "calculate":
               try {
                  display.value = eval(display.value);
               } catch (e) {
                  display.value = "Error";
               }
               break;

            default:
               display.value += value;
               break;
         }
      });
   });
});
