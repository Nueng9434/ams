-- Create buildings table
CREATE TABLE IF NOT EXISTS buildings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL,
    building_name VARCHAR(10) NOT NULL,
    tenants VARCHAR(255) DEFAULT NULL,
    status ENUM('available', 'occupied', 'maintenance') NOT NULL DEFAULT 'available'
);

-- Building F (10 floors, 25 rooms each)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 1 (1101-1125)
('1101', 'F', NULL, 'available'), ('1102', 'F', NULL, 'available'), ('1103', 'F', NULL, 'available'), ('1104', 'F', NULL, 'available'), ('1105', 'F', NULL, 'available'),
('1106', 'F', NULL, 'available'), ('1107', 'F', NULL, 'available'), ('1108', 'F', NULL, 'available'), ('1109', 'F', NULL, 'available'), ('1110', 'F', NULL, 'available'),
('1111', 'F', NULL, 'available'), ('1112', 'F', NULL, 'available'), ('1113', 'F', NULL, 'available'), ('1114', 'F', NULL, 'available'), ('1115', 'F', NULL, 'available'),
('1116', 'F', NULL, 'available'), ('1117', 'F', NULL, 'available'), ('1118', 'F', NULL, 'available'), ('1119', 'F', NULL, 'available'), ('1120', 'F', NULL, 'available'),
('1121', 'F', NULL, 'available'), ('1122', 'F', NULL, 'available'), ('1123', 'F', NULL, 'available'), ('1124', 'F', NULL, 'available'), ('1125', 'F', NULL, 'available'),

-- Floor 2 (1201-1225)
('1201', 'F', NULL, 'available'), ('1202', 'F', NULL, 'available'), ('1203', 'F', NULL, 'available'), ('1204', 'F', NULL, 'available'), ('1205', 'F', NULL, 'available'),
('1206', 'F', NULL, 'available'), ('1207', 'F', NULL, 'available'), ('1208', 'F', NULL, 'available'), ('1209', 'F', NULL, 'available'), ('1210', 'F', NULL, 'available'),
('1211', 'F', NULL, 'available'), ('1212', 'F', NULL, 'available'), ('1213', 'F', NULL, 'available'), ('1214', 'F', NULL, 'available'), ('1215', 'F', NULL, 'available'),
('1216', 'F', NULL, 'available'), ('1217', 'F', NULL, 'available'), ('1218', 'F', NULL, 'available'), ('1219', 'F', NULL, 'available'), ('1220', 'F', NULL, 'available'),
('1221', 'F', NULL, 'available'), ('1222', 'F', NULL, 'available'), ('1223', 'F', NULL, 'available'), ('1224', 'F', NULL, 'available'), ('1225', 'F', NULL, 'available'),

-- Floor 3 (1301-1325)
('1301', 'F', NULL, 'available'), ('1302', 'F', NULL, 'available'), ('1303', 'F', NULL, 'available'), ('1304', 'F', NULL, 'available'), ('1305', 'F', NULL, 'available'),
('1306', 'F', NULL, 'available'), ('1307', 'F', NULL, 'available'), ('1308', 'F', NULL, 'available'), ('1309', 'F', NULL, 'available'), ('1310', 'F', NULL, 'available'),
('1311', 'F', NULL, 'available'), ('1312', 'F', NULL, 'available'), ('1313', 'F', NULL, 'available'), ('1314', 'F', NULL, 'available'), ('1315', 'F', NULL, 'available'),
('1316', 'F', NULL, 'available'), ('1317', 'F', NULL, 'available'), ('1318', 'F', NULL, 'available'), ('1319', 'F', NULL, 'available'), ('1320', 'F', NULL, 'available'),
('1321', 'F', NULL, 'available'), ('1322', 'F', NULL, 'available'), ('1323', 'F', NULL, 'available'), ('1324', 'F', NULL, 'available'), ('1325', 'F', NULL, 'available'),

-- Floor 4 (1401-1425)
('1401', 'F', NULL, 'available'), ('1402', 'F', NULL, 'available'), ('1403', 'F', NULL, 'available'), ('1404', 'F', NULL, 'available'), ('1405', 'F', NULL, 'available'),
('1406', 'F', NULL, 'available'), ('1407', 'F', NULL, 'available'), ('1408', 'F', NULL, 'available'), ('1409', 'F', NULL, 'available'), ('1410', 'F', NULL, 'available'),
('1411', 'F', NULL, 'available'), ('1412', 'F', NULL, 'available'), ('1413', 'F', NULL, 'available'), ('1414', 'F', NULL, 'available'), ('1415', 'F', NULL, 'available'),
('1416', 'F', NULL, 'available'), ('1417', 'F', NULL, 'available'), ('1418', 'F', NULL, 'available'), ('1419', 'F', NULL, 'available'), ('1420', 'F', NULL, 'available'),
('1421', 'F', NULL, 'available'), ('1422', 'F', NULL, 'available'), ('1423', 'F', NULL, 'available'), ('1424', 'F', NULL, 'available'), ('1425', 'F', NULL, 'available'),

-- Floor 5 (1501-1525)
('1501', 'F', NULL, 'available'), ('1502', 'F', NULL, 'available'), ('1503', 'F', NULL, 'available'), ('1504', 'F', NULL, 'available'), ('1505', 'F', NULL, 'available'),
('1506', 'F', NULL, 'available'), ('1507', 'F', NULL, 'available'), ('1508', 'F', NULL, 'available'), ('1509', 'F', NULL, 'available'), ('1510', 'F', NULL, 'available'),
('1511', 'F', NULL, 'available'), ('1512', 'F', NULL, 'available'), ('1513', 'F', NULL, 'available'), ('1514', 'F', NULL, 'available'), ('1515', 'F', NULL, 'available'),
('1516', 'F', NULL, 'available'), ('1517', 'F', NULL, 'available'), ('1518', 'F', NULL, 'available'), ('1519', 'F', NULL, 'available'), ('1520', 'F', NULL, 'available'),
('1521', 'F', NULL, 'available'), ('1522', 'F', NULL, 'available'), ('1523', 'F', NULL, 'available'), ('1524', 'F', NULL, 'available'), ('1525', 'F', NULL, 'available'),

-- Floor 6 (1601-1625)
('1601', 'F', NULL, 'available'), ('1602', 'F', NULL, 'available'), ('1603', 'F', NULL, 'available'), ('1604', 'F', NULL, 'available'), ('1605', 'F', NULL, 'available'),
('1606', 'F', NULL, 'available'), ('1607', 'F', NULL, 'available'), ('1608', 'F', NULL, 'available'), ('1609', 'F', NULL, 'available'), ('1610', 'F', NULL, 'available'),
('1611', 'F', NULL, 'available'), ('1612', 'F', NULL, 'available'), ('1613', 'F', NULL, 'available'), ('1614', 'F', NULL, 'available'), ('1615', 'F', NULL, 'available'),
('1616', 'F', NULL, 'available'), ('1617', 'F', NULL, 'available'), ('1618', 'F', NULL, 'available'), ('1619', 'F', NULL, 'available'), ('1620', 'F', NULL, 'available'),
('1621', 'F', NULL, 'available'), ('1622', 'F', NULL, 'available'), ('1623', 'F', NULL, 'available'), ('1624', 'F', NULL, 'available'), ('1625', 'F', NULL, 'available'),

