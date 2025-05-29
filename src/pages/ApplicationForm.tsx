import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container,
  Typography,
  Grid,
  MenuItem,
  Box,
} from '@mui/material';
import { applications } from '../services/api';
import { ApplicationStatus, applicationStatuses } from '../types/application';
import { applicationSchema } from '../utils/validation';
import { JOB_TYPES } from '../utils/constants';
import { layoutStyles, componentStyles } from '../utils/styles';
import { textStyles } from '../theme/text';
import Card from '../components/common/Card';
import TextField from '../components/common/TextField';
import Button from '../components/common/Button';

interface ApplicationFormValues {
  companyName: string;
  jobTitle: string;
  jobType: string;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
  applicationUrl?: string;
  meetingUrls?: string[];
  notes?: string;
}

const ApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<ApplicationFormValues>({
    initialValues: {
      companyName: '',
      jobTitle: '',
      jobType: JOB_TYPES[0],
      location: '',
      dateApplied: new Date().toISOString().split('T')[0],
      status: applicationStatuses[0],
      applicationUrl: '',
      meetingUrls: [''],
      notes: '',
    },
    validationSchema: applicationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        if (id) {
          await applications.update(id, values);
        } else {
          await applications.create(values);
        }
        navigate('/');
      } catch (error) {
        console.error('Failed to save application:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchApplication = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await applications.getAll();
          const application = data.find((app) => app._id === id);
          if (application) {
            formik.setValues({
              ...application,
              dateApplied: new Date(application.dateApplied)
                .toISOString()
                .split('T')[0],
            });
          }
        } catch (error) {
          console.error('Failed to fetch application:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplication();
  }, [id]);

  return (
    <Box sx={layoutStyles.page}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography sx={textStyles.pageTitle}>
            {id ? 'Edit Application' : 'Add New Application'}
          </Typography>
          <Typography sx={textStyles.pageSubtitle}>
            {id ? 'Update your job application details' : 'Track a new job application'}
          </Typography>
        </Box>

        <Card>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              p: { xs: 2, sm: 3 },
              ...componentStyles.form,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="jobTitle"
                  name="jobTitle"
                  label="Job Title"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                  helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="jobType"
                  name="jobType"
                  label="Job Type"
                  select
                  value={formik.values.jobType}
                  onChange={formik.handleChange}
                  error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                  helperText={formik.touched.jobType && formik.errors.jobType}
                >
                  {JOB_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="status"
                  name="status"
                  label="Status"
                  select
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  {applicationStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={formik.touched.location && Boolean(formik.errors.location)}
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dateApplied"
                  name="dateApplied"
                  label="Date Applied"
                  type="date"
                  value={formik.values.dateApplied}
                  onChange={formik.handleChange}
                  error={formik.touched.dateApplied && Boolean(formik.errors.dateApplied)}
                  helperText={formik.touched.dateApplied && formik.errors.dateApplied}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="applicationUrl"
                  name="applicationUrl"
                  label="Application URL"
                  value={formik.values.applicationUrl}
                  onChange={formik.handleChange}
                  error={formik.touched.applicationUrl && Boolean(formik.errors.applicationUrl)}
                  helperText={formik.touched.applicationUrl && formik.errors.applicationUrl}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="notes"
                  name="notes"
                  label="Notes"
                  multiline
                  rows={4}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  {loading ? 'Saving...' : id ? 'Update Application' : 'Add Application'}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/')}
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ApplicationForm; 