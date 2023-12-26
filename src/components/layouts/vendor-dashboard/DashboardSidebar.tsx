import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Icon, Theme, useMediaQuery } from "@mui/material";
import LayoutDrawer from "../LayoutDrawer";
import Scrollbar from "components/Scrollbar";
import { FlexBetween } from "components/flex-box";
import { navigations } from "./NavigationList";
import SidebarAccordion from "./SidebarAccordion";
import {
  ListLabel,
  BadgeValue,
  StyledText,
  BulletIcon,
  NavWrapper,
  ExternalLink,
  NavItemButton,
  SidebarWrapper,
  ChevronLeftIcon,
  ListIconWrapper,
} from "./LayoutStyledComponents";
import { DoubleArrowTwoTone } from "@mui/icons-material";
// Back-End
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../../src/firebase";

const TOP_HEADER_AREA = 70;

// -----------------------------------------------------------------------------
type DashboardSidebarProps = {
  sidebarCompact: any;
  showMobileSideBar: any;
  setSidebarCompact: () => void;
  setShowMobileSideBar: () => void;
};
// -----------------------------------------------------------------------------

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {

  const {
    sidebarCompact,
    showMobileSideBar,
    setShowMobileSideBar,
    setSidebarCompact,
  } = props;

  const router = useRouter();
  const [onHover, setOnHover] = useState(false);
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  // side hover when side bar is compacted
  const COMPACT = sidebarCompact && !onHover ? 1 : 0;
  // handle active current page
  const activeRoute = (path: string) => (router.pathname === path ? 1 : 0);

  // handle navigate to another route and close sidebar drawer in mobile device
  const handleNavigation = (path: string) => {
    router.push(path);
    setShowMobileSideBar();
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Lỗi khi đăng xuất", error);
      });
    router.push("/");
  };

  const renderLevels = (data: any) => {
    return data.map((item: any, index: any) => {
      if (item.type === "label")
        return (
          <ListLabel key={index} compact={COMPACT}>
            {item.label}
          </ListLabel>
        );

      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item} sidebarCompact={COMPACT}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      } else if (item.type === "extLink") {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavItemButton key={item.name} name="child" active={0}>
              {item.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <span className="item-icon icon-text">{item.iconText}</span>
              )}

              <StyledText compact={COMPACT}>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && (
                <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
              )}
            </NavItemButton>
          </ExternalLink>
        );
      } else {
        return (
          <Box key={index}>
            <NavItemButton
              key={item.name}
              className="navItem"
              active={activeRoute(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              {item?.icon ? (
                <ListIconWrapper>
                  <item.icon />
                </ListIconWrapper>
              ) : (
                <BulletIcon active={activeRoute(item.path)} />
              )}

              <StyledText compact={COMPACT}>{item.name}</StyledText>

              {/* <Box mx="auto" /> */}

              {item.badge && (
                <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
              )}
            </NavItemButton>
          </Box>
        );
      }
    });
  };

  const content = (
    <Scrollbar
      autoHide
      clickOnTrack={false}
      sx={{
        overflowX: "hidden",
        maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
      }}
    >
      <NavWrapper compact={sidebarCompact}>
        {renderLevels(navigations)}
      </NavWrapper>
    </Scrollbar>
  );

  if (downLg) {
    return (
      <LayoutDrawer
        open={showMobileSideBar ? true : false}
        onClose={setShowMobileSideBar}
      >
        <Box position="relative" p={2} maxHeight={TOP_HEADER_AREA}>
          <Image
            alt="Logo"
            width={50}
            height={50}
            src="/assets/images/logohome.jpg"
            style={{ marginLeft: 8 }}
          />
        </Box>

        {content}
        <Button
          sx={{ position: "absolute", bottom: 0, width: "100%", p: 4 }}
          onClick={handleSignOut}
        >
          Đăng xuất
        </Button>
      </LayoutDrawer>
    );
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween
        p={2}
        maxHeight={TOP_HEADER_AREA}
        justifyContent={COMPACT ? "center" : "space-between"}
      >
        <Avatar
          src={
            COMPACT
              ? "/assets/images/logohome.jpg"
              : "/assets/images/logohome.jpg"
          }
          sx={{ borderRadius: 0, width: "auto", marginLeft: COMPACT ? 0 : 1 }}
        />

        <ChevronLeftIcon
          color="disabled"
          compact={COMPACT}
          onClick={setSidebarCompact}
          sidebarcompact={sidebarCompact ? 1 : 0}
        />
      </FlexBetween>

      {content}
      <Button
        sx={{ position: "absolute", bottom: 0, width: "100%", p: 4 }}
        onClick={handleSignOut}
      >
        Đăng xuất
      </Button>
    </SidebarWrapper>
  );
};

export default DashboardSidebar;
