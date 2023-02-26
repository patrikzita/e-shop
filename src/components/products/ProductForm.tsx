import {
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createProduct, updateProduct } from "../../data/products";
import { OptionalProductsProps, ProductProps } from "./../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TYPES = [
  {
    value: "box",
  },
  {
    value: "booster",
  },
];

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
  imgUrl: Yup.string().required("Image is required"),
  type: Yup.string().oneOf(["booster", "box"]).required("Type is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required")
    .integer("Amount must be an integer")
    .positive("Amount must be a positive number"),
  description: Yup.string().required("Description is required"),
});

const defaultProps: OptionalProductsProps = {
  name: "",
  price: 0,
  imgUrl: "",
  discount: 0,
  type: "",
  amount: 0,
  description: "",
  id: null,
};
const ProductForm = ({
  name,
  price,
  imgUrl,
  discount,
  type,
  amount,
  description,
  id,
}: ProductProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", data.id], data);
      queryClient.invalidateQueries(["products"], { exact: true });
      navigate(`/products/${data.id}`);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", data.id], data);
      queryClient.invalidateQueries(["products"], { exact: true });
      navigate(`/products/${data.id}`);
    },
  });

  const createDataToSend = (values: ProductProps) => {
    const { name, price, discount, imgUrl, type, amount, description } = values;
    const dataToSend: ProductProps = {
      name,
      price,
      imgUrl,
      type,
      amount,
      description,
    };
    if (
      typeof discount === "string" &&
      !isNaN(parseFloat(discount)) &&
      parseInt(discount) !== 0
    ) {
      dataToSend.discount = parseInt(discount);
    }
    return dataToSend;
  };

  const handleFormSubmission = (values: ProductProps) => {
    if (id !== null) {
      updateProductMutation.mutate({
        id: id,
        ...createDataToSend(values),
      });
    } else {
      createProductMutation.mutate(createDataToSend(values));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Create new product</Typography>
      <Formik
        initialValues={{
          name: name,
          price: price,
          discount: discount,
          imgUrl: imgUrl,
          type: type,
          amount: amount,
          description: description,
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmission}
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
                component={InputField}
              />
              <Field name="price" label="Price" component={InputField} />

              <Field name="discount" label="Discount" component={InputField} />
              <Field name="imgUrl" label="Image" component={InputField} />

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

              <Field name="amount" label="Amount" component={InputField} />

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
                  {id ? "Update" : "Create"}
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

ProductForm.defaultProps = defaultProps; //nastavení default props, když nejsou data předány
export default ProductForm;
