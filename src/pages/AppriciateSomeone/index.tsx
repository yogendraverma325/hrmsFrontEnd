import Choices from 'choices.js';
import { Field, Form, Formik, FormikProps } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppriciateSomeone } from '../../queries/mainQueries';
import { RootState } from '../../redux/reducers';
import { formValidation, formValues } from './helper';

const AppriciateSomeone: React.FC<any> = () => {
  const appriciateMutation = useAppriciateSomeone();
  const { isActive } = useSelector((store: RootState) => store.utils);
  const userData = JSON.parse(localStorage.getItem('userData') as string);

  useEffect(() => {
    // JavaScript code goes here

    // eslint-disable-next-line no-var
    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
      removeItemButton: true,
      maxItemCount: 5,
      searchResultLimit: 5,
      renderChoiceLimit: 5,
    });
  }, [isActive]);

  const appriciationList = [
    { name: 'Dimoand', asset: '/src/assets/images/diamond.png', category: 'diamond' },
    { name: 'Platinum', asset: '/src/assets/images/platinum.png', category: 'pantium' },
    { name: 'Gold', asset: '/src/assets/images/gold.png', category: 'gold' },
    { name: 'Silver', asset: '/src/assets/images/silver.png', category: 'silver' },
  ];

  const handleUserSubmit = async (values: any, helpers: any) => {
    try {
      const status = await appriciateMutation.mutateAsync({
        ...values,
        senderName: userData?.Full_Name,
        senderTmc: userData?.TMC,
        receverTmc: userData?.TMC,
      });
      // successful, perform any necessary actions
      console.log('<< FORM VALUES>>', values);
    } catch (err) {
      console.log('<< Error >>', err);
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: 'any Invalid message' });
      helpers.setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade appreciation-form"
      id="appreciateSomeoneModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close close-modal-btn"
              data-dismiss="modal"
              aria-label="Close"
              style={{ all: 'unset' }}
            >
              <i
                className="close close-modal-btn las la-times"
                data-dismiss="modal"
                aria-label="Close"
              ></i>
            </button>
            <p className="welcome-phrase text-center">
              Welcome, <span>Prince Singh</span>
            </p>
            <p className="text-center recog-heading">Recognition/Appreciation Form</p>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={formValues}
              validationSchema={formValidation}
              onSubmit={handleUserSubmit}
              validateOnChange
            >
              {(props: FormikProps<any>) => (
                <Form>
                  <div className="member-info d-flex justify-content-center align-items-center">
                    <Field name="receverName" type="text" placeholder="Member Name.." />
                  </div>

                  <div className="appreciation-category-area">
                    <p className="cat-head">Appreciation Category</p>

                    <div className="categories-shield">
                      <div className="row shield-row">
                        {appriciationList.map((item) => (
                          <div
                            aria-hidden="true"
                            key={item.name}
                            className="col"
                            onClick={() =>
                              props.setFieldValue('appriciationCategory', item.category)
                            }
                          >
                            <div className="img-wrpp d-flex justify-content-center">
                              <img alt="img_assets" src={item.asset} />
                            </div>
                            <p className="text-center name-of-shield">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="send-to-all">
                    {/* <input type="checkbox" checked data-toggle="toggle" /> */}
                    <div className="d-flex justify-content-center">
                      <p className="text-center snd-to-all-txt m-0">
                        Send communication to all employees?
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div
                        className="form-check form-switch"
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Field
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          style={{ height: '1.3rem', width: '2.8rem' }}
                          name="send_to_all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="cc-area">
                    <div className="d-flex justify-content-center my-2">
                      <div className="col-md-10">
                        <Field
                          disable={props.values.send_to_all}
                          name="cc_targets"
                          component="select"
                          id="choices-multiple-remove-button"
                          placeholder="CC List"
                          multiple
                        >
                          <option value="chetna.pandey">chetna.pandey</option>
                          <option value="archi.jain">archi.jain</option>
                          <option value="ankit.singh">ankit.singh</option>
                          <option value="prince.singh">prince.singh</option>
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="appreciation-text-area p-4">
                    <Field
                      component="textarea"
                      className="form-control"
                      id="giveAppreciation"
                      rows={2}
                      name="message"
                      placeholder="Type few words of Appreciation here.."
                    />
                  </div>

                  <div className="submit-area">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        style={{ border: 'none' }}
                        type="submit"
                        className="sbmt-btn"
                        data-toggle="modal"
                      >
                        <p className="p-0 m-0">
                          <span>
                            <img
                              alt="img_assets"
                              src="/src/assets/images/high-quality.png"
                            />
                          </span>
                          SUBMIT
                        </p>
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppriciateSomeone;
