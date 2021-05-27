import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardFooter,
  CPagination,
  CSelect,
  CFormText,
  CModal,
  CModalBody,
} from "@coreui/react";
import moment from "moment";
import * as Type from "../../reusable/Constant";

const axios = require("axios");

const Posts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberClone, setPageNumberClone] = useState(0);
  const [modal, setModal] = useState(false);
  const [postList, setPostList] = useState([]);
  const [post, setPost] = useState({});
  const postsPerPage = 5;
  const pagesVisited = pageNumberClone * postsPerPage;
  const getAllBlog = async () => {
    var dataClone = [];
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allBlogs`,
    })
      .then((res) => {
        if (res && res.status === 200) {
          dataClone = res.data.blogs.filter(
            (item) => item.author === "System Manager"
          );
        }
      })
      .then(() => setPostList(dataClone));
  };
  const onShowDetailPost = (item) => {
    setModal(true);
    setPost({ ...post, ...item });
  };
  useEffect(() => {
    getAllBlog();
  }, []);
  const displayPosts = postList
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((item, key) => (
      <div className="d-flex mb-3" style={{ height: "12rem" }}>
        <img
          src={
            item.thumbnail !== ""
              ? item.thumbnail
              : "https://via.placeholder.com/200"
          }
          alt=""
          style={{ height: "100%", objectFit: "cover", width: "12rem" }}
          onClick={() => onShowDetailPost(item)}
        />
        <CCard style={{ width: "100%", marginBottom: "0" }}>
          <CCardHeader>{item.title}</CCardHeader>
          <CCardBody className="d-flex justify-content-between align-items-center">
            <div
              style={{
                width: "80%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {item.description}
            </div>
            <div className="d-flex">
              <div>
                <CButton color="danger" shape="square">
                  Hide
                </CButton>
              </div>
            </div>
          </CCardBody>
          <CCardFooter>
            {item.author} -
            {moment(item.publishedAt).format("DD MM yyyy HH:mm:ss")}
          </CCardFooter>
        </CCard>
      </div>
    ));
  const pageCount =
    postList.length > 0 ? Math.ceil(postList.length / postsPerPage) : 1;
  const changePage = (selected) => {
    setPageNumber(selected);
    setPageNumberClone(selected - 1);
  };
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>Partner's Post</CCardHeader>
            <CCardBody>
              <div className="mb-3 d-flex">
                <div className="mr-3">
                  <CFormText className="help-block">Sort By Date</CFormText>
                  <CSelect custom name="sortByDate" id="sortByDate">
                    <option>Newest</option>
                    <option>Oldest</option>
                  </CSelect>
                </div>
                <div>
                  <CFormText className="help-block">Sort By Name</CFormText>
                  <CSelect custom name="sortByAuthor" id="sortByAuthor">
                    {postList.length > 0 &&
                      postList.map((item, key) => (
                        <option>{item.author}</option>
                      ))}
                  </CSelect>
                </div>
              </div>
              {postList.length > 0 && displayPosts}
            </CCardBody>
            <CCardFooter>
              <CPagination
                activePage={pageNumber}
                pages={pageCount}
                onActivePageChange={(i) => changePage(i)}
              ></CPagination>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={modal} centered onClose={() => setModal(false)} size="xl">
        <CModalBody
          className="d-flex justify-content-center"
          style={{ padding: "5rem" }}
        >
          <div>
            <div
              className="title"
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              {post !== {} && post.title}
            </div>
            <div className="content mt-5">
              {post !== {} && (
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              )}
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default Posts;
