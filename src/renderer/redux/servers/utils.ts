import * as Yup from 'yup';

export const ServerYupSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  ip: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  port: Yup.number().required('Required'),
  selfHosted: Yup.boolean().required('Required'),
  rootPath: Yup.string().when('selfHosted', {
    is: true,
    then: Yup.string().required(
      'Self hosted servers need a root folder defined.'
    ),
    otherwise: Yup.string().notRequired()
  })
});
