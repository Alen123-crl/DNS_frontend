import styles from "./MenuSection.module.css";

// Static decorative images per section index
const SECTION_IMAGES = {
  1: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80", // salad bowl
};

export default function MenuSection({ title, items, highlight, subtitle, index }) {
  if (!items || items.length === 0) return null;

  const sectionImage = SECTION_IMAGES[index];

  return (
    <div className={`${styles.section} ${highlight ? styles.boxed : ""}`}>
      <div className={styles.left}>
        <div className={`${styles.label} ${highlight ? styles.highlight : ""}`}>
          {title}
        </div>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.divider} />

      <div className={styles.right}>
        {items.map((item) => (
          <div key={item._id} className={styles.item}>
            <div className={styles.itemRow}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.dots} />
              {item.price > 0 && (
                <span className={styles.price}>${item.price}</span>
              )}
            </div>
            {item.description && (
              <p className={styles.desc}>{item.description}</p>
            )}
          </div>
        ))}
      </div>

      {sectionImage && (
        <img
          src={sectionImage}
          alt=""
          className={styles.sectionImg}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
