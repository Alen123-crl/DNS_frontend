import { useState } from "react";
import styles from "./Navbar.module.css";

const links = ["HOME", "MENU", "MAKE A RESERVATION", "CONTACT US"];

export default function Navbar({ onAddClick }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span className={styles.logoDeep}>DEEP</span>
        <span className={styles.logoNet}>NET</span>
        <span className={styles.logoSoft}>SOFT</span>
      </div>

      <ul className={`${styles.links} ${open ? styles.open : ""}`}>
        {links.map((l) => (
          <li key={l} className={l === "MENU" ? styles.active : ""}>
            {l}
          </li>
        ))}
        <li>
          <button className={styles.addBtn} onClick={() => { onAddClick(); setOpen(false); }}>
            + Add Menu
          </button>
        </li>
      </ul>

      <button className={styles.hamburger} onClick={() => setOpen((p) => !p)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}
