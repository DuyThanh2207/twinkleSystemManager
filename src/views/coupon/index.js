import React from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CCardFooter,
  CSelect,
  CTextarea,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const fields = [
  "name",
  "code",
  "date_expired",
  "salon_apply",
  {
    key: "edit",
    label: "",
    sorter: false,
    filter: false,
  },
];
const data = [
  {
    name: "Cardguard",
    code: "36987-1235",
    date_expired: "07/01/2021",
    salon_apply: "All Salon",
  },
  {
    name: "Home Ing",
    code: "56062-294",
    date_expired: "18/02/2021",
    salon_apply: "All Salon",
  },
  {
    name: "Ventosanzap",
    code: "54838-510",
    date_expired: "15/02/2021",
    salon_apply: "All Salon",
  },
  {
    name: "Daltfresh",
    code: "63354-401",
    date_expired: "26/01/2021",
    salon_apply: "All Salon",
  },
  {
    name: "Daltfresh",
    code: "43269-876",
    date_expired: "27/06/2020",
    salon_apply: "All Salon",
  },
  {
    name: "Quo Lux",
    code: "63187-127",
    date_expired: "06/07/2020",
    salon_apply: "All Salon",
  },
  {
    name: "Konklab",
    code: "45802-034",
    date_expired: "29/07/2020",
    salon_apply: "All Salon",
  },
  {
    name: "Fix San",
    code: "0268-0813",
    date_expired: "19/12/2020",
    salon_apply: "All Salon",
  },
  {
    name: "Bamity",
    code: "0363-0737",
    date_expired: "19/08/2020",
    salon_apply: "All Salon",
  },
  {
    name: "Opela",
    code: "34645-4242",
    date_expired: "03/10/2020",
    salon_apply: "All Salon",
  },
];
const Coupon = () => {
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CCard>
            <CCardHeader>CRUD Coupon</CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form__partner">
                <CRow>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="phone">Coupon's Name</CLabel>
                      <CInput
                        type="text"
                        id="couponName"
                        name="couponName"
                        placeholder="Enter Coupon's Name..."
                      />
                      <CFormText className="help-block">
                        Please enter coupon's phone
                      </CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="phone">Coupon's Code</CLabel>
                      <CInput
                        type="text"
                        id="couponCode"
                        name="couponCode"
                        placeholder="Enter Coupon's Code..."
                      />
                      <CFormText className="help-block">
                        Please enter coupon's code
                      </CFormText>
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="name">Salon Apply</CLabel>
                      <CSelect custom name="salonApply" id="salonApply">
                        <option>...</option>
                        <option>All Salons</option>
                      </CSelect>
                      <CFormText className="help-block">
                        Please choose salon to apply this coupon...
                      </CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="dateExpired">Date Expired</CLabel>
                      <CInput type="date" id="dateExpired" name="dateExpired" />
                      <CFormText className="help-block">
                        Please choose date expried for this coupon
                      </CFormText>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol sm="12">
                    <CFormGroup>
                      <CLabel htmlFor="address">Description</CLabel>
                      <CTextarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter Coupon's Description..."
                      />
                      <CFormText className="help-block">
                        Please enter coupon's description
                      </CFormText>
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">
                <CIcon name="cil-scrubber" /> Submit
              </CButton>
              <CButton type="reset" size="sm" color="danger" className="ml-3">
                <CIcon name="cil-ban" /> Reset
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
                items={data}
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
                          // onClick={() => {
                          //   toggleDetails(index);
                          // }}
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
                          // onClick={() => {
                          //   toggleDetails(index);
                          // }}
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
    </>
  );
};

export default Coupon;
