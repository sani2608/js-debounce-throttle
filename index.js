const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

/**
 *
 * @param {*} callback is the function that we want to run.
 * @param {*} delay is the time after which the callback function will run.
 * @returns new function
 */
 const debounce = (callback, delay = 1000) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

/** default without debounce */
input.addEventListener("input", (event) => {
  const inputText = event.target.value;
  defaultText.textContent = inputText; // without debounce
  updateDebounceText(inputText); //with debounce
  updateThrottleText(inputText); //with throttle
});

const updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
});

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
});

/**
 *
 * @param {*} callback is a function.
 * @param {*} delay is timer for which we need to throttle.
 * @returns  a function
 */
function throttle(callback, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeOutFunc = () => {
    if (waitingArgs === null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeOutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    callback(...args);
    shouldWait = true;
    setTimeout(timeOutFunc, delay);
  };
}

