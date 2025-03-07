"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Tag, Upload, Form } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, FileOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { tenantService, TenantType } from '@/services/tenant.service';
import { TenantForm } from './TenantForm';

export const TenantTable: React.FC = () => {
    const [tenants, setTenants] = useState<TenantType[]>([]);
    const [loading, setLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<TenantType | undefined>();
    const [convertToContractVisible, setConvertToContractVisible] = useState(false);
    const [convertFormData] = Form.useForm();

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

    const handleEdit = async (tenant: TenantType) => {
        try {
            if (tenant.id) {
                const updatedTenant = await tenantService.getById(tenant.id);
                setSelectedTenant(updatedTenant);
                setFormVisible(true);
            }
        } catch (error) {
            console.error('Error fetching tenant details:', error);
            message.error('Error loading tenant details');
        }
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

    const handleCancelReservation = (tenant: TenantType) => {
        Modal.confirm({
            title: 'Cancel Reservation',
            content: `Are you sure you want to cancel the reservation for ${tenant.fullName}?`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    if (tenant.id) {
                        await tenantService.cancelReservation(tenant.id);
                        message.success('Reservation cancelled successfully');
                        fetchTenants();
                    }
                } catch (error) {
                    console.error('Error cancelling reservation:', error);
                    message.error('Error cancelling reservation');
                }
            },
        });
    };

    const handleMakeContract = (tenant: TenantType) => {
        setSelectedTenant(tenant);
        setConvertToContractVisible(true);
    };

    const handleConvertToContract = async () => {
        try {
            const values = await convertFormData.validateFields();
            if (!selectedTenant?.id) return;

            const formData = new FormData();
            if (values.document?.[0]?.originFileObj) {
                formData.append('document', values.document[0].originFileObj);
            }

            await tenantService.convertToContract(selectedTenant.id, formData);
            message.success('Successfully converted to contract');
            setConvertToContractVisible(false);
            convertFormData.resetFields();
            fetchTenants();
        } catch (error) {
            console.error('Error converting to contract:', error);
            message.error('Error converting to contract');
        }
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
                <Space wrap>
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
                    {record.tenantType === 'R' && (
                        <>
                            <Button
                                onClick={() => handleMakeContract(record)}
                                type="primary"
                            >
                                Make Contract
                            </Button>
                            <Button
                                onClick={() => handleCancelReservation(record)}
                                danger
                            >
                                Cancel Reservation
                            </Button>
                        </>
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

            <Modal
                title="Convert to Contract"
                open={convertToContractVisible}
                onOk={handleConvertToContract}
                onCancel={() => {
                    setConvertToContractVisible(false);
                    convertFormData.resetFields();
                }}
            >
                <Form form={convertFormData} layout="vertical">
                    <Form.Item
                        name="document"
                        label="Contract Document"
                        rules={[{ required: true, message: 'Please upload contract document' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                        }}
                    >
                        <Upload maxCount={1} beforeUpload={() => false} accept=".doc,.docx">
                            <Button icon={<UploadOutlined />}>Upload Contract</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
