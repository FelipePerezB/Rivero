import React from "react";
import Layout from "src/layout/Layout";
import styles from "@styles/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faDeleteLeft,
  faEdit,
  faNavicon,
  faPen,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@components/Button";

export default function Dashboard() {
  return (
    <Layout title="Dashboard">
      <div>
        <div className={styles['table__info']}>
          <h2 className={styles["table__title"]}>4° Medio A</h2>
          <span>
          <FontAwesomeIcon size="xl" icon={faAddressBook}/>
          </span>
        </div>
        <table className={styles.table}>
          {/* <thead> */}
          {/* <caption className={styles["table__title"]}>
            <span>Usuarios</span>
          <Button style={"small-active"}>AAA</Button>
          </caption> */}
          {/* </thead> */}
          {/* <div className={styles["table-container"]}> */}
          <tr className={styles["table__head"]}>
            <th>Nombre</th>
            <th>Email</th>
            <th>Modificar</th>
          </tr>
          <tbody>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
            <tr>
              <td>Felipe</td>
              <td className={styles.email}>felipe.perez@colegiopucon.com</td>
              <td className={styles.edit}>
                <FontAwesomeIcon size="sm" icon={faPen} />
                <FontAwesomeIcon size="sm" icon={faX} />
              </td>
            </tr>
          </tbody>
          {/* </div> */}
        </table>
      </div>
    </Layout>
  );
}
