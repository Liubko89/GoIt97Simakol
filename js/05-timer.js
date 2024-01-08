/**
 * Напишемо клас Timer, який буде
 * запускати та зупиняти відлік часу
 */

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick; // функція, яка буде викликатись при кожному тіку таймера (дія під час зміни таймеру, тобто при кожному запуску інтервалу)
    this.isActive = false; // статус таймера (запущений чи ні)
    this.intervalId = null; // ідентифікатор запущеного інтервалу (це потрібно для подальшої його зупинки)

    this.initTimer(); // викликаємо метод ініціалізації таймеру, щоб побачити 00:00:00 при першому завантаженні сторінки
  }

  initTimer() {
    const time = this.getTimeComponents(0);
    this.onTick(time); // обнуляємо інтерфейс
  }

  start() {
    // паттерн раннє повернення, виходимо з фукнції, якщо таймер активний
    if (this.isActive) {
      return;
    }

    this.initTimer();

    this.isActive = true; // таймер запустився, змінюємо статус
    const startTime = Date.now(); // при запуску таймеру ми беремо поточний час в мілісекундах

    // запускаємо інтервальний виклик функції для підрахунку часу, раз на 1000 мс
    this.intervalId = setInterval(() => {
      const currentTime = Date.now(); // отримуємо новий час кожну секунду
      const diff = currentTime - startTime; // отримуємо різницю в часі початку старту таймеру і поточної секунди
      const time = this.getTimeComponents(diff); // перетворюємо кількість мілісекунд (різниця в часі) на обʼєкт з годинами, хвилинами та секундами

      this.onTick(time); // викликаємо функцію, яка запише обʼєкт часу у параграф циферблату
    }, 1000);
  }

  stop() {
    // якщо таймер неактивний, то не будемо виконувати код, бо нам немає чого зупиняти
    if (!this.isActive) {
      return;
    }

    this.isActive = false; // змінюємо статус на не активний
    clearInterval(this.intervalId); // зупиняємо інтервал який рахує час
  }

  /*
   * - Приймає час в мілісекундах
   * - Вираховує скільки в них вміщається годин/хвилин/секунд
   * - Повертає об'єкт з властивостями hours, mins, secs
   * - Адська копіпаста з stackoverflow 💩
   */
  getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }

  /*
   * Приймає число, перетворює його в рядок і додає в початок 0, якщо число менше 2-х знаків
   */
  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const startBtn = document.querySelector("button[data-action-start]");
const stopBtn = document.querySelector("button[data-action-stop]");
const clockface = document.querySelector(".js-clockface");

const timer = new Timer({
  onTick: updateClockface,
});

startBtn.addEventListener("click", timer.start.bind(timer));
stopBtn.addEventListener("click", timer.stop.bind(timer));

/*
 * - Приймає час в мілісекундах
 * - Вираховує скільки в них вміщається годин/хвилин/секунд
 * - Рисує інтерфейс
 */
function updateClockface({ hours, mins, secs }) {
  clockface.textContent = `${hours}:${mins}:${secs}`;
}

const arr = ["Alex", "John", "Vika", "John", "Katya", "Vika", "Alex", "Sam"];

const unique = [...new Set(arr)];

console.log(unique);
