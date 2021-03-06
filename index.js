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
const debounce = (callback, delay) => {
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
}, 1000);

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

const parentContainer = document.querySelector('#child2');

parentContainer.addEventListener("mousemove", () => {
  incrementCount(defaultText);
  updateDebounceTextMouseMove();
  updateThrottleTextMouseMove();
});

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}

const updateDebounceTextMouseMove = debounce(() => {
  incrementCount(debounceText); //mouseover function
}, 500);

const updateThrottleTextMouseMove = throttle(() => {  
  incrementCount(throttleText); //mouseover function
});




// passing only function name to the debounce functoin.


let counter = 0;
const getData = () => {
  // calls an API and gets Data
  const input = document.getElementById('second-input');
  const div = document.getElementById('fetching');
  if (input.value) {
    div.innerHTML += `<span>Fetching Data.. ${counter++}</span><br>`;
  } else {
    div.innerHTML = "";
  }

}

const debounce1 = function (fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  }
}

/**
 * passing function name and timer to debounce
 */
const searchProducts = debounce1(getData, 300);



// throttle
/** without arguments */
const expensive = () => {
  console.log('expensive call');
}

const throttleFunc = (func, limit) => {
  let flag = true;
  return function () {
    if (flag) {
      func();
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  }
}
const betterExpensiveFunc = throttleFunc(expensive, 1000);

// window.addEventListener('resize', expensive);
// window.addEventListener('resize', betterExpensiveFunc);


/** With arguments */
const expensiveWithArgs = (name) => {
  console.log('expensive call with', name);
}

const throttleFuncWithArgs = (func, limit) => {
  let flag = true;
  return function () {
    let context = this;
    let args = arguments;
    if (flag) {
      func.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  }
}

const betterExpensiveFuncWithArgs = throttleFuncWithArgs(expensiveWithArgs, 1000);
window.addEventListener('resize', () => {
  betterExpensiveFuncWithArgs('sani in args');
});





