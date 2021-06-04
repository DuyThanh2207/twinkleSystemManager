import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTabs,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from "@coreui/react";
import * as Type from "../../reusable/Constant";
import PublicPost from "./components/PublicPost";
import HiddenPost from "./components/HiddenPost";

const axios = require("axios");

const Posts = () => {
  const [postListPublic, setPostListPublic] = useState([]);
  const [postListHidden, setPostListHidden] = useState([]);
  const getAllBlog = async () => {
    var dataClonePublic = [];
    var dataCloneHidden = [];
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allPosts`,
    })
      .then((res) => {
        if (res && res.status === 200) {
          dataClonePublic = res.data.posts.filter(
            (item) => item.author !== "System Manager" && item.isPublic
          );
          dataCloneHidden = res.data.posts.filter(
            (item) => item.author !== "System Manager" && !item.isPublic
          );
        }
      })
      .then(() => {
        setPostListPublic(dataClonePublic);
        setPostListHidden(dataCloneHidden);
      });
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>Partner's Post</CCardHeader>
            <CCardBody>
              <CTabs activeTab="public-post">
                <CNav variant="tabs" className="mb-3">
                  <CNavItem>
                    <CNavLink data-tab="public-post">Public Post</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="hidden-post">Hidden Post</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="public-post">
                    <PublicPost
                      postList={postListPublic}
                      getAllBlog={() => getAllBlog()}
                    />
                  </CTabPane>
                </CTabContent>
                <CTabContent>
                  <CTabPane data-tab="hidden-post">
                    <HiddenPost
                      postList={postListHidden}
                      getAllBlog={() => getAllBlog()}
                    />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Posts;
