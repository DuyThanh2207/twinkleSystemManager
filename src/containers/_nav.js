import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["System Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Partners",
    to: "/partners",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Accounts",
    to: "/accounts",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Partner's Post",
    to: "/partner-posts",
    icon: "cil-speech",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Mangage Post",
    to: "/posts",
    icon: "cil-speech",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Coupon",
    to: "/coupon",
    icon: "cil-user",
  },
];

export default _nav;
