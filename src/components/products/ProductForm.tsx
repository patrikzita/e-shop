import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik, Field } from "formik";
import FieldCustom from "./FieldCustom";

const TYPES = [
  {
    value: "box",
  },
  {
    value: "booster",
  },
];

interface Values {
  name: string;
  price: number;
  discount: number;
  image: string;
  type: string;
  amount: number;
  description: string;
}

const ProductForm = () => {
  const handleSubmit = ({
    name,
    price,
    discount,
    image,
    type,
    amount,
    description,
  }: Values) => {};

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Create new product</Typography>
      <Formik
        initialValues={{
          name: "",
          price: 0,
          discount: 0,
          image: "",
          type: "",
          amount: 0,
          description: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
            >
              <div>
                <Field name="name" label="Name" component={FieldCustom} />
                <Field name="price" label="Price" component={FieldCustom} />
              </div>
              <div>
                <Field
                  name="discount"
                  label="Discount"
                  component={FieldCustom}
                />
                <Field name="image" label="Image" component={FieldCustom} />
              </div>
              <div>
                {/* TODO: udělat type jako select */}
                <Field name="type" label="Type" component={FieldCustom} />
                <Field name="amount" label="Amount" component={FieldCustom} />
              </div>
              <div>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={5}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ProductForm;
