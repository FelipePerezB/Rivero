import React, { ReactNode, useEffect, useRef, useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Config.module.css";
import {
  faChevronCircleRight,
  faChevronRight,
  faChevronUp,
  faDog,
  faPaintBrush,
  faPaintRoller,
  faPaintbrush,
  faShieldDog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";

export default function Config() {
  return (
    <Layout>
      <article className={styles.options}>
        <Option
          head={
            <div className={styles["profile__info"]}>
              <span className={styles.name}>{"session?.user?.name"}</span>
              <span className={styles.role}>
                {"session?.user?.role.toUpperCase()"}
              </span>
            </div>
          }
        >
          <form className={styles.form}>
            <label>
              <span>Nombre</span>
              <input
                readOnly
                defaultValue={"session?.user?.name" as string | undefined}
                className={styles.input}
              />
            </label>
            <label>
              <span>Email</span>
              <input
                readOnly
                defaultValue={"session?.user?.email" as string | undefined}
                className={styles.input}
              />
            </label>
            {/* <button className={styles["update-btn"]} type="button">
              Actualizar perfil
            </button> */}
          </form>
          <div className={styles.links}>
            <Link className={styles.link} href={"/"}>
              <span>Actualizar perfil</span>
            </Link>
            <Link className={styles.link} href={"/"}>
              <span>Cambiar contraseña</span>
            </Link>
            {/* <Link className={styles.link} href={"/"}>
              <span>Cambiar email</span>
            </Link> */}
            <span className={styles["link--active"]} onClick={() => {}}>
              Cerrar sesión
            </span>
          </div>
        </Option>
        <Option
          head={
            <span>
              <FontAwesomeIcon size="lg" icon={faPaintbrush} /> Apariencia
            </span>
          }
        >
          <div className={styles.suboption}>
            <span>Modo oscuro</span>
            <SwitchToogle createFormData={(data) => console.log(data)} />
          </div>
        </Option>
        <Option
          head={
            <span>
              <FontAwesomeIcon size="lg" icon={faShieldDog} /> Privacidad
            </span>
          }
        >
          {/* <p></p> */}
        </Option>
      </article>
    </Layout>
  );
}

const Option = ({
  head,
  children,
}: {
  head: ReactNode;
  children: ReactNode;
}) => {
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!parentRef.current?.style || !headRef.current?.clientHeight) return;
    if (isOpen) return;
    parentRef.current.style.height = `calc(${headRef.current.clientHeight}px + calc(var(--padding)) `;
  }, [headRef.current?.clientHeight]);

  return (
    <section ref={parentRef} className={styles.option}>
      <div
        ref={headRef}
        className={styles.profile}
        onClick={() => {
          if (!parentRef.current || !headRef.current) return;
          !isOpen
            ? (parentRef.current.style.height = `calc(${headRef.current?.clientHeight}px + calc(var(--padding) * 3) + ${bodyRef.current?.clientHeight}px)`)
            : (parentRef.current.style.height = `calc(${headRef.current.clientHeight}px + var(--padding)`);
          setIsOpen(!isOpen);
        }}
      >
        {head}
        <FontAwesomeIcon
          className={styles["chevron"]}
          rotation={isOpen ? 180 : 90}
          icon={faChevronUp}
        />
      </div>
      <div ref={bodyRef}>{children}</div>
    </section>
  );
};
