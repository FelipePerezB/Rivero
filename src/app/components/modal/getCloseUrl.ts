export default function getCloseUrl(
  searchParams: { [key: string]: string },
  modalKey: string
) {
  let closeHref = "?";
  if (typeof searchParams === "object") {
    Object.entries(searchParams).forEach(
      ([key, value], i) =>
        modalKey !== key &&
        (closeHref += `${i !== 0 ? "&" : ""}${key}=${value}`)
    );
  }

  return closeHref
}
