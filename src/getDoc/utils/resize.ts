export default function resize(value: number) {
  const $doc = document.getElementById("doc");
  const $container = document.querySelector("#doc-container");
  if ($container && $doc) {
    const pixels = 13;
    const docWidth = 450;
    const ratio = pixels / docWidth;
    let componentWith;

    if ($container?.clientWidth <= 425) {
      componentWith = $container?.clientWidth * (value + 0.45);
    } else if ($container?.clientWidth <= 1024) {
      componentWith = $container?.clientWidth * (value + 0.2);
    } else {
      componentWith = 700 * (value + 0.5);
    }
    $doc.style.width = componentWith + "px";
    $doc.style.fontSize = componentWith * ratio + "px";
  }
}
