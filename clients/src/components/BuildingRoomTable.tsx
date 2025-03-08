"use client";
import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Building } from '../services/building.service';

interface BuildingRoomTableProps {
    building: Building;
}

interface RoomData {
    key: string;
    roomNumber: string;
    isOccupied: boolean;
}

export const BuildingRoomTable: React.FC<BuildingRoomTableProps> = ({ building }) => {
    const columns: ColumnsType<RoomData> = [
        {
            title: 'หมายเลขห้อง',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
        },
        {
            title: 'สถานะ',
            dataIndex: 'isOccupied',
            key: 'isOccupied',
            render: (isOccupied: boolean) => (
                <span style={{ 
                    color: isOccupied ? '#ff4d4f' : '#52c41a',
                    fontWeight: 'bold'
                }}>
                    {isOccupied ? 'ไม่ว่าง' : 'ว่าง'}
                </span>
            ),
        }
    ];

    // Transform rooms data for table
    const tableData: RoomData[] = building.rooms?.flat().map(room => ({
        key: room.roomNumber,
        ...room
    })) || [];

    return (
        <div style={{ padding: '24px' }}>
            <Table 
                columns={columns} 
                dataSource={tableData}
                pagination={false}
                bordered
                title={() => (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <h2>ห้องพักตึก {building.name}</h2>
                    </div>
                )}
            />
        </div>
    );
};
