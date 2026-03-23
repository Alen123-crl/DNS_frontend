import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cards}>
        {/* Connect */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>CONNECT WITH US</h4>
          <p className={styles.cardItem}>📞 +91 940 061 3433</p>
          <p className={styles.cardItem}>✉ info@deepnetsoft.com</p>
        </div>

        {/* Brand */}
        <div className={`${styles.card} ${styles.brand}`}>
          <div className={styles.brandLogo}>
            <span className={styles.deep}>DEEP</span>
            <span className={styles.net}> NET </span>
            <span className={styles.soft}>SOFT</span>
          </div>
          <div className={styles.socials}>
            <span>f</span><span>𝕏</span><span>▶</span><span>in</span>
          </div>
        </div>

        {/* Find us */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>FIND US</h4>
          <p className={styles.cardItem}>
            📍 First floor, Geo Infopark, Infopark EXPY, Kakkanad
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Deepnetsoft Solutions. All rights reserved.</span>
        <div className={styles.bottomLinks}>
          <span>Terms &amp; Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
}
