import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Config.module.css";
import { faPaintbrush, faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import SwitchToogle from "@components/SwitchToogle";
import Card, { SimpleCard } from "@components/Card";
import { UserButton, useUser } from "@clerk/nextjs";
import { capFirst } from "src/utils/capFirst";

export default function Config() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;
  return (
    <Layout>
      <article className={styles.cards}>
        {user?.username && role && (
          <>
            <SimpleCard>
              <div className={styles["profile__info"]}>
                <UserButton />
                <span className={styles.name}>{capFirst(user.username)}</span>
                <span className={styles.role}>{role?.toUpperCase()}</span>
              </div>
            </SimpleCard>
          </>
        )}
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
        >
          <></>
        </Card>
      </article>
    </Layout>
  );
}
