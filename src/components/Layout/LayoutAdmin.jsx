import React, { useState } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LayoutAdmin.scss";

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const navigate = useNavigate();

  const items = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "dashboard",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/sensor">Sensor Data</Link>,
      // key: 'user',
      icon: <DollarCircleOutlined />,
      key: "sensor",
    },
    {
      label: <Link to="/history">History</Link>,
      key: "history",
      icon: <ExceptionOutlined />,
    },
    {
      label: <Link to="/profile">Profile</Link>,
      key: "profile",
      icon: <UserOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>IoT</div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>
        </div>
        <Content>
          <div className="admin-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