-- Floor 7 (1701-1725)
('1701', 'F', NULL, 'available'), ('1702', 'F', NULL, 'available'), ('1703', 'F', NULL, 'available'), ('1704', 'F', NULL, 'available'), ('1705', 'F', NULL, 'available'),
('1706', 'F', NULL, 'available'), ('1707', 'F', NULL, 'available'), ('1708', 'F', NULL, 'available'), ('1709', 'F', NULL, 'available'), ('1710', 'F', NULL, 'available'),
('1711', 'F', NULL, 'available'), ('1712', 'F', NULL, 'available'), ('1713', 'F', NULL, 'available'), ('1714', 'F', NULL, 'available'), ('1715', 'F', NULL, 'available'),
('1716', 'F', NULL, 'available'), ('1717', 'F', NULL, 'available'), ('1718', 'F', NULL, 'available'), ('1719', 'F', NULL, 'available'), ('1720', 'F', NULL, 'available'),
('1721', 'F', NULL, 'available'), ('1722', 'F', NULL, 'available'), ('1723', 'F', NULL, 'available'), ('1724', 'F', NULL, 'available'), ('1725', 'F', NULL, 'available'),

-- Floor 8 (1801-1825)
('1801', 'F', NULL, 'available'), ('1802', 'F', NULL, 'available'), ('1803', 'F', NULL, 'available'), ('1804', 'F', NULL, 'available'), ('1805', 'F', NULL, 'available'),
('1806', 'F', NULL, 'available'), ('1807', 'F', NULL, 'available'), ('1808', 'F', NULL, 'available'), ('1809', 'F', NULL, 'available'), ('1810', 'F', NULL, 'available'),
('1811', 'F', NULL, 'available'), ('1812', 'F', NULL, 'available'), ('1813', 'F', NULL, 'available'), ('1814', 'F', NULL, 'available'), ('1815', 'F', NULL, 'available'),
('1816', 'F', NULL, 'available'), ('1817', 'F', NULL, 'available'), ('1818', 'F', NULL, 'available'), ('1819', 'F', NULL, 'available'), ('1820', 'F', NULL, 'available'),
('1821', 'F', NULL, 'available'), ('1822', 'F', NULL, 'available'), ('1823', 'F', NULL, 'available'), ('1824', 'F', NULL, 'available'), ('1825', 'F', NULL, 'available'),

-- Floor 9 (1901-1925)
('1901', 'F', NULL, 'available'), ('1902', 'F', NULL, 'available'), ('1903', 'F', NULL, 'available'), ('1904', 'F', NULL, 'available'), ('1905', 'F', NULL, 'available'),
('1906', 'F', NULL, 'available'), ('1907', 'F', NULL, 'available'), ('1908', 'F', NULL, 'available'), ('1909', 'F', NULL, 'available'), ('1910', 'F', NULL, 'available'),
('1911', 'F', NULL, 'available'), ('1912', 'F', NULL, 'available'), ('1913', 'F', NULL, 'available'), ('1914', 'F', NULL, 'available'), ('1915', 'F', NULL, 'available'),
('1916', 'F', NULL, 'available'), ('1917', 'F', NULL, 'available'), ('1918', 'F', NULL, 'available'), ('1919', 'F', NULL, 'available'), ('1920', 'F', NULL, 'available'),
('1921', 'F', NULL, 'available'), ('1922', 'F', NULL, 'available'), ('1923', 'F', NULL, 'available'), ('1924', 'F', NULL, 'available'), ('1925', 'F', NULL, 'available'),

-- Floor 10 (1001-1025)
('1001', 'F', NULL, 'available'), ('1002', 'F', NULL, 'available'), ('1003', 'F', NULL, 'available'), ('1004', 'F', NULL, 'available'), ('1005', 'F', NULL, 'available'),
('1006', 'F', NULL, 'available'), ('1007', 'F', NULL, 'available'), ('1008', 'F', NULL, 'available'), ('1009', 'F', NULL, 'available'), ('1010', 'F', NULL, 'available'),
('1011', 'F', NULL, 'available'), ('1012', 'F', NULL, 'available'), ('1013', 'F', NULL, 'available'), ('1014', 'F', NULL, 'available'), ('1015', 'F', NULL, 'available'),
('1016', 'F', NULL, 'available'), ('1017', 'F', NULL, 'available'), ('1018', 'F', NULL, 'available'), ('1019', 'F', NULL, 'available'), ('1020', 'F', NULL, 'available'),
('1021', 'F', NULL, 'available'), ('1022', 'F', NULL, 'available'), ('1023', 'F', NULL, 'available'), ('1024', 'F', NULL, 'available'), ('1025', 'F', NULL, 'available');

-- Building E (10 floors, 25 rooms each)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 1 (5101-5125)
('5101', 'E', NULL, 'available'), ('5102', 'E', NULL, 'available'), ('5103', 'E', NULL, 'available'), ('5104', 'E', NULL, 'available'), ('5105', 'E', NULL, 'available'),
('5106', 'E', NULL, 'available'), ('5107', 'E', NULL, 'available'), ('5108', 'E', NULL, 'available'), ('5109', 'E', NULL, 'available'), ('5110', 'E', NULL, 'available'),
('5111', 'E', NULL, 'available'), ('5112', 'E', NULL, 'available'), ('5113', 'E', NULL, 'available'), ('5114', 'E', NULL, 'available'), ('5115', 'E', NULL, 'available'),
('5116', 'E', NULL, 'available'), ('5117', 'E', NULL, 'available'), ('5118', 'E', NULL, 'available'), ('5119', 'E', NULL, 'available'), ('5120', 'E', NULL, 'available'),
('5121', 'E', NULL, 'available'), ('5122', 'E', NULL, 'available'), ('5123', 'E', NULL, 'available'), ('5124', 'E', NULL, 'available'), ('5125', 'E', NULL, 'available');

-- Floor 2 (5201-5225)
 
('5201', 'E', NULL, 'available'), ('5202', 'E', NULL, 'available'), ('5203', 'E', NULL, 'available'), ('5204', 'E', NULL, 'available'), ('5205', 'E', NULL, 'available'),
('5206', 'E', NULL, 'available'), ('5207', 'E', NULL, 'available'), ('5208', 'E', NULL, 'available'), ('5209', 'E', NULL, 'available'), ('5210', 'E', NULL, 'available'),
('5211', 'E', NULL, 'available'), ('5212', 'E', NULL, 'available'), ('5213', 'E', NULL, 'available'), ('5214', 'E', NULL, 'available'), ('5215', 'E', NULL, 'available'),
('5216', 'E', NULL, 'available'), ('5217', 'E', NULL, 'available'), ('5218', 'E', NULL, 'available'), ('5219', 'E', NULL, 'available'), ('5220', 'E', NULL, 'available'),
('5221', 'E', NULL, 'available'), ('5222', 'E', NULL, 'available'), ('5223', 'E', NULL, 'available'), ('5224', 'E', NULL, 'available'), ('5225', 'E', NULL, 'available');

-- Floors 3-9

