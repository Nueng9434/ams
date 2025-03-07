import api from './api';

export interface TenantType {
    id?: number;
    title: string;
    fullName: string;
    phoneNumber: string;
    address: string;
    idCardNumber: string;
    documentPath?: string;
    tenantType: 'R' | 'C';
    profileImage?: string;
    reservationStartDate?: Date;
    reservationEndDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export const tenantService = {
    getAll: async () => {
        const response = await api.get('/tenants');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get(`/tenants/${id}`);
        return response.data;
    },

    create: async (data: FormData) => {
        const response = await api.post('/tenants', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    update: async (id: number, data: FormData) => {
        const response = await api.put(`/tenants/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    delete: async (id: number) => {
        await api.delete(`/tenants/${id}`);
    },

    downloadDocument: async (id: number) => {
        const response = await api.get(`/tenants/${id}/document`, {
            responseType: 'blob'
        });
        
        // Create a temporary URL for the blob and trigger download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        // Get filename from Content-Disposition header or use default
        const contentDisposition = response.headers['content-disposition'];
        const filename = contentDisposition 
            ? contentDisposition.split('filename=')[1].replace(/"/g, '')
            : 'document.doc';
        
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
};
