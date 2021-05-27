import React from "react";
import {
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CRow,
  CCardFooter,
  CSelect,
  CTextarea,
  CValidFeedback,
  CInvalidFeedback,
} from "@coreui/react";

function CouponForm({ coupon, handleChangeInput }) {
  return (
    <CForm>
      <CRow>
        <CCol sm="6">
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="phone">Coupon's Name</CLabel>
              <CInput
                type="text"
                name="name"
                value={coupon.name}
                onChange={(e) => handleChangeInput(e)}
                required
                placeholder="Enter Coupon's Name..."
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>
          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="phone">Coupon's Code</CLabel>
              <CInput
                type="text"
                name="code"
                value={coupon.code}
                onChange={(e) => handleChangeInput(e)}
                required
                placeholder="Enter Coupon's Code..."
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
              <CLabel htmlFor="phone">Coupon's Quantity</CLabel>
              <CInput
                type="number"
                name="quantity"
                value={coupon.quantity}
                onChange={(e) => handleChangeInput(e)}
                min={0}
                required
                placeholder="Enter Coupon's Quantity..."
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>

          <CForm className="was-validated">
            <CFormGroup>
              <CLabel htmlFor="phone">Coupon's Discount</CLabel>
              <CInput
                type="number"
                name="discount"
                value={coupon.discount}
                onChange={(e) => handleChangeInput(e)}
                min={0}
                max={100}
                required
                placeholder="Enter Coupon's Discount..."
              />
              <CInvalidFeedback className="help-block">
                Please provide a valid information
              </CInvalidFeedback>
              <CValidFeedback className="help-block">
                Input provided
              </CValidFeedback>
            </CFormGroup>
          </CForm>

          {/* 
                    <CFormGroup>
                      <CLabel htmlFor="name">Salon Apply</CLabel>
                      <CSelect custom name="salonApply" id="salonApply">
                        <option>...</option>
                        <option>All Salons</option>
                      </CSelect>
                      
                    </CFormGroup>
                    <CForm className="was-validated">
                    </CForm>
                    <CFormGroup>
                      <CLabel htmlFor="dateExpired">Date Expired</CLabel>
                      <CInput type="date" id="dateExpired" name="dateExpired" />
                      
                    </CFormGroup> */}
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="12">
          <CFormGroup>
            <CLabel htmlFor="address">Description</CLabel>
            <CTextarea
              type="text"
              name="description"
              value={coupon.description}
              onChange={(e) => handleChangeInput(e)}
              placeholder="Enter Coupon's Description..."
            />
            <CFormText className="help-block">
              Please enter coupon's description
            </CFormText>
          </CFormGroup>
        </CCol>
      </CRow>
    </CForm>
  );
}

export default CouponForm;