-- Floor 3 (5301-5325)
('5301', 'E', NULL, 'available'), ('5302', 'E', NULL, 'available'), ('5303', 'E', NULL, 'available'), ('5304', 'E', NULL, 'available'), ('5305', 'E', NULL, 'available'),
('5306', 'E', NULL, 'available'), ('5307', 'E', NULL, 'available'), ('5308', 'E', NULL, 'available'), ('5309', 'E', NULL, 'available'), ('5310', 'E', NULL, 'available'),
('5311', 'E', NULL, 'available'), ('5312', 'E', NULL, 'available'), ('5313', 'E', NULL, 'available'), ('5314', 'E', NULL, 'available'), ('5315', 'E', NULL, 'available'),
('5316', 'E', NULL, 'available'), ('5317', 'E', NULL, 'available'), ('5318', 'E', NULL, 'available'), ('5319', 'E', NULL, 'available'), ('5320', 'E', NULL, 'available'),
('5321', 'E', NULL, 'available'), ('5322', 'E', NULL, 'available'), ('5323', 'E', NULL, 'available'), ('5324', 'E', NULL, 'available'), ('5325', 'E', NULL, 'available'),

-- Floor 4 (5401-5425)
('5401', 'E', NULL, 'available'), ('5402', 'E', NULL, 'available'), ('5403', 'E', NULL, 'available'), ('5404', 'E', NULL, 'available'), ('5405', 'E', NULL, 'available'),
('5406', 'E', NULL, 'available'), ('5407', 'E', NULL, 'available'), ('5408', 'E', NULL, 'available'), ('5409', 'E', NULL, 'available'), ('5410', 'E', NULL, 'available'),
('5411', 'E', NULL, 'available'), ('5412', 'E', NULL, 'available'), ('5413', 'E', NULL, 'available'), ('5414', 'E', NULL, 'available'), ('5415', 'E', NULL, 'available'),
('5416', 'E', NULL, 'available'), ('5417', 'E', NULL, 'available'), ('5418', 'E', NULL, 'available'), ('5419', 'E', NULL, 'available'), ('5420', 'E', NULL, 'available'),
('5421', 'E', NULL, 'available'), ('5422', 'E', NULL, 'available'), ('5423', 'E', NULL, 'available'), ('5424', 'E', NULL, 'available'), ('5425', 'E', NULL, 'available'),

-- Floor 5 (5501-5525)
('5501', 'E', NULL, 'available'), ('5502', 'E', NULL, 'available'), ('5503', 'E', NULL, 'available'), ('5504', 'E', NULL, 'available'), ('5505', 'E', NULL, 'available'),
('5506', 'E', NULL, 'available'), ('5507', 'E', NULL, 'available'), ('5508', 'E', NULL, 'available'), ('5509', 'E', NULL, 'available'), ('5510', 'E', NULL, 'available'),
('5511', 'E', NULL, 'available'), ('5512', 'E', NULL, 'available'), ('5513', 'E', NULL, 'available'), ('5514', 'E', NULL, 'available'), ('5515', 'E', NULL, 'available'),
('5516', 'E', NULL, 'available'), ('5517', 'E', NULL, 'available'), ('5518', 'E', NULL, 'available'), ('5519', 'E', NULL, 'available'), ('5520', 'E', NULL, 'available'),
('5521', 'E', NULL, 'available'), ('5522', 'E', NULL, 'available'), ('5523', 'E', NULL, 'available'), ('5524', 'E', NULL, 'available'), ('5525', 'E', NULL, 'available'),

-- Floor 6 (5601-5625)
('5601', 'E', NULL, 'available'), ('5602', 'E', NULL, 'available'), ('5603', 'E', NULL, 'available'), ('5604', 'E', NULL, 'available'), ('5605', 'E', NULL, 'available'),
('5606', 'E', NULL, 'available'), ('5607', 'E', NULL, 'available'), ('5608', 'E', NULL, 'available'), ('5609', 'E', NULL, 'available'), ('5610', 'E', NULL, 'available'),
('5611', 'E', NULL, 'available'), ('5612', 'E', NULL, 'available'), ('5613', 'E', NULL, 'available'), ('5614', 'E', NULL, 'available'), ('5615', 'E', NULL, 'available'),
('5616', 'E', NULL, 'available'), ('5617', 'E', NULL, 'available'), ('5618', 'E', NULL, 'available'), ('5619', 'E', NULL, 'available'), ('5620', 'E', NULL, 'available'),
('5621', 'E', NULL, 'available'), ('5622', 'E', NULL, 'available'), ('5623', 'E', NULL, 'available'), ('5624', 'E', NULL, 'available'), ('5625', 'E', NULL, 'available'),

-- Floor 7 (5701-5725)
('5701', 'E', NULL, 'available'), ('5702', 'E', NULL, 'available'), ('5703', 'E', NULL, 'available'), ('5704', 'E', NULL, 'available'), ('5705', 'E', NULL, 'available'),
('5706', 'E', NULL, 'available'), ('5707', 'E', NULL, 'available'), ('5708', 'E', NULL, 'available'), ('5709', 'E', NULL, 'available'), ('5710', 'E', NULL, 'available'),
('5711', 'E', NULL, 'available'), ('5712', 'E', NULL, 'available'), ('5713', 'E', NULL, 'available'), ('5714', 'E', NULL, 'available'), ('5715', 'E', NULL, 'available'),
('5716', 'E', NULL, 'available'), ('5717', 'E', NULL, 'available'), ('5718', 'E', NULL, 'available'), ('5719', 'E', NULL, 'available'), ('5720', 'E', NULL, 'available'),
('5721', 'E', NULL, 'available'), ('5722', 'E', NULL, 'available'), ('5723', 'E', NULL, 'available'), ('5724', 'E', NULL, 'available'), ('5725', 'E', NULL, 'available'),

-- Floor 8 (5801-5825)
('5801', 'E', NULL, 'available'), ('5802', 'E', NULL, 'available'), ('5803', 'E', NULL, 'available'), ('5804', 'E', NULL, 'available'), ('5805', 'E', NULL, 'available'),
('5806', 'E', NULL, 'available'), ('5807', 'E', NULL, 'available'), ('5808', 'E', NULL, 'available'), ('5809', 'E', NULL, 'available'), ('5810', 'E', NULL, 'available'),
('5811', 'E', NULL, 'available'), ('5812', 'E', NULL, 'available'), ('5813', 'E', NULL, 'available'), ('5814', 'E', NULL, 'available'), ('5815', 'E', NULL, 'available'),
('5816', 'E', NULL, 'available'), ('5817', 'E', NULL, 'available'), ('5818', 'E', NULL, 'available'), ('5819', 'E', NULL, 'available'), ('5820', 'E', NULL, 'available'),
('5821', 'E', NULL, 'available'), ('5822', 'E', NULL, 'available'), ('5823', 'E', NULL, 'available'), ('5824', 'E', NULL, 'available'), ('5825', 'E', NULL, 'available'),

-- Floor 9 (5901-5925)
('5901', 'E', NULL, 'available'), ('5902', 'E', NULL, 'available'), ('5903', 'E', NULL, 'available'), ('5904', 'E', NULL, 'available'), ('5905', 'E', NULL, 'available'),
('5906', 'E', NULL, 'available'), ('5907', 'E', NULL, 'available'), ('5908', 'E', NULL, 'available'), ('5909', 'E', NULL, 'available'), ('5910', 'E', NULL, 'available'),
('5911', 'E', NULL, 'available'), ('5912', 'E', NULL, 'available'), ('5913', 'E', NULL, 'available'), ('5914', 'E', NULL, 'available'), ('5915', 'E', NULL, 'available'),
('5916', 'E', NULL, 'available'), ('5917', 'E', NULL, 'available'), ('5918', 'E', NULL, 'available'), ('5919', 'E', NULL, 'available'), ('5920', 'E', NULL, 'available'),
('5921', 'E', NULL, 'available'), ('5922', 'E', NULL, 'available'), ('5923', 'E', NULL, 'available'), ('5924', 'E', NULL, 'available'), ('5925', 'E', NULL, 'available'),

