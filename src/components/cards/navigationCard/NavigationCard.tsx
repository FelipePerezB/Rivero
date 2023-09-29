import Card from "@components/Card";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavigationCard({
  children,
  href,
}: {
  children?: JSX.Element | string;
  href: string;
}) {
  return (
    <Card className="w-full" interactive href={href}>
      <div className={"flex justify-between items-center"}>
        <div>{children}</div>
        <FontAwesomeIcon size="xs" icon={faChevronRight} />
      </div>
    </Card>
  );
}
