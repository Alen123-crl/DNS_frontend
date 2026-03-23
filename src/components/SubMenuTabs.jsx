import styles from "./SubMenuTabs.module.css";

export default function SubMenuTabs({ subMenus, activeId, onSelect }) {
  if (!subMenus || subMenus.length === 0) return null;
  return (
    <div className={styles.subBar}>
      {subMenus.map((sub) => (
        <button
          key={sub._id}
          className={`${styles.subTab} ${activeId === sub._id ? styles.active : ""}`}
          onClick={() => onSelect(sub._id)}
        >
          {sub.name}
        </button>
      ))}
    </div>
  );
}
