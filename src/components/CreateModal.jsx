import { useState } from "react";
import { createMenu, createMenuItem } from "../api/menuApi";
import styles from "./CreateModal.module.css";

export default function CreateModal({ menus, onClose, onCreated }) {
  const [tab, setTab] = useState("menu"); // "menu" | "item"
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const [menuForm, setMenuForm] = useState({ name: "", description: "", parentId: "" });
  const [itemForm, setItemForm] = useState({ name: "", description: "", price: "", menuId: "" });

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); setSuccess("");
    setLoading(true);
    try {
      const payload = { name: menuForm.name, description: menuForm.description };
      if (menuForm.parentId) payload.parentId = menuForm.parentId;
      await createMenu(payload);
      setSuccess("Menu created successfully!");
      setMenuForm({ name: "", description: "", parentId: "" });
      onCreated();
    } catch (err) {
      const data = err?.response?.data;
      if (data?.errors) setErrors(data.errors);
      else setErrors({ general: data?.message || "Failed to create menu" });
    } finally {
      setLoading(false);
    }
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); setSuccess("");
    setLoading(true);
    try {
      await createMenuItem({
        name: itemForm.name,
        description: itemForm.description,
        price: itemForm.price,
        menuId: itemForm.menuId,
      });
      setSuccess("Menu item created successfully!");
      setItemForm({ name: "", description: "", price: "", menuId: "" });
      onCreated();
    } catch (err) {
      const data = err?.response?.data;
      if (data?.errors) setErrors(data.errors);
      else setErrors({ general: data?.message || "Failed to create item" });
    } finally {
      setLoading(false);
    }
  };

  // Flatten menus for dropdown
  const flatMenus = [];
  const flatten = (list, depth = 0) => {
    list.forEach((m) => {
      flatMenus.push({ ...m, label: "—".repeat(depth) + " " + m.name });
      if (m.children?.length) flatten(m.children, depth + 1);
    });
  };
  flatten(menus);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <h2 className={styles.title}>Create New</h2>

        <div className={styles.tabs}>
          <button className={`${styles.tabBtn} ${tab === "menu" ? styles.active : ""}`} onClick={() => { setTab("menu"); setErrors({}); setSuccess(""); }}>Menu</button>
          <button className={`${styles.tabBtn} ${tab === "item" ? styles.active : ""}`} onClick={() => { setTab("item"); setErrors({}); setSuccess(""); }}>Menu Item</button>
        </div>

        {success && <div className={styles.success}>{success}</div>}
        {errors.general && <div className={styles.error}>{errors.general}</div>}

        {tab === "menu" && (
          <form onSubmit={handleMenuSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Menu Name *</label>
              <input
                value={menuForm.name}
                onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                placeholder="e.g. Drinks"
              />
              {errors.name && <span className={styles.fieldErr}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label>Description</label>
              <textarea
                value={menuForm.description}
                onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                placeholder="Brief description of this menu"
                rows={3}
              />
              {errors.description && <span className={styles.fieldErr}>{errors.description}</span>}
            </div>
            <div className={styles.field}>
              <label>Parent Menu (optional)</label>
              <select value={menuForm.parentId} onChange={(e) => setMenuForm({ ...menuForm, parentId: e.target.value })}>
                <option value="">— None (root menu) —</option>
                {flatMenus.map((m) => (
                  <option key={m._id} value={m._id}>{m.label}</option>
                ))}
              </select>
              {errors.parentId && <span className={styles.fieldErr}>{errors.parentId}</span>}
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Creating..." : "Create Menu"}
            </button>
          </form>
        )}

        {tab === "item" && (
          <form onSubmit={handleItemSubmit} className={styles.form}>
            <div className={styles.field}>
              <label>Item Name *</label>
              <input
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                placeholder="e.g. Fire Cracker Salmon"
              />
              {errors.name && <span className={styles.fieldErr}>{errors.name}</span>}
            </div>
            <div className={styles.field}>
              <label>Description</label>
              <textarea
                value={itemForm.description}
                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                placeholder="Brief description of this item"
                rows={3}
              />
              {errors.description && <span className={styles.fieldErr}>{errors.description}</span>}
            </div>
            <div className={styles.field}>
              <label>Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={itemForm.price}
                onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                placeholder="e.g. 16"
              />
              {errors.price && <span className={styles.fieldErr}>{errors.price}</span>}
            </div>
            <div className={styles.field}>
              <label>Menu *</label>
              <select value={itemForm.menuId} onChange={(e) => setItemForm({ ...itemForm, menuId: e.target.value })}>
                <option value="">— Select a menu —</option>
                {flatMenus.map((m) => (
                  <option key={m._id} value={m._id}>{m.label}</option>
                ))}
              </select>
              {errors.menuId && <span className={styles.fieldErr}>{errors.menuId}</span>}
            </div>
            <button type="submit" className={styles.submit} disabled={loading}>
              {loading ? "Creating..." : "Create Item"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
