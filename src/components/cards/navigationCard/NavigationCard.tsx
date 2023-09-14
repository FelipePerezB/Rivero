import Card from "@components/Card";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavigationCard.module.css";

export default function NavigationCard({
  children,
  href,
}: {
  children: JSX.Element | string;
  href: string;
}) {
  return (
    <Card className={styles.card} href={href}>
      <div>{children}</div>
      <FontAwesomeIcon icon={faChevronRight} />
    </Card>
  );
}
