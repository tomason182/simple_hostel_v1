import SideBarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside>
      <nav>
        <ul>
          <SideBarItem
            label="Dashboard"
            path="/"
          />
          <SideBarItem
            label="Calendar"
            path="/login"
          />
          <SideBarItem
            label="Reservations"
            path="/reservations"
          />
          <SideBarItem
            label="Rates And Availability"
            path="/rates-and-availability"
          />
          <SideBarItem
            label="Room Types"
            path="/room-types"
          />
          <SideBarItem
            label="Room Types"
            path="/room-types"
          />

        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar;
