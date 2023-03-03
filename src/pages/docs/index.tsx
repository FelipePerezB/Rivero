import Layout from "src/layout/Layout";
import React, { useState } from "react";
import styles from "@styles/Docs.module.css";
import {
  faChevronRight,
  faSquareRootVariable,
  faChartBar,
  faSquare,
  IconDefinition,
  faChevronUp,
  faDownload,
  faSquareCheck,
  faEllipsisVertical,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Modal from "@components/Modal";

export default function Docs() {
  const [state, setState] = useState(true);
  const [modalState, setModalState] = useState(false);
  const defaultConfig = {
    grade: '4° MEDIO',
    subject: 'Matemáticas'
  }
  return (
    <Layout>
      <section className={styles.info}>
        <h2 className={styles.grade}>{defaultConfig.grade}</h2>
        <div className={styles.info__buttons}>
          <span className={styles.subject}>{defaultConfig.subject}</span>
          <button className={styles.config} onClick={() => setModalState(true)}>
            <FontAwesomeIcon size="lg" icon={faGear} />
          </button>
            <Modal
              title="Configuración"
              setModalState={setModalState}
              modalState={modalState}
              options={[
                {
                  text: "Resumenes",
                  switchToogleConfig: {
                    setState,
                    state,
                  },
                },
                {
                  text: "Ejercicios",
                  switchToogleConfig: {
                    setState,
                    state,
                  },
                },
                {
                  text: "Ensayos",
                  switchToogleConfig: {
                    setState,
                    state,
                  },
                },
                {
                  text: "Curso",
                  selectConfig: [
                    "4° Medio",
                    "3° Medio",
                    "2° Medio",
                    "1° Medio",
                    "Todos",
                  ],
                },
                {
                  text: "Asignatura",
                  selectConfig: ["Matemática", "Todos"],
                },
              ]}
            />
        </div>
      </section>
      <ul className={styles.units}>
        <Unit
          text="Raices"
          icon={faSquareRootVariable}
          docs={["Resumen racionalización", "Ejecicios propiedades"]}
        />
        <Unit
          text="Estadistica"
          icon={faChartBar}
          docs={["Graficos", "Medidas de dispersión", "Cuantiles"]}
        />
        <Unit
          text="Poligonos"
          icon={faSquare}
          docs={["Proporcion", "Clasificación"]}
        />
      </ul>
    </Layout>
  );
}

function Unit({
  text,
  icon,
  docs,
}: {
  text: string;
  icon: IconDefinition;
  docs: string[];
}) {
  const [state, setState] = useState(false);
  const changeVisibility = () => setState(!state);
  return (
    <li
      key={text}
      className={styles.unit}
      style={{
        height: state ? `${(docs.length + 1) * 58 + 46}px` : "64px",
      }}
    >
      <div className={styles["unit__card"]} onClick={changeVisibility}>
        <div className={styles["card__info"]}>
          <FontAwesomeIcon size="lg" color={"#E86675"} icon={icon} />
          <span>{text}</span>
        </div>
        <FontAwesomeIcon rotation={state ? 180 : 90} icon={faChevronUp} />
      </div>
      <ul className={styles.docs}>
        {docs.map((doc) => {
          return <Doc key={doc} title={doc} />;
        })}
      </ul>
    </li>
  );
}

function Doc({ title }: { title: string }) {
  return (
    <li className={styles.doc}>
      <Link href={`docs/check/${title}`}>
        <span>{title}</span>
      </Link>
      <div className={styles.options}>
        <FontAwesomeIcon className={styles.icon} icon={faEllipsisVertical} />
        <FloatMenu
          contents={[
            { text: "Descargar", icon: faDownload },
            { text: "Corregir", icon: faSquareCheck },
            { text: "Abrir", icon: faChevronRight },
          ]}
        />
      </div>
    </li>
  );
}

function FloatMenu({
  contents,
}: {
  contents: {
    text: string;
    icon?: IconDefinition;
  }[];
}) {
  return (
    <ul className={styles["float-menu"]}>
      {contents.map((children) => {
        return (
          <li className={styles["menu__option"]} key={children.text}>
            <span>{children.text}</span>
            {children?.icon && <FontAwesomeIcon icon={children?.icon} />}
          </li>
        );
      })}
    </ul>
  );
}
