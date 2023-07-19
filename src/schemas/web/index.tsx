import GetDoc from "src/getDoc/GetDoc";
import { webNodes } from "..";

export default function GetWebNode({
  component,
}: {
  component: { type: string; options: any };
}) {
  return <GetDoc component={component} nodes={webNodes} />;
}