-- Floor 10 (5001-5025)
('5001', 'E', NULL, 'available'), ('5002', 'E', NULL, 'available'), ('5003', 'E', NULL, 'available'), ('5004', 'E', NULL, 'available'), ('5005', 'E', NULL, 'available'),
('5006', 'E', NULL, 'available'), ('5007', 'E', NULL, 'available'), ('5008', 'E', NULL, 'available'), ('5009', 'E', NULL, 'available'), ('5010', 'E', NULL, 'available'),
('5011', 'E', NULL, 'available'), ('5012', 'E', NULL, 'available'), ('5013', 'E', NULL, 'available'), ('5014', 'E', NULL, 'available'), ('5015', 'E', NULL, 'available'),
('5016', 'E', NULL, 'available'), ('5017', 'E', NULL, 'available'), ('5018', 'E', NULL, 'available'), ('5019', 'E', NULL, 'available'), ('5020', 'E', NULL, 'available'),
('5021', 'E', NULL, 'available'), ('5022', 'E', NULL, 'available'), ('5023', 'E', NULL, 'available'), ('5024', 'E', NULL, 'available'), ('5025', 'E', NULL, 'available');

-- Building C (10 floors, 25 rooms each)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 1 (7101-7125)
('7101', 'C', NULL, 'available'), ('7102', 'C', NULL, 'available'), ('7103', 'C', NULL, 'available'), ('7104', 'C', NULL, 'available'), ('7105', 'C', NULL, 'available'),
('7106', 'C', NULL, 'available'), ('7107', 'C', NULL, 'available'), ('7108', 'C', NULL, 'available'), ('7109', 'C', NULL, 'available'), ('7110', 'C', NULL, 'available'),
('7111', 'C', NULL, 'available'), ('7112', 'C', NULL, 'available'), ('7113', 'C', NULL, 'available'), ('7114', 'C', NULL, 'available'), ('7115', 'C', NULL, 'available'),
('7116', 'C', NULL, 'available'), ('7117', 'C', NULL, 'available'), ('7118', 'C', NULL, 'available'), ('7119', 'C', NULL, 'available'), ('7120', 'C', NULL, 'available'),
('7121', 'C', NULL, 'available'), ('7122', 'C', NULL, 'available'), ('7123', 'C', NULL, 'available'), ('7124', 'C', NULL, 'available'), ('7125', 'C', NULL, 'available');

-- Floor 2 (7201-7225)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
('7201', 'C', NULL, 'available'), ('7202', 'C', NULL, 'available'), ('7203', 'C', NULL, 'available'), ('7204', 'C', NULL, 'available'), ('7205', 'C', NULL, 'available'),
('7206', 'C', NULL, 'available'), ('7207', 'C', NULL, 'available'), ('7208', 'C', NULL, 'available'), ('7209', 'C', NULL, 'available'), ('7210', 'C', NULL, 'available'),
('7211', 'C', NULL, 'available'), ('7212', 'C', NULL, 'available'), ('7213', 'C', NULL, 'available'), ('7214', 'C', NULL, 'available'), ('7215', 'C', NULL, 'available'),
('7216', 'C', NULL, 'available'), ('7217', 'C', NULL, 'available'), ('7218', 'C', NULL, 'available'), ('7219', 'C', NULL, 'available'), ('7220', 'C', NULL, 'available'),
('7221', 'C', NULL, 'available'), ('7222', 'C', NULL, 'available'), ('7223', 'C', NULL, 'available'), ('7224', 'C', NULL, 'available'), ('7225', 'C', NULL, 'available');

-- Floors 3-9
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 3 (7301-7325)
('7301', 'C', NULL, 'available'), ('7302', 'C', NULL, 'available'), ('7303', 'C', NULL, 'available'), ('7304', 'C', NULL, 'available'), ('7305', 'C', NULL, 'available'),
('7306', 'C', NULL, 'available'), ('7307', 'C', NULL, 'available'), ('7308', 'C', NULL, 'available'), ('7309', 'C', NULL, 'available'), ('7310', 'C', NULL, 'available'),
('7311', 'C', NULL, 'available'), ('7312', 'C', NULL, 'available'), ('7313', 'C', NULL, 'available'), ('7314', 'C', NULL, 'available'), ('7315', 'C', NULL, 'available'),
('7316', 'C', NULL, 'available'), ('7317', 'C', NULL, 'available'), ('7318', 'C', NULL, 'available'), ('7319', 'C', NULL, 'available'), ('7320', 'C', NULL, 'available'),
('7321', 'C', NULL, 'available'), ('7322', 'C', NULL, 'available'), ('7323', 'C', NULL, 'available'), ('7324', 'C', NULL, 'available'), ('7325', 'C', NULL, 'available'),

-- Floor 4 (7401-7425)
('7401', 'C', NULL, 'available'), ('7402', 'C', NULL, 'available'), ('7403', 'C', NULL, 'available'), ('7404', 'C', NULL, 'available'), ('7405', 'C', NULL, 'available'),
('7406', 'C', NULL, 'available'), ('7407', 'C', NULL, 'available'), ('7408', 'C', NULL, 'available'), ('7409', 'C', NULL, 'available'), ('7410', 'C', NULL, 'available'),
('7411', 'C', NULL, 'available'), ('7412', 'C', NULL, 'available'), ('7413', 'C', NULL, 'available'), ('7414', 'C', NULL, 'available'), ('7415', 'C', NULL, 'available'),
('7416', 'C', NULL, 'available'), ('7417', 'C', NULL, 'available'), ('7418', 'C', NULL, 'available'), ('7419', 'C', NULL, 'available'), ('7420', 'C', NULL, 'available'),
('7421', 'C', NULL, 'available'), ('7422', 'C', NULL, 'available'), ('7423', 'C', NULL, 'available'), ('7424', 'C', NULL, 'available'), ('7425', 'C', NULL, 'available'),

-- Floor 5 (7501-7525)
('7501', 'C', NULL, 'available'), ('7502', 'C', NULL, 'available'), ('7503', 'C', NULL, 'available'), ('7504', 'C', NULL, 'available'), ('7505', 'C', NULL, 'available'),
('7506', 'C', NULL, 'available'), ('7507', 'C', NULL, 'available'), ('7508', 'C', NULL, 'available'), ('7509', 'C', NULL, 'available'), ('7510', 'C', NULL, 'available'),
('7511', 'C', NULL, 'available'), ('7512', 'C', NULL, 'available'), ('7513', 'C', NULL, 'available'), ('7514', 'C', NULL, 'available'), ('7515', 'C', NULL, 'available'),
('7516', 'C', NULL, 'available'), ('7517', 'C', NULL, 'available'), ('7518', 'C', NULL, 'available'), ('7519', 'C', NULL, 'available'), ('7520', 'C', NULL, 'available'),
('7521', 'C', NULL, 'available'), ('7522', 'C', NULL, 'available'), ('7523', 'C', NULL, 'available'), ('7524', 'C', NULL, 'available'), ('7525', 'C', NULL, 'available'),

