import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CCardFooter,
  CModal,
  CSpinner,
  CModalBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import FormCreate from "./component/formCreate";
import FormEdit from "./component/formEdit";
import * as Type from "../../reusable/Constant";
const axios = require("axios");
const fields = [
  "name",
  "address",
  "phoneNumber",
  "openTime",
  "storeType",
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];
const Partners = () => {
  const [storesList, setStoresList] = useState([]);
  const [storeTypes, setStoreTypes] = useState([]);
  const [modal, setModal] = useState(false);
  const [createStatus, setCreateStatus] = useState(true);
  const [avatar, setAvatar] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const [avatarEdit, setAvatarEdit] = useState({
    formFile: "",
    VirtualPath: "",
  });
  const [store, setStore] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
    storeType: "",
    openTime: "",
    closeTime: "",
    description: "",
    address: "",
  });
  const [storeEdit, setStoreEdit] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
    storeType: "",
    openTime: "",
    closeTime: "",
    description: "",
    address: "",
  });
  const getAllStore = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allStores`,
    }).then((res) => {
      if (res.status === 200) {
        var storeClone = [];
        res.data.stores.forEach((item, key) => {
          item = {
            ...item,
            address: item.address[0],
            storeType: item.storeType.title,
          };
          storeClone.push(item);
        });
        setStoresList(storeClone);
      }
    });
  };
  const getAllStoreType = async () => {
    await axios({
      method: "get",
      url: `${Type.Url}/manager/allStoreTypes`,
    }).then((res) => {
      if (res.status === 200) {
        setStoreTypes(res.data.storeTypes);
      }
    });
  };
  const handleChange = (e) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeEdit = (e) => {
    setStoreEdit({
      ...storeEdit,
      [e.target.name]: e.target.value,
    });
  };
  const createStore = () => {
    if (
      store.name !== "" ||
      store.username !== "" ||
      store.email !== "" ||
      store.storeType !== "" ||
      store.openTime !== "" ||
      store.closeTime !== ""
      // store.address !== ""
    ) {
      setModal(true);
      const formData = new FormData();
      formData.append("name", store.name);
      formData.append("phoneNumber", store.phoneNumber);
      formData.append("username", store.username);
      formData.append("email", store.email);
      formData.append("storeType", store.storeType);
      formData.append("openTime", store.openTime + " - " + store.closeTime);
      formData.append("avatar", avatar.formFile);
      formData.append("description", store.description);
      console.log(store);
      axios({
        method: "post",
        url: `${Type.Url}/manager/createStore`,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
        data: formData,
      }).then(() => {
        getAllStore();
        setModal(false);
      });
    }
  };
  const editStore = (item) => {
    let cloneStore = storeTypes.filter((type) => type.title === item.storeType);
    item = {
      ...item,
      storeType: { ...cloneStore },
      openTime: item.openTime.slice(0, 5).replace(/ +/g, ""),
      closeTime: item.openTime.slice(7, 12),
    };
    setStoreEdit(item);
    setAvatarEdit({
      ...avatarEdit,
      VirtualPath: Type.Url + item.storeType[0].thumbnail,
    });
    setCreateStatus(false);
  };
  const onSubmitEdit = () => {
    if (
      storeEdit.name !== "" ||
      storeEdit.username !== "" ||
      storeEdit.email !== "" ||
      storeEdit.storeType !== "" ||
      storeEdit.openTime !== "" ||
      storeEdit.closeTime !== ""
      // storeEdit.address !== ""
    ) {
      setModal(true);
      const formData = new FormData();
      formData.append("name", storeEdit.name);
      formData.append("phoneNumber", storeEdit.phoneNumber);
      formData.append("username", storeEdit.username);
      formData.append("email", storeEdit.email);
      formData.append("storeType", storeEdit.storeType[0]._id);
      formData.append(
        "openTime",
        storeEdit.openTime + " - " + storeEdit.closeTime
      );
      formData.append("avatar", avatarEdit.formFile);
      formData.append("description", storeEdit.description);
      console.log(storeEdit);
      axios({
        method: "patch",
        url: `${Type.Url}/manager/editStore?id=${storeEdit._id}`,
        headers: {
          Authorization: `Bearer ${Type.token}`,
        },
        data: formData,
      }).then(() => {
        setCreateStatus(true);
        getAllStore();
        setModal(false);
      });
    }
  };

  useEffect(() => {
    getAllStore();
    getAllStoreType();
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>CRUD Partner</CCardHeader>
            <CCardBody>
              {createStatus ? (
                <FormCreate
                  store={store}
                  handleChange={(e) => handleChange(e)}
                  storeTypes={storeTypes}
                  avatar={avatar}
                  setAvatar={setAvatar}
                />
              ) : (
                <FormEdit
                  store={storeEdit}
                  handleChange={(e) => handleChangeEdit(e)}
                  storeTypes={storeTypes}
                  avatar={avatarEdit}
                  setAvatar={setAvatarEdit}
                />
              )}
            </CCardBody>
            <CCardFooter>
              {createStatus ? (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => createStore()}
                >
                  <CIcon name="cil-scrubber" /> Create
                </CButton>
              ) : (
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={() => onSubmitEdit()}
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
              )}
              {createStatus ? (
                <CButton type="reset" size="sm" color="danger" className="ml-3">
                  <CIcon name="cil-ban" /> Reset
                </CButton>
              ) : (
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  className="ml-3"
                  onClick={() => setCreateStatus(true)}
                >
                  <CIcon name="cil-ban" /> Cancel
                </CButton>
              )}
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
                          onClick={() => {
                            editStore(item);
                          }}
                        >
                          <CIcon name={"cilPencil"} className="mr-1" />
                          Edit
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

export default Partners;
