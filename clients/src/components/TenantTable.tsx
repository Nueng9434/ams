"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { tenantService, TenantType } from '@/services/tenant.service';
import { TenantForm } from './TenantForm';

export const TenantTable: React.FC = () => {
    const [tenants, setTenants] = useState<TenantType[]>([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<TenantType | undefined>();

    const fetchTenants = async () => {
        try {
            setLoading(true);
            const data = await tenantService.getAll();
            setTenants(data);
        } catch (error) {
            console.error('Error fetching tenants:', error);
            message.error('Error fetching tenants');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    const handleEdit = (tenant: TenantType) => {
        setSelectedTenant(tenant);
        setFormVisible(true);
    };

    const handleDelete = (tenant: TenantType) => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: `Are you sure you want to delete ${tenant.fullName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    if (tenant.id) {
                        await tenantService.delete(tenant.id);
                        message.success('Tenant deleted successfully');
                        fetchTenants();
                    }
                } catch (error) {
                    console.error('Error deleting tenant:', error);
                    message.error('Error deleting tenant');
                }
            },
        });
    };

    const handleDownloadDocument = async (tenant: TenantType) => {
        try {
            if (tenant.id) {
                await tenantService.downloadDocument(tenant.id);
            }
        } catch (error) {
            console.error('Error downloading document:', error);
            message.error('Error downloading document');
        }
    };

    const columns: ColumnsType<TenantType> = [
        {
            title: 'Profile',
            dataIndex: 'profileImage',
            key: 'profileImage',
            width: 80,
            render: (profileImage: string) => (
                profileImage ? (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">N/A</span>
                    </div>
                )
            )
        },
        {
            title: 'Name',
            key: 'name',
            render: (_, record) => `${record.title} ${record.fullName}`
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Type',
            dataIndex: 'tenantType',
            key: 'tenantType',
            render: (type: 'R' | 'C') => (
                <Tag color={type === 'R' ? 'blue' : 'green'}>
                    {type === 'R' ? 'Reservation' : 'Contract'}
                </Tag>
            ),
        },
        {
            title: 'Reservation Dates',
            key: 'reservationDates',
            render: (_, record) => {
                if (record.tenantType === 'R' && record.reservationStartDate && record.reservationEndDate) {
                    return (
                        <div className="text-sm">
                            <div>{dayjs(record.reservationStartDate).format('DD/MM/YYYY')}</div>
                            <div>to</div>
                            <div>{dayjs(record.reservationEndDate).format('DD/MM/YYYY')}</div>
                        </div>
                    );
                }
                return '-';
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                    />
                    {record.documentPath && (
                        <Button 
                            icon={<FileOutlined />}
                            onClick={() => handleDownloadDocument(record)}
                        />
                    )}
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger
                        onClick={() => handleDelete(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Tenant Management</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedTenant(undefined);
                        setFormVisible(true);
                    }}
                >
                    Add Tenant
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={tenants}
                rowKey="id"
                loading={loading}
            />

            <TenantForm
                visible={formVisible}
                onClose={() => {
                    setFormVisible(false);
                    setSelectedTenant(undefined);
                }}
                onSuccess={() => {
                    fetchTenants();
                    setFormVisible(false);
                    setSelectedTenant(undefined);
                }}
                initialData={selectedTenant}
            />
        </div>
    );
};
