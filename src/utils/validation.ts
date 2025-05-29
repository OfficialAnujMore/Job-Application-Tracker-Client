import * as yup from 'yup';
import { ApplicationStatus, applicationStatuses, dropdownStatuses } from '../types/application';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, 'Name should be at least 2 characters')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const applicationSchema = yup.object({
  companyName: yup
    .string()
    .required('Company name is required')
    .min(2, 'Company name should be at least 2 characters'),
  jobTitle: yup
    .string()
    .required('Job title is required')
    .min(2, 'Job title should be at least 2 characters'),
  jobType: yup
    .string()
    .required('Job type is required'),
  location: yup
    .string()
    .required('Location is required'),
  dateApplied: yup
    .date()
    .required('Date applied is required')
    .max(new Date(), 'Date cannot be in the future'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(dropdownStatuses, 'Invalid status'),
  applicationUrl: yup
    .string()
    .url('Must be a valid URL')
    .nullable(),
  meetingUrls: yup
    .array()
    .of(
      yup
        .string()
        .url('Must be a valid URL')
        .nullable()
    ),
  notes: yup
    .string()
    .nullable(),
});

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidDate = (date: string): boolean => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const isValidStatus = (status: string): status is ApplicationStatus => {
  return applicationStatuses.includes(status as ApplicationStatus);
}; 