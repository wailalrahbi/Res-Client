import * as yup from "yup"; //import all from the yup

export const productSchemaValidation = yup.object().shape({
  name: yup.string().required("Name of the product is required"),
  price: yup
    .string()
    .required("Price is required"),
  
    pic: yup.string().required("Link of the  products picture is required"),

});
