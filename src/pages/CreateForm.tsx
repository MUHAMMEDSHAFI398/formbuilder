import { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  FormControlLabel,
  Checkbox,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "react-toastify";

type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: string;
  options?: string; // for select & radio
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

export default function CreateForm() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formName, setFormName] = useState("");

  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type: "text",
        label: "New Field",
        required: false,
        defaultValue: "",
      },
    ]);
  };

  const updateField = (id: string, key: keyof FormField, value: any) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(fields);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setFields(reordered);
  };

  const openSaveDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const saveForm = () => {
    if (!formName.trim()) {
      alert("Please enter a form name");
      return;
    }

    const formData = {
      name: formName,
      fields: fields,
    };

    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    storedForms.push(formData);

    localStorage.setItem("forms", JSON.stringify(storedForms));

    console.log("Form saved:", formData);
    toast.success("Form saved successfully!");
    setIsDialogOpen(false);
    setFields([]);
    setFormName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Form</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        marginBottom: "8px",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      {/* Field Type */}
                      <Select
                        value={field.type}
                        onChange={(e) =>
                          updateField(
                            field.id,
                            "type",
                            e.target.value as FieldType
                          )
                        }
                        size="small"
                      >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="textarea">Textarea</MenuItem>
                        <MenuItem value="select">Select</MenuItem>
                        <MenuItem value="radio">Radio</MenuItem>
                        <MenuItem value="checkbox">Checkbox</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                      </Select>

                      {/* Label */}
                      <TextField
                        label="Label"
                        value={field.label}
                        onChange={(e) =>
                          updateField(field.id, "label", e.target.value)
                        }
                        size="small"
                      />

                      {/* Field-specific input */}
                      {field.type === "text" ||
                      field.type === "textarea" ||
                      field.type === "number" ? (
                        <TextField
                          label="Default"
                          value={field.defaultValue}
                          onChange={(e) =>
                            updateField(
                              field.id,
                              "defaultValue",
                              e.target.value
                            )
                          }
                          size="small"
                        />
                      ) : field.type === "select" || field.type === "radio" ? (
                        <TextField
                          label="Options (comma separated)"
                          value={field.options || ""}
                          onChange={(e) =>
                            updateField(field.id, "options", e.target.value)
                          }
                          size="small"
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      ) : field.type === "date" ? (
                        <TextField
                          label="Default Date"
                          type="date"
                          value={field.defaultValue || ""}
                          onChange={(e) =>
                            updateField(
                              field.id,
                              "defaultValue",
                              e.target.value
                            )
                          }
                          size="small"
                          InputLabelProps={{ shrink: true }}
                        />
                      ) : null}

                      {/* Required */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.required}
                            onChange={(e) =>
                              updateField(field.id, "required", e.target.checked)
                            }
                          />
                        }
                        label="Required"
                      />

                      {/* Extra validation for text/textarea */}
                      {(field.type === "text" || field.type === "textarea") && (
                        <>
                          <TextField
                            label="Min Length"
                            type="number"
                            value={field.minLength || ""}
                            onChange={(e) =>
                              updateField(
                                field.id,
                                "minLength",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                            size="small"
                            sx={{ width: "100px" }}
                          />
                          <TextField
                            label="Max Length"
                            type="number"
                            value={field.maxLength || ""}
                            onChange={(e) =>
                              updateField(
                                field.id,
                                "maxLength",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                            size="small"
                            sx={{ width: "100px" }}
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={field.isEmail || false}
                                onChange={(e) =>
                                  updateField(field.id, "isEmail", e.target.checked)
                                }
                              />
                            }
                            label="Email"
                          />
                        </>
                      )}

                      {/* Delete Button */}
                      <IconButton
                        color="error"
                        onClick={() => deleteField(field.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* Add Field Button at the Bottom */}
              <Button
                variant="contained"
                onClick={addField}
                sx={{ mt: 2, display: "block" }}
              >
                Add Field
              </Button>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {fields.length > 0 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={openSaveDialog}
          sx={{ mt: 2 }}
        >
          Save Form
        </Button>
      )}

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            type="text"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={saveForm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
