import {
  Button,
  Container,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik, Field, ErrorMessage } from "formik";
import FieldCustom from "./FieldCustom";

import * as Yup from "yup";
import { createProduct } from "../../data/products";
import { useNavigate } from "react-router-dom";

const TYPES = [
  {
    value: "box",
  },
  {
    value: "booster",
  },
];

export interface Values {
  name: string;
  price: number;
  discount?: number;
  image: string;
  type: string;
  amount: number;
  description: string;
  promotions?: boolean;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .integer("Discount must be an integer")
    .min(0, "Discount can't be negative"),
  image: Yup.string().required("Image is required"),
  type: Yup.string().required("Type is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .integer("Amount must be an integer")
    .positive("Amount must be a positive number"),
  description: Yup.string().required("Description is required"),
});

const ProductForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: Values) => {
    const { name, price, discount, image, type, amount, description } = values;
    const dataToSend: Values = {
      name,
      price,
      image,
      type,
      amount,
      description,
    };

    if (typeof discount === "number" && !isNaN(discount)) {
      dataToSend.discount = discount;
    }
    try {
      const createdProduct = await createProduct(dataToSend);
      navigate(`/products/${createdProduct.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Create new product</Typography>
      <Formik
        initialValues={{
          name: "",
          price: 1,
          discount: 0,
          image: "",
          type: "",
          amount: 1,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: {
                  xs: "center",
                  sm: "flex-start",
                  md: "flex-start",
                },
                "& .MuiTextField-root": {
                  m: 2,
                  width: { xs: "35ch", sm: "80%" },
                },
              }}
            >
              <Field
                name="name"
                label="Name"
                error={!!errors.name}
                component={FieldCustom}
              />
              <Field name="price" label="Price" component={FieldCustom} />

              <Field name="discount" label="Discount" component={FieldCustom} />
              <Field name="image" label="Image" component={FieldCustom} />

              <Field
                name="type"
                as={TextField}
                select
                label="Type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.type && !!errors.type}
                helperText={touched.type && errors.type}
              >
                {TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.value}
                  </MenuItem>
                ))}
              </Field>

              <Field name="amount" label="Amount" component={FieldCustom} />

              <TextField
                name="description"
                label="Description"
                multiline
                rows={5}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && !!errors.description}
                helperText={touched.description && errors.description}
              />
              <Stack direction="row" gap={2}>
                <Button type="submit" variant="contained" color="secondary">
                  Create
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProductForm;
