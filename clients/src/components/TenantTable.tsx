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
            message.error('เกิดข้อผิดพลาดในการดึงข้อมูล');
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
            message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล');
        }
    };

    const handleDelete = (tenant: TenantType) => {
        Modal.confirm({
            title: 'ยืนยันการลบ',
            content: `คุณต้องการลบข้อมูลของ ${tenant.fullName} ใช่หรือไม่?`,
            okText: 'ใช่',
            okType: 'danger',
            cancelText: 'ไม่',
            onOk: async () => {
                try {
                    if (tenant.id) {
                        await tenantService.delete(tenant.id);
                        message.success('ลบข้อมูลสำเร็จ');
                        fetchTenants();
                    }
                } catch (error) {
                    console.error('Error deleting tenant:', error);
                    message.error('เกิดข้อผิดพลาดในการลบข้อมูล');
                }
            },
        });
    };

    const handleCancelReservation = (tenant: TenantType) => {
        Modal.confirm({
            title: 'ยกเลิกการจอง',
            content: `คุณต้องการยกเลิกการจองของ ${tenant.fullName} ใช่หรือไม่?`,
            okText: 'ใช่',
            okType: 'danger',
            cancelText: 'ไม่',
            onOk: async () => {
                try {
                    if (tenant.id) {
                        await tenantService.cancelReservation(tenant.id);
                        message.success('ยกเลิกการจองสำเร็จ');
                        fetchTenants();
                    }
                } catch (error) {
                    console.error('Error cancelling reservation:', error);
                    message.error('เกิดข้อผิดพลาดในการยกเลิกการจอง');
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
            message.success('แปลงเป็นสัญญาสำเร็จ');
            setConvertToContractVisible(false);
            convertFormData.resetFields();
            fetchTenants();
        } catch (error) {
            console.error('Error converting to contract:', error);
            message.error('เกิดข้อผิดพลาดในการแปลงเป็นสัญญา');
        }
    };

    const handleDownloadDocument = async (tenant: TenantType) => {
        try {
            if (tenant.id) {
                await tenantService.downloadDocument(tenant.id);
            }
        } catch (error) {
            console.error('Error downloading document:', error);
            message.error('เกิดข้อผิดพลาดในการดาวน์โหลดเอกสาร');
        }
    };

    const columns: ColumnsType<TenantType> = [
        {
            title: 'รูปโปรไฟล์',
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
            title: 'ชื่อ-นามสกุล',
            key: 'name',
            render: (_, record) => `${record.title} ${record.fullName}`
        },
        {
            title: 'เบอร์โทรศัพท์',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'ประเภท',
            dataIndex: 'tenantType',
            key: 'tenantType',
            render: (type: 'R' | 'C') => (
                <Tag color={type === 'R' ? 'blue' : 'green'}>
                    {type === 'R' ? 'จองห้องพัก' : 'ทำสัญญา'}
                </Tag>
            ),
        },
        {
            title: 'ระยะเวลาการจอง',
            key: 'reservationDates',
            render: (_, record) => {
                if (record.tenantType === 'R' && record.reservationStartDate && record.reservationEndDate) {
                    return (
                        <div className="text-sm">
                            <div>{dayjs(record.reservationStartDate).format('DD/MM/YYYY')}</div>
                            <div>ถึง</div>
                            <div>{dayjs(record.reservationEndDate).format('DD/MM/YYYY')}</div>
                        </div>
                    );
                }
                return '-';
            },
        },
        {
            title: 'จัดการ',
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
                                ทำสัญญา
                            </Button>
                            <Button
                                onClick={() => handleCancelReservation(record)}
                                danger
                            >
                                ยกเลิกการจอง
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
                <h1 className="text-2xl font-semibold">จัดการผู้เช่า</h1>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedTenant(undefined);
                        setFormVisible(true);
                    }}
                >
                    เพิ่มผู้เช่า
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
                title="แปลงเป็นสัญญา"
                open={convertToContractVisible}
                onOk={handleConvertToContract}
                onCancel={() => {
                    setConvertToContractVisible(false);
                    convertFormData.resetFields();
                }}
                okText="บันทึก"
                cancelText="ยกเลิก"
                maskClosable={false}
            >
                <Form form={convertFormData} layout="vertical">
                    <Form.Item
                        name="document"
                        label="เอกสารสัญญา"
                        rules={[{ required: true, message: 'กรุณาอัปโหลดเอกสารสัญญา' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e: UploadChangeParam) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                        }}
                    >
                        <Upload maxCount={1} beforeUpload={() => false} accept=".doc,.docx">
                            <Button icon={<UploadOutlined />}>อัปโหลดเอกสารสัญญา</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
