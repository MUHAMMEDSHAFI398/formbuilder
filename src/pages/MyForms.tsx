import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPreviewForm } from '../store/previewSlice';
import { useNavigate } from 'react-router-dom';

interface FormSchema {
  name: string;
  fields: any[];
}

export default function MyForms() {

 const [forms, setForms] = useState<FormSchema[]>([]);
 const dispatch = useDispatch()
 const navigate = useNavigate()

  useEffect(() => {
    const getForms = (): FormSchema[] => {
      const stored = localStorage.getItem("forms");
      if (!stored) return [];
      return JSON.parse(stored) as FormSchema[];
    };

    const savedForms = getForms();
    setForms(savedForms);
  }, []);

  const onViewClick = (form:any) => {
     dispatch(setPreviewForm(form))
     navigate("/preview")
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {forms.map((form, index) => (
          <Card key={index} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {form.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={()=>onViewClick(form)} size="small" variant="contained">
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}