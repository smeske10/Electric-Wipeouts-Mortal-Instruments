export function hasPrerequisites() {
  const hasStorage = hasLocalStorage() || hasIndexedDB();
  // firstElementChild not in ie8
  const hasFirstElementChild = "firstElementChild" in document;
  return hasStorage & hasFirstElementChild;
}

export function hasLocalStorage() {
  return "LocalStorage" in window;
}

export function hasIndexedDB() {
  return "indexedDB" in window;
}

export function hasPaymentRequest() {
  return "PaymentRequest" in window;
}
