"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
    Modal,
    Button,
    Form,
    Input,
    DatePicker,
    Select,
    Upload,
    message,
    Tag
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { TenantType } from '@/services/tenant.service';
import { tenantService } from '@/services/tenant.service';
import { BuildingService, Room } from '@/services/building.service';

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
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch rooms when form opens
    useEffect(() => {
        if (visible) {
            fetchRooms();
        }
    }, [visible]);

    const fetchRooms = async () => {
        try {
            setLoadingRooms(true);
            const roomsData = await BuildingService.getAllRooms();
            setRooms(roomsData);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            message.error('ไม่สามารถดึงข้อมูลห้องได้');
        } finally {
            setLoadingRooms(false);
        }
    };

    const handleRoomSelect = (roomId: number) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
            setSelectedRoom(room);
            if (room.tenants && tenantType === 'C') {
                // If selecting a reserved room for contract
                const tenant = room.tenants;
                form.setFieldsValue({
                    title: tenant.title,
                    fullName: tenant.fullName,
                    phoneNumber: tenant.phoneNumber,
                    idCardNumber: tenant.idCardNumber,
                    address: tenant.address
                });
            }
        }
    };

    const getRoomTagColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'success';
            case 'occupied':
                return 'error';
            case 'maintenance':
                return 'warning';
            default:
                return 'default';
        }
    };

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
            
            if (!selectedRoom) {
                message.error('กรุณาเลือกห้อง');
                return;
            }

            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key !== 'document' && values[key] !== undefined) {
                    formData.append(key, values[key]);
                }
            });

            // Add room and tenant type
            formData.append('roomId', selectedRoom.id.toString());
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
                    <Form.Item
                        label="เลือกห้อง"
                        required
                        className="col-span-2"
                    >
                        <Select
                            showSearch
                            placeholder="เลือกห้อง"
                            loading={loadingRooms}
                            onChange={handleRoomSelect}
                            value={selectedRoom?.id}
                            optionFilterProp="children"
                            className="w-full"
                        >
                            {rooms.map(room => {
                                const isAvailable = room.status === 'available';
                                const isReserved = room.status === 'occupied' && room.tenants?.tenantType === 'R';
                                const isDisabled = (tenantType === 'R' && !isAvailable) || 
                                                 (tenantType === 'C' && !isAvailable && !isReserved) ||
                                                 room.status === 'maintenance';
                                
                                return (
                                    <Select.Option 
                                        key={room.id} 
                                        value={room.id}
                                        disabled={isDisabled}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{room.displayName}</span>
                                            <Tag color={getRoomTagColor(room.status)}>
                                                {room.status === 'available' ? 'ว่าง' : 
                                                 room.status === 'occupied' ? (room.tenants?.tenantType === 'R' ? 'จอง' : 'ทำสัญญา') : 
                                                 'ซ่อมบำรุง'}
                                            </Tag>
                                        </div>
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>

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
