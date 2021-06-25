import React from "react";
import { Field } from "redux-form";
import styles from "./FormsControle.module.css";

//...props - деструктуризация - в props остается все (все остальное), кроме input, meta, child
export const FormControl = ({ input, meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      {" "}
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

// export const Textarea = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div>
//       <div
//         className={styles.formControl + " " + (hasError ? styles.error : "")}
//       >
//         <textarea {...props} {...input}></textarea>
//       </div>
//       {hasError && <span>{meta.error}</span>}
//     </div>
//   );
// };

export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}>
      {" "}
      <input {...input} {...restProps}></input>
    </FormControl>
  );
};

// export const Input = ({ input, meta, ...props }) => {
//   const hasError = meta.touched && meta.error;
//   return (
//     <div>
//       <div
//         className={styles.formControl + " " + (hasError ? styles.error : "")}
//       >
//         <input {...props} {...input}></input>
//       </div>
//       {hasError && <span>{meta.error}</span>}
//     </div>
//   );
// };

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props = {},
  text = ""
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
};
