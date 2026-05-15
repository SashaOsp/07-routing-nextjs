import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface NoteFormValues {
  title: string;
  content: string;
  tag: Tag;
}

interface NoteFormProps {
  onClose: () => void;
}

const tags: Tag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),

  content: Yup.string().max(500, "Content must be at most 500 characters"),

  tag: Yup.string().oneOf(tags, "Invalid tag").required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      onClose();
      createNoteMutation.reset();
    },
  });

  const handleSubmit = (values: NoteFormValues) => {
    createNoteMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>

          <Field id="title" name="title" type="text" className={css.input} />

          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>

          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>

          <Field id="tag" name="tag" as="select" className={css.select}>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>

          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