-- Floor 6 (7601-7625)
('7601', 'C', NULL, 'available'), ('7602', 'C', NULL, 'available'), ('7603', 'C', NULL, 'available'), ('7604', 'C', NULL, 'available'), ('7605', 'C', NULL, 'available'),
('7606', 'C', NULL, 'available'), ('7607', 'C', NULL, 'available'), ('7608', 'C', NULL, 'available'), ('7609', 'C', NULL, 'available'), ('7610', 'C', NULL, 'available'),
('7611', 'C', NULL, 'available'), ('7612', 'C', NULL, 'available'), ('7613', 'C', NULL, 'available'), ('7614', 'C', NULL, 'available'), ('7615', 'C', NULL, 'available'),
('7616', 'C', NULL, 'available'), ('7617', 'C', NULL, 'available'), ('7618', 'C', NULL, 'available'), ('7619', 'C', NULL, 'available'), ('7620', 'C', NULL, 'available'),
('7621', 'C', NULL, 'available'), ('7622', 'C', NULL, 'available'), ('7623', 'C', NULL, 'available'), ('7624', 'C', NULL, 'available'), ('7625', 'C', NULL, 'available'),

-- Floor 7 (7701-7725)
('7701', 'C', NULL, 'available'), ('7702', 'C', NULL, 'available'), ('7703', 'C', NULL, 'available'), ('7704', 'C', NULL, 'available'), ('7705', 'C', NULL, 'available'),
('7706', 'C', NULL, 'available'), ('7707', 'C', NULL, 'available'), ('7708', 'C', NULL, 'available'), ('7709', 'C', NULL, 'available'), ('7710', 'C', NULL, 'available'),
('7711', 'C', NULL, 'available'), ('7712', 'C', NULL, 'available'), ('7713', 'C', NULL, 'available'), ('7714', 'C', NULL, 'available'), ('7715', 'C', NULL, 'available'),
('7716', 'C', NULL, 'available'), ('7717', 'C', NULL, 'available'), ('7718', 'C', NULL, 'available'), ('7719', 'C', NULL, 'available'), ('7720', 'C', NULL, 'available'),
('7721', 'C', NULL, 'available'), ('7722', 'C', NULL, 'available'), ('7723', 'C', NULL, 'available'), ('7724', 'C', NULL, 'available'), ('7725', 'C', NULL, 'available'),

-- Floor 8 (7801-7825)
('7801', 'C', NULL, 'available'), ('7802', 'C', NULL, 'available'), ('7803', 'C', NULL, 'available'), ('7804', 'C', NULL, 'available'), ('7805', 'C', NULL, 'available'),
('7806', 'C', NULL, 'available'), ('7807', 'C', NULL, 'available'), ('7808', 'C', NULL, 'available'), ('7809', 'C', NULL, 'available'), ('7810', 'C', NULL, 'available'),
('7811', 'C', NULL, 'available'), ('7812', 'C', NULL, 'available'), ('7813', 'C', NULL, 'available'), ('7814', 'C', NULL, 'available'), ('7815', 'C', NULL, 'available'),
('7816', 'C', NULL, 'available'), ('7817', 'C', NULL, 'available'), ('7818', 'C', NULL, 'available'), ('7819', 'C', NULL, 'available'), ('7820', 'C', NULL, 'available'),
('7821', 'C', NULL, 'available'), ('7822', 'C', NULL, 'available'), ('7823', 'C', NULL, 'available'), ('7824', 'C', NULL, 'available'), ('7825', 'C', NULL, 'available'),

-- Floor 9 (7901-7925)
('7901', 'C', NULL, 'available'), ('7902', 'C', NULL, 'available'), ('7903', 'C', NULL, 'available'), ('7904', 'C', NULL, 'available'), ('7905', 'C', NULL, 'available'),
('7906', 'C', NULL, 'available'), ('7907', 'C', NULL, 'available'), ('7908', 'C', NULL, 'available'), ('7909', 'C', NULL, 'available'), ('7910', 'C', NULL, 'available'),
('7911', 'C', NULL, 'available'), ('7912', 'C', NULL, 'available'), ('7913', 'C', NULL, 'available'), ('7914', 'C', NULL, 'available'), ('7915', 'C', NULL, 'available'),
('7916', 'C', NULL, 'available'), ('7917', 'C', NULL, 'available'), ('7918', 'C', NULL, 'available'), ('7919', 'C', NULL, 'available'), ('7920', 'C', NULL, 'available'),
('7921', 'C', NULL, 'available'), ('7922', 'C', NULL, 'available'), ('7923', 'C', NULL, 'available'), ('7924', 'C', NULL, 'available'), ('7925', 'C', NULL, 'available'),

-- Floor 10 (7001-7025)
('7001', 'C', NULL, 'available'), ('7002', 'C', NULL, 'available'), ('7003', 'C', NULL, 'available'), ('7004', 'C', NULL, 'available'), ('7005', 'C', NULL, 'available'),
('7006', 'C', NULL, 'available'), ('7007', 'C', NULL, 'available'), ('7008', 'C', NULL, 'available'), ('7009', 'C', NULL, 'available'), ('7010', 'C', NULL, 'available'),
('7011', 'C', NULL, 'available'), ('7012', 'C', NULL, 'available'), ('7013', 'C', NULL, 'available'), ('7014', 'C', NULL, 'available'), ('7015', 'C', NULL, 'available'),
('7016', 'C', NULL, 'available'), ('7017', 'C', NULL, 'available'), ('7018', 'C', NULL, 'available'), ('7019', 'C', NULL, 'available'), ('7020', 'C', NULL, 'available'),
('7021', 'C', NULL, 'available'), ('7022', 'C', NULL, 'available'), ('7023', 'C', NULL, 'available'), ('7024', 'C', NULL, 'available'), ('7025', 'C', NULL, 'available');

-- Building B (10 floors, 25 rooms each)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 1 (8101-8125)
('8101', 'B', NULL, 'available'), ('8102', 'B', NULL, 'available'), ('8103', 'B', NULL, 'available'), ('8104', 'B', NULL, 'available'), ('8105', 'B', NULL, 'available'),
('8106', 'B', NULL, 'available'), ('8107', 'B', NULL, 'available'), ('8108', 'B', NULL, 'available'), ('8109', 'B', NULL, 'available'), ('8110', 'B', NULL, 'available'),
('8111', 'B', NULL, 'available'), ('8112', 'B', NULL, 'available'), ('8113', 'B', NULL, 'available'), ('8114', 'B', NULL, 'available'), ('8115', 'B', NULL, 'available'),
('8116', 'B', NULL, 'available'), ('8117', 'B', NULL, 'available'), ('8118', 'B', NULL, 'available'), ('8119', 'B', NULL, 'available'), ('8120', 'B', NULL, 'available'),
('8121', 'B', NULL, 'available'), ('8122', 'B', NULL, 'available'), ('8123', 'B', NULL, 'available'), ('8124', 'B', NULL, 'available'), ('8125', 'B', NULL, 'available');

