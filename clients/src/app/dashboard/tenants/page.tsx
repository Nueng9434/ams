"use client";
import { Suspense } from 'react';
import { TenantTable } from '@/components/TenantTable';
import { Spin } from 'antd';

const TenantPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto">
                <Suspense fallback={
                    <div className="flex justify-center items-center h-screen">
                        <Spin size="large" />
                    </div>
                }>
                    <TenantTable />
                </Suspense>
            </div>
        </div>
    );
};

export default TenantPage;
