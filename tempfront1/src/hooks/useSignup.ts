import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const instance = axios.create({
  baseURL: '/api/v1/users',
});

export const useSignup = () => {};
