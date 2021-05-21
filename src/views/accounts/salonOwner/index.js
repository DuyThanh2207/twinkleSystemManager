import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CSpinner,
} from "@coreui/react";
import * as Type from "../../../reusable/Constant";
import CIcon from "@coreui/icons-react";

const axios = require("axios");

const fields = [
  "name",
  "username",
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];

const AccountsSalonOwner = () => {
  const [storesList, setStoresList] = useState([]);
  const [modal, setModal] = useState(false);
  const getAllStore = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allStores`,
    }).then((res) => {
      if (res.status === 200) {
        setStoresList(res.data.stores);
      }
    });
  };
  const deleteStore = (_id) => {
    setModal(true);
    axios({
      method: "delete",
      url: `${Type.Url}/manager/deleteStore`,
      headers: {
        Authorization: `Bearer ${Type.token}`,
      },
      data: { id: _id },
    }).then(() => {
      getAllStore();
      setModal(false);
    });
  };
  useEffect(() => {
    getAllStore();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter
                items={storesList}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  edit: (item, index) => {
                    return (
                      <td className="py-2" style={{ textAlign: "center" }}>
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="ml-2"
                          onClick={() => {
                            deleteStore(item._id);
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

export default AccountsSalonOwner;