-- Floor 2 (8201-8225)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
('8201', 'B', NULL, 'available'), ('8202', 'B', NULL, 'available'), ('8203', 'B', NULL, 'available'), ('8204', 'B', NULL, 'available'), ('8205', 'B', NULL, 'available'),
('8206', 'B', NULL, 'available'), ('8207', 'B', NULL, 'available'), ('8208', 'B', NULL, 'available'), ('8209', 'B', NULL, 'available'), ('8210', 'B', NULL, 'available'),
('8211', 'B', NULL, 'available'), ('8212', 'B', NULL, 'available'), ('8213', 'B', NULL, 'available'), ('8214', 'B', NULL, 'available'), ('8215', 'B', NULL, 'available'),
('8216', 'B', NULL, 'available'), ('8217', 'B', NULL, 'available'), ('8218', 'B', NULL, 'available'), ('8219', 'B', NULL, 'available'), ('8220', 'B', NULL, 'available'),
('8221', 'B', NULL, 'available'), ('8222', 'B', NULL, 'available'), ('8223', 'B', NULL, 'available'), ('8224', 'B', NULL, 'available'), ('8225', 'B', NULL, 'available');

-- Floors 3-9
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 3 (8301-8325)
('8301', 'B', NULL, 'available'), ('8302', 'B', NULL, 'available'), ('8303', 'B', NULL, 'available'), ('8304', 'B', NULL, 'available'), ('8305', 'B', NULL, 'available'),
('8306', 'B', NULL, 'available'), ('8307', 'B', NULL, 'available'), ('8308', 'B', NULL, 'available'), ('8309', 'B', NULL, 'available'), ('8310', 'B', NULL, 'available'),
('8311', 'B', NULL, 'available'), ('8312', 'B', NULL, 'available'), ('8313', 'B', NULL, 'available'), ('8314', 'B', NULL, 'available'), ('8315', 'B', NULL, 'available'),
('8316', 'B', NULL, 'available'), ('8317', 'B', NULL, 'available'), ('8318', 'B', NULL, 'available'), ('8319', 'B', NULL, 'available'), ('8320', 'B', NULL, 'available'),
('8321', 'B', NULL, 'available'), ('8322', 'B', NULL, 'available'), ('8323', 'B', NULL, 'available'), ('8324', 'B', NULL, 'available'), ('8325', 'B', NULL, 'available'),

-- Floor 4 (8401-8425)
('8401', 'B', NULL, 'available'), ('8402', 'B', NULL, 'available'), ('8403', 'B', NULL, 'available'), ('8404', 'B', NULL, 'available'), ('8405', 'B', NULL, 'available'),
('8406', 'B', NULL, 'available'), ('8407', 'B', NULL, 'available'), ('8408', 'B', NULL, 'available'), ('8409', 'B', NULL, 'available'), ('8410', 'B', NULL, 'available'),
('8411', 'B', NULL, 'available'), ('8412', 'B', NULL, 'available'), ('8413', 'B', NULL, 'available'), ('8414', 'B', NULL, 'available'), ('8415', 'B', NULL, 'available'),
('8416', 'B', NULL, 'available'), ('8417', 'B', NULL, 'available'), ('8418', 'B', NULL, 'available'), ('8419', 'B', NULL, 'available'), ('8420', 'B', NULL, 'available'),
('8421', 'B', NULL, 'available'), ('8422', 'B', NULL, 'available'), ('8423', 'B', NULL, 'available'), ('8424', 'B', NULL, 'available'), ('8425', 'B', NULL, 'available'),

-- Floor 5 (8501-8525)
('8501', 'B', NULL, 'available'), ('8502', 'B', NULL, 'available'), ('8503', 'B', NULL, 'available'), ('8504', 'B', NULL, 'available'), ('8505', 'B', NULL, 'available'),
('8506', 'B', NULL, 'available'), ('8507', 'B', NULL, 'available'), ('8508', 'B', NULL, 'available'), ('8509', 'B', NULL, 'available'), ('8510', 'B', NULL, 'available'),
('8511', 'B', NULL, 'available'), ('8512', 'B', NULL, 'available'), ('8513', 'B', NULL, 'available'), ('8514', 'B', NULL, 'available'), ('8515', 'B', NULL, 'available'),
('8516', 'B', NULL, 'available'), ('8517', 'B', NULL, 'available'), ('8518', 'B', NULL, 'available'), ('8519', 'B', NULL, 'available'), ('8520', 'B', NULL, 'available'),
('8521', 'B', NULL, 'available'), ('8522', 'B', NULL, 'available'), ('8523', 'B', NULL, 'available'), ('8524', 'B', NULL, 'available'), ('8525', 'B', NULL, 'available'),

-- Floor 6 (8601-8625)
('8601', 'B', NULL, 'available'), ('8602', 'B', NULL, 'available'), ('8603', 'B', NULL, 'available'), ('8604', 'B', NULL, 'available'), ('8605', 'B', NULL, 'available'),
('8606', 'B', NULL, 'available'), ('8607', 'B', NULL, 'available'), ('8608', 'B', NULL, 'available'), ('8609', 'B', NULL, 'available'), ('8610', 'B', NULL, 'available'),
('8611', 'B', NULL, 'available'), ('8612', 'B', NULL, 'available'), ('8613', 'B', NULL, 'available'), ('8614', 'B', NULL, 'available'), ('8615', 'B', NULL, 'available'),
('8616', 'B', NULL, 'available'), ('8617', 'B', NULL, 'available'), ('8618', 'B', NULL, 'available'), ('8619', 'B', NULL, 'available'), ('8620', 'B', NULL, 'available'),
('8621', 'B', NULL, 'available'), ('8622', 'B', NULL, 'available'), ('8623', 'B', NULL, 'available'), ('8624', 'B', NULL, 'available'), ('8625', 'B', NULL, 'available'),

-- Floor 7 (8701-8725)
('8701', 'B', NULL, 'available'), ('8702', 'B', NULL, 'available'), ('8703', 'B', NULL, 'available'), ('8704', 'B', NULL, 'available'), ('8705', 'B', NULL, 'available'),
('8706', 'B', NULL, 'available'), ('8707', 'B', NULL, 'available'), ('8708', 'B', NULL, 'available'), ('8709', 'B', NULL, 'available'), ('8710', 'B', NULL, 'available'),
('8711', 'B', NULL, 'available'), ('8712', 'B', NULL, 'available'), ('8713', 'B', NULL, 'available'), ('8714', 'B', NULL, 'available'), ('8715', 'B', NULL, 'available'),
('8716', 'B', NULL, 'available'), ('8717', 'B', NULL, 'available'), ('8718', 'B', NULL, 'available'), ('8719', 'B', NULL, 'available'), ('8720', 'B', NULL, 'available'),
('8721', 'B', NULL, 'available'), ('8722', 'B', NULL, 'available'), ('8723', 'B', NULL, 'available'), ('8724', 'B', NULL, 'available'), ('8725', 'B', NULL, 'available'),

