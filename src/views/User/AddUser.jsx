import * as React from "react";
import * as yup from "yup";
import { FieldArray, Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import { MFTextField, MFCheckbox } from "../../MaterialComponents";

import { Paper } from "@material-ui/core";

// export const UserFormSchema = yup.object({
//     email: yup
//         .string()
//         .required('Email Required')
//         .email('Email Not Valid'),
//     password: yup.string().required('Password Required'),
//     roles: yup.array(yup.string()),
//     role: yup.string().required('Role Required'),
// })

export const respJson = (res, actions) => {
  if (res.ok) {
    actions.setSubmitting(false);
    actions.resetForm({
      name: "",
      mealType: "",
      description: "",
      imageUrl: "",
      price: 0.0,
      items: ""
    });
    return res;
  } else {
    throw res;
  }
};

export const handleSubmit = async (values, actions) => {
  const res = await fetch(`http://192.168.1.77:4001/user`, {
    body: JSON.stringify(values),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  respJson(res, actions);
};

export const AddUserForm = props => (
  <div className="AppContainer">
    <div style={{ color: "blue", textAlign: "center", fontSize: 30 }}>
      Add Project
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
                          <MFTextField name={`criticalResources[${i}].name`} />
                          <MFTextField
                            name={`criticalResources[${i}].contactNo`}
                          />
                          <MFTextField
                            name={`criticalResources[${i}].address`}
                          />
                          <MFTextField
                            name={`criticalResources[${i}].resourceId`}
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

export const AddUserView = props => {
  return (
    <div className="dialog">
      <Dialog
        variant="contained"
        open={props.addUserOpen}
        onClose={props.handleCloseClick}
      >
        <AddUserForm
          values={props.addUserData}
          onSubmit={props.handleAddUserSubmit}
          onClose={props.handleCloseClick}
        />
      </Dialog>
    </div>
  );
};
