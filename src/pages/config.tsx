import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Config.module.css";
import { faPaintbrush, faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";
import Card from "@components/Card";

export default function Config() {
  return (
    <Layout>
      <article className={styles.cards}>
        <Card
          head={
            <div className={styles["profile__info"]}>
              <span className={styles.name}>{"Felipe Pérez"}</span>
              <span className={styles.role}>{"ADMIN"}</span>
            </div>
          }
        >
          <div className={styles.profile}>
            <form className={styles.form}>
              <label>
                <span>Nombre</span>
                <input
                  readOnly
                  defaultValue={"Felipe Pérez" as string | undefined}
                  className={styles.input}
                />
              </label>
              <label>
                <span>Email</span>
                <input
                  readOnly
                  defaultValue={
                    "felipe.perez@colegiopucon.com" as string | undefined
                  }
                  className={styles.input}
                />
              </label>
            </form>
            <div className={styles.links}>
              <Link className={styles.link} href={"/"}>
                <span>Actualizar perfil</span>
              </Link>
              <Link className={styles.link} href={"/"}>
                <span>Cambiar contraseña</span>
              </Link>
              <span className={styles["link--active"]} onClick={() => {}}>
                Cerrar sesión
              </span>
            </div>
          </div>
        </Card>
        <Card
          head={
            <span>
              <FontAwesomeIcon size="lg" icon={faPaintbrush} /> Apariencia
            </span>
          }
        >
          <div className={styles.subCard}>
            <span>Modo oscuro</span>
            <SwitchToogle createFormData={(data) => console.log(data)} />
          </div>
        </Card>
        <Card
          head={
            <span>
              <FontAwesomeIcon size="lg" icon={faShieldDog} /> Privacidad
            </span>
          }
        ><></></Card>
      </article>
    </Layout>
  );
}