-- Floor 8 (8801-8825)
('8801', 'B', NULL, 'available'), ('8802', 'B', NULL, 'available'), ('8803', 'B', NULL, 'available'), ('8804', 'B', NULL, 'available'), ('8805', 'B', NULL, 'available'),
('8806', 'B', NULL, 'available'), ('8807', 'B', NULL, 'available'), ('8808', 'B', NULL, 'available'), ('8809', 'B', NULL, 'available'), ('8810', 'B', NULL, 'available'),
('8811', 'B', NULL, 'available'), ('8812', 'B', NULL, 'available'), ('8813', 'B', NULL, 'available'), ('8814', 'B', NULL, 'available'), ('8815', 'B', NULL, 'available'),
('8816', 'B', NULL, 'available'), ('8817', 'B', NULL, 'available'), ('8818', 'B', NULL, 'available'), ('8819', 'B', NULL, 'available'), ('8820', 'B', NULL, 'available'),
('8821', 'B', NULL, 'available'), ('8822', 'B', NULL, 'available'), ('8823', 'B', NULL, 'available'), ('8824', 'B', NULL, 'available'), ('8825', 'B', NULL, 'available'),

-- Floor 9 (8901-8925)
('8901', 'B', NULL, 'available'), ('8902', 'B', NULL, 'available'), ('8903', 'B', NULL, 'available'), ('8904', 'B', NULL, 'available'), ('8905', 'B', NULL, 'available'),
('8906', 'B', NULL, 'available'), ('8907', 'B', NULL, 'available'), ('8908', 'B', NULL, 'available'), ('8909', 'B', NULL, 'available'), ('8910', 'B', NULL, 'available'),
('8911', 'B', NULL, 'available'), ('8912', 'B', NULL, 'available'), ('8913', 'B', NULL, 'available'), ('8914', 'B', NULL, 'available'), ('8915', 'B', NULL, 'available'),
('8916', 'B', NULL, 'available'), ('8917', 'B', NULL, 'available'), ('8918', 'B', NULL, 'available'), ('8919', 'B', NULL, 'available'), ('8920', 'B', NULL, 'available'),
('8921', 'B', NULL, 'available'), ('8922', 'B', NULL, 'available'), ('8923', 'B', NULL, 'available'), ('8924', 'B', NULL, 'available'), ('8925', 'B', NULL, 'available'),

-- Floor 10 (8001-8025)
('8001', 'B', NULL, 'available'), ('8002', 'B', NULL, 'available'), ('8003', 'B', NULL, 'available'), ('8004', 'B', NULL, 'available'), ('8005', 'B', NULL, 'available'),
('8006', 'B', NULL, 'available'), ('8007', 'B', NULL, 'available'), ('8008', 'B', NULL, 'available'), ('8009', 'B', NULL, 'available'), ('8010', 'B', NULL, 'available'),
('8011', 'B', NULL, 'available'), ('8012', 'B', NULL, 'available'), ('8013', 'B', NULL, 'available'), ('8014', 'B', NULL, 'available'), ('8015', 'B', NULL, 'available'),
('8016', 'B', NULL, 'available'), ('8017', 'B', NULL, 'available'), ('8018', 'B', NULL, 'available'), ('8019', 'B', NULL, 'available'), ('8020', 'B', NULL, 'available'),
('8021', 'B', NULL, 'available'), ('8022', 'B', NULL, 'available'), ('8023', 'B', NULL, 'available'), ('8024', 'B', NULL, 'available'), ('8025', 'B', NULL, 'available');

-- Building A (10 floors, 25 rooms each)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 1 (9101-9125)
('9101', 'A', NULL, 'available'), ('9102', 'A', NULL, 'available'), ('9103', 'A', NULL, 'available'), ('9104', 'A', NULL, 'available'), ('9105', 'A', NULL, 'available'),
('9106', 'A', NULL, 'available'), ('9107', 'A', NULL, 'available'), ('9108', 'A', NULL, 'available'), ('9109', 'A', NULL, 'available'), ('9110', 'A', NULL, 'available'),
('9111', 'A', NULL, 'available'), ('9112', 'A', NULL, 'available'), ('9113', 'A', NULL, 'available'), ('9114', 'A', NULL, 'available'), ('9115', 'A', NULL, 'available'),
('9116', 'A', NULL, 'available'), ('9117', 'A', NULL, 'available'), ('9118', 'A', NULL, 'available'), ('9119', 'A', NULL, 'available'), ('9120', 'A', NULL, 'available'),
('9121', 'A', NULL, 'available'), ('9122', 'A', NULL, 'available'), ('9123', 'A', NULL, 'available'), ('9124', 'A', NULL, 'available'), ('9125', 'A', NULL, 'available');

-- Floor 2 (9201-9225)
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
('9201', 'A', NULL, 'available'), ('9202', 'A', NULL, 'available'), ('9203', 'A', NULL, 'available'), ('9204', 'A', NULL, 'available'), ('9205', 'A', NULL, 'available'),
('9206', 'A', NULL, 'available'), ('9207', 'A', NULL, 'available'), ('9208', 'A', NULL, 'available'), ('9209', 'A', NULL, 'available'), ('9210', 'A', NULL, 'available'),
('9211', 'A', NULL, 'available'), ('9212', 'A', NULL, 'available'), ('9213', 'A', NULL, 'available'), ('9214', 'A', NULL, 'available'), ('9215', 'A', NULL, 'available'),
('9216', 'A', NULL, 'available'), ('9217', 'A', NULL, 'available'), ('9218', 'A', NULL, 'available'), ('9219', 'A', NULL, 'available'), ('9220', 'A', NULL, 'available'),
('9221', 'A', NULL, 'available'), ('9222', 'A', NULL, 'available'), ('9223', 'A', NULL, 'available'), ('9224', 'A', NULL, 'available'), ('9225', 'A', NULL, 'available');

-- Floors 3-9
INSERT INTO buildings (room_number, building_name, tenants, status) VALUES
-- Floor 3 (9301-9325)
('9301', 'A', NULL, 'available'), ('9302', 'A', NULL, 'available'), ('9303', 'A', NULL, 'available'), ('9304', 'A', NULL, 'available'), ('9305', 'A', NULL, 'available'),
('9306', 'A', NULL, 'available'), ('9307', 'A', NULL, 'available'), ('9308', 'A', NULL, 'available'), ('9309', 'A', NULL, 'available'), ('9310', 'A', NULL, 'available'),
('9311', 'A', NULL, 'available'), ('9312', 'A', NULL, 'available'), ('9313', 'A', NULL, 'available'), ('9314', 'A', NULL, 'available'), ('9315', 'A', NULL, 'available'),
('9316', 'A', NULL, 'available'), ('9317', 'A', NULL, 'available'), ('9318', 'A', NULL, 'available'), ('9319', 'A', NULL, 'available'), ('9320', 'A', NULL, 'available'),
('9321', 'A', NULL, 'available'), ('9322', 'A', NULL, 'available'), ('9323', 'A', NULL, 'available'), ('9324', 'A', NULL, 'available'), ('9325', 'A', NULL, 'available'),

-- Floor 4 (9401-9425)
('9401', 'A', NULL, 'available'), ('9402', 'A', NULL, 'available'), ('9403', 'A', NULL, 'available'), ('9404', 'A', NULL, 'available'), ('9405', 'A', NULL, 'available'),
('9406', 'A', NULL, 'available'), ('9407', 'A', NULL, 'available'), ('9408', 'A', NULL, 'available'), ('9409', 'A', NULL, 'available'), ('9410', 'A', NULL, 'available'),
('9411', 'A', NULL, 'available'), ('9412', 'A', NULL, 'available'), ('9413', 'A', NULL, 'available'), ('9414', 'A', NULL, 'available'), ('9415', 'A', NULL, 'available'),
('9416', 'A', NULL, 'available'), ('9417', 'A', NULL, 'available'), ('9418', 'A', NULL, 'available'), ('9419', 'A', NULL, 'available'), ('9420', 'A', NULL, 'available'),
('9421', 'A', NULL, 'available'), ('9422', 'A', NULL, 'available'), ('9423', 'A', NULL, 'available'), ('9424', 'A', NULL, 'available'), ('9425', 'A', NULL, 'available'),

