import {
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PreviewForm() {
  const form = useSelector((state: any) => state?.preview);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!form) {
    return <Typography>No form selected</Typography>;
  }

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error as user types
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    form.previewForm.fields.forEach((field: any) => {
      const value = formData[field.id];

      // 1. Required validation
      if (field.required && (value === undefined || value === "" || value === false)) {
        newErrors[field.id] = `${field.label} is required`;
        return; // skip other checks if required fails
      }

      // 2. MinLength & MaxLength (only for text & textarea)
      if ((field.type === "text" || field.type === "textarea") && typeof value === "string") {
        if (field.minLength && value.length < field.minLength) {
          newErrors[field.id] = `${field.label} must be at least ${field.minLength} characters`;
        }
        if (field.maxLength && value.length > field.maxLength) {
          newErrors[field.id] = `${field.label} must be at most ${field.maxLength} characters`;
        }
      }

      // 3. Email format check (only if isEmail = true)
      if (
        (field.type === "text" || field.type === "textarea") &&
        field.isEmail &&
        value
      ) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.id] = `${field.label} must be a valid email`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log("Submission:", formData);
      toast.success("Form saved successfully!");
      setFormData({});
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start", p: 2 }}>
      {/* Left: Preview Form */}
      <Paper sx={{ p: 3, width: "50%" }}>
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

      {/* Right: Data Entry */}
      <Paper sx={{ p: 3, width: "50%" }}>
        <Typography variant="h5" gutterBottom>
          Add Submission
        </Typography>

        {form.previewForm.fields.map((field: any) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            {(field.type === "text" || field.type === "textarea") && (
              <TextField
                label={field.label}
                fullWidth
                required={field.required}
                multiline={field.type === "textarea"}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              />
            )}

            {field.type === "number" && (
              <TextField
                label={field.label}
                type="number"
                fullWidth
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              />
            )}

            {field.type === "date" && (
              <TextField
                label={field.label}
                type="date"
                fullWidth
                required={field.required}
                InputLabelProps={{ shrink: true }}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              />
            )}

            {field.type === "checkbox" && (
              <FormControlLabel
                control={
                  <input
                    type="checkbox"
                    checked={formData[field.id] || false}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                  />
                }
                label={field.label}
              />
            )}

            {field.type === "select" && (
              <TextField
                select
                label={field.label}
                fullWidth
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
              >
                {field?.options
                  ?.split(",")
                  .map((option: string, index: number) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
            )}

            {field.type === "radio" && (
              <RadioGroup
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                {field?.options
                  ?.split(",")
                  .map((option: string, index: number) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
              </RadioGroup>
            )}
          </Box>
        ))}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Submission
        </Button>
      </Paper>
    </Box>
  );
}
