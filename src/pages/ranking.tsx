import React, { useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Ranking.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faInfo,
  faInfoCircle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@components/Modal";

export default function Ranking() {
  const users = [
    { name: "Andrés Belmar", stars: 17 },
    { name: "Karla Mercedes", stars: 92 },
    { name: "Pedro Rodrigez", stars: 34 },
    { name: "Felipe Pérez", stars: 60 },
    { name: "Andrés Belmar", stars: 17 },
    { name: "Karla Mercedes", stars: 92 },
    { name: "Pedro Rodrigez", stars: 34 },
    { name: "Felipe Pérez", stars: 60 },
    { name: "Andrés Belmar", stars: 17 },
    { name: "Karla Mercedes", stars: 92 },
    { name: "Pedro Rodrigez", stars: 34 },
    { name: "Felipe Pérez", stars: 60 },
    { name: "Andrés Belmar", stars: 999 },
    { name: "Karla Mercedes", stars: 92 },
    { name: "Pedro Rodrigez", stars: 34 },
  ];
  return (
    <Layout>
      <section className={styles.instruccions}>
        <FontAwesomeIcon
          icon={faStar}
          size={"4x"}
          className={styles.instruccions__icon}
        />
        <p>
          <span>Completa actividades para conseguir estrellas</span>
          <FontAwesomeIcon
            className={styles.instruccions__info__logo}
            icon={faInfoCircle}
          />
        </p>
      </section>
      <section>
        <Info title="Top" />
        <ul className={styles.users}>
          {users.map((user, i) => (
            <User key={i} name={user.name} stars={user.stars} number={i + 1} />
          ))}
        </ul>
      </section>
    </Layout>
  );
}

function Info({ title }: { title: string }) {
  const [modalState, setModalState] = useState(false);
  return (
    <>
      <div className={styles.laderboard__info}>
        <h2>{title}</h2>
        <span
          onClick={() => setModalState(true)}
          className={styles.config__icon}
        >
          <FontAwesomeIcon icon={faGear} />
        </span>
      </div>
      <Modal
        title="Configuración"
        modalState={modalState}
        setModalState={setModalState}
        options={[
          { text: "Top", selectConfig: ["Curso", "Nacional"], type: "select" },
          {
            text: "Mostrar",
            selectConfig: ["Top 10", "Top 20", "Top 100", "Todos"],
            type: "select",
          },
        ]}
      />
    </>
  );
}

function User({
  name,
  stars,
  number,
}: {
  name: string;
  stars: number;
  number: number;
}) {
  return (
    <li className={styles.user}>
      <div className={styles.user__info}>
        <span className={styles.number}>{number}</span>
        <span>{name}</span>
      </div>
      <div className={styles.user__stats}>
        <span>{stars}</span>
        <span>
          <FontAwesomeIcon icon={faStar} />
        </span>
      </div>
    </li>
  );
}
