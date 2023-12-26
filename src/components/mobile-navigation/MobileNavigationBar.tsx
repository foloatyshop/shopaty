import { FC } from "react";
import { Badge } from "@mui/material";
import Home from "components/icons/Home";
import User2 from "components/icons/User2";
import CategoryOutlined from "components/icons/CategoryOutline";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import useWindowSize from "hooks/useWindowSize";
import { useAppContext } from "contexts/AppContext";
import { iconStyle, StyledNavLink, Wrapper } from "./styles";

const MobileNavigationBar: FC = () => {
  const width = useWindowSize();
  const { state } = useAppContext();

  return width <= 900 ? (
  <></>
  ) : null;
};

const list = [
  // { title: "Home", icon: Home, href: "/" },
  // { title: "Category", icon: CategoryOutlined, href: "/mobile-category-nav" },
  // { title: "Cart", icon: ShoppingBagOutlined, href: "/cart" },
  // { title: "Account", icon: User2, href: "/profile" },
];

export default MobileNavigationBar;
