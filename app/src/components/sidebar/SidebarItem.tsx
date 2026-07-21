import { NavLink } from "react-router-dom";
import styles from "./SidebarItem.module.css";
import type { IMenuItem } from "./IMenuItem";
function SideBarItem({ label, path }: IMenuItem) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? styles.active
            : styles.link
        }
      >
        {label}
      </NavLink>


    </li>
  );
}

export default SideBarItem;


