import React, { ReactNode, useState } from "react";
import styles from "@styles/Sidevar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronRight,
  faClose,
  faDownload,
  faMoon,
  faSave,
  faShieldDog,
  faSignOut,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";

export default function Sidevar({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: any;
}) {
  const [state, setState] = useState(false);
  const sidevarState = visibility ? "on" : "off";
  return (
    <>
      <div className={styles[sidevarState]}>
        <div className={styles.blur} onClick={() => setVisibility(false)}></div>
        <article className={styles.sidevar}>
          <Link href={"/profile"}>
            <section className={styles.profile}>
              <div className={styles.photo}></div>
              <div className={styles["profile__info"]}>
                <span className={styles.name}>Felipe Pérez</span>
                <span className={styles.role}>Estudiante</span>
              </div>
            </section>
          </Link>
          <section className={styles.options__container}>
            <div className={styles.options}>
              <Option link={"/"} icon={faShieldDog} text="Privacidad" />
              <Option link={"/"} icon={faBell} text="Notificaciones" />
              <Option link={"/"} icon={faSave} text="Guardados" />
              <Option link={"/"} icon={faDownload} text="Descargas" />
              <Option
                toogle={{ setState, state }}
                icon={faMoon}
                text="Modo oscuro"
              />
              <Option
                iconColor="#CB2F4E"
                icon={faSignOut}
                text="Cerrar sesión"
              />
            </div>
            <div onClick={()=>setVisibility(false)}>
              <Option text="Cerrar menu" icon={faClose}/>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

function Option({
  iconColor,
  link,
  icon,
  text,
  toogle,
}: {
  iconColor?: string;
  link?: string;
  icon: IconDefinition;
  text: string;
  toogle?: {
    state: boolean;
    setState: any;
  };
}) {
  const node = (
    <li
      className={styles.option}
      onClick={() => {
        toogle && toogle.setState(!toogle.state);
      }}
    >
      <div>
        <FontAwesomeIcon
          style={{ height: "24px", width: "24px", color: iconColor }}
          icon={icon}
        />
        <span>{text}</span>
      </div>
      {link && <FontAwesomeIcon icon={faChevronRight} />}
      {toogle && <SwitchToogle state={toogle.state} />}
    </li>
  );
  return <>{link ? <Link href={link}>{node}</Link> : node}</>;
}
