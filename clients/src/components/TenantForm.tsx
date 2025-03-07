"use client";
import React, { useState, useRef } from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Upload,
    message
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { TenantType } from '@/services/tenant.service';
import { tenantService } from '@/services/tenant.service';

interface TenantFormProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: TenantType;
}

const { Option } = Select;
const { TextArea } = Input;

export const TenantForm: React.FC<TenantFormProps> = ({
    visible,
    onClose,
    onSuccess,
    initialData
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [tenantTypeSelected, setTenantTypeSelected] = useState(false);
    const [tenantType, setTenantType] = useState<'R' | 'C' | null>(null);
    const [showTypeModal, setShowTypeModal] = useState(!initialData);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleTenantTypeSelect = (type: 'R' | 'C') => {
        setTenantType(type);
        setTenantTypeSelected(true);
        setShowTypeModal(false);
    };

    const handleCameraCapture = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key !== 'document' && values[key] !== undefined) {
                    formData.append(key, values[key]);
                }
            });

            // Add tenant type
            formData.append('tenantType', tenantType || initialData?.tenantType || '');

            // Add profile image if exists
            if (profileImage) {
                formData.append('profileImage', profileImage);
            }

            // Add document if exists
            if (values.document?.[0]?.originFileObj) {
                formData.append('document', values.document[0].originFileObj);
            }

            if (initialData?.id) {
                await tenantService.update(initialData.id, formData);
            } else {
                await tenantService.create(formData);
            }

            message.success(`Tenant ${initialData ? 'updated' : 'created'} successfully`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('Error saving tenant');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Select Tenant Type"
                open={showTypeModal}
                footer={null}
                closable={false}
            >
                <div className="flex justify-center gap-4">
                    <Button onClick={() => handleTenantTypeSelect('R')}>
                        Reservation
                    </Button>
                    <Button onClick={() => handleTenantTypeSelect('C')}>
                        Contract
                    </Button>
                </div>
            </Modal>

            <Modal
                title={`${initialData ? 'Edit' : 'Add'} Tenant`}
                open={visible && !showTypeModal}
                onCancel={onClose}
                onOk={handleSubmit}
                confirmLoading={loading}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={initialData}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <div className="mb-4 flex justify-center">
                                <div className="relative">
                                    <div 
                                        className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center overflow-hidden"
                                        onClick={handleCameraCapture}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {profileImage ? (
                                            <img 
                                                src={profileImage} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <UserOutlined style={{ fontSize: '32px', color: '#ccc' }} />
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/jpeg"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>

                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: 'Please select title' }]}
                        >
                            <Select>
                                <Option value="นาย">นาย</Option>
                                <Option value="นาง">นาง</Option>
                                <Option value="นางสาว">นางสาว</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="fullName"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter full name' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="idCardNumber"
                            label="ID Card Number"
                            rules={[{ required: true, message: 'Please enter ID card number' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            className="col-span-2"
                            rules={[{ required: true, message: 'Please enter address' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            name="document"
                            label="Document"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e?.fileList;
                            }}
                        >
                            <Upload 
                                accept=".doc,.docx"
                                maxCount={1}
                                beforeUpload={() => false}
                            >
                                <Button icon={<UploadOutlined />}>Upload Document</Button>
                            </Upload>
                        </Form.Item>

                        {(tenantType === 'R' || initialData?.tenantType === 'R') && (
                            <>
                                <Form.Item
                                    name="reservationStartDate"
                                    label="Reservation Start Date"
                                    rules={[{ required: true, message: 'Please select start date' }]}
                                >
                                    <DatePicker className="w-full" />
                                </Form.Item>

                                <Form.Item
                                    name="reservationEndDate"
                                    label="Reservation End Date"
                                    rules={[{ required: true, message: 'Please select end date' }]}
                                >
                                    <DatePicker className="w-full" />
                                </Form.Item>
                            </>
                        )}
                    </div>
                </Form>
            </Modal>
        </>
    );
};
