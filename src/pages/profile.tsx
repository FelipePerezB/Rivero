import Layout from "src/layout/Layout";
import styles from "@styles/Profile.module.css";
import React from "react";
import Button from "@components/Button";

export default function Profile() {
  return (
    <Layout style={"only-nav"}>
      <section className={styles["photo__container"]}>
        <div className={styles.hero}></div>
        <div className={styles.photo}></div>
        <span className={styles.button}>Cambiar foto</span>
      </section>
      <form className={styles.form}>
        <label>
          <span>Nombre</span>
          <input placeholder="Nombre" className={styles.input} />
        </label>
        <label>
          <span>Email</span>
          <input placeholder="Email" className={styles.input} />
        </label>
        <label>
          <span>Password</span>
          <input placeholder="Password" className={styles.input} />
        </label>
      </form>
      <Button style="primary" callback={() => console.log("AAA")}>
        Guardar cambios
      </Button>
    </Layout>
  );
}
