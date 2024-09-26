type Cancel = () => void;

// Petrov Danil: That's my old code from github
export function debounce<T extends [...unknown[]]> (fn: (...args: T) => void, time: number): (...args: T) => Cancel {
  let timeout: number;
  return function (this: any, ...args: T) {
    const context = this;
    clearTimeout(timeout);
    timeout = window.setTimeout(function () {
      fn.apply(context, args);
    }, time);
    return () => window.clearTimeout(timeout);
  };
}
