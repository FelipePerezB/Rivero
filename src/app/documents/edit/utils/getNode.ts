const getNode = (selection?: HTMLElement): HTMLElement | undefined =>
  selection &&
  (selection.dataset?.component
    ? selection
    : getNode(selection.parentElement as HTMLElement));

export default getNode