import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}

export default layout;
