import * as Yup from 'yup';

const formValidation = Yup.object().shape({
  receverName: Yup.string(),
  appriciationCategory: Yup.string(),
  send_to_all: Yup.bool(),
  cc_targets: Yup.array(),
  message: Yup.string(),
});

const formValues = {
  receverName: '',
  appriciationCategory: '',
  send_to_all: '',
  cc_targets: '',
  message: '',
};

export { formValidation, formValues };
