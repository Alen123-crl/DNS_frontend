import { useEffect, useState, useCallback } from "react";
import { getMenuTree, getMenuById } from "../api/menuApi";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuTabs from "../components/MenuTabs";
import MenuSection from "../components/MenuSection";
import OpeningHours from "../components/OpeningHours";
import Footer from "../components/Footer";
import CreateModal from "../components/CreateModal";
import styles from "./MenuPage.module.css";

export default function MenuPage() {
  const [rootMenus, setRootMenus] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadMenus = useCallback(() => {
    setLoading(true);
    getMenuTree()
      .then(({ data }) => {
        const menus = data.data || [];
        setRootMenus(menus);
        setError(null);
        setActiveMenuId((prev) => {
          const stillExists = menus.find((m) => m._id === prev);
          return stillExists ? prev : menus[0]?._id || null;
        });
      })
      .catch((err) => {
        console.error("Menu load error:", err?.response?.data || err.message);
        setError("Failed to load menus. Make sure the backend is running.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadMenus(); }, [loadMenus]);

  useEffect(() => {
    if (!activeMenuId) return;
    setMenuData(null);
    getMenuById(activeMenuId)
      .then(({ data }) => setMenuData(data.data))
      .catch(() => setMenuData(null));
  }, [activeMenuId]);

  // Build sections from active menu
  const sections = [];
  if (menuData) {
    if (menuData.children?.length > 0) {
      menuData.children.forEach((child, i) => {
        sections.push({
          id: child._id,
          title: child.name,
          items: child.items || [],
          highlight: i % 2 !== 0,
          subtitle: child.description || "",
        });
      });
    } else if (menuData.items?.length > 0) {
      sections.push({
        id: menuData._id,
        title: menuData.name,
        items: menuData.items,
        highlight: false,
        subtitle: menuData.description || "",
      });
    }
  }

  return (
    <div className={styles.page}>
      <Navbar onAddClick={() => setShowModal(true)} />
      <Hero />

      {loading && <div className={styles.status}>Loading menus...</div>}

      {error && (
        <div className={styles.statusError}>
          {error}
          <button className={styles.retryBtn} onClick={loadMenus}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <MenuTabs
            menus={rootMenus}
            activeId={activeMenuId}
            onSelect={setActiveMenuId}
          />

          <div className={styles.content}>
            <div className={styles.menuWrapper}>
              {/* Top-left: skewers/appetizer image */}
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
                alt=""
                className={styles.decoTopLeft}
                aria-hidden="true"
              />
              {/* Top-right: cutting board image, rotated */}
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"
                alt=""
                className={styles.decoTopRight}
                aria-hidden="true"
              />
              {/* Bottom-left: sandwich on board */}
              <img
                src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80"
                alt=""
                className={styles.decoBottomLeft}
                aria-hidden="true"
              />

              <div className={styles.menuBox}>
                {rootMenus.length === 0 && (
                  <div className={styles.empty}>
                    <p>No menus yet. Use "+ Add Menu" in the navbar to get started.</p>
                  </div>
                )}

                {rootMenus.length > 0 && sections.length === 0 && menuData && (
                  <p className={styles.emptyItems}>
                    No items in this menu yet. Use "+ Add Menu" in the navbar to add items.
                  </p>
                )}

                {sections.map((sec, i) => (
                  <MenuSection
                    key={sec.id}
                    title={sec.title}
                    items={sec.items}
                    highlight={sec.highlight}
                    subtitle={sec.subtitle}
                    index={i}
                  />
                ))}
              </div>
            </div>

            <OpeningHours />
          </div>
        </>
      )}

      <Footer />

      {showModal && (
        <CreateModal
          menus={rootMenus}
          onClose={() => setShowModal(false)}
          onCreated={loadMenus}
        />
      )}
    </div>
  );
}
