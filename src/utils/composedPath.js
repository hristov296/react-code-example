export function composedPath(el) {
  if (typeof window === "undefined") {
    return;
  }

  var path = [];

  while (el) {
    path.push(el);

    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);

      return path;
    }

    el = el.parentElement;
  }
}
