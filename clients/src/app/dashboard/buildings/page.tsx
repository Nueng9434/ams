"use client";
import React, { useEffect, useState } from 'react';
import { BuildingCard } from '@/components/BuildingCard';
import { BuildingService, Building } from '@/services/building.service';
import { Row, Col, Spin } from 'antd';
import { toast } from 'react-hot-toast';

export default function BuildingsPage() {
    const [buildings, setBuildings] = useState<Building[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const data = await BuildingService.getAllBuildings();
                setBuildings(data);
            } catch (error) {
                console.error('Error fetching buildings:', error);
                toast.error('Failed to load buildings');
            } finally {
                setLoading(false);
            }
        };

        fetchBuildings();
    }, []);

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

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ marginBottom: '24px' }}>อาคารทั้งหมด</h1>
            <Row gutter={[16, 16]} justify="start">
                {buildings.map((building) => (
                    <Col key={building.id} xs={24} sm={12} md={8} lg={6}>
                        <BuildingCard building={building} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