-- Floor 5 (9501-9525)
('9501', 'A', NULL, 'available'), ('9502', 'A', NULL, 'available'), ('9503', 'A', NULL, 'available'), ('9504', 'A', NULL, 'available'), ('9505', 'A', NULL, 'available'),
('9506', 'A', NULL, 'available'), ('9507', 'A', NULL, 'available'), ('9508', 'A', NULL, 'available'), ('9509', 'A', NULL, 'available'), ('9510', 'A', NULL, 'available'),
('9511', 'A', NULL, 'available'), ('9512', 'A', NULL, 'available'), ('9513', 'A', NULL, 'available'), ('9514', 'A', NULL, 'available'), ('9515', 'A', NULL, 'available'),
('9516', 'A', NULL, 'available'), ('9517', 'A', NULL, 'available'), ('9518', 'A', NULL, 'available'), ('9519', 'A', NULL, 'available'), ('9520', 'A', NULL, 'available'),
('9521', 'A', NULL, 'available'), ('9522', 'A', NULL, 'available'), ('9523', 'A', NULL, 'available'), ('9524', 'A', NULL, 'available'), ('9525', 'A', NULL, 'available'),

-- Floor 6 (9601-9625)
('9601', 'A', NULL, 'available'), ('9602', 'A', NULL, 'available'), ('9603', 'A', NULL, 'available'), ('9604', 'A', NULL, 'available'), ('9605', 'A', NULL, 'available'),
('9606', 'A', NULL, 'available'), ('9607', 'A', NULL, 'available'), ('9608', 'A', NULL, 'available'), ('9609', 'A', NULL, 'available'), ('9610', 'A', NULL, 'available'),
('9611', 'A', NULL, 'available'), ('9612', 'A', NULL, 'available'), ('9613', 'A', NULL, 'available'), ('9614', 'A', NULL, 'available'), ('9615', 'A', NULL, 'available'),
('9616', 'A', NULL, 'available'), ('9617', 'A', NULL, 'available'), ('9618', 'A', NULL, 'available'), ('9619', 'A', NULL, 'available'), ('9620', 'A', NULL, 'available'),
('9621', 'A', NULL, 'available'), ('9622', 'A', NULL, 'available'), ('9623', 'A', NULL, 'available'), ('9624', 'A', NULL, 'available'), ('9625', 'A', NULL, 'available'),

-- Floor 7 (9701-9725)
('9701', 'A', NULL, 'available'), ('9702', 'A', NULL, 'available'), ('9703', 'A', NULL, 'available'), ('9704', 'A', NULL, 'available'), ('9705', 'A', NULL, 'available'),
('9706', 'A', NULL, 'available'), ('9707', 'A', NULL, 'available'), ('9708', 'A', NULL, 'available'), ('9709', 'A', NULL, 'available'), ('9710', 'A', NULL, 'available'),
('9711', 'A', NULL, 'available'), ('9712', 'A', NULL, 'available'), ('9713', 'A', NULL, 'available'), ('9714', 'A', NULL, 'available'), ('9715', 'A', NULL, 'available'),
('9716', 'A', NULL, 'available'), ('9717', 'A', NULL, 'available'), ('9718', 'A', NULL, 'available'), ('9719', 'A', NULL, 'available'), ('9720', 'A', NULL, 'available'),
('9721', 'A', NULL, 'available'), ('9722', 'A', NULL, 'available'), ('9723', 'A', NULL, 'available'), ('9724', 'A', NULL, 'available'), ('9725', 'A', NULL, 'available'),

-- Floor 8 (9801-9825)
('9801', 'A', NULL, 'available'), ('9802', 'A', NULL, 'available'), ('9803', 'A', NULL, 'available'), ('9804', 'A', NULL, 'available'), ('9805', 'A', NULL, 'available'),
('9806', 'A', NULL, 'available'), ('9807', 'A', NULL, 'available'), ('9808', 'A', NULL, 'available'), ('9809', 'A', NULL, 'available'), ('9810', 'A', NULL, 'available'),
('9811', 'A', NULL, 'available'), ('9812', 'A', NULL, 'available'), ('9813', 'A', NULL, 'available'), ('9814', 'A', NULL, 'available'), ('9815', 'A', NULL, 'available'),
('9816', 'A', NULL, 'available'), ('9817', 'A', NULL, 'available'), ('9818', 'A', NULL, 'available'), ('9819', 'A', NULL, 'available'), ('9820', 'A', NULL, 'available'),
('9821', 'A', NULL, 'available'), ('9822', 'A', NULL, 'available'), ('9823', 'A', NULL, 'available'), ('9824', 'A', NULL, 'available'), ('9825', 'A', NULL, 'available'),

-- Floor 9 (9901-9925)
('9901', 'A', NULL, 'available'), ('9902', 'A', NULL, 'available'), ('9903', 'A', NULL, 'available'), ('9904', 'A', NULL, 'available'), ('9905', 'A', NULL, 'available'),
('9906', 'A', NULL, 'available'), ('9907', 'A', NULL, 'available'), ('9908', 'A', NULL, 'available'), ('9909', 'A', NULL, 'available'), ('9910', 'A', NULL, 'available'),
('9911', 'A', NULL, 'available'), ('9912', 'A', NULL, 'available'), ('9913', 'A', NULL, 'available'), ('9914', 'A', NULL, 'available'), ('9915', 'A', NULL, 'available'),
('9916', 'A', NULL, 'available'), ('9917', 'A', NULL, 'available'), ('9918', 'A', NULL, 'available'), ('9919', 'A', NULL, 'available'), ('9920', 'A', NULL, 'available'),
('9921', 'A', NULL, 'available'), ('9922', 'A', NULL, 'available'), ('9923', 'A', NULL, 'available'), ('9924', 'A', NULL, 'available'), ('9925', 'A', NULL, 'available'),

-- Floor 10 (9001-9025)
('9001', 'A', NULL, 'available'), ('9002', 'A', NULL, 'available'), ('9003', 'A', NULL, 'available'), ('9004', 'A', NULL, 'available'), ('9005', 'A', NULL, 'available'),
('9006', 'A', NULL, 'available'), ('9007', 'A', NULL, 'available'), ('9008', 'A', NULL, 'available'), ('9009', 'A', NULL, 'available'), ('9010', 'A', NULL, 'available'),
('9011', 'A', NULL, 'available'), ('9012', 'A', NULL, 'available'), ('9013', 'A', NULL, 'available'), ('9014', 'A', NULL, 'available'), ('9015', 'A', NULL, 'available'),
('9016', 'A', NULL, 'available'), ('9017', 'A', NULL, 'available'), ('9018', 'A', NULL, 'available'), ('9019', 'A', NULL, 'available'), ('9020', 'A', NULL, 'available'),
('9021', 'A', NULL, 'available'), ('9022', 'A', NULL, 'available'), ('9023', 'A', NULL, 'available'), ('9024', 'A', NULL, 'available'), ('9025', 'A', NULL, 'available');
