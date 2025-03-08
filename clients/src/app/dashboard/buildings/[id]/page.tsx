"use client";
import React, { useEffect, useState } from 'react';
import { BuildingRoomTable } from '@/components/BuildingRoomTable';
import { BuildingService, Building } from '@/services/building.service';
import { useParams } from 'next/navigation';
import { Spin, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function BuildingDetailsPage() {
    const [building, setBuilding] = useState<Building | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const buildingId = params.id as string;

    useEffect(() => {
        const fetchBuilding = async () => {
            try {
                const data = await BuildingService.getBuildingById(buildingId);
                setBuilding(data);
            } catch (error) {
                console.error('Error fetching building details:', error);
                toast.error('Failed to load building details');
            } finally {
                setLoading(false);
            }
        };

        if (buildingId) {
            fetchBuilding();
        }
    }, [buildingId]);

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!building) {
        return <div>Building not found</div>;
    }

    return (
        <div style={{ padding: '24px' }}>
            <Button 
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                style={{ marginBottom: '24px' }}
            >
                ย้อนกลับ
            </Button>

            <div style={{ marginBottom: '24px' }}>
                <h1>รายละเอียดตึก {building.name}</h1>
                <p>จำนวนผู้เช่า: {building.tenantCount || 0} คน</p>
            </div>

            <BuildingRoomTable building={building} />
        </div>
    );
}
