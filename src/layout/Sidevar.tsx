import React, { ReactNode, useState } from "react";
import styles from "@styles/Sidevar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
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
// import { signIn, signOut, useSession } from "next-auth/react";

export default function Sidevar({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: any;
}) {
  const [state, setState] = useState(false);
  // const { data, status } = useSession() as unknown as {
  //   status: "authenticated" | "loading" | "unauthenticated";
  //   data: {
  //     user: {
  //       name: string;
  //       role: string;
  //     };
  //   };
  // };
  const sidevarState = visibility ? "on" : "off";
  return (
    <>
      <div className={styles[sidevarState]}>
        <div className={styles.blur} onClick={() => setVisibility(false)}></div>
        <article className={styles.sidevar}>
          {/* {data && ( */}
          <Link href={"/profile"}>
            <section className={styles.profile}>
              {/* <div className={styles.photo}></div> */}
              <div className={styles["profile__info"]}>
                {/* <span className={styles.name}>{data.user?.name}</span> */}
                <span className={styles.role}>
                  {/* {data.user.role.toUpperCase()} */}
                </span>
              </div>
              <FontAwesomeIcon size="xl" icon={faGear} />
            </section>
          </Link>
          {/* )} */}

          <section className={styles.options__container}>
            <div className={styles.options}>
              {/* <Option link={"/"} icon={faShieldDog} text="Privacidad" />
              <Option link={"/"} icon={faGear} text="Configuración" />
              <Option
                toogle={{ setState, state }}
                icon={faMoon}
                text="Dark mode"
              /> */}
              {/* {data && status === "authenticated" && ( */}
              <Option
                iconColor="#CB2F4E"
                icon={faSignOut}
                // callback={signOut}
                text="Cerrar sesión"
              />
              {/* )} */}
              {/* {status === "unauthenticated" && ( */}
              <Option
                iconColor="var(--primary-color)"
                icon={faRightToBracket}
                text="Iniciar sesión"
                // callback={signIn}
              />
              {/* )} */}
            </div>
            {/* <div ownClick={() => setVisibility(false)}>
              <Option text="Cerrar menu" icon={faClose} />
            </div> */}
          </section>
        </article>
      </div>
    </>
  );
}

const createFormData = () => {};

function Option({
  iconColor,
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
  callback?: () => any;
  toogle?: {
    state: boolean;
    setState: any;
  };
}) {
  const node = (
    <li
      className={styles.option}
      onClick={() => {
        callback && callback();
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
      {toogle && <SwitchToogle createFormData={createFormData} />}
    </li>
  );
  return <>{link ? <Link href={link}>{node}</Link> : node}</>;
}
