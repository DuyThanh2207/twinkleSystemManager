import AccountsSalonOwner from "./salonOwner";
import AccountsSalonStaff from "./salonStaff";
import React from "react";
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";

function Accounts() {
  return (
    <CTabs activeTab="salonOwner">
      <CNav variant="tabs" className="mb-3">
        <CNavItem>
          <CNavLink data-tab="salonOwner">Salon Owner</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="salonStaff">Salon Staff</CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
        <CTabPane data-tab="salonOwner">
          <AccountsSalonOwner />
        </CTabPane>
        <CTabPane data-tab="salonStaff">
          <AccountsSalonStaff />
        </CTabPane>
      </CTabContent>
    </CTabs>
  );
}

export default Accounts;
