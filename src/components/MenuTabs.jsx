import styles from "./MenuTabs.module.css";

export default function MenuTabs({ menus, activeId, onSelect }) {
  return (
    <div className={styles.tabBar}>
      {menus.map((menu) => (
        <button
          key={menu._id}
          className={`${styles.tab} ${activeId === menu._id ? styles.active : ""}`}
          onClick={() => onSelect(menu._id)}
        >
          {menu.name}
        </button>
      ))}
    </div>
  );
}
