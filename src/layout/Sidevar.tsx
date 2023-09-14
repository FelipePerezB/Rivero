import React, { ReactNode, useState } from "react";
import styles from "@styles/Sidevar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBlog,
  faChevronRight,
  faClose,
  faDownload,
  faGear,
  faMoon,
  faRightToBracket,
  faSave,
  faShieldDog,
  faSignOut,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";
import { UserButton, useUser } from "@clerk/nextjs";
import capFirst from "src/utils/capFirst";

export default function Sidevar({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: any;
}) {
  const setDarkMode = (data: any) => {
    // console.log(data);
  };
  const [state, setState] = useState(false);
  const { user } = useUser();
  const sidevarState = visibility ? "on" : "off";
  return (
    <>
      <div className={styles[sidevarState]}>
        <div className={styles.blur} onClick={() => setVisibility(false)}></div>
        <article className={styles.sidevar}>
          <section className={styles.profile}>
            <UserButton appearance={{ variables: { borderRadius: "2px" } }} />
            <div className={styles["profile__info"]}>
              <span className={styles.name}>
                {(user?.username as string | undefined) &&
                  capFirst(user?.username as string)}
              </span>
              <span className={styles.role}>
                {(user?.publicMetadata?.role as string | undefined) &&
                  (user?.publicMetadata?.role as string)}
              </span>
            </div>
          </section>
          <section className={styles.options__container}>
            <ul className={styles.options}>
              <Option link={"/"} icon={faShieldDog} text="Privacidad" />
              <Option callback={setDarkMode} icon={faMoon} text="Modo oscuro" />
            </ul>
            <div
              className={styles["close-menu"]}
              onClick={() => setVisibility(false)}
            >
              <Option text="Cerrar menu" icon={faClose} />
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

function Option({
  iconColor = "var(--black)",
  link,
  icon,
  text,
  toogle,
  callback,
}: {
  iconColor?: string;
  link?: string;
  icon: IconDefinition;
  text: string;
  callback?: (data: any) => void;
  toogle?: {
    state: boolean;
    setState: any;
  };
}) {
  const node = (
    <li
      className={styles.option}
      onClick={() => {
        callback && callback("");
        toogle && toogle.setState(!toogle.state);
      }}
    >
      <div>
        <FontAwesomeIcon
          style={{ color: iconColor, width: "28px", height: "28px" }}
          icon={icon}
        />
        <span>{text}</span>
      </div>
      {link && <FontAwesomeIcon color="var(--black)" icon={faChevronRight} />}
      {callback && <SwitchToogle createFormData={callback} />}
    </li>
  );
  return (
    <>
      {link ? (
        <Link style={{ width: "100%" }} href={link}>
          {node}
        </Link>
      ) : (
        node
      )}
    </>
  );
}
