"use client";
import React from 'react';
import { Building } from '../services/building.service';
import { Card, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { BankOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface BuildingCardProps {
    building: Building;
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/dashboard/buildings/${building.id}`);
    };

    return (
        <Card 
            hoverable
            style={{ 
                width: 300,
                margin: 16
            }}
            onClick={handleClick}
        >
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: 16 
            }}>
                <BankOutlined 
                    style={{ 
                        fontSize: 32, 
                        marginRight: 16,
                        color: '#1890ff'
                    }} 
                />
                <Title level={3} style={{ margin: 0 }}>
                    ตึก {building.name}
                </Title>
            </div>
            
            <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                ห้องพัก: {building.startRoom} - {building.endRoom}
            </Text>

            <div style={{ 
                display: 'flex', 
                alignItems: 'center'
            }}>
                <UserOutlined style={{ marginRight: 8 }} />
                <Text>
                    ผู้เช่า: {building.tenantCount || 0} คน
                </Text>
            </div>
        </Card>
    );
};
