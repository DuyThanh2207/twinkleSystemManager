import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSpinner,
  CCardFooter,
  CModal,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as Type from "../../reusable/Constant";
import moment from "moment";
import CouponForm from "./components/couponForm";

const axios = require("axios");

const fields = [
  "name",
  "description",
  "quantity",
  "discount",
  "code",
  {
    key: "createdDate",
    label: "Created Date",
  },
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];

const Coupon = () => {
  const [listCoupon, setListCoupon] = useState([]);
  const [createStatus, setCreateStatus] = useState(true);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);
  const [coupon, setCoupon] = useState({
    name: "",
    description: "",
    quantity: 1,
    discount: 1,
    code: "",
  });
  const handleChangeInput = (e) => {
    e.persist();
    setCoupon({
      ...coupon,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const getAllCoupon = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allDiscounts`,
    }).then((res) => {
      if (res && res.status === 200) {
        setListCoupon(res.data.discounts);
      }
    });
  };
  const getByCouponId = async (id) => {
    setCreateStatus(false);
    await axios({
      method: "get",
      url: `${Type.Url}/manager/discountById?id=${id}`,
    }).then((res) => {
      if (res && res.status === 200) {
        setCoupon({ ...coupon, ...res.data.discount });
      }
    });
  };
  const onCreateCoupon = async () => {
    if (
      coupon.name !== "" &&
      coupon.quantity !== 0 &&
      coupon.discount !== 0 &&
      coupon.code !== ""
    ) {
      setModal(true);
      var dataCreate = {
        ...coupon,
        code: coupon.code.toUpperCase(),
      };
      await axios({
        method: "post",
        url: `${Type.Url}/manager/createDiscount`,
        data: dataCreate,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllCoupon();
          setModal(false);
          setCoupon({
            name: "",
            description: "",
            quantity: 0,
            discount: 0,
            code: "",
          });
        }
      });
    }
  };
  const onUpdateCoupon = async () => {
    if (
      coupon.name !== "" &&
      coupon.quantity !== 0 &&
      coupon.discount !== 0 &&
      coupon.code !== ""
    ) {
      setModal(true);
      var dataUpdate = {
        ...coupon,
        code: coupon.code.toUpperCase(),
      };
      await axios({
        method: "patch",
        url: `${Type.Url}/manager/editDiscount?id=${coupon._id}`,
        data: dataUpdate,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
      }).then((res) => {
        if (res && res.status === 200) {
          getAllCoupon();
          setModal(false);
          setCreateStatus(true);
          setCoupon({
            name: "",
            description: "",
            quantity: 0,
            discount: 0,
            code: "",
          });
        }
      });
    }
  };
  const deleteCoupon = async (Id) => {
    setModal(true);
    axios({
      method: "delete",
      url: `${Type.Url}/manager/deleteDiscount`,
      data: { id: Id },
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
    }).then((res) => {
      if (res && res.status === 200) {
        getAllCoupon();
        setModal(false);
      }
    });
  };

  useEffect(() => {
    getAllCoupon();
  }, []);
  useEffect(() => {
    setCoupon({
      name: "",
      description: "",
      quantity: 0,
      discount: 0,
      code: "",
    });
    setCreateStatus(true);
  }, [status]);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>CRUD Coupon</CCardHeader>
            <CCardBody>
              <CouponForm
                handleChangeInput={(e) => handleChangeInput(e)}
                coupon={coupon}
              />
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                {createStatus ? (
                  <div onClick={() => onCreateCoupon()}>
                    <CIcon name="cil-scrubber" /> Create
                  </div>
                ) : (
                  <>
                    <div onClick={() => onUpdateCoupon()}>
                      <CIcon name="cil-scrubber" /> Submit
                    </div>
                  </>
                )}
              </CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                className="ml-3"
                onClick={() => setStatus(!status)}
              >
                <CIcon name="cil-ban" />
                Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter
                items={listCoupon}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  createdDate: (item, index) => {
                    return (
                      <div
                        style={{
                          padding: "0.75rem",
                          verticalAlign: "top",
                          borderTop: "1px solid",
                          borderTopColor: "#d8dbe0",
                        }}
                      >
                        {moment(item.createdDate)
                          .format("DD MM yyyy HH:mm:ss")
                          .toString()}
                      </div>
                    );
                  },
                  edit: (item, index) => {
                    return (
                      <td className="py-2" style={{ textAlign: "center" }}>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={() => {
                            getByCouponId(item._id);
                          }}
                        >
                          <CIcon name={"cilPencil"} className="mr-1" />
                          Edit
                        </CButton>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="ml-2"
                          onClick={() => {
                            deleteCoupon(item._id);
                          }}
                        >
                          <CIcon name={"cilTrash"} className="mr-1" />
                          Delete
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal show={modal} centered>
        <CModalBody
          className="d-flex justify-content-center"
          style={{ padding: "5rem" }}
        >
          <CSpinner
            color="warning"
            variant="grow"
            style={{ width: "4rem", height: "4rem" }}
          />
        </CModalBody>
      </CModal>
    </>
  );
};

export default Coupon;
