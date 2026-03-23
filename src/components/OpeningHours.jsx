import styles from "./OpeningHours.module.css";

const hours = [
  { days: "Monday–Thursday", time: "12 PM – 12 AM" },
  { days: "Friday–Saturday", time: "12 PM – 01 AM" },
  { days: "Sunday", time: "12 PM – 11 PM" },
];

export default function OpeningHours() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <span className={styles.tagline}>Be there on time</span>
        <h2 className={styles.title}>OPENING HOURS</h2>
      </div>
      <div className={styles.slots}>
        {hours.map((h, i) => (
          <div key={i} className={styles.slot}>
            {i > 0 && <div className={styles.vline} />}
            <div>
              <div className={styles.days}>{h.days}</div>
              <div className={styles.time}>{h.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
