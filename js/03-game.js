/**
 * Напиши програмне забезпечення для ігрового автомата.
 * Для вирішення завдання використай готову розмітку HTML та базову стилізацію.
 *
 * Після натиснення на кнопку "Start game"
 * в кожному віконці по черзі має з'являтись
 * смайлик з затримкою в 1 секунду ('🤑' або '👿')
 *
 * Під час обробки кожного віконця створи масив з Promis-ами
 * в якому кожен з них буде відповідати за своє віконце,
 * після чого оброби даний масив за допомогою методу Promise.allSettled
 *
 * Після того як всі віконця були заповнені потрібно
 * щоб скріпт автоматично визначав чи гравець переміг, чи ні.
 * Якщо в кожному віконці однаковий смайлик це означає що користувач переміг
 *
 * В поле result виводить повідомлення про статус гри ('Winner' або 'Loser')
 *
 * Після повторного натискання на кнопку "Start game"
 * поле має очищатись, а гра починатись з початку.
 */

/*
 1. вішаємо обробник подій по кліку на кнопку старт + блокувати цю кнопку поки не закінчилась гра
 2. створюємо проміси для кожного віконця (мепнути дітей контейнеру)
 3. викликаємо статичний метод  Promise.allSettled для обробки всіх результатів
 4. очищуємо кожен дів
 5. додаємо в дів смайлик з результату промісу (textContent) з затримкою через одну секунду 
 (1,  2, 3)
 6. робимо перевірку на переможця, якщо всі однакові (наприклад, всі fullfilled або всі rejected) - то ми перемогли + записати цей результат у параграф
*/

const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result");

startBtn.addEventListener("click", handleStartGame);

function handleStartGame({ target }) {
  target.disabled = true;
  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const isPromiseFullfilled = Math.random() > 0.5;

      if (isPromiseFullfilled) {
        resolve("🤑"); // переводимо проміс у стан Fullfilled
      } else {
        reject("👿"); // переводимо проміс у стан Rejected
      }
    });
  });

  Promise.allSettled(promises).then((items) => {
    const isWinner =
      items.every(({ status }) => status === "fulfilled") ||
      items.every(({ status }) => status === "rejected");

    // перебір масиву результатів виконань наших промісів
    items.forEach((item, i) => {
      container.children[i].textContent = ""; // очистка полів перед новою грою
      result.textContent = "";

      setTimeout(() => {
        container.children[i].textContent = item.value || item.reason; //   item.value є тільки у промісу зі станом fullfilled, item.reason є тільки у промісу зі станом Rejected, відповідно, якщо одного не буде (undefined) то візьмемо значення іншого
      }, 1000 * (i + 1)); // i+1 - для того, щоб була інтервальна затримка між кожним таймаутом в 1 секунду
    });

    // розблокування кнопки після того, як показався останній смайлик
    setTimeout(() => {
      target.disabled = false;
      result.textContent = isWinner ? "Winner" : "Loser";
    }, 1000 * container.children.length);
  });
}
