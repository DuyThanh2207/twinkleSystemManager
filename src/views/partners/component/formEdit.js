import React from "react";
import {
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CValidFeedback,
  CInvalidFeedback,
} from "@coreui/react";
import UpFileImage from "../../../reusable/UpFile";
function Form({ store, handleChange, storeTypes, avatar, setAvatar }) {
  return (
    <CForm className="form__partner">
      <CRow>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="name">Name</CLabel>
              <CInput
                type="text"
                id="name"
                name="name"
                value={store.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Partner's Name..."
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="username">Username</CLabel>
              <CInput
                type="text"
                id="username"
                name="username"
                placeholder="Enter Partner's Username..."
                value={store.username}
                onChange={(e) => handleChange(e)}
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <CFormGroup>
            <CLabel htmlFor="phoneNumber">Phone Number</CLabel>
            <CInput
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Partner's Phone..."
              value={store.phoneNumber}
              onChange={(e) => handleChange(e)}
            />
          </CFormGroup>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="email">Email</CLabel>
              <CInput
                type="email"
                id="email"
                name="email"
                placeholder="Enter Partner's Email..."
                value={store.email}
                onChange={(e) => handleChange(e)}
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="openTime">Open Time</CLabel>
              <CInput
                type="time"
                id="openTime"
                name="openTime"
                value={store.openTime}
                onChange={(e) => handleChange(e)}
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="closeTime">Close Time</CLabel>
              <CInput
                type="time"
                id="closeTime"
                name="closeTime"
                value={store.closeTime}
                onChange={(e) => handleChange(e)}
                required
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <CFormGroup>
            <CLabel htmlFor="storeType">Store Type</CLabel>
            <CSelect
              custom
              name="storeType"
              id="storeType"
              value={store.storeType[0]._id}
              onChange={(e) => handleChange(e)}
            >
              <option value={null}>None</option>
              {storeTypes.length > 0 &&
                storeTypes.map((item) => (
                  <option value={item._id}>{item.title}</option>
                ))}
            </CSelect>
          </CFormGroup>
        </CCol>
        <CCol sm="6">
          <CFormGroup>
            <CLabel htmlFor="description">Description</CLabel>
            <CInput
              type="text"
              id="description"
              name="description"
              placeholder="Enter Partner's Description..."
              value={store.description}
              onChange={(e) => handleChange(e)}
            />
          </CFormGroup>
        </CCol>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="address">Address</CLabel>
              <CInput
                type="text"
                id="address"
                name="address"
                placeholder="Enter Partner's Address..."
                value={store.address}
                onChange={(e) => handleChange(e)}
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
        </CCol>
        <CCol sm="6">
          <UpFileImage
            productPictureElement={avatar}
            setProductPictureElement={setAvatar}
          />
        </CCol>
      </CRow>
    </CForm>
  );
}

export default Form;
