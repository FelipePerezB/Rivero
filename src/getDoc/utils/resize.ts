export default function resize(value: number) {
  const $docs = document.querySelectorAll("#doc");
  const $containers = document.querySelectorAll("#doc-container");
  if ($containers && $docs) {
    for (let index = 0; index < $docs.length; index++) {
      const $doc = $docs[index] as HTMLElement
      const $container = $containers[index] as HTMLElement
      const pixels = 13;
      const docWidth = 450;
      const ratio = pixels / docWidth;
      let componentWith;
      $container.style.width = "100%";

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
}
