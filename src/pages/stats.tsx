import React, { useState } from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Stats.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faGear } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import Modal from "@components/Modal";

export default function Statistics() {
  const [modalState, setModalState] = useState(false);
  const [showAverage, setShowAverage] = useState(false);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  );

  return (
    <Layout>
      <section className={styles.container}>
        <div onClick={() => setModalState(true)} className={styles.options}>
          <button>Configuración</button>
          <FontAwesomeIcon icon={faGear} />
        </div>
        <Modal
          title="Configuración"
          setModalState={setModalState}
          modalState={modalState}
          options={[
            {
              text: 'Promedio',
              switchToogleConfig: {
                setState: setShowAverage,
                state: showAverage
              }
            },
            {
              text: 'Mostrar',
              selectConfig: ['3 ensayos', '6 ensayos', '12 ensayos', 'Todos']
            }
          ]}
        />
        <LineChart
          data={[
            { number: "N° 1", points: 800 },
            { number: "N° 2", points: 830 },
            { number: "N° 3", points: 840 },
          ]}
          title="Lenguaje"
          color="#46D37E"
        />
        <LineChart
          data={[
            { number: "N° 1", points: 800 },
            { number: "N° 2", points: 830 },
            { number: "N° 3", points: 820 },
          ]}
          title="Matemática M1"
          color="#E86675"
        />
        <LineChart
          data={[
            { number: "N° 1", points: 800 },
            { number: "N° 2", points: 800 },
            { number: "N° 3", points: 820 },
          ]}
          title="Matemática M2"
          color="#8c2c37"
        />
        <LineChart
          data={[
            { number: "N° 1", points: 800 },
            { number: "N° 2", points: 850 },
            { number: "N° 3", points: 770 },
          ]}
          title="Ciencias"
          color="#50a9e8"
        />
      </section>
    </Layout>
  );
}

function LineChart({
  data,
  title,
  color,
}: {
  data: {
    number: string;
    points: number;
  }[];
  title: string;
  color: string;
}) {
  const configData = {
    labels: data.map((value) => value.number),
    datasets: [
      {
        label: title,
        data: data.map((value) => value.points),
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  const [modalState, setModalState] = useState(false);

  return (
    <>
      <Modal
      key={title+'-sumary'}
        title="Resumen"
        modalState={modalState}
        setModalState={setModalState}
      >
        <div className={styles.modal__container}>
          <ul className={styles.sumary}>
            <li style={{ backgroundColor: color }} className={styles.score}>
              <span>Primero</span>
              <span className={styles.number}>750</span>
            </li>
            <li style={{ backgroundColor: color }} className={styles.score}>
              <span>Actual</span>
              <span className={styles.number}>900</span>
            </li>
            <li style={{ backgroundColor: color }} className={styles.score}>
              <span>Objetivo</span>
              <span className={styles.number}>950</span>
            </li>
          </ul>
          <ul>
            <li className={styles.sumary__texts}>
              <p>Promedio 3 ultimos</p>
              <span>930</span>
            </li>
            <li className={styles.sumary__texts}>
              <p>Ensayos totales</p>
              <span>6</span>
            </li>
            <li className={styles.sumary__texts}>
              <p>Puntaje más alto</p>
              <span>960</span>
            </li>
          </ul>
        </div>
      </Modal>
      <article>
        <div className={styles.info} key={title}>
          <h3>{title}</h3>
          <FontAwesomeIcon
            onClick={() => setModalState(true)}
            style={{ background: color }}
            className={styles.info__icon}
            icon={faAddressBook}
          />
        </div>
        <div className={styles.chart}>
          <Line data={configData} options={{ responsive: true }} />
        </div>
      </article>
    </>
  );
}
