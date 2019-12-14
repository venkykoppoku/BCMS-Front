import * as React from "react";
import { FieldArray, Formik, Form } from "formik";
import * as yup from "yup";
import { Paper, Button, Dialog } from "@material-ui/core";
import { MFTextField, MFCheckbox } from "../../MaterialComponents";

export const EditUserForm = props => (
  <div className="AppContainer">
    <div style={{ color: "blue", textAlign: "center", fontSize: 30 }}>
      Edit Project
    </div>
    <Formik
      initialValues={props.values}
      onSubmit={(values, actions) => {
        props.onSubmit(values, actions);
      }}
    >
      {({ values }) => (
        <div className="container">
          <Paper>
            <Form>
              <MFTextField name="unit" type="text" />
              <MFTextField name="typeOfProject" type="text" />
              <MFTextField name="noofkeyresourcesneeded" type="number" />
              <MFTextField name="noOfPCsRequired" type="number" />
              <MFTextField
                name="anyProjectspecificSoftwareRequirement"
                type="text"
              />
              <MFTextField name="servicePriority" type="text" />
              <MFTextField name="recoveryTimelines" type="text" />
              <MFTextField name="primaryLocation" type="text" />
              <MFTextField name="relocationLocation" type="text" />
              <MFTextField name="primaryBuilding" type="text" />
              <MFTextField name="relocationBuilding" type="text" />
              <MFTextField name="keyContact" type="text" />
              <MFTextField name="backupKeyContact" type="text" />
              <MFTextField name="remarks" type="text" />
              <MFTextField name="dataReviewedBy" type="text" />
              <MFTextField name="shiftStartTime" type="text" />
              <MFCheckbox name="isWorkfromHomePossible" value={true} />
              <MFCheckbox name="eccAccomodationNeeded" value={true} />
              <MFTextField name="transportRequirements" type="text" />
              <div className="text">
                <strong>Critical Resources:</strong>
              </div>
              <div>
                <FieldArray name="resources">
                  {({ push, remove }) => (
                    <>
                      {values.resources.map((r, i) => (
                        <div key={r.id} className="fieldArray">
                          <MFTextField name={`resources[${i}].name`} />
                          <MFTextField name={`resources[${i}].contactNo`} />
                          <MFTextField name={`resources[${i}].address`} />
                          <MFTextField
                            name={`resources[${i}].resourceId`}
                            type="number"
                          />
                          <div>
                            <Button
                              variant="outlined"
                              color="secondary"
                              type="button"
                              onClick={() => remove(i)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={() =>
                          push({
                            id: "",
                            name: "",
                            contactNo: "",
                            address: ""
                          })
                        }
                      >
                        AddResource
                      </Button>
                      {/* {JSON.stringify(values.criticalResources, null, 2)} */}
                    </>
                  )}
                </FieldArray>
              </div>

              <br />
              <div className="footer-button">
                <Button color="primary" variant="contained" type="submit">
                  Submit
                </Button>
                <Button
                  className="add-button"
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => props.onClose("add user")}
                >
                  Close
                </Button>
              </div>
            </Form>
          </Paper>
        </div>
      )}
    </Formik>
  </div>
);

export const EditUserView = props => (
  <div className="dialog">
    <Dialog open={props.editUserOpen} onClose={props.handleCloseClick}>
      {props.editUserOpen && (
        <EditUserForm
          values={props.editUserData}
          onClose={props.handleCloseClick}
          onSubmit={props.handleEditUserSubmit}
        />
      )}
    </Dialog>
  </div>
);
