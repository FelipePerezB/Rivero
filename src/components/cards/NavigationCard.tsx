import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";

export default function NavigationCard({
  children,
  href,
}: {
  children?: JSX.Element | string;
  href: string;
}) {
  return (
    <Card className="hover:bg-slate-100" interactive href={href}>
      <div className={"flex items-center"}>
        <div className="w-full">{children}</div>
        <FontAwesomeIcon className="w-3 h-3" icon={faChevronRight} />
      </div>
    </Card>
  );
}
