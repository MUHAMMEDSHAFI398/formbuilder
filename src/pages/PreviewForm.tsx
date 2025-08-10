import {
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function PreviewForm() {
  const form = useSelector((state:any) => state?.preview);

  console.log(form)

  if (!form) {
    return <Typography>No form selected</Typography>;
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        {form.previewForm.name}
      </Typography>

      {form.previewForm.fields.map((field: any) => (
        <Box
          key={field.id}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {field.label} {field.required && "*"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {field.type === "checkbox"
              ? field.defaultValue
                ? "Checked"
                : "Unchecked"
              : field.defaultValue || "—"}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
}
