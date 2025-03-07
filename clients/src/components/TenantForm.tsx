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
    const [showTypeModal, setShowTypeModal] = useState(initialData ? false : visible);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Effect to handle form data when modal opens
    React.useEffect(() => {
        if (visible) {
            // Clear form first
            form.resetFields();
            setTenantType(null);
            setProfileImage(null);
            setTenantTypeSelected(false);

            // Then set initial data if editing
            if (initialData) {
                form.setFieldsValue(initialData);
                setTenantType(initialData.tenantType);
                setTenantTypeSelected(true);
            } else {
                setShowTypeModal(true);
            }
        }
    }, [visible, initialData, form]);

    // Reset form when modal is closed
    const handleClose = () => {
        form.resetFields();
        setTenantType(null);
        setProfileImage(null);
        setTenantTypeSelected(false);
        onClose();
    };

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
                message.success('แก้ไขข้อมูลผู้เช่าสำเร็จ');
            } else {
                await tenantService.create(formData);
                message.success('เพิ่มผู้เช่าสำเร็จ');
            }
            onSuccess();
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="เลือกประเภทผู้เช่า"
                open={visible && showTypeModal}
                footer={null}
                closable={true}
                maskClosable={false}
                onCancel={() => {
                    if (!tenantTypeSelected) {
                        handleClose();
                    } else {
                        setShowTypeModal(false);
                    }
                }}
            >
                <div className="flex justify-center gap-4 mb-4">
                    <Button onClick={() => handleTenantTypeSelect('R')}>
                        จองห้องพัก
                    </Button>
                    <Button onClick={() => handleTenantTypeSelect('C')}>
                        ทำสัญญา
                    </Button>
                </div>
            </Modal>

            <Modal
                title={`${initialData ? 'แก้ไขผู้เช่า' : 'เพิ่มผู้เช่า'}`}
                open={visible && !showTypeModal}
                onCancel={handleClose}
                onOk={handleSubmit}
                okText="บันทึก"
                cancelText="ยกเลิก"
                confirmLoading={loading}
                maskClosable={false}
                width={700}
            >
                <Form
                    form={form}
                    layout="vertical"
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
                            label="คำนำหน้า"
                            rules={[{ required: true, message: 'กรุณาเลือกคำนำหน้า' }]}
                        >
                            <Select>
                                <Option value="นาย">นาย</Option>
                                <Option value="นาง">นาง</Option>
                                <Option value="นางสาว">นางสาว</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="fullName"
                            label="ชื่อ-นามสกุล"
                            rules={[{ required: true, message: 'กรุณากรอกชื่อ-นามสกุล' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="phoneNumber"
                            label="เบอร์โทรศัพท์"
                            rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="idCardNumber"
                            label="เลขบัตรประชาชน"
                            rules={[{ required: true, message: 'กรุณากรอกเลขบัตรประชาชน' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="ที่อยู่"
                            className="col-span-2"
                            rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        {(tenantType === 'C' || initialData?.tenantType === 'C') && (
                                <Form.Item
                                    name="document"
                                    label="เอกสารสัญญา"
                                    className="col-span-2"
                                >
                                    {initialData?.documentPath ? (
                                        <div>
                                            <p className="mb-2">เอกสารปัจจุบัน: {initialData.documentPath.split('/').pop()}</p>
                                            <Button 
                                                icon={<UploadOutlined />}
                                                onClick={() => initialData?.id && tenantService.downloadDocument(initialData.id)}
                                            >
                                                ดาวน์โหลดเอกสาร
                                            </Button>
                                        </div>
                                    ) : (
                                        <Upload
                                            accept=".doc,.docx"
                                            maxCount={1}
                                            beforeUpload={() => false}
                                            fileList={form.getFieldValue('document')}
                                            onChange={(info: any) => {
                                                form.setFieldValue('document', info.fileList);
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}>อัปโหลดเอกสาร</Button>
                                        </Upload>
                                    )}
                                </Form.Item>
                        )}

                        {(tenantType === 'R' || initialData?.tenantType === 'R') && (
                            <>
                                <Form.Item
                                    name="reservationStartDate"
                                    label="วันที่เริ่มจอง"
                                    rules={[{ required: true, message: 'กรุณาเลือกวันที่เริ่มจอง' }]}
                                >
                                    <DatePicker className="w-full" />
                                </Form.Item>

                                <Form.Item
                                    name="reservationEndDate"
                                    label="วันที่สิ้นสุด"
                                    rules={[{ required: true, message: 'กรุณาเลือกวันที่สิ้นสุด' }]}
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
