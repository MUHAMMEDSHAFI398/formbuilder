import { Typography, Paper, Box, TextField, Button, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PreviewForm() {
  const form = useSelector((state: any) => state?.preview);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  console.log(form)

  if (!form) {
    return <Typography>No form selected</Typography>;
  }

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submission:", formData);
    // Save to localStorage or send to API here
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
            {/* Text & Textarea */}
            {(field.type === "text" || field.type === "textarea") && (
              <TextField
                label={field.label}
                fullWidth
                required={field.required}
                multiline={field.type === "textarea"}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {/* Number */}
            {field.type === "number" && (
              <TextField
                label={field.label}
                type="number"
                fullWidth
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {/* Date */}
            {field.type === "date" && (
              <TextField
                label={field.label}
                type="date"
                fullWidth
                required={field.required}
                InputLabelProps={{ shrink: true }}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              />
            )}

            {/* Checkbox */}
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

            {/* Select */}
            {field.type === "select" && (
              <TextField
                select
                label={field.label}
                fullWidth
                required={field.required}
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                {field?.options?.split(",").map((option: string, index: number) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {/* Radio */}
            {field.type === "radio" && (
              <RadioGroup
                value={formData[field.id] || ""}
                onChange={(e) => handleChange(field.id, e.target.value)}
              >
                {field?.options?.split(",").map((option: string, index: number) => (
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
